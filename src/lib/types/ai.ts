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

/**
 * Valeurs par défaut.
 *
 * Tout est éteint : rien n'est envoyé à un modèle tant que la personne
 * n'a pas expresslyément activé les fonctions qu'elle souhaite. Aucun
 * modèle ni aucune langue n'est présélectionné : c'est à elle de choisir.
 */
export const DEFAULT_AI_SETTINGS: AiSettings = {
  enabled: false,
  assistantEnabled: false,
  translateEnabled: false,
  language: '',
  translateLanguage: '',
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

/** Langue utilisée quand aucune n'a été choisie. */
export const AI_FALLBACK_LANGUAGE = 'français';

/** Modèle disponible chez un fournisseur (liste OpenRouter). */
export type AiModel = {
  /** Identifiant complet, par exemple « anthropic/claude-sonnet-4 ». */
  id: string;
  /** Nom lisible. */
  name: string;
  /** Fournisseur (« anthropic », « openai », « google »…). */
  provider: string;
  /** Nombre de jetons acceptés en contexte. */
  contextLength: number;
  /** Date de sortie (horodatage en secondes). */
  created: number;
  /** Prix par jeton, en dollars. */
  promptPrice: number;
  completionPrice: number;
  /** Le modèle est-il gratuit ? */
  free: boolean;
};

/** Modèles proposés, quand le serveur n'en impose aucun. */
export const AI_MODELS: readonly string[] = [
  '',
  'openai/gpt-4o-mini',
  'openai/gpt-4o',
  'anthropic/claude-3.5-haiku',
  'anthropic/claude-3.5-sonnet',
  'google/gemini-2.0-flash-001',
  'meta-llama/llama-3.3-70b-instruct',
  'mistralai/mistral-small',
  'deepseek/deepseek-chat'
];
