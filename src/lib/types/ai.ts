/**
 * Réglages des fonctions d'intelligence artificielle.
 *
 * Ils sont stockés dans le profil de l'utilisateur : chaque personne garde
 * la main sur ce qui est envoyé à un modèle, et sur la langue de réponse.
 */
export type AiSettings = {
  /** Coupe toutes les fonctions d'assistance. */
  enabled: boolean;
  /** L'assistant peut répondre dans la messagerie. */
  assistantEnabled: boolean;
  /** Les messages reçus peuvent être traduits. */
  translateEnabled: boolean;
  /** Langue des réponses de l'assistant. */
  language: string;
  /** Langue dans laquelle les messages sont traduits. */
  translateLanguage: string;
  /** Modèle demandé (compatible API « chat completions »). */
  model: string;
  /** Consigne donnée à l'assistant (ton, longueur, objectifs…). */
  systemPrompt: string;
  /**
   * Clé du fournisseur, lorsqu'elle n'est pas configurée sur le serveur.
   * Elle reste sur le compte de la personne et n'est jamais partagée.
   */
  apiKey: string;
};

export const DEFAULT_AI_SETTINGS: AiSettings = {
  enabled: true,
  assistantEnabled: true,
  translateEnabled: true,
  language: 'français',
  translateLanguage: 'français',
  model: '',
  systemPrompt: '',
  apiKey: ''
};

/** Langues proposées pour la traduction et les réponses. */
export const AI_LANGUAGES: readonly string[] = [
  'français',
  'anglais',
  'espagnol',
  'allemand',
  'italien',
  'portugais',
  'néerlandais',
  'polonais',
  'russe',
  'ukrainien',
  'turc',
  'arabe',
  'hébreu',
  'chinois simplifié',
  'japonais',
  'coréen',
  'hindi',
  'thaï'
];

/** Modèles proposés, quand le serveur n'en impose aucun. */
export const AI_MODELS: readonly string[] = [
  '',
  'gpt-4o-mini',
  'gpt-4o',
  'gpt-4.1-mini',
  'claude-3-5-haiku-latest',
  'claude-3-5-sonnet-latest',
  'llama-3.3-70b-versatile',
  'mistral-small-latest',
  'gemini-2.0-flash'
];
