import { useState, useEffect, useRef } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { getCachedUser, loadUsers } from '@lib/firebase/users';
import { useCacheQuery } from './useCacheQuery';
import type { Query } from 'firebase/firestore';
import type { User } from '@lib/types/user';

type UseCollection<T> = {
  data: T[] | null;
  loading: boolean;
  /* true quand le dernier instantané vient du cache local de Firestore
     (donc pas encore de la réponse du serveur). Un instantané du cache est
     souvent incomplet : il ne contient que les documents déjà connus. On ne
     peut donc pas s'en servir pour décider que la liste est terminée. */
  fromCache: boolean;
};

type DataWithRef<T> = (T & { createdBy: string })[];
type DataWithUser<T> = UseCollection<T & { user: User }>;

export type UseCollectionOptions = {
  includeUser?: boolean;
  allowNull?: boolean;
  disabled?: boolean;
  /* La liste n'est plus vidée pendant un rafraîchissement : l'option est
     gardée pour la compatibilité, mais elle n'a plus d'effet. */
  preserve?: boolean;
};

export function useCollection<T>(
  query: Query<T>,
  options: {
    includeUser: true;
    allowNull?: boolean;
    disabled?: boolean;
    preserve?: boolean;
  }
): DataWithUser<T>;

export function useCollection<T>(
  query: Query<T>,
  options?: UseCollectionOptions
): UseCollection<T>;

export function useCollection<T>(
  query: Query<T>,
  options?: UseCollectionOptions
): UseCollection<T> | DataWithUser<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(true);

  /* La liste a-t-elle déjà été remplie ? Un instantané vide ne vide alors
     plus la liste : c'est ce qui se passe quand la requête change (la
     liste s'agrandit au défilement) et que le cache local n'a pas encore
     la réponse. Vider la liste à cet instant fait-collapse la page : le
     contenu se réduit, le navigateur revient en haut, et la liste revient
     en fondu — un écran blanc à chaque défilement. */
  const filled = useRef(false);

  /* Numéro du dernier instantané reçu : sert à ne publier que le plus
     récent (les profils étant chargés de façon asynchrone). */
  const latestSnapshot = useRef(0);

  const cachedQuery = useCacheQuery(query);

  const { includeUser, allowNull, disabled } = options ?? {};

  useEffect(() => {
    if (disabled) {
      setLoading(false);
      return;
    }

    /* La liste n'est jamais vidée pendant un rafraîchissement : la retirer de
       l'écran fait sauter la page (le contenu se réduit, le navigateur
       revient en haut) et les publications réapparaissent en fondu — un
       écran blanc à chaque changement. */

    const publish = (
      currentData: DataWithRef<T>,
      isFromCache: boolean
    ): void => {
      filled.current = true;

      setData(
        currentData.map((item) => ({
          ...item,
          user: getCachedUser(item.createdBy) as User
        }))
      );
      setFromCache(isFromCache);
      setLoading(false);
    };

    /* La lecture des profils est asynchrone : deux instantanés peuvent donc
       être publiés dans le désordre (le plus court, celui du cache local,
       après le plus long, celui du serveur). La liste rétrécissait alors
       d'un coup, et le fil sautait sous les yeux du lecteur. On n'ignore
       donc qu'un instantané plus ancien que le dernier reçu. */
    const populateUser = async (
      currentData: DataWithRef<T>,
      isFromCache: boolean,
      snapshotId: number
    ): Promise<void> => {
      await loadUsers(currentData.map((item) => item.createdBy));

      if (snapshotId !== latestSnapshot.current) return;

      publish(currentData, isFromCache);
    };

    const unsubscribe = onSnapshot(
      cachedQuery,
      (snapshot) => {
        const data = snapshot.docs.map((doc) =>
          doc.data({ serverTimestamps: 'estimate' })
        );

        const isFromCache = snapshot.metadata.fromCache;

        const snapshotId = ++latestSnapshot.current;

        if (allowNull && !data.length) {
          /* Instantané vide : on ne vide la liste que si elle ne l'a jamais
             été. Sinon, on attend l'instantané suivant (le cache local n'a
             pas encore répondu). */
          if (!filled.current) {
            setData(null);
            setFromCache(isFromCache);
            setLoading(false);
          }

          return;
        }

        if (includeUser)
          void populateUser(data as DataWithRef<T>, isFromCache, snapshotId);
        else {
          filled.current = true;
          setData(data);
          setFromCache(isFromCache);
          setLoading(false);
        }
      },
      (err) => {
        // La liste n'est jamais vidée : la retirer ferait sauter la page (le
        // navigateur reviendrait en haut) et les publications réapparaîtraient
        // en fondu — un écran blanc. L'erreur est journalisée, et la liste
        // déjà affichée reste en place.
        console.error('useCollection error:', err);
        setLoading(false);
      }
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedQuery, disabled]);

  return { data, loading, fromCache };
}
