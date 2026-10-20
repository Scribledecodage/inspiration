import { useEffect, useState } from 'react';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { Modal } from '@components/modal/modal';
import {
  DEVICE_CODE_LENGTH,
  createDeviceCode,
  isValidDeviceCodeFormat,
  verifyDeviceCode
} from '@lib/security/device-code';
import type { FormEvent } from 'react';

type DeviceCodeModalProps = {
  open: boolean;
  mode: 'create' | 'verify';
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
};

const codeInputClassName =
  'w-full rounded-lg border border-light-line-reply bg-transparent px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply';

export function DeviceCodeModal({
  open,
  mode,
  userId,
  onClose,
  onSuccess
}: DeviceCodeModalProps): JSX.Element {
  const [code, setCode] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isCreation = mode === 'create';

  useEffect(() => {
    if (!open) return;

    setCode('');
    setConfirmation('');
    setError('');
    setLoading(false);
  }, [open, mode]);

  const handleCodeChange = (value: string, target: 'code' | 'confirmation') => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, DEVICE_CODE_LENGTH);

    if (target === 'code') setCode(digitsOnly);
    else setConfirmation(digitsOnly);

    setError('');
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!isValidDeviceCodeFormat(code)) {
      setError(`Le code doit contenir exactement ${DEVICE_CODE_LENGTH} chiffres.`);
      return;
    }

    if (isCreation && code !== confirmation) {
      setError('Les deux codes ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      if (isCreation) await createDeviceCode(userId, code);
      else if (!(await verifyDeviceCode(userId, code))) {
        setError('Code incorrect. Vérifiez les 4 chiffres puis réessayez.');
        return;
      }

      onSuccess();
    } catch (codeError) {
      setError(
        codeError instanceof Error
          ? codeError.message
          : 'Impossible d’enregistrer le code sur cet appareil.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      closeModal={onClose}
      modalClassName='w-full max-w-sm rounded-2xl border border-light-border bg-main-background p-6 shadow-2xl dark:border-dark-border'
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-start gap-3'>
          <span className='mt-0.5 rounded-full bg-main-accent/10 p-2 text-main-accent'>
            <MaterialIcon
              className='h-5 w-5'
              iconName={isCreation ? 'key' : 'lock'}
            />
          </span>
          <div>
            <h2 className='text-lg font-bold'>
              {isCreation
                ? 'Créer votre code de l’appareil'
                : 'Code de l’appareil requis'}
            </h2>
            <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
              {isCreation
                ? 'Choisissez 4 chiffres. Ils resteront uniquement dans ce navigateur.'
                : 'Saisissez les 4 chiffres définis sur cet appareil.'}
            </p>
          </div>
        </div>
        <Button
          className='-mr-2 -mt-2 p-2'
          onClick={onClose}
          aria-label='Fermer'
        >
          <MaterialIcon className='h-5 w-5' iconName='close' />
        </Button>
      </div>

      <form className='mt-5 flex flex-col gap-4' onSubmit={handleSubmit}>
        <label className='flex flex-col gap-2 text-sm font-bold'>
          {isCreation ? 'Nouveau code' : 'Code de l’appareil'}
          <input
            autoComplete='off'
            autoFocus
            className={codeInputClassName}
            id='device-code'
            inputMode='numeric'
            maxLength={DEVICE_CODE_LENGTH}
            onChange={(event) => handleCodeChange(event.target.value, 'code')}
            placeholder='••••'
            type='text'
            value={code}
          />
        </label>

        {isCreation && (
          <label className='flex flex-col gap-2 text-sm font-bold'>
            Confirmer le code
            <input
              autoComplete='off'
              className={codeInputClassName}
              inputMode='numeric'
              maxLength={DEVICE_CODE_LENGTH}
              onChange={(event) =>
                handleCodeChange(event.target.value, 'confirmation')
              }
              placeholder='••••'
              type='text'
              value={confirmation}
            />
          </label>
        )}

        {error && (
          <p
            className='rounded-lg bg-accent-red/10 p-3 text-sm text-accent-red'
            role='alert'
          >
            {error}
          </p>
        )}

        <p className='text-xs text-light-secondary dark:text-dark-secondary'>
          {isCreation
            ? 'Ce code n’est jamais envoyé à nos serveurs. Code oublié ? Supprimez les données du site dans votre navigateur : cela réinitialisera le code et vous déconnectera de cet appareil.'
            : 'Le déverrouillage reste actif une minute.'}
        </p>

        <div className='flex gap-2'>
          <Button
            className='flex-1 border border-light-line-reply font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            className='flex-1 bg-main-accent font-bold text-white enabled:hover:brightness-90'
            loading={loading}
            type='submit'
          >
            {isCreation ? 'Créer le code' : 'Déverrouiller'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
