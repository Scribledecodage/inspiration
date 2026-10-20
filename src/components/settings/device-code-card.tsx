import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { SettingsCard } from './settings-shell';
import { DeviceCodeModal } from './device-code-modal';
import {
  getDeviceCodeCreatedAt,
  hasDeviceCode,
  removeDeviceCode
} from '@lib/security/device-code';

type DeviceCodeCardProps = {
  userId: string;
};

function formatDateTime(value: string | null): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export function DeviceCodeCard({ userId }: DeviceCodeCardProps): JSX.Element {
  const [active, setActive] = useState(() => hasDeviceCode(userId));
  const [createdAt, setCreatedAt] = useState(() =>
    getDeviceCodeCreatedAt(userId)
  );
  const [modalMode, setModalMode] = useState<'create' | 'verify' | null>(null);
  const [nextStep, setNextStep] = useState<'create' | 'remove'>('create');

  const handleSuccess = (): void => {
    if (modalMode === 'create') {
      setActive(true);
      setCreatedAt(getDeviceCodeCreatedAt(userId));
      setModalMode(null);
      toast.success('Code de l’appareil enregistré');
      return;
    }

    if (nextStep === 'remove') {
      removeDeviceCode(userId);
      setActive(false);
      setCreatedAt(null);
      setModalMode(null);
      toast.success('Code de l’appareil supprimé');
      return;
    }

    setModalMode('create');
  };

  const formattedDate = formatDateTime(createdAt);

  return (
    <>
      <SettingsCard
        title='Code de l’appareil'
        description='Un code à 4 chiffres qui protège l’affichage des mots de passe et les actions sensibles depuis ce navigateur.'
        iconName='mobile'
      >
        <div className='flex flex-wrap items-center gap-2 rounded-lg bg-main-search-background/40 p-3 text-sm'>
          <MaterialIcon
            className={
              active
                ? 'h-5 w-5 shrink-0 text-accent-green'
                : 'h-5 w-5 shrink-0 text-light-secondary dark:text-dark-secondary'
            }
            iconName={active ? 'verified_user' : 'gpp_bad'}
          />
          <span className='font-semibold'>
            {active
              ? 'Code actif sur cet appareil'
              : 'Aucun code sur cet appareil'}
          </span>
          {active && formattedDate && (
            <span className='text-light-secondary dark:text-dark-secondary'>
              — créé le {formattedDate}
            </span>
          )}
        </div>

        <div className='flex flex-wrap gap-2'>
          {active ? (
            <>
              <Button
                className='border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                onClick={() => {
                  setNextStep('create');
                  setModalMode('verify');
                }}
              >
                Modifier le code
              </Button>
              <Button
                className='border border-accent-red/50 px-4 py-2 font-bold text-accent-red hover:bg-accent-red/10'
                onClick={() => {
                  setNextStep('remove');
                  setModalMode('verify');
                }}
              >
                Supprimer le code
              </Button>
            </>
          ) : (
            <Button
              className='bg-main-accent px-4 py-2 font-bold text-white enabled:hover:brightness-90'
              onClick={() => setModalMode('create')}
            >
              Créer un code de l’appareil
            </Button>
          )}
        </div>

        <p className='text-xs text-light-secondary dark:text-dark-secondary'>
          Le code reste uniquement dans ce navigateur : il n’est jamais envoyé à
          nos serveurs et il n’existe aucune réinitialisation par e-mail. Code
          oublié ? Supprimez les données du site dans votre navigateur : cela
          réinitialisera le code et vous déconnectera de cet appareil.
        </p>
      </SettingsCard>
      <DeviceCodeModal
        open={modalMode !== null}
        mode={modalMode ?? 'verify'}
        userId={userId}
        onClose={() => setModalMode(null)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
