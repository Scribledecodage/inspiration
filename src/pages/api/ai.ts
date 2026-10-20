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

type Role = 'system' | 'user' | 'assistant';

type Turn = {
  role: Role;
  content: string;
};

type Body = {
  task?: 'chat' | 'translate' | 'rewrite';
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
  }[];
  error?: { message?: string };
};

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
     tente alors la seconde, pour que la personne ne soit pas bloquée. */
  const serverKey = normalizeApiKey(process.env.AI_API_KEY);
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

  try {
    /* On essaie le modèle demandé, puis les suivants : un point gratuit
       indisponible (429, 503…) ne doit pas priver la personne de réponse. */
    const tried: string[] = [];
    const candidates = [
      model,
      ...AI_MODELS.filter((candidate) => candidate !== model)
    ].filter((candidate, index, all) => all.indexOf(candidate) === index);

    let lastStatus = 502;
    let lastReason = 'Le modèle n’a renvoyé aucune réponse.';

    for (const candidate of candidates.slice(0, MAX_MODEL_ATTEMPTS)) {
      tried.push(candidate);

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
