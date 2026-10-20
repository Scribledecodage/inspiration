import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Passerelle vers le fournisseur d'intelligence artificielle.
 *
 * Le fournisseur parle l'API « chat completions » (OpenAI et ses
 * compatibles). L'adresse et le modèle se configurent par variables
 * d'environnement ; la clé peut aussi être fournie par la personne, depuis
 * ses réglages, quand le serveur n'en a pas.
 */

const DEFAULT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-4o-mini';

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
  task?: 'chat' | 'translate' | 'rewrite' | 'summarize';
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

/** Extrait le texte de la réponse, quel que soit le format du fournisseur. */
function extractReply(payload: ProviderAnswer): string {
  const content = payload.choices?.[0]?.message?.content;

  if (typeof content === 'string') return content.trim();

  if (Array.isArray(content))
    return content
      .map((part) => (typeof part === 'string' ? part : (part?.text ?? '')))
      .join('')
      .trim();

  return '';
}

/** Consigne système selon la nature de la demande. */
function buildInstruction(body: Body): string {
  const language = (body.language ?? 'français').trim() || 'français';
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

  if (body.task === 'summarize')
    return [
      `Résume le texte ci-dessous en ${language}.`,
      'Rends un résumé court, en deux ou trois phrases au maximum, sans préambule.',
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
    res.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }

  const body = (req.body ?? {}) as Body;

  const task = body.task ?? 'chat';

  const apiKey = firstNonEmpty(body.apiKey, process.env.AI_API_KEY);

  if (!apiKey) {
    res.status(503).json({
      error:
        'L’intelligence artificielle n’est pas configurée sur ce serveur. Ajoutez une clé dans Réglages › Intelligence artificielle, ou demandez à l’administration du site d’en configurer une.'
    });
    return;
  }

  const endpoint = firstNonEmpty(process.env.AI_API_URL) || DEFAULT_ENDPOINT;
  const model = firstNonEmpty(body.model, process.env.AI_MODEL, DEFAULT_MODEL);

  const history = cleanHistory(body.messages);
  const instruction = buildInstruction(body);

  const messages: Turn[] = [];

  if (instruction) messages.push({ role: 'system', content: instruction });
  else if (task === 'chat')
    messages.push({
      role: 'system',
      content: `Tu es l'assistant d'Inspiration, un réseau social. Tu réponds en ${
        (body.language ?? 'français').trim() || 'français'
      }, de façon concise et utile.`
    });

  messages.push(...history);

  if (!messages.length) {
    res.status(400).json({ error: 'La demande est vide.' });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: task === 'chat' ? 0.7 : 0.2
      }),
      signal: controller.signal
    });

    const payload = (await response.json().catch(() => ({}))) as ProviderAnswer;

    if (!response.ok) {
      res.status(response.status >= 400 && response.status < 600 ? response.status : 502).json({
        error:
          payload.error?.message ??
          'Le fournisseur d’intelligence artificielle a refusé la demande.'
      });
      return;
    }

    const reply = extractReply(payload);

    if (!reply) {
      res.status(502).json({ error: 'Le modèle n’a renvoyé aucune réponse.' });
      return;
    }

    res.status(200).json({ reply });
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
