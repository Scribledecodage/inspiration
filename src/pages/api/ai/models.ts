import type { AiModel } from '@lib/types/ai';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Liste des modèles disponibles chez OpenRouter.
 *
 * Elle est récupérée chez OpenRouter (et non figée dans le code) : les
 * modèles sortent, les prix changent, et de nouveaux modèles arrivent
 * chaque semaine. La liste est gardée en mémoire une heure.
 */

const MODELS_URL = 'https://openrouter.ai/api/v1/models';

/* Durée de validité de la liste en cache (ms). */
const CACHE_TTL = 60 * 60 * 1000;

export type { AiModel };

type Cache = {
  models: AiModel[];
  at: number;
};

let cache: Cache | null = null;

type OpenRouterModel = {
  id?: string;
  name?: string;
  context_length?: number;
  created?: number;
  pricing?: { prompt?: string; completion?: string };
  architecture?: { modality?: string; input_modalities?: string[] };
};

/** Un modèle gratuit est signalé par le suffixe « :free ». */
function isFreeModel(id: string, prompt: number, completion: number): boolean {
  return id.endsWith(':free') || (prompt === 0 && completion === 0);
}

function normalize(model: OpenRouterModel): AiModel | null {
  if (!model.id) return null;

  const prompt = Number(model.pricing?.prompt ?? 0) || 0;
  const completion = Number(model.pricing?.completion ?? 0) || 0;

  return {
    id: model.id,
    name: model.name ?? model.id,
    provider: model.id.split('/')[0] ?? '',
    contextLength: model.context_length ?? 0,
    created: model.created ?? 0,
    promptPrice: prompt,
    completionPrice: completion,
    free: isFreeModel(model.id, prompt, completion)
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ models?: AiModel[]; error?: string }>
): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }

  if (cache && Date.now() - cache.at < CACHE_TTL) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({ models: cache.models });
    return;
  }

  try {
    const response = await fetch(MODELS_URL, {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok)
      throw new Error(`OpenRouter a répondu ${response.status}.`);

    const payload = (await response.json()) as { data?: OpenRouterModel[] };

    const models = (payload.data ?? [])
      .map(normalize)
      .filter((model): model is AiModel => Boolean(model));

    if (!models.length) throw new Error('Aucun modèle reçu.');

    cache = { models, at: Date.now() };

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.status(200).json({ models });
  } catch (error) {
    res.status(502).json({
      error:
        'Impossible de récupérer la liste des modèles chez OpenRouter. Réessayez plus tard.'
    });
  }
}
