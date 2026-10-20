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
  const [loadingMore, setLoadingMore] = useState(false);

  /* La limite courante est lue via une ref afin que la détection de fin de
     liste ne se relance pas quand la limite augmente (ce qui provoquerait un
     faux positif : l'ancien tableau reste affiché le temps du rechargement). */
  const limitRef = useRef(tweetsLimit);

  const { data, loading, fromCache } = useCollection(
    query(collection, ...[...(queryConstraints ?? []), limit(tweetsLimit)]),
    fetchOptions
  );

  useEffect(() => {
    limitRef.current = tweetsLimit;
  }, [tweetsLimit]);

  const dataCount = data?.length ?? 0;

  /* Détection de la fin de la liste SANS requête d'agrégation.
     On considère qu'il n'y a plus rien à charger quand la page reçue contient
     moins d'éléments que la limite demandée. L'ancien code utilisait
     `getCountFromServer` (runAggregationQuery) à chaque changement de la
     liste, ce qui recomptait toute la collection en boucle et épuisait le
     quota Firestore (erreur 429 « Quota exceeded »).

     On ne se fie QU'AUX instantanés venus du serveur : un instantané du
     cache local ne contient que les documents déjà connus, il est donc
     plus court que la limite demandée alors que la liste n'est pas
     terminée. L'utiliser faisait clignoter l'indicateur de chargement à
     chaque défilement (apparition/disparition d'un bloc de ~80 px), et
     relançait une requête supplémentaire par page chargée. */
  useEffect(() => {
    if (loading || fromCache) return;

    if (!data) {
      setReachedLimit(true);
      setLoadingMore(false);
      return;
    }

    const hasMore = dataCount >= limitRef.current;

    setReachedLimit(!hasMore);

    if (!hasMore) setLoadingMore(false);
  }, [dataCount, data, loading, fromCache]);

  /* Chargement de la page suivante.
     Deux garde-fous :
     - `dataCount < limitRef.current` : la page demandée n'est pas encore
       arrivée. Sans ce test, chaque réponse déclenchait une nouvelle
       requête, en boucle, et le fil se rechargeait tout seul.
     - `loadingMore` : on ne lance pas deux requêtes pour la même page. */
  useEffect(() => {
    if (reachedLimit) return;
    if (!loadMoreInView) return;
    if (loadingMore) return;
    if (dataCount === 0) return;
    if (dataCount < limitRef.current) return;

    setLoadingMore(true);
    setTweetsLimit((currentLimit) => currentLimit + (stepSize ?? 20));
  }, [loadMoreInView, reachedLimit, loadingMore, dataCount]);

  /* Quand la page arrive, on réarme le chargement si le témoin est encore
     à l'écran (le bas du fil n'est pas loin). */
  useEffect(() => {
    if (!loadingMore) return;
    if (dataCount >= limitRef.current) setLoadingMore(false);
  }, [dataCount, loadingMore]);

  const makeItInView = (): void => setLoadMoreInView(true);
  const makeItNotInView = (): void => setLoadMoreInView(false);

  /* Le témoin reste en place en permanence : il n'est JAMAIS retiré du
     flux (pas de `display: none`), sinon le contenu en dessous se décalait
     d'un coup à chaque page chargée. Quand la liste est complète, il
     s'efface simplement. */
  const LoadMore = useCallback(
    (): JSX.Element => (
      <motion.div
        className='h-20'
        initial={false}
        animate={{ opacity: reachedLimit ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        viewport={{ margin: `0px 0px ${marginBottom ?? 1000}px` }}
        onViewportEnter={makeItInView}
        onViewportLeave={makeItNotInView}
        aria-hidden='true'
      >
        <div
          className={
            loadingMore
              ? 'opacity-100 transition-opacity duration-200'
              : 'opacity-0 transition-opacity duration-200'
          }
        >
          <Loading className='mt-5' />
        </div>
      </motion.div>
    ),
    [reachedLimit, loadingMore]
  );

  return { data, loading, LoadMore };
}
