/**
 * Les mentions.
 *
 * On peut mentionner une personne avec son nom d'utilisateur : `@matteo`.
 * L'assistant d'intelligence artificielle se mentionne comme les autres,
 * avec `@ia` : la publication lui est alors répondue.
 */

/** Nom d'utilisateur de l'assistant. */
export const AI_USERNAME = 'ia';

/** Nom affiché de l'assistant. */
export const AI_NAME = 'Assistant IA';

/** Identifiant du compte de l'assistant. */
export const AI_USER_ID = 'inspiration-ai';

/** Longueur maximale d'une mention (au-delà, ce n'est plus une mention). */
const MAX_MENTION_LENGTH = 30;

/**
 * Repère la mention en cours de saisie.
 *
 * Elle n'est retenue que si le « @ » est au début du texte ou précédé d'une
 * espace : l'adresse d'un courriel (`contact@site.fr`) n'est donc pas prise
 * pour une mention.
 */
export function findMention(
  text: string,
  caret: number
): { start: number; query: string } | null {
  const upToCaret = text.slice(0, caret);
  const match = upToCaret.match(/(^|[\s(])@([\p{L}\p{N}_.-]*)$/u);

  if (!match) return null;

  const query = match[2] ?? '';

  if (query.length > MAX_MENTION_LENGTH) return null;

  /* La position du « @ » dans le texte complet. */
  const start = upToCaret.length - query.length - 1;

  return { start, query };
}

/** Le texte après la mention en cours (pour savoir ce qui suit le curseur). */
export function mentionEnd(text: string, start: number): number {
  const rest = text.slice(start);

  const match = rest.match(/^@[\p{L}\p{N}_.-]*/u);

  return start + (match ? match[0].length : 0);
}

/**
 * Remplace la mention en cours par celle choisie.
 *
 * Renvoie le nouveau texte et la position du curseur : il doit se retrouver
 * juste après la mention, pour continuer à écrire.
 */
export function applyMention(
  text: string,
  start: number,
  end: number,
  username: string
): { text: string; caret: number } {
  const mention = `@${username} `;
  const next = text.slice(0, start) + mention + text.slice(end);

  return { text: next, caret: start + mention.length };
}

export type MentionPart =
  | { type: 'text'; value: string }
  | { type: 'mention'; value: string; username: string };

/**
 * Découpe un texte : les mentions sont séparées du reste.
 *
 * Un nom d'utilisateur ne peut pas contenir de « @ » : la recherche s'arrête
 * donc au premier caractère qui n'en fait pas partie.
 */
export function splitMentions(text: string): MentionPart[] {
  const parts: MentionPart[] = [];
  const pattern = /(^|[\s(])@([\p{L}\p{N}_.-]+)/gu;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const username = match[2];
    const start = match.index + match[1].length;

    if (start > lastIndex)
      parts.push({ type: 'text', value: text.slice(lastIndex, start) });

    parts.push({ type: 'mention', value: `@${username}`, username });

    lastIndex = start + username.length + 1;
  }

  if (lastIndex < text.length)
    parts.push({ type: 'text', value: text.slice(lastIndex) });

  return parts.length ? parts : [{ type: 'text', value: text }];
}

/** Le texte mentionne-t-il l'assistant ? */
export function mentionsAi(text: string | null | undefined): boolean {
  if (!text) return false;

  return splitMentions(text).some(
    (part) =>
      part.type === 'mention' && part.username.toLowerCase() === AI_USERNAME
  );
}
