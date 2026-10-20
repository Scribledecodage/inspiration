/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { query, limit } from 'firebase/firestore';
import { Loading } from '@components/ui/loading';
import { useCollection } from './useCollection';
import type { UseCollectionOptions } from './useCollection';
import type { Query, QueryConstraint } from 'firebase/firestore';
import type { User } from '@lib/types/user';

type InfiniteScroll<T> = {
  data: T[] | null;
  loading: boolean;
  LoadMore: () => JSX.Element;
};

type InfiniteScrollWithUser<T> = {
  data: (T & { user: User })[] | null;
  loading: boolean;
  LoadMore: () => JSX.Element;
};

export function useInfiniteScroll<T>(
  collection: Query<T>,
  constraints: QueryConstraint[],
  fetchOptions: UseCollectionOptions & { includeUser: true },
  options?: { initialSize?: number; stepSize?: number; marginBottom?: number }
): InfiniteScrollWithUser<T>;

export function useInfiniteScroll<T>(
  collection: Query<T>,
  constraints: QueryConstraint[],
  fetchOptions?: UseCollectionOptions,
  options?: { initialSize?: number; stepSize?: number; marginBottom?: number }
): InfiniteScroll<T>;

export function useInfiniteScroll<T>(
  collection: Query<T>,
  queryConstraints?: QueryConstraint[],
  fetchOptions?: UseCollectionOptions,
  options?: { initialSize?: number; stepSize?: number; marginBottom?: number }
): InfiniteScroll<T> | InfiniteScrollWithUser<T> {
  const { initialSize, stepSize, marginBottom } = options ?? {};

  const [tweetsLimit, setTweetsLimit] = useState(initialSize ?? 20);
  const [reachedLimit, setReachedLimit] = useState(false);
  const [loadMoreInView, setLoadMoreInView] = useState(false);

  /* La limite courante est lue via une ref afin que la détection de fin de
     liste ne se relance pas quand la limite augmente (ce qui provoquerait un
     faux positif : l'ancien tableau reste affiché le temps du rechargement). */
  const limitRef = useRef(tweetsLimit);

  const { data, loading } = useCollection(
    query(collection, ...[...(queryConstraints ?? []), limit(tweetsLimit)]),
    fetchOptions
  );

  useEffect(() => {
    limitRef.current = tweetsLimit;
  }, [tweetsLimit]);

  /* Détection de la fin de la liste SANS requête d'agrégation.
     On considère qu'il n'y a plus rien à charger quand la page reçue contient
     moins d'éléments que la limite demandée. L'ancien code utilisait
     `getCountFromServer` (runAggregationQuery) à chaque changement de la
     liste, ce qui recomptait toute la collection en boucle et épuisait le
     quota Firestore (erreur 429 « Quota exceeded »). */
  useEffect(() => {
    if (loading) return;

    // On considère qu'on a atteint la fin seulement si on a vraiment moins de résultats
    // que demandé ET qu'on a déjà essayé de charger au moins une fois
    if (!data || (data.length < limitRef.current && data.length > 0)) {
      setReachedLimit(true);
    } else if (data && data.length === limitRef.current) {
      // Si on a exactement le nombre demandé, on continue à charger
      setReachedLimit(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (reachedLimit) return;
    if (loadMoreInView)
      setTweetsLimit((currentLimit) => currentLimit + (stepSize ?? 20));
  }, [loadMoreInView, reachedLimit]);

  const makeItInView = (): void => setLoadMoreInView(true);
  const makeItNotInView = (): void => setLoadMoreInView(false);

  const LoadMore = useCallback(
    (): JSX.Element => (
      <motion.div
        className={reachedLimit ? 'hidden' : 'block'}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
        viewport={{ margin: `0px 0px ${marginBottom ?? 1000}px` }}
        onViewportEnter={makeItInView}
        onViewportLeave={makeItNotInView}
      >
        <Loading className='mt-5' />
      </motion.div>
    ),
    [reachedLimit]
  );

  return { data, loading, LoadMore };
}
