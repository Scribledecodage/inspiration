import { preview } from 'linkpeek';
import type { NextApiRequest, NextApiResponse } from 'next';

type PreviewResponse = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  siteName?: string;
};

type ErrorResponse = { error: string };

/* Un même lien est souvent partagé plusieurs fois : on garde le résultat en
   mémoire pour ne pas aller le chercher à chaque fois. */
const cache = new Map<string, { value: PreviewResponse; expiresAt: number }>();
const CACHE_TTL = 1000 * 60 * 60; // une heure
const CACHE_MAX = 200;

/* On refuse les adresses internes : un utilisateur pourrait coller un lien
   vers le réseau privé pour sonder le serveur. */
function isPublicUrl(value: string): boolean {
  let parsed: URL;

  try {
    parsed = new URL(value);
  } catch {
    return false;
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;

  const host = parsed.hostname.toLowerCase();

  if (host === 'localhost' || host.endsWith('.local')) return false;

  /* 10.x, 172.16-31.x, 192.168.x, 127.x, 169.254.x */
  if (/^(10\.|127\.|192\.168\.|169\.254\.)/.test(host)) return false;

  const private172 = host.match(/^172\.(\d+)\./);

  if (private172 && Number(private172[1]) >= 16 && Number(private172[1]) <= 31)
    return false;

  return true;
}

export default async function linkPreviewEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<PreviewResponse | ErrorResponse>
): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const url = typeof req.query.url === 'string' ? req.query.url.trim() : '';

  if (!url || !isPublicUrl(url)) {
    res.status(400).json({ error: 'URL invalide' });
    return;
  }

  const cached = cache.get(url);

  if (cached && cached.expiresAt > Date.now()) {
    res.status(200).json(cached.value);
    return;
  }

  try {
    const result = await preview(url);

    const value: PreviewResponse = {
      url,
      title: result.title ?? undefined,
      description: result.description ?? undefined,
      image: result.image ?? undefined,
      favicon: result.favicon ?? undefined,
      siteName: result.siteName ?? undefined
    };

    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value ?? '');

    cache.set(url, { value, expiresAt: Date.now() + CACHE_TTL });

    res.status(200).json(value);
  } catch {
    /* Un site sans balises Open Graph, ou injoignable : on répond simplement
       qu'aucun aperçu n'est disponible. */
    res.status(200).json({ url });
  }
}
