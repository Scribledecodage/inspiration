import { useMemo } from 'react';
import { query, where } from 'firebase/firestore';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { AI_NAME, AI_USERNAME } from '@lib/mentions';
import type { User } from '@lib/types/user';

export type MentionSuggestion = {
  /** Ce qui est inséré dans le texte. */
  username: string;
  /** Nom affiché. */
  name: string;
  photoURL?: string | null;
  /** L'assistant a un style particulier. */
  ai?: boolean;
  verified?: boolean;
};

/** Nombre de personnes proposées. */
const LIMIT = 6;

/**
 * Les suggestions de mention.
 *
 * L'assistant vient en premier : il se mentionne comme une personne, et c'est
 * souvent ce qu'on cherche.
 */
export function useMentionSuggestions(search: string): MentionSuggestion[] {
  const needle = search.trim().toLowerCase();

  /* Une recherche vide ne coûte aucune lecture : on ne propose rien tant
     qu'aucun caractère n'est tapé. */
  const { data: users, loading } = useCollection<User>(
    query(
      usersCollection,
      where('username', '>=', needle),
      where('username', '<=', `${needle}\uf8ff`)
    ),
    { allowNull: true, disabled: needle.length === 0 }
  );

  return useMemo(() => {
    const suggestions: MentionSuggestion[] = [];

    const aiMatches =
      needle.length === 0 ||
      AI_USERNAME.startsWith(needle) ||
      'ai'.startsWith(needle) ||
      'assistant'.startsWith(needle);

    if (aiMatches)
      suggestions.push({
        ai: true,
        name: AI_NAME,
        username: AI_USERNAME
      });

    if (loading) return suggestions;

    (users ?? []).slice(0, LIMIT).forEach((user) => {
      /* L'assistant est déjà proposé : on ne le montre pas deux fois. */
      if (user.username?.toLowerCase() === AI_USERNAME) return;

      suggestions.push({
        name: user.name,
        photoURL: user.photoURL,
        username: user.username,
        verified: user.verified
      });
    });

    return suggestions;
  }, [users, loading, needle]);
}
