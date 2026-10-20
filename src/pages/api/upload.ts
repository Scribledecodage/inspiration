import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadToB2 } from '@lib/storage/b2';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

type UploadRequestBody = {
  fileName?: string;
  contentType?: string;
  base64Data?: string;
  userId?: string;
};

type UploadResponseBody = {
  url?: string;
  error?: string;
};

export default async function uploadEndpoint(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponseBody>
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { fileName, contentType, base64Data, userId } =
      req.body as UploadRequestBody;

    if (!fileName || !base64Data) {
      res.status(400).json({ error: 'Missing fileName or base64Data' });
      return;
    }

    // Strip data URL prefix if present
    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    const cleanUser = userId
      ? userId.replace(/[^a-zA-Z0-9_-]/g, '')
      : 'uploads';
    const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '-');
    const storageKey = `${cleanUser}/${Date.now()}-${cleanName}`;

    const publicUrl = await uploadToB2(
      storageKey,
      buffer,
      contentType || 'image/jpeg'
    );

    res.status(200).json({ url: publicUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    res.status(500).json({ error: message });
  }
}
