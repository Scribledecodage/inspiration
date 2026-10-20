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

/**
 * Modèles gratuits recommandés, du meilleur au suivant.
 *
 * Les points gratuits d'OpenRouter sont gratuits : ils tombent souvent en 429
 * quand tout le monde s'en sert. On essaie donc les uns après les autres
 * jusqu'à ce que l'un d'eux réponde.
 *
 * Classement d'octobre 2026 (score « Intelligence », contexte, date de
 * sortie, usage sur 7 jours) :
 *   1. MiniMax M3.1 Flash   — 42.7 · 1M · 19/10/2026 · 1,1 T jetons
 *   2. Nemotron 3 Ultra     — 22.9 · 1M · 04/06/2026 · 4,6 T
 *   3. Gemma 4 26B         — 98.5 au banc d'essai · 262 K
 *
 * Les modèles « thinkingmachines/inkling » en sont écartés : OpenRouter les
 * réserve aux agents de programmation et refuse nos appels (403).
 */
export const AI_MODELS: readonly string[] = [
  'minimax/minimax-m3.1-flash:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'google/gemma-4-26b-a4b-it:free',
  'qwen/qwen3.8-27b:free',
  'poolside/laguna-xs-2.1:free'
];

/** Modèle utilisé par défaut (le meilleur gratuit connu). */
export const AI_DEFAULT_MODEL = AI_MODELS[0];
