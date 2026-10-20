import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { publishDueScheduledTweets } from '@lib/firebase/utils';
import { publishDueScheduledStatuses } from '@lib/firebase/status';

/** Fréquence de vérification des publications programmées (30 s). */
const CHECK_INTERVAL = 30_000;

/* « Publieur » global : tant que l'application est ouverte, il vérifie
   régulièrement les publications programmées de l'utilisateur connecté et
   envoie celles dont l'échéance est passée. Il ne rend rien à l'écran. */
export function ScheduledPublisher(): null {
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    let running = false;

    const run = async (): Promise<void> => {
      if (cancelled || running) return;

      running = true;

      try {
        const published = await publishDueScheduledTweets(userId);
        const publishedStatuses = await publishDueScheduledStatuses(userId);

        if (publishedStatuses > 0 && !cancelled)
          toast.success(
            publishedStatuses > 1
              ? `${publishedStatuses} statuts programmés ont été publiés`
              : 'Votre statut programmé a été publié'
          );

        if (published > 0 && !cancelled)
          toast.success(
            published > 1
              ? `${published} publications programmées ont été envoyées`
              : 'Votre publication programmée a été envoyée'
          );
      } catch {
        // On réessaiera au prochain passage.
      } finally {
        running = false;
      }
    };

    void run();

    const interval = window.setInterval(() => void run(), CHECK_INTERVAL);

    const handleVisibility = (): void => {
      if (document.visibilityState === 'visible') void run();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [userId]);

  return null;
}
