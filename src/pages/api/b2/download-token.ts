import type { NextApiRequest, NextApiResponse } from 'next';
import { getB2DownloadInfo } from '@lib/storage/b2';

type ResponseBody = {
  token?: string;
  baseUrl?: string;
  error?: string;
};

/** Renvoie une autorisation de lecture directe depuis Backblaze, mise en
 *  cache côté serveur : les vidéos se lisent ainsi sans le proxy. */
export default async function downloadTokenEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { token, baseUrl } = await getB2DownloadInfo();

    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.status(200).json({ token, baseUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Download token failed';
    res.status(500).json({ error: message });
  }
}
