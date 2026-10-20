import type { NextApiRequest, NextApiResponse } from 'next';
import { buildPublicUrl, getB2UploadTicket } from '@lib/storage/b2';

type ResponseBody = {
  uploadUrl?: string;
  authorizationToken?: string;
  key?: string;
  url?: string;
  error?: string;
};

/** Délivre un billet d'upload : le navigateur enverra ensuite la vidéo
 *  directement à Backblaze (sans limite de taille liée à Vercel). */
export default async function uploadTicketEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { fileName, userId } = req.body as {
      fileName?: string;
      userId?: string;
    };

    const cleanUser = userId
      ? userId.replace(/[^a-zA-Z0-9_-]/g, '')
      : 'uploads';
    const cleanName = (fileName || 'fichier').replace(/[^a-zA-Z0-9._-]/g, '-');
    const key = `${cleanUser}/${Date.now()}-${cleanName}`;

    const { uploadUrl, authorizationToken } = await getB2UploadTicket();

    res.status(200).json({
      uploadUrl,
      authorizationToken,
      key,
      url: buildPublicUrl(key)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    res.status(500).json({ error: message });
  }
}
