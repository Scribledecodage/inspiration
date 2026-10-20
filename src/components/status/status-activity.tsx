import { useEffect, useState } from 'react';
import { useStatuses } from '@lib/hooks/useStatuses';
import { StatusRing } from './status-avatar';
import { StatusViewer } from './status-viewer';

/**
 * Statuts des personnes que l'on suit, affichés dans
 * « Activité de vos abonnements ». Nos propres statuts n'y figurent jamais.
 * Les avatars sont volontairement simples (pas de barres / anneau) : la seule
 * action est le bouton « Voir le statut ».
 */
export function StatusActivity(): JSX.Element {
  const { groups } = useStatuses();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  /* Si le groupe ouvert disparaît (statut expiré, compte retiré), on ferme. */
  useEffect(() => {
    if (viewerIndex !== null && !groups[viewerIndex]) setViewerIndex(null);
  }, [groups, viewerIndex]);

  const others = groups.filter(({ isOwn }) => !isOwn);

  return (
    <div className='flex flex-col gap-3 text-left'>
      {others.length > 0 ? (
        <ul className='flex flex-col gap-3'>
          {others.map((group) => (
            <li className='flex items-center gap-3' key={group.user.id}>
              <StatusRing
                src={group.user.photoURL}
                alt={group.user.name}
                gender={group.user.gender}
                shape={group.user.avatarShape}
                frame={group.user.avatarFrame}
                ring={false}
                size={40}
              />
              <div className='min-w-0 flex-1 leading-tight'>
                <p className='truncate text-sm font-bold text-light-primary dark:text-dark-primary'>
                  {group.user.name}
                </p>
                <p className='truncate text-xs text-light-secondary dark:text-dark-secondary'>
                  @{group.user.username}
                </p>
              </div>
              <button
                className='accent-tab shrink-0 rounded-full bg-main-accent px-4 py-1.5 text-sm
                           font-bold text-white transition hover:brightness-90
                           active:brightness-75'
                type='button'
                onClick={(): void => setViewerIndex(groups.indexOf(group))}
              >
                Voir le statut
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex flex-col items-center gap-2 px-4 pb-1'>
          <p className='text-center text-sm text-light-secondary dark:text-dark-secondary'>
            Aucun statut à afficher pour le moment
          </p>
        </div>
      )}

      {viewerIndex !== null && groups[viewerIndex] && (
        <StatusViewer
          groups={groups}
          initialGroup={viewerIndex}
          onClose={(): void => setViewerIndex(null)}
        />
      )}
    </div>
  );
}
