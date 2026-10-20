import { useModal } from '@lib/hooks/useModal';
import { useWindow } from '@lib/context/window-context';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { StatusCreateModal } from './status-create-modal';

type StatusPublishButtonProps = {
  className?: string;
};

/** Bouton de création d'un statut : ouvre la fenêtre de création. Sur
    téléphone, le libellé est réduit à « Créer » : à côté de « Voir mon
    statut », le bouton doit rester court. */
export function StatusPublishButton({
  className
}: StatusPublishButtonProps): JSX.Element {
  const { open, openModal, closeModal } = useModal();
  const { isMobile } = useWindow();

  return (
    <>
      <Button className={className} type='button' onClick={openModal}>
        <MaterialIcon className='h-5 w-5' iconName='add' solid />
        {isMobile ? 'Créer' : 'Publier votre statut'}
      </Button>
      <StatusCreateModal open={open} closeModal={closeModal} />
    </>
  );
}
