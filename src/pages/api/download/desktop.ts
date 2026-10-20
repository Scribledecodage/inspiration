import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Téléchargement de l'application de bureau.
 *
 * Le fichier est hébergé sur GitHub (c'est là que l'application cherche
 * aussi ses mises à jour), mais il est servi par le site : la personne
 * clique sur le lien et le fichier arrive dans ses téléchargements, sans
 * qu'aucune page ne s'ouvre et sans quitter Inspiration.
 *
 * Deux modes :
 *   - `/api/download/desktop`          : le fichier lui-même ;
 *   - `/api/download/desktop?info=1`  : les informations sur la dernière
 *                                       version (numéro, taille, date).
 */

const REPO = 'Scribledecodage/inspiration';
const RELEASES_API = `https://api.github.com/repos/${REPO}/releases`;
const USER_AGENT = 'inspiration-download';

/* L'adresse du fichier est cherchée à chaque téléchargement, mais la
   résolution (dernière version, nom du fichier) est gardée une heure. */
const CACHE_TTL = 60 * 60 * 1000;

type GithubAsset = {
  name?: string;
  browser_download_url?: string;
  size?: number;
};

type GithubRelease = {
  tag_name?: string;
  name?: string;
  body?: string;
  published_at?: string;
  html_url?: string;
  assets?: GithubAsset[];
};

type Cached = {
  url: string;
  fileName: string;
  release: GithubRelease;
  at: number;
};

let cache: Cached | null = null;

/** L'installateur Windows : le premier `.exe` qui n'est pas une signature. */
function findInstaller(assets: GithubAsset[]): GithubAsset | null {
  const installers = assets.filter(
    (asset) =>
      typeof asset.name === 'string' &&
      asset.name.toLowerCase().endsWith('.exe') &&
      typeof asset.browser_download_url === 'string'
  );

  return installers[0] ?? null;
}

/** Cherche l'adresse du fichier à télécharger. */
async function resolveInstaller(version?: string): Promise<{
  url: string;
  fileName: string;
  release: GithubRelease;
} | null> {
  if (cache && Date.now() - cache.at < CACHE_TTL && !version)
    return {
      url: cache.url,
      fileName: cache.fileName,
      release: cache.release
    };

  const response = await fetch(
    version ? `${RELEASES_API}/tags/v${version}` : `${RELEASES_API}/latest`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': USER_AGENT
      }
    }
  );

  if (!response.ok) return null;

  const release = (await response.json()) as GithubRelease;
  const installer = findInstaller(release.assets ?? []);

  if (!installer?.browser_download_url || !installer.name) return null;

  if (!version) {
    cache = {
      url: installer.browser_download_url,
      fileName: installer.name,
      release,
      at: Date.now()
    };
  }

  return {
    url: installer.browser_download_url,
    fileName: installer.name,
    release
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }

  const version =
    typeof req.query.version === 'string' ? req.query.version : undefined;

  let installer: {
    url: string;
    fileName: string;
    release: GithubRelease;
  } | null = null;

  try {
    installer = await resolveInstaller(version);
  } catch {
    installer = null;
  }

  if (!installer) {
    res.status(404).json({
      error:
        'L’installateur est introuvable pour le moment. Réessayez dans un instant.'
    });
    return;
  }

  /* Mode « informations » : la page des réglages affiche la version, la
     taille et la date de la dernière version. */
  if (req.query.info === '1') {
    const asset = (installer.release.assets ?? []).find(
      (item) => item.name === installer?.fileName
    );

    res.setHeader('Cache-Control', 'public, max-age=600');
    res.status(200).json({
      version: installer.release.tag_name?.replace(/^v/, '') ?? '',
      fileName: installer.fileName,
      size: asset?.size ?? 0,
      publishedAt: installer.release.published_at ?? null,
      notes: installer.release.body ?? '',
      releasesUrl:
        installer.release.html_url ?? `https://github.com/${REPO}/releases`
    });
    return;
  }

  try {
    /* GitHub renvoie le fichier via une redirection vers son CDN : elle est
       suivie automatiquement, et le contenu est transmis tel quel. */
    const upstream = await fetch(installer.url, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow'
    });

    if (!upstream.ok || !upstream.body) {
      res.status(502).json({
        error: 'Le fichier n’a pas pu être récupéré.'
      });
      return;
    }

    res.setHeader(
      'Content-Type',
      'application/vnd.microsoft.portable-executable'
    );
    /* Le fichier est téléchargé : le navigateur ne quitte pas le site. */
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${installer.fileName}"`
    );

    const length = upstream.headers.get('content-length');

    if (length) res.setHeader('Content-Length', length);

    res.setHeader('Cache-Control', 'public, max-age=600');

    if (req.method === 'HEAD') {
      res.status(200).end();
      return;
    }

    const reader = upstream.body.getReader();

    for (;;) {
      const { done, value } = await reader.read();

      if (done) break;

      /* Le fichier est transmis morceau par morceau : la mémoire du serveur
         n'explose pas, et le téléchargement commence tout de suite. */
      res.write(Buffer.from(value));
    }

    res.end();
  } catch {
    if (!res.headersSent)
      res.status(502).json({ error: 'Le téléchargement a échoué.' });
    else res.end();
  }
}
