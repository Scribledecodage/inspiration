import { AI_LANGUAGES, DEFAULT_AI_SETTINGS } from '@lib/types/ai';
import type { AiSettings } from '@lib/types/ai';

export type AiRole = 'system' | 'user' | 'assistant';

export type AiTurn = {
  role: AiRole;
  content: string;
};

/** Nature de la demande envoyée au modèle. */
export type AiTask = 'chat' | 'translate' | 'rewrite' | 'summarize';

export type AiRequest = {
  task: AiTask;
  messages?: AiTurn[];
  model?: string;
  apiKey?: string;
  language?: string;
  instruction?: string;
  /** Texte à traduire, reformuler ou résumer. */
  text?: string;
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

  try {
    response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch {
    throw new AiError(
      'Impossible de joindre le service d’intelligence artificielle.'
    );
  }

  const data = (await response.json().catch(() => ({}))) as AiResponse;

  if (!response.ok)
    throw new AiError(
      data.error ?? 'Le service d’intelligence artificielle a renvoyé une erreur.',
      response.status
    );

  return (data.reply ?? '').trim();
}

/** Consigne de base, commune à toutes les demandes. */
function baseInstruction(settings: AiSettings): string {
  const language = isKnownAiLanguage(settings.language)
    ? settings.language
    : DEFAULT_AI_SETTINGS.language;

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

/** Résume un texte. */
export async function summarizeWithAi(
  text: string,
  settings: AiSettings
): Promise<string> {
  const reply = await aiRequest({
    task: 'summarize',
    apiKey: settings.apiKey,
    language: settings.language,
    model: settings.model,
    text
  });

  if (!reply) throw new AiError('Le résumé est vide.');

  return reply;
}
