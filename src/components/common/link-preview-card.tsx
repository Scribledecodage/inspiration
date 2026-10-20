import { motion } from 'framer-motion';
import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';
import type { LinkPreviewData } from '@lib/link-preview';

type LinkPreviewCardProps = {
  preview: LinkPreviewData;
  /** Aperçu en cours de rédaction : on propose de le retirer. */
  onRemove?: () => void;
  className?: string;
};

/**
 * Carte d'aperçu d'un lien : favicon, titre, description et bannière.
 *
 * Le même rendu dans la barre de publication et dans la messagerie, et la
 * même carte une fois le contenu publié.
 */
export function LinkPreviewCard({
  preview,
  onRemove,
  className
}: LinkPreviewCardProps): JSX.Element {
  const { favicon, title, description, image, siteName, url } = preview;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        /* Carte compacte et bien arrondie : elle prend le moins de place
           possible dans une conversation, tout en restant lisible. */
        'relative flex max-w-full overflow-hidden rounded-xl border',
        'border-light-border bg-main-background dark:border-dark-border',
        className
      )}
      exit={{ opacity: 0, y: 8 }}
      initial={{ opacity: 0, y: 8 }}
    >
      <a
        className='flex min-w-0 flex-1 flex-col'
        href={url}
        rel='noopener noreferrer nofollow'
        target='_blank'
      >
        {image && (
          <span
            className='block aspect-[3/1] w-full bg-cover bg-center'
            style={{ backgroundImage: `url("${image}")` }}
          />
        )}
        <span className='flex min-w-0 flex-1 flex-col gap-0.5 px-2.5 py-2'>
          <span className='flex min-w-0 items-center gap-1.5'>
            {favicon && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                alt=''
                className='h-3.5 w-3.5 shrink-0 rounded-sm'
                src={favicon}
              />
            )}
            {siteName && (
              <span className='truncate text-[11px] font-semibold text-light-secondary dark:text-dark-secondary'>
                {siteName}
              </span>
            )}
          </span>
          {title && (
            <span className='line-clamp-1 text-[13px] font-bold leading-snug text-light-primary dark:text-dark-primary'>
              {title}
            </span>
          )}
          {description && (
            <span className='line-clamp-1 text-[11px] leading-snug text-light-secondary dark:text-dark-secondary'>
              {description}
            </span>
          )}
        </span>
      </a>
      {onRemove && (
        <button
          aria-label='Retirer l’aperçu du lien'
          className='absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full
                     bg-light-primary/75 text-white backdrop-blur-sm transition
                     hover:bg-image-preview-hover/75'
          onClick={onRemove}
          title='Retirer l’aperçu'
          type='button'
        >
          <MaterialIcon className='h-4 w-4' iconName='close' />
        </button>
      )}
    </motion.div>
  );
}