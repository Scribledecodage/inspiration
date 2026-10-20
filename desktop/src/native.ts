import { useEffect, useRef } from 'react';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import {
  isPermissionGranted,
  sendNotification
} from '@tauri-apps/plugin-notification';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { db } from '@lib/firebase/app';
import { startUpdateWatcher, checkForUpdates } from './updater';

/**
 * Le pont natif.
 *
 * L'interface est celle du site ; ce module ajoute ce que seul une
 * application de bureau peut faire :
 *
 *  - la vérification des mises à jour (au démarrage, puis toutes les six
 *    heures) ;
 *  - les notifications Windows lorsqu'une publication arrive et que la
 *    fenêtre est en arrière-plan.
 */
export function useNativeBridge(): void {
  const lastSeen = useRef<string | null>(null);

  /* Mises à jour automatiques. */
  useEffect(() => {
    const stop = startUpdateWatcher();

    void checkForUpdates();

    return stop;
  }, []);

  /* Notifications Windows pour les nouvelles publications. */
  useEffect(() => {
    const stop = onSnapshot(
      query(
        collection(db, 'tweets'),
        where('parent', '==', null),
        orderBy('createdAt', 'desc'),
        limit(1)
      ),
      (snapshot) => {
        const first = snapshot.docs[0];

        if (!first) return;

        const id = first.id;

        if (lastSeen.current && lastSeen.current !== id) {
          const data = first.data() as { text?: string | null };

          void (async () => {
            if (!(await isPermissionGranted())) return;

            /* Une notification n'a d'intérêt que si la fenêtre n'est pas
               déjà ouverte devant l'utilisateur. */
            const window = getCurrentWindow();
            const focused = await window.isFocused().catch(() => true);

            if (focused) return;

            sendNotification({
              title: 'Nouvelle publication',
              body: (data.text ?? 'Une publication vient d’être publiée.').slice(
                0,
                140
              )
            });
          })();
        }

        lastSeen.current = id;
      }
    );

    return stop;
  }, []);
}
