import { ChannelAvatar } from '@components/channel/channel-avatar';
import { MaterialIcon } from '@components/ui/material-icon';
import type { AvatarShape } from '@lib/types/theme';

type ChannelHeaderProps = {
  name: string;
  description?: string | null;
  photoURL?: string | null;
  /** Forme choisie pour la chaîne (rond par défaut). */
  shape?: AvatarShape;
  onBack: () => void;
};

/**
 * Barre du haut de la page d'une chaîne : flèche de retour, image de la
 * chaîne dans la forme choisie, nom et description.
 *
 * Elle est indispensable sur téléphone : sans elle, on ne sait plus dans
 * quelle chaîne on se trouve ni comment revenir en arrière.
 */
export function ChannelHeader({
  name,
  description,
  photoURL,
  shape,
  onBack
}: ChannelHeaderProps): JSX.Element {
  return (
    <header className='glass-header sticky top-0 z-20 flex items-center gap-3 border-b border-light-border/60 px-3 pb-3 pt-[max(0.625rem,env(safe-area-inset-top))] dark:border-dark-border/60 md:px-4 md:pt-2.5'>
      <button
        aria-label='Retour à Découvrir'
        className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light-primary transition hover:bg-light-primary/10 active:bg-light-primary/20 dark:text-dark-primary dark:hover:bg-dark-primary/10'
        onClick={onBack}
        type='button'
      >
        <MaterialIcon className='h-5 w-5' iconName='arrow_back' />
      </button>
      <ChannelAvatar name={name} photoURL={photoURL} shape={shape} size={40} />
      <div className='min-w-0'>
        <p className='truncate text-lg text-light-primary dark:text-dark-primary'>
          {name}
        </p>
        {description && (
          <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
