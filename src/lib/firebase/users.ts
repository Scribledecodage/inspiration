import { doc, getDoc } from 'firebase/firestore';
import { usersCollection } from './collections';
import type { User } from '@lib/types/user';

/* Durée de validité d'un profil en cache (en ms). */
const USER_CACHE_TTL = 60_000;

type CachedUser = {
  user: User;
  at: number;
};

/**
 * Cache des profils.
 *
 * Les profils étaient relus à chaque instantané de la collection (une
 * lecture par publication), puis toute la liste était reconstruite : la page
 * scrollait, la liste clignotait, et le quota Firestore partait très vite.
 * Le cache évite les lectures inutiles et garde les objets stables.
 */
const usersCache = new Map<string, CachedUser>();

/** Charge les profils manquants (ou périmés). */
export async function loadUsers(ids: string[]): Promise<void> {
  const now = Date.now();

  const missing = ids.filter((id) => {
    if (!id) return false;

    const cached = usersCache.get(id);
    return !cached || now - cached.at > USER_CACHE_TTL;
  });

  if (!missing.length) return;

  await Promise.all(
    missing.map(async (id) => {
      try {
        const user = (await getDoc(doc(usersCollection, id))).data();

        if (user) usersCache.set(id, { user, at: Date.now() });
      } catch {
        /* Profil introuvable ou lecture impossible : la publication est
           affichée sans les informations de son auteur. */
      }
    })
  );
}

/** Profil en cache (sans le recharger). */
export function getCachedUser(id: string): User | undefined {
  return usersCache.get(id)?.user;
}

/** Vide le cache (déconnexion, changement de compte). */
export function clearUsersCache(): void {
  usersCache.clear();
}
