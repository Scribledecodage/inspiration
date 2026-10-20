import type {
  FileWithId,
  FilesWithId,
  ImageData,
  ImagesPreview
} from '@lib/types/file';

export class StorageUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageUploadError';
  }
}

export function isStorageQuotaError(_error: unknown): boolean {
  return false;
}

export function getStorageErrorMessage(error: unknown): string {
  if (error instanceof StorageUploadError) return error.message;
  if (error instanceof Error) return error.message;
  return 'Échec du téléversement de l’image vers Backblaze B2.';
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/** Envoie une image via l'API interne (fichiers légers, base64). */
export async function uploadImageFile(
  userId: string,
  file: FileWithId
): Promise<ImageData & { id: string }> {
  const base64Data = await fileToBase64(file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      fileName: file.name,
      contentType: file.type || 'image/jpeg',
      base64Data
    })
  });

  if (!res.ok) {
    const errData = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new StorageUploadError(
      errData.error || `Erreur d’envoi (${res.status})`
    );
  }

  const data = (await res.json()) as { url: string };

  return { id: file.id, src: data.url, alt: file.name, type: file.type };
}

/**
 * Envoie une vidéo (mp4, mov…) directement à Backblaze B2 depuis le
 * navigateur : les fonctions serverless limitent la taille des requêtes
 * (4,5 Mo sur Vercel), ce qui bloquait les vidéos.
 */
export async function uploadVideoFile(
  userId: string,
  file: FileWithId
): Promise<ImageData & { id: string }> {
  try {
    const ticketRes = await fetch('/api/b2/upload-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, fileName: file.name })
    });

    if (!ticketRes.ok)
      throw new StorageUploadError(`Erreur d’envoi (${ticketRes.status})`);

    const { uploadUrl, authorizationToken, key, url } =
      (await ticketRes.json()) as {
        uploadUrl: string;
        authorizationToken: string;
        key: string;
        url: string;
      };

    const encodedKey = key
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');

    const uploadRes = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        Authorization: authorizationToken,
        'X-Bz-File-Name': encodedKey,
        'Content-Type': file.type || 'video/mp4',
        /* Backblaze peut vérifier lui-même le fichier reçu : inutile de
           hacher une grosse vidéo dans le navigateur. */
        'X-Bz-Content-Sha1': 'do_not_verify'
      },
      body: file
    });

    if (!uploadRes.ok)
      throw new StorageUploadError(`Erreur d’envoi (${uploadRes.status})`);

    return { id: file.id, src: url, alt: file.name, type: file.type };
  } catch (error) {
    throw new StorageUploadError(getStorageErrorMessage(error));
  }
}

/** Médias d'un statut : vidéos en direct vers B2, images via l'API interne. */
export async function uploadStatusFiles(
  userId: string,
  files: FilesWithId
): Promise<ImagesPreview> {
  return Promise.all(
    files.map((file) =>
      file.type.startsWith('video/')
        ? uploadVideoFile(userId, file)
        : uploadImageFile(userId, file)
    )
  );
}

export async function uploadImages(
  userId: string,
  files: FilesWithId,
  /* Conservé pour compatibilité avec les appels historiques : le bucket est
     choisi côté serveur. */
  _bucket = 'inspirationcool2'
): Promise<ImagesPreview | null> {
  if (!files.length) return null;

  try {
    return await Promise.all(
      files.map((file) => uploadImageFile(userId, file))
    );
  } catch (error) {
    throw new StorageUploadError(getStorageErrorMessage(error));
  }
}
