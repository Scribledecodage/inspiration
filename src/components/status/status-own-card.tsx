import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { useStatuses } from '@lib/hooks/useStatuses';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { StatusAvatarImage } from './status-avatar';
import { StatusViewer } from './status-viewer';
import { StatusPublishButton } from './status-publish-button';

/**
 * Carte « Mon statut » : l'avatar (forme réelle, sans cercle), combien de
 * statuts sont en ligne, un bouton pour les revoir, et le bouton pour en
 * publier un.
 */
export function StatusOwnCard(): JSX.Element {
  const { user } = useAuth();
  const { groups } = useStatuses();
  const [viewerOpen, setViewerOpen] = useState(false);

  const ownGroup = groups.find(({ isOwn }) => isOwn);
  const count = ownGroup?.statuses.length ?? 0;

  if (!user) return <></>;

  return (
    <div className='flex flex-col gap-3 rounded-xl border border-light-border p-3 dark:border-dark-border'>
      <div className='flex items-center gap-3'>
        <StatusAvatarImage
          src={user.photoURL}
          size={48}
          gender={user.gender}
          shape={user.avatarShape}
          frame={user.avatarFrame}
        />

        <div className='min-w-0 flex-1'>
          <p className='truncate text-[15px] font-bold text-light-primary dark:text-dark-primary'>
            Mon statut
          </p>
          <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
            {count > 0
              ? `${count} statut${count > 1 ? 's' : ''} en ligne`
              : 'Aucun statut en ligne'}
          </p>
        </div>
      </div>

      {/* Les boutons sont centrés et gardent leur taille : quand aucun statut
          n'est encore en ligne, le bouton de publication n'occupe pas toute
          la largeur de la carte. */}
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {count > 0 && (
          <Button
            className='accent-tab flex shrink-0 items-center gap-2 rounded-full border border-light-line-reply px-4 py-2
                       text-sm font-bold text-light-primary transition hover:bg-light-primary/10
                       dark:border-dark-line-reply dark:text-dark-primary dark:hover:bg-dark-primary/10'
            type='button'
            onClick={(): void => setViewerOpen(true)}
          >
            <MaterialIcon className='h-5 w-5' iconName='play_arrow' />
            Voir mon statut
          </Button>
        )}

        <StatusPublishButton className='accent-tab active:scale-98 flex shrink-0 items-center justify-center gap-2 rounded-full bg-main-accent px-4 py-2 text-sm font-bold text-white transition hover:bg-main-accent/90' />
      </div>

      {viewerOpen && ownGroup && (
        <StatusViewer
          groups={groups}
          initialGroup={groups.indexOf(ownGroup)}
          onClose={(): void => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
