import type { NextApiRequest, NextApiResponse } from 'next';

const B2_ACCOUNT_ID = process.env.B2_ACCESS_KEY_ID ?? '1a1dec339876';
const B2_APPLICATION_KEY =
  process.env.B2_SECRET_ACCESS_KEY ??
  '005e6cbd9162ae7f1656e753cc81dc52d9f0988e42';
const B2_BUCKET = process.env.B2_BUCKET ?? 'inspirationcool2';
const B2_BUCKET_ID = process.env.B2_BUCKET_ID ?? '010a31ad4eac4363a9180716';

type B2AuthData = {
  apiUrl: string;
  authorizationToken: string;
  downloadUrl: string;
  expiresAt: number;
};

let cachedAuth: B2AuthData | null = null;

/** Type MIME audio déduit de l'extension du fichier stocké. */
const AUDIO_CONTENT_TYPES: Record<string, string> = {
  webm: 'audio/webm',
  m4a: 'audio/mp4',
  ogg: 'audio/ogg',
  opus: 'audio/ogg',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  aac: 'audio/aac'
};

function getAudioContentType(filePath: string): string | null {
  const extension = filePath.split('?', 1)[0].split('.').pop()?.toLowerCase();

  return extension ? AUDIO_CONTENT_TYPES[extension] ?? null : null;
}

async function getB2Auth(): Promise<B2AuthData> {
  const now = Date.now();
  if (cachedAuth && cachedAuth.expiresAt > now + 60000) {
    return cachedAuth;
  }

  const basicAuth = Buffer.from(
    `${B2_ACCOUNT_ID}:${B2_APPLICATION_KEY}`
  ).toString('base64');

  const res = await fetch(
    'https://api.backblazeb2.com/b2api/v2/b2_authorize_account',
    {
      headers: {
        Authorization: `Basic ${basicAuth}`
      }
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`B2 authorize failed (${res.status}): ${errorText}`);
  }

  const data = (await res.json()) as {
    apiUrl: string;
    authorizationToken: string;
    downloadUrl: string;
  };

  cachedAuth = {
    apiUrl: data.apiUrl,
    authorizationToken: data.authorizationToken,
    downloadUrl: data.downloadUrl,
    expiresAt: now + 23 * 3600 * 1000
  };

  return cachedAuth;
}

export default async function imageProxy(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { path } = req.query;

  if (!path || (Array.isArray(path) && path.length === 0)) {
    res.status(400).json({ error: 'Missing path' });
    return;
  }

  const imagePath = Array.isArray(path) ? path.join('/') : path;
  const range = req.headers.range;

  try {
    const auth = await getB2Auth();
    const imageUrl = `${auth.downloadUrl}/file/${B2_BUCKET}/${imagePath}`;

    const response = await fetch(imageUrl, {
      headers: {
        Authorization: auth.authorizationToken,
        ...(range ? { Range: range } : {})
      }
    });

    if (!response.ok && response.status !== 206) {
      const errorText = await response.text();
      console.error('B2 fetch error:', response.status, errorText);
      res
        .status(response.status)
        .json({ error: 'Image not found', details: errorText });
      return;
    }

    const imageBuffer = await response.arrayBuffer();
    /* Les messages vocaux sont stockés à côté des images : on force un type
       audio reconnu par les navigateurs (sinon un fichier audio servi en
       « image/jpeg » est refusé et la lecture échoue). */
    const contentType =
      getAudioContentType(imagePath) ??
      response.headers.get('content-type') ??
      'image/jpeg';
    const contentLength = response.headers.get('content-length');
    const contentRange = response.headers.get('content-range');

    res.setHeader('Content-Type', contentType);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    if (contentLength) res.setHeader('Content-Length', contentLength);
    if (contentRange) res.setHeader('Content-Range', contentRange);

    res.status(response.status === 206 ? 206 : 200);
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({
      error: 'Failed to fetch image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
