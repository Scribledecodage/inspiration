/** Détection et récupération des aperçus de liens côté client. */

export type LinkPreviewData = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  siteName?: string;
};

/* Repère un lien dans un texte : http(s)://… ou www.… jusqu'au premier espace.
   On exclut les points de fin qui feraient partie de la phrase. */
const URL_PATTERN =
  /\b(?:https?:\/\/|www\.)[^\s<>"']+/gi;

/** Retire la ponctuation collée en fin de lien (« https://x.fr. »). */
function cleanUrl(value: string): string {
  return value.replace(/[.,;:!?)\]}'"]+$/, '');
}

/** Renvoie le premier lien d'un texte, ou `null`. */
export function findLink(text: string): string | null {
  const match = text.match(URL_PATTERN);

  if (!match) return null;

  const cleaned = cleanUrl(match[0]);

  if (!cleaned) return null;

  /* On complète « www. » pour l'appel réseau. */
  return cleaned.startsWith('www.')
    ? `https://${cleaned}`
    : cleaned;
}

/** Découpe un texte en morceaux : soit du texte, soit un lien cliquable. */
export type TextPart = { type: 'text'; value: string } | { type: 'link'; value: string };

export function splitLinks(text: string): TextPart[] {
  const parts: TextPart[] = [];
  let lastIndex = 0;

  URL_PATTERN.lastIndex = 0;

  let match: RegExpExecArray | null;

  while ((match = URL_PATTERN.exec(text)) !== null) {
    const raw = match[0];
    const cleaned = cleanUrl(raw);

    if (!cleaned) continue;

    /* Le lien peut se terminer par une ponctuation qu'on exclut : on ne la
       mange pas dans le texte qui suit. */
    const trailing = raw.slice(cleaned.length);

    if (match.index > lastIndex)
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });

    parts.push({ type: 'link', value: cleaned });

    lastIndex = match.index + raw.length;

    /* On repart après la ponctuation, mais on la rend au texte suivant. */
    if (trailing) {
      parts.push({ type: 'text', value: trailing });
      lastIndex = match.index + raw.length;
    }
  }

  if (lastIndex < text.length)
    parts.push({ type: 'text', value: text.slice(lastIndex) });

  return parts;
}

/** Demande l'aperçu d'un lien à notre route serveur. */
export async function fetchLinkPreview(url: string): Promise<LinkPreviewData | null> {
  try {
    const response = await fetch(
      `/api/link-preview?url=${encodeURIComponent(url)}`
    );

    if (!response.ok) return null;

    const data = (await response.json()) as LinkPreviewData;

    /* Sans titre ni image, il n'y a rien à afficher. */
    if (!data.title && !data.image && !data.description) return null;

    return data;
  } catch {
    return null;
  }
}