import { motion } from 'framer-motion';
import cn from 'clsx';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { ToolTip } from '@components/ui/tooltip';
import { variants } from './input';
import { ProgressBar } from './progress-bar';
import type { IconName } from '@components/ui/material-icon';

type Options = {
  name: string;
  iconName: IconName;
  disabled: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}[];

const buildOptions = (
  onClick: () => void,
  onGifClick: () => void,
  onPollClick: () => void,
  onEmojiClick: () => void,
  onScheduleClick: () => void,
  onLocationClick: () => void
): Readonly<Options> => [
  {
    name: 'Fichier',
    iconName: 'description',
    disabled: false,
    onClick
  },
  {
    name: 'GIF',
    iconName: 'gif_box',
    disabled: false,
    onClick: onGifClick
  },
  {
    name: 'Sondage',
    iconName: 'bar_chart',
    disabled: false,
    onClick: onPollClick
  },
  {
    /* Toutes les entrées restent visibles sur téléphone : la rangée tient
       dans la largeur de l'écran, les icônes sont simplement un peu plus
       petites et un peu moins espacées qu' sur ordinateur. */
    name: 'Emoji',
    iconName: 'mood',
    disabled: false,
    onClick: onEmojiClick
  },
  {
    name: 'Programmer',
    iconName: 'calendar_month',
    disabled: false,
    onClick: onScheduleClick
  },
  {
    name: 'Lieu',
    iconName: 'location_on',
    disabled: false,
    onClick: onLocationClick
  }
];

type InputOptionsProps = {
  reply?: boolean;
  modal?: boolean;
  inputLimit: number;
  inputLength: number;
  isValidTweet: boolean;
  isCharLimitExceeded: boolean;
  /** Un sondage est déjà attaché à la publication. */
  hasPoll: boolean;
  /** Une date de publication est programmée. */
  scheduled: boolean;
  /** Un lieu est déjà attaché à la publication. */
  hasLocation: boolean;
  /** Ouvre le menu des photos (caméra, sélecteur, galerie). */
  onPhotosClick: () => void;
  onGifClick: () => void;
  onPollClick: () => void;
  onEmojiClick: () => void;
  onScheduleClick: () => void;
  onLocationClick: () => void;
};

export function InputOptions({
  reply,
  modal,
  inputLimit,
  inputLength,
  isValidTweet,
  isCharLimitExceeded,
  hasPoll,
  scheduled,
  hasLocation,
  onPhotosClick,
  onGifClick,
  onPollClick,
  onEmojiClick,
  onScheduleClick,
  onLocationClick
}: InputOptionsProps): JSX.Element {
  let filteredOptions = buildOptions(
    onPhotosClick,
    onGifClick,
    onPollClick,
    onEmojiClick,
    onScheduleClick,
    onLocationClick
  );

  /* En réponse, on masque le lieu (dernière entrée) comme auparavant. */
  if (reply)
    filteredOptions = filteredOptions.filter(({ name }) => name !== 'Lieu');

  return (
    <motion.div className='flex min-w-0 justify-between gap-2' {...variants}>
      {/* Les icônes restent sur une seule ligne, sans barre de défilement :
          sur tablette, toutes doivent tenir dans la largeur disponible. */}
      <div className='flex min-w-0 flex-nowrap items-center gap-1 text-main-accent'>
        {filteredOptions.map(({ name, iconName, disabled, onClick }) => (
          <Button
            className={cn(
              'accent-tab accent-bg-tab group relative shrink-0 rounded-full p-1',
              'hover:bg-main-accent/10 active:bg-main-accent/20',
              name === 'Sondage' &&
                hasPoll &&
                'bg-main-accent/10 text-main-accent',
              name === 'Programmer' &&
                scheduled &&
                'bg-main-accent/10 text-main-accent',
              name === 'Lieu' &&
                hasLocation &&
                'bg-main-accent/10 text-main-accent'
            )}
            onClick={(event): void => onClick?.(event)}
            disabled={disabled}
            key={name}
          >
            <MaterialIcon
              className='h-5 w-5 sm:h-[22px] sm:w-[22px]'
              iconName={iconName}
            />
            <ToolTip tip={name} modal={modal} />
          </Button>
        ))}
      </div>
      <div className='flex items-center gap-2 xs:gap-4'>
        <motion.div
          className='flex items-center gap-4'
          animate={
            inputLength ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
        >
          <ProgressBar
            modal={modal}
            inputLimit={inputLimit}
            inputLength={inputLength}
            isCharLimitExceeded={isCharLimitExceeded}
          />
          {!reply && (
            <>
              <i className='hidden h-8 w-[1px] bg-[#B9CAD3] dark:bg-[#3E4144] xs:block' />
              <Button
                className='group relative hidden rounded-full border border-light-line-reply p-[1px]
                           text-main-accent dark:border-light-secondary xs:block'
                disabled
              >
                <MaterialIcon className='h-5 w-5' iconName='add' />
                <ToolTip tip='Ajouter' modal={modal} />
              </Button>
            </>
          )}
        </motion.div>
        <Button
          type='submit'
          className='accent-tab bg-main-accent px-4 py-1.5 font-bold text-white
                     enabled:hover:bg-main-accent/90
                     enabled:active:bg-main-accent/75'
          disabled={!isValidTweet}
        >
          {reply ? 'Répondre' : scheduled ? 'Programmer' : 'Publier'}
        </Button>
      </div>
    </motion.div>
  );
}
