import { useMemo } from 'react';
import { limit, orderBy, query } from 'firebase/firestore';
import { statusesCollection, usersCollection } from '@lib/firebase/collections';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from './useCollection';
import { useArrayDocument } from './useArrayDocument';
import type { Timestamp } from 'firebase/firestore';
import type { Status } from '@lib/types/status';
import type { User } from '@lib/types/user';

/** Une diapositive affichée dans la visionneuse. */
export type StatusSlide = {
  status: Status;
  /** Index du média dans le statut, `null` pour un statut texte. */
  mediaIndex: number | null;
};

/** Tous les statuts d'un même utilisateur. */
export type StatusGroup = {
  user: User;
  statuses: Status[];
  slides: StatusSlide[];
  latestAt: number;
  hasUnseen: boolean;
  isOwn: boolean;
};

export function buildStatusSlides(statuses: Status[]): StatusSlide[] {
  return statuses.flatMap((status): StatusSlide[] =>
    status.kind === 'media' && status.media?.length
      ? status.media.map(
          (_, mediaIndex): StatusSlide => ({ status, mediaIndex })
        )
      : [{ status, mediaIndex: null }]
  );
}

const toMillis = (timestamp?: Timestamp | null): number =>
  timestamp && typeof timestamp.toMillis === 'function'
    ? timestamp.toMillis()
    : 0;

/**
 * Récupère les statuts non expirés de l'utilisateur et de ses abonnements,
 * regroupés par auteur. Les documents sont lus via un seul abonnement
 * Firestore, puis complétés par les profils des auteurs (une seule lecture
 * par auteur distinct).
 */
export function useStatuses(): { groups: StatusGroup[]; loading: boolean } {
  const { user } = useAuth();

  const { data, loading } = useCollection(
    query(statusesCollection, orderBy('createdAt', 'desc'), limit(60)),
    { preserve: true }
  );

  const authorIds = useMemo(() => {
    if (!data?.length) return [];

    return Array.from(new Set(data.map(({ createdBy }) => createdBy)));
  }, [data]);

  const { data: authors } = useArrayDocument(authorIds, usersCollection);

  const groups = useMemo<StatusGroup[]>(() => {
    if (!user || !data?.length) return [];

    const now = Date.now();
    const allowed = new Set([user.id, ...(user.following ?? [])]);
    const authorsById = new Map((authors ?? []).map((a) => [a.id, a]));
    const byAuthor = new Map<string, Status[]>();

    for (const status of data) {
      if (!status.media) continue;
      if (!allowed.has(status.createdBy)) continue;
      if (toMillis(status.expiresAt) <= now) continue;
      // Un statut programmé reste invisible jusqu'à l'heure choisie.
      if (toMillis(status.scheduledFor) > now) continue;

      const list = byAuthor.get(status.createdBy);
      if (list) list.push(status);
      else byAuthor.set(status.createdBy, [status]);
    }

    const result: StatusGroup[] = [];

    byAuthor.forEach((statuses, authorId) => {
      const author = authorsById.get(authorId);
      if (!author) return;

      // Lecture du plus ancien au plus récent.
      statuses.sort((a, b) => toMillis(a.createdAt) - toMillis(b.createdAt));

      result.push({
        user: author,
        statuses,
        slides: buildStatusSlides(statuses),
        latestAt: statuses.reduce(
          (acc, s) => Math.max(acc, toMillis(s.createdAt)),
          0
        ),
        hasUnseen: statuses.some((s) => !s.viewedBy?.includes(user.id)),
        isOwn: authorId === user.id
      });
    });

    /* Ordre stable : notre statut d'abord, puis les non vus, puis les plus
       récents. L'ordre ne dépend pas de `viewedBy`, ce qui évite que la
       visionneuse se réorganise pendant la lecture. */
    return result.sort((a, b) => {
      if (a.isOwn !== b.isOwn) return a.isOwn ? -1 : 1;
      if (a.hasUnseen !== b.hasUnseen) return a.hasUnseen ? -1 : 1;
      return b.latestAt - a.latestAt;
    });
  }, [data, authors, user]);

  return { groups, loading };
}
