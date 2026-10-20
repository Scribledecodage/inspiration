import { motion } from 'framer-motion';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';

type LocationPreviewProps = {
  location: string;
  /** Ouvre la fenêtre pour modifier le lieu. */
  onEdit?: () => void;
  /** Retire le lieu de la publication. */
  onRemove?: () => void;
};

/* Aperçu du lieu dans la zone de rédaction : on voit le lieu choisi avant de
   publier, comme pour un aperçu d'image ou de sondage. */
export function LocationPreview({
  location,
  onEdit,
  onRemove
}: LocationPreviewProps): JSX.Element {
  return (
    <motion.div
      className='relative rounded-2xl border border-light-line-reply p-3 dark:border-dark-border'
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <div className='flex items-center gap-2 pr-8'>
        <MaterialIcon
          className='h-5 w-5 shrink-0 text-main-accent'
          iconName='location_on'
        />
        <div className='flex flex-col'>
          <p className='text-sm font-bold'>Lieu</p>
          <p className='text-xs text-light-secondary dark:text-dark-secondary'>
            {location}
          </p>
        </div>
      </div>
      {onEdit && (
        <Button
          className='mt-3 rounded-full px-3 py-1 text-sm font-bold text-main-accent hover:bg-main-accent/10'
          onClick={onEdit}
        >
          Modifier
        </Button>
      )}
      {onRemove && (
        <Button
          className='accent-tab absolute right-1 top-1 rounded-full bg-light-primary/75 p-1
                     text-white backdrop-blur-sm hover:bg-image-preview-hover/75'
          onClick={onRemove}
          aria-label='Retirer le lieu'
        >
          <MaterialIcon className='h-4 w-4' iconName='close' />
        </Button>
      )}
    </motion.div>
  );
}
