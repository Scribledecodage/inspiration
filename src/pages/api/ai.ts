import { AI_DEFAULT_MODEL, AI_MODELS } from '@lib/types/ai';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Passerelle vers le fournisseur d'intelligence artificielle.
 *
 * Par défaut, c'est OpenRouter : il parle l'API « chat completions »
 * d'OpenAI et donne accès à tous les grands modèles avec une seule clé.
 * L'adresse et le modèle se configurent par variables d'environnement ; la
 * clé peut aussi être fournie par la personne, depuis ses réglages, quand
 * le serveur n'en a pas.
 */

const DEFAULT_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

/* Nombre de modèles essayés à la suite : les points gratuits d'OpenRouter
   tombent souvent en 429 quand ils sont très demandés. */
const MAX_MODEL_ATTEMPTS = 3;

/* Un modèle qui échoue n'a pas de raison de faire échouer la demande : on
   passe au suivant. */
function isRetryableStatus(status: number): boolean {
  return (
    status === 404 ||
    status === 408 ||
    status === 409 ||
    status === 429 ||
    (status >= 500 && status < 600)
  );
}

/* Au-delà, la demande devient inutilement coûteuse : on la coupe. */
const MAX_INPUT_LENGTH = 12_000;
const MAX_HISTORY = 20;
const TIMEOUT_MS = 45_000;

/* En flux, la réponse peut durer plus longtemps : le délai est remis à zéro
   à chaque morceau reçu. */
const STREAM_TIMEOUT_MS = 120_000;

/* En-têtes d'une réponse en flux (SSE). */
const STREAM_HEADERS = {
  'Content-Type': 'text/event-stream; charset=utf-8',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
  /* Empêche les proxys de mettre la réponse en tampon. */
  'X-Accel-Buffering': 'no'
};

type Role = 'system' | 'user' | 'assistant';

type Turn = {
  role: Role;
  content: string;
};

type Body = {
  task?: 'chat' | 'translate' | 'rewrite';
  /** La réponse est-elle renvoyée en flux, morceau par morceau ? */
  stream?: boolean;
  messages?: Turn[];
  model?: string;
  apiKey?: string;
  language?: string;
  instruction?: string;
  text?: string;
};

type ProviderAnswer = {
  choices?: {
    message?: { content?: string | { text?: string }[] | null };
    delta?: { content?: string | null };
  }[];
  error?: { message?: string };
};

/**
 * Extrait le texte d'un morceau de flux envoyé par le fournisseur.
 *
 * Le format est celui d'OpenAI : `data: {"choices":[{"delta":{"content":"…"}}]}`.
 * On renvoie `null` pour les morceaux qui ne portent pas de texte (fin de
 * flux, métadonnées, prolongations).
 */
function extractDelta(frame: string): string | null {
  const line = frame.trim();

  if (!line.startsWith('data:')) return null;

  const data = line.slice(5).trim();

  if (!data || data === '[DONE]') return null;

  try {
    const payload = JSON.parse(data) as ProviderAnswer;
    const content = payload.choices?.[0]?.delta?.content;

    if (typeof content === 'string' && content) return content;

    return null;
  } catch {
    return null;
  }
}

/** Première valeur non vide d'une liste. */
function firstNonEmpty(...values: (string | undefined)[]): string {
  const found = values.find((value) => Boolean(value?.trim()));

  return found?.trim() ?? '';
}

/**
 * Nettoie une clé de fournisseur.
 *
 * La clé est souvent collée avec son préfixe « Bearer » (c'est ce que
 * affichent la plupart des interfaces). On l'enlève : sinon l'en-tête
 * envoyé devient « Bearer Bearer … », et le fournisseur répond « Missing
 * Authentication header ».
 */
function normalizeApiKey(value?: string): string {
  return firstNonEmpty(value).replace(/^bearer\s+/i, '');
}

/** Extrait le texte de la réponse, quel que soit le format du fournisseur. */
function extractReply(payload: ProviderAnswer): string {
  const content = payload.choices?.[0]?.message?.content;

  if (typeof content === 'string') return content.trim();

  if (Array.isArray(content))
    return content
      .map((part) => (typeof part === 'string' ? part : part?.text ?? ''))
      .join('')
      .trim();

  return '';
}

/** Consigne système selon la nature de la demande. */
function buildInstruction(body: Body): string {
  const language = firstNonEmpty(body.language, 'français');
  const text = (body.text ?? '').slice(0, MAX_INPUT_LENGTH).trim();

  if (body.task === 'translate')
    return [
      `Traduis le texte ci-dessous en ${language}.`,
      'Rends uniquement la traduction, sans explication ni guillemets.',
      'Conserve la mise en forme, les sauts de ligne et les hashtags.',
      '',
      text
    ].join('\n');

  if (body.task === 'rewrite')
    return [
      `Réécris le texte ci-dessous en ${language}.`,
      body.instruction?.trim()
        ? `Consigne : ${body.instruction.trim()}`
        : 'Consigne : rends le texte plus clair, plus court et plus naturel, sans changer son sens.',
      'Rends uniquement le texte réécrit, sans explication.',
      '',
      text
    ].join('\n');

  return '';
}

/** Ne conserve que les tours utiles (rôle et contenu). */
function cleanHistory(messages: Turn[] | undefined): Turn[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter(
      (turn): turn is Turn =>
        Boolean(turn) &&
        (turn.role === 'user' ||
          turn.role === 'assistant' ||
          turn.role === 'system') &&
        typeof turn.content === 'string' &&
        turn.content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((turn) => ({
      role: turn.role,
      content: turn.content.slice(0, MAX_INPUT_LENGTH)
    }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ reply?: string; error?: string }>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({
      error:
        'Cette adresse attend une requête POST : elle ne s’ouvre pas dans un onglet de navigateur.'
    });
    return;
  }

  const body = (req.body ?? {}) as Body;

  const task = body.task ?? 'chat';

  /* Deux clés possibles : celle de la personne (dans son profil) et celle
     du serveur. La première est refusée si elle est fausse ou périmée : on
     tente alors la seconde, pour que la personne ne soit pas bloquée.

     Le nom de la variable suit l'usage du projet : `OPENROUTER_API_KEY`
     (déjà configuré sur l'hébergement) ou `AI_API_KEY` (usage local). */
  const serverKey =
    normalizeApiKey(process.env.OPENROUTER_API_KEY) ||
    normalizeApiKey(process.env.AI_API_KEY);
  const personalKey = normalizeApiKey(body.apiKey);

  let currentKey = personalKey || serverKey;

  if (!currentKey) {
    res.status(503).json({
      error:
        'L’intelligence artificielle n’est pas configurée sur ce serveur. Ajoutez une clé dans Réglages › Intelligence artificielle, ou demandez à l’administration du site d’en configurer une.'
    });
    return;
  }

  const endpoint = firstNonEmpty(process.env.AI_API_URL) || DEFAULT_ENDPOINT;
  const model = firstNonEmpty(
    body.model,
    process.env.AI_MODEL,
    AI_DEFAULT_MODEL
  );

  const history = cleanHistory(body.messages);
  const instruction = buildInstruction(body);

  const messages: Turn[] = [];

  if (instruction) messages.push({ role: 'system', content: instruction });
  else if (task === 'chat')
    messages.push({
      role: 'system',
      content: `Tu es l'assistant d'Inspiration, un réseau social. Tu réponds en ${firstNonEmpty(
        body.language,
        'français'
      )}, de façon concise et utile.`
    });

  messages.push(...history);

  if (!messages.length) {
    res.status(400).json({ error: 'La demande est vide.' });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  /* OpenRouter attend deux en-têtes de plus pour retrouver le site qui
     appelle son service (ils sont facultatifs). */
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${currentKey}`
  };

  if (endpoint.includes('openrouter.ai')) {
    headers['HTTP-Referer'] = process.env.NEXT_PUBLIC_URL ?? '';
    headers['X-Title'] = 'Inspiration';
  }

  /* On essaie le modèle demandé, puis les suivants : un point gratuit
     indisponible (429, 503…) ne doit pas priver la personne de réponse. */
  const candidates = [
    model,
    ...AI_MODELS.filter((candidate) => candidate !== model)
  ].filter((candidate, index, all) => all.indexOf(candidate) === index);

  try {
    /* --- Réponse en flux : les morceaux arrivent au fur et à mesure. --- */
    if (body.stream) {
      res.writeHead(200, STREAM_HEADERS);

      let lastReason = 'Le modèle n’a rien renvoyé.';

      for (const candidate of candidates.slice(0, MAX_MODEL_ATTEMPTS)) {
        let response: Response;

        try {
          response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              model: candidate,
              messages,
              temperature: task === 'chat' ? 0.7 : 0.2,
              stream: true
            }),
            signal: controller.signal
          });
        } catch {
          break;
        }

        if (!response.ok || !response.body) {
          const payload = (await response
            .json()
            .catch(() => ({}))) as ProviderAnswer;

          lastReason = payload.error?.message ?? lastReason;

          /* La clé est peut-être refusée : on tente celle du serveur. */
          if (response.status === 401 && currentKey !== serverKey && serverKey) {
            currentKey = serverKey;
            headers.Authorization = `Bearer ${currentKey}`;
            continue;
          }

          if (response.status === 401 || response.status === 400) break;

          continue;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = '';

        /* Le délai est remis à zéro à chaque morceau : une longue réponse
           ne doit pas être coupée au bout de quarante-cinq secondes. */
        let streamTimeout = setTimeout(() => controller.abort(), STREAM_TIMEOUT_MS);

        try {
          for (;;) {
            const { done, value } = await reader.read();

            if (done) break;

            clearTimeout(streamTimeout);
            streamTimeout = setTimeout(() => controller.abort(), STREAM_TIMEOUT_MS);

            buffer += decoder.decode(value, { stream: true });

            const frames = buffer.split('\n\n');
            buffer = frames.pop() ?? '';

            for (const frame of frames) {
              const delta = extractDelta(frame);

              if (delta)
                res.write(
                  `data: ${JSON.stringify({ text: delta })}\n\n`
                );
            }
          }
        } catch {
          /* Coupure en cours de route : on renvoie ce qui a été reçu. */
        } finally {
          clearTimeout(streamTimeout);
        }

        res.write('data: [DONE]\n\n');
        res.end();
        return;
      }

      res.write(
        `data: ${JSON.stringify({
          error: lastReason || 'Le modèle n’a rien renvoyé.'
        })}\n\n`
      );
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }

    let lastStatus = 502;
    let lastReason = 'Le modèle n’a renvoyé aucune réponse.';

    for (const candidate of candidates.slice(0, MAX_MODEL_ATTEMPTS)) {

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: candidate,
          messages,
          temperature: task === 'chat' ? 0.7 : 0.2
        }),
        signal: controller.signal
      });

      const payload = (await response
        .json()
        .catch(() => ({}))) as ProviderAnswer;

      if (!response.ok) {
        const status =
          response.status >= 400 && response.status < 600
            ? response.status
            : 502;

        lastStatus = status;
        lastReason = payload.error?.message ?? lastReason;

        /* La clé personnelle a pu être refusée (fausse, périmée, mal
           collée) : on tente alors la clé du serveur, pour que la personne
           ne soit pas bloquée. */
        if (status === 401 && currentKey !== serverKey && serverKey) {
          currentKey = serverKey;
          headers.Authorization = `Bearer ${currentKey}`;
          continue;
        }

        /* Une clé refusée (401) ou une demande invalide (400) ne passera pas
           mieux avec un autre modèle. En revanche, un 403 peut venir du
           modèle lui-même (certains ne sont ouverts qu'à certains usages) :
           on essaie alors le suivant. */
        if (status === 401 || status === 400) break;
        if (!isRetryableStatus(status)) break;

        continue;
      }

      const reply = extractReply(payload);

      if (reply) {
        res.status(200).json({ reply });
        return;
      }

      lastStatus = 502;
      lastReason = 'Le modèle n’a renvoyé aucune réponse.';
    }

    res.status(lastStatus).json({
      error:
        lastStatus === 401
          ? `Le fournisseur a refusé la clé${
              lastReason ? ` : ${lastReason}` : ''
            }. Effacez-la dans Réglages › Intelligence artificielle, ou vérifiez qu’elle est complète (sans le préfixe « Bearer »).`
          : lastStatus === 403
          ? `Le modèle a refusé la demande${
              lastReason ? ` : ${lastReason}` : ''
            }.`
          : lastReason ??
            'Le fournisseur d’intelligence artificielle a refusé la demande.'
    });
  } catch (error) {
    const aborted = (error as Error)?.name === 'AbortError';

    res.status(aborted ? 504 : 502).json({
      error: aborted
        ? 'Le modèle a mis trop de temps à répondre.'
        : 'Impossible de joindre le fournisseur d’intelligence artificielle.'
    });
  } finally {
    clearTimeout(timeout);
  }
}
