import {
  AI_FALLBACK_LANGUAGE,
  AI_LANGUAGES,
  DEFAULT_AI_SETTINGS
} from '@lib/types/ai';
import type { AiSettings } from '@lib/types/ai';

export type AiRole = 'system' | 'user' | 'assistant';

export type AiTurn = {
  role: AiRole;
  content: string;
};

/** Nature de la demande envoyée au modèle. */
export type AiTask = 'chat' | 'translate' | 'rewrite';

export type AiRequest = {
  task: AiTask;
  messages?: AiTurn[];
  model?: string;
  apiKey?: string;
  language?: string;
  instruction?: string;
  /** Texte à traduire ou à reformuler. */
  text?: string;
  /** La réponse est-elle demandée en flux, morceau par morceau ? */
  stream?: boolean;
};

export type AiResponse = {
  reply?: string;
  error?: string;
};

/** Erreur renvoyée par l'API d'intelligence artificielle. */
export class AiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'AiError';
  }
}

/** Complète les réglages avec les valeurs par défaut. */
export function withAiDefaults(
  settings?: Partial<AiSettings> | null
): AiSettings {
  return { ...DEFAULT_AI_SETTINGS, ...(settings ?? {}) };
}

/** La langue demandée fait-elle partie de la liste proposée ? */
export function isKnownAiLanguage(language: string): boolean {
  return AI_LANGUAGES.includes(language);
}

/**
 * Envoie une demande au modèle et renvoie sa réponse.
 *
 * Le modèle est appelé par notre serveur (route `/api/ai`) : la clé du
 * fournisseur ne transite donc jamais par une requête faite depuis le
 * navigateur vers un tiers.
 */
export async function aiRequest(payload: AiRequest): Promise<string> {
  let response: Response;

  /* La clé est souvent collée avec son préfixe « Bearer » : on l'enlève
     avant de l'envoyer, pour ne pas dépendre du serveur. */
  const body: AiRequest = payload.apiKey
    ? { ...payload, apiKey: payload.apiKey.trim().replace(/^bearer\s+/i, '') }
    : payload;

  try {
    response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch {
    throw new AiError(
      'Impossible de joindre le service d’intelligence artificielle.'
    );
  }

  const data = (await response.json().catch(() => ({}))) as AiResponse;

  if (!response.ok)
    throw new AiError(
      data.error ??
        'Le service d’intelligence artificielle a renvoyé une erreur.',
      response.status
    );

  return (data.reply ?? '').trim();
}

/** Consigne de base, commune à toutes les demandes. */
function baseInstruction(settings: AiSettings): string {
  const language = isKnownAiLanguage(settings.language)
    ? settings.language
    : AI_FALLBACK_LANGUAGE;

  const custom = settings.systemPrompt.trim();

  return [
    `Tu es l'assistant d'Inspiration, un réseau social. Tu réponds en ${language}.`,
    'Tes réponses sont courtes, concrètes et bien structurées.',
    'Si tu ne sais pas, tu le dis : tu n’inventes jamais de fait.',
    custom ? `Consigne supplémentaire de la personne : ${custom}` : ''
  ]
    .filter(Boolean)
    .join(' ');
}

/** Historique de la conversation, prêt à être envoyé au modèle. */
export function buildHistory(
  turns: { role: 'user' | 'assistant'; content: string }[]
): AiTurn[] {
  return turns.map((turn) => ({ role: turn.role, content: turn.content }));
}

/** Dialogue avec l'assistant. */
export async function chatWithAi(
  history: { role: 'user' | 'assistant'; content: string }[],
  settings: AiSettings
): Promise<string> {
  const reply = await aiRequest({
    task: 'chat',
    apiKey: settings.apiKey,
    language: settings.language,
    model: settings.model,
    messages: [
      { role: 'system', content: baseInstruction(settings) },
      ...buildHistory(history)
    ]
  });

  if (!reply) throw new AiError('Le modèle n’a rien répondu.');

  return reply;
}

/**
 * Dialogue avec l'assistant, réponse en flux.
 *
 * Le texte arrive morceau par morceau : `onUpdate` est appelé à chaque
 * fragment avec le texte complet, pour que la réponse s'écrive à l'écran
 * pendant qu'elle est produite.
 */
export async function streamChatWithAi(
  history: { role: 'user' | 'assistant'; content: string }[],
  settings: AiSettings,
  onUpdate: (text: string) => void
): Promise<string> {
  const body: AiRequest = {
    task: 'chat',
    apiKey: settings.apiKey,
    language: settings.language,
    model: settings.model,
    stream: true,
    messages: [
      { role: 'system', content: baseInstruction(settings) },
      ...buildHistory(history)
    ]
  };

  let response: Response;

  try {
    response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        body.apiKey
          ? {
              ...body,
              apiKey: body.apiKey.trim().replace(/^bearer\s+/i, '')
            }
          : body
      )
    });
  } catch {
    throw new AiError(
      'Impossible de joindre le service d’intelligence artificielle.'
    );
  }

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as AiResponse;

    throw new AiError(
      data.error ?? 'Le service d’intelligence artificielle a renvoyé une erreur.',
      response.status
    );
  }

  if (!response.body)
    throw new AiError('Le service d’intelligence artificielle n’a rien renvoyé.');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = '';
  let full = '';

  for (;;) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const frames = buffer.split('\n\n');
    buffer = frames.pop() ?? '';

    for (const frame of frames) {
      const line = frame.trim();

      if (!line.startsWith('data:')) continue;

      const data = line.slice(5).trim();

      if (!data || data === '[DONE]') continue;

      try {
        const parsed = JSON.parse(data) as { text?: string; error?: string };

        if (parsed.error) throw new AiError(parsed.error);

        if (parsed.text) {
          full += parsed.text;
          onUpdate(full);
        }
      } catch (error) {
        if (error instanceof AiError) throw error;
      }
    }
  }

  return full;
}

/** Traduit un texte dans la langue choisie. */
export async function translateWithAi(
  text: string,
  settings: AiSettings
): Promise<string> {
  const reply = await aiRequest({
    task: 'translate',
    apiKey: settings.apiKey,
    language: settings.translateLanguage,
    model: settings.model,
    text
  });

  if (!reply) throw new AiError('La traduction est vide.');

  return reply;
}

/** Reformule un texte (amélioration, ton, longueur…). */
export async function rewriteWithAi(
  text: string,
  settings: AiSettings,
  instruction?: string
): Promise<string> {
  const reply = await aiRequest({
    task: 'rewrite',
    apiKey: settings.apiKey,
    instruction,
    language: settings.language,
    model: settings.model,
    text
  });

  if (!reply) throw new AiError('La reformulation est vide.');

  return reply;
}
