import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Réponse de l'assistant à une publication.
 *
 * Quand une publication mentionne `@ia`, l'assistant y répond. Si le modèle
 * sait regarder les images, et que la publication en contient une, il
 * commente l'image elle-même.
 *
 * L'URL de l'image doit être absolue : le modèle va la chercher lui-même.
 * Les GIF et les vidéos ne sont pas envoyés : ils ne sont pas des images
 * que le modèle puisse regarder.
 */

const REPO_MODELS_URL = 'https://openrouter.ai/api/v1/models';
const USER_AGENT = 'inspiration-ai-reply';

const MAX_INPUT_LENGTH = 4_000;
const CACHE_TTL = 60 * 60 * 1000;

type ModelInfo = {
  id: string;
  /** « text+image->text » : le modèle sait regarder les images. */
  modality?: string;
};

let modelsCache: { models: ModelInfo[]; at: number } | null = null;

type Body = {
  text?: string;
  /** URL absolue de l'image de la publication. */
  imageUrl?: string;
  /** Type MIME de l'image (« image/png », « image/gif », « video/mp4 »…). */
  imageType?: string;
  model?: string;
  language?: string;
  /** Le modèle regarde-t-il les images ? */
  supportsImages?: boolean;
};

/** Le modèle sait-il regarder les images ? */
function readsImages(modality?: string): boolean {
  if (!modality) return false;

  return modality.includes('image');
}

/** La liste des modèles d'OpenRouter (en cache). */
async function fetchModels(): Promise<ModelInfo[]> {
  if (modelsCache && Date.now() - modelsCache.at < CACHE_TTL)
    return modelsCache.models;

  try {
    const response = await fetch(REPO_MODELS_URL, {
      headers: { Accept: 'application/json', 'User-Agent': USER_AGENT }
    });

    if (!response.ok) return [];

    const payload = (await response.json()) as {
      data?: { id?: string; architecture?: { modality?: string } }[];
    };

    const models = (payload.data ?? [])
      .filter((model) => typeof model.id === 'string')
      .map((model) => ({
        id: model.id as string,
        modality: model.architecture?.modality
      }));

    modelsCache = { models, at: Date.now() };

    return models;
  } catch {
    return [];
  }
}

/** L'image peut-elle être envoyée au modèle ? */
function canShowImage(imageType?: string): boolean {
  if (!imageType) return false;

  /* Les GIF et les vidéos ne sont pas des images que le modèle regarde. */
  if (imageType.includes('gif')) return false;
  if (imageType.includes('video')) return false;

  return imageType.startsWith('image/');
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

  const text = (body.text ?? '').slice(0, MAX_INPUT_LENGTH).trim();

  if (!text) {
    res.status(400).json({ error: 'La publication est vide.' });
    return;
  }

  const apiKey =
    process.env.OPENROUTER_API_KEY?.trim() ||
    process.env.AI_API_KEY?.trim() ||
    '';

  if (!apiKey) {
    res.status(503).json({
      error: 'L’intelligence artificielle n’est pas configurée sur ce serveur.'
    });
    return;
  }

  const model =
    body.model?.trim() ||
    process.env.AI_MODEL?.trim() ||
    'minimax/minimax-m3.1-flash:free';

  /* Le modèle regarde-t-il les images ? On demande à OpenRouter. */
  let supportsImages = body.supportsImages;

  if (supportsImages === undefined) {
    const models = await fetchModels();

    supportsImages = readsImages(
      models.find((item) => item.id === model)?.modality
    );
  }

  const language = (body.language ?? 'français').trim() || 'français';

  /* L'image n'est envoyée que si le modèle sait la regarder, qu'elle est une
     vraie image, et que son URL est absolue (le modèle doit pouvoir la
     chercher). */
  const imageUrl = body.imageUrl?.trim();
  const showImage =
    Boolean(supportsImages) &&
    canShowImage(body.imageType) &&
    Boolean(imageUrl) &&
    /^https?:\/\//i.test(imageUrl as string);

  const content = showImage
    ? ([
        { type: 'text', text: text.slice(0, MAX_INPUT_LENGTH) },
        { type: 'image_url', image_url: { url: imageUrl as string } }
      ] as unknown[])
    : text.slice(0, MAX_INPUT_LENGTH);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const response = await fetch(
      process.env.AI_API_URL?.trim() ||
        'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.NEXT_PUBLIC_URL ?? '',
          'X-Title': 'Inspiration'
        },
        body: JSON.stringify({
          model,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: [
                `Tu es l'assistant d'Inspiration, un réseau social. Tu réponds en ${language}.`,
                showImage
                  ? 'La publication contient une image : commente-la, et réponds à ce qui est demandé.'
                  : 'Tu réponds à la publication qui te mentionne.',
                'Ta réponse est une publication : courte (deux à quatre phrases), sans prelude, sans titre.',
                'Si la question n’a pas de sens ou demande quelque chose d’illégal, dis-le en une phrase.'
              ].join(' ')
            },
            { role: 'user', content }
          ]
        }),
        signal: controller.signal
      }
    );

    const payload = (await response.json().catch(() => ({}))) as {
      choices?: { message?: { content?: string } }[];
      error?: { message?: string };
    };

    if (!response.ok) {
      res
        .status(
          response.status >= 400 && response.status < 600
            ? response.status
            : 502
        )
        .json({
          error:
            payload.error?.message ??
            'Le fournisseur d’intelligence artificielle a refusé la demande.'
        });
      return;
    }

    const reply = payload.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      res.status(502).json({ error: 'Le modèle n’a rien répondu.' });
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
