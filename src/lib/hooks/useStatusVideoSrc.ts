import { useEffect, useState } from 'react';

type DownloadInfo = { token: string; baseUrl: string };

/* Une seule requête par session : le serveur met l'autorisation en cache. */
let downloadInfoPromise: Promise<DownloadInfo> | null = null;

function getDownloadInfo(): Promise<DownloadInfo> {
  if (!downloadInfoPromise)
    downloadInfoPromise = fetch('/api/b2/download-token')
      .then((res) => {
        if (!res.ok) throw new Error('token unavailable');
        return res.json() as Promise<DownloadInfo>;
      })
      .catch((error) => {
        downloadInfoPromise = null;
        throw error;
      });

  return downloadInfoPromise;
}

/** Remplace l'URL passé par le proxy (/api/image/...) par une lecture directe
 *  depuis Backblaze : le proxy serverless est limité en taille (~4,5 Mo) et
 *  tronque les vidéos. En cas d'échec, l'URL d'origine est utilisée. */
export function useStatusVideoSrc(src: string | null): string | null {
  const [directSrc, setDirectSrc] = useState<string | null>(null);

  useEffect(() => {
    setDirectSrc(null);

    if (!src || !src.startsWith('/api/image/')) return;

    let active = true;

    void getDownloadInfo()
      .then(({ token, baseUrl }) => {
        if (!active) return;

        const key = src.replace(/^\/api\/image\//, '');
        setDirectSrc(
          `${baseUrl}/${key}?Authorization=${encodeURIComponent(token)}`
        );
      })
      .catch(() => undefined);

    return (): void => {
      active = false;
    };
  }, [src]);

  return directSrc ?? src;
}
