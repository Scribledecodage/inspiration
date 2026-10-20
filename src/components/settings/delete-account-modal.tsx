import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useDragControls } from 'framer-motion';
import cn from 'clsx';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth } from '@lib/firebase/app';
import { usersCollection } from '@lib/firebase/collections';
import { deleteAccountData } from '@lib/firebase/account';
import { getAuthErrorMessage } from '@lib/firebase/auth-errors';
import { verifyDeviceCode } from '@lib/security/device-code';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { Modal } from '@components/modal/modal';
import { PasswordField } from '@components/input/password-field';
import { useDeviceCode } from './use-device-code';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';
import type { DocumentData, WithFieldValue } from 'firebase/firestore';
import type { User } from '@lib/types/user';

type DeleteAccountModalProps = {
  open: boolean;
  user: User;
  onClose: () => void;
};

type Step = 1 | 2 | 3;

const totalSteps = 3;

const deletionDetails = [
  'Votre profil : nom, photo, bannière, bio et liens.',
  'Vos publications et les images qui les accompagnent.',
  'Vos messages, signets, statistiques et contacts.',
  'Votre compte de connexion : cette adresse ne pourra plus se connecter.'
];

const remainingDetails = [
  'Les publications des autres personnes qui vous mentionnent restent en ligne.',
  'Les images déjà envoyées restent dans notre espace de stockage privé jusqu’à une demande de suppression.'
];

const checksBeforeDeleting = [
  'Enregistrez ce que vous souhaitez conserver : vos données ne pourront pas être récupérées.',
  'Les sessions ouvertes sur vos appareils seront déconnectées.',
  'La suppression est immédiate : aucun délai de récupération n’est prévu.'
];

const sheetAnimation: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.2 } }
};

type StepIndicatorProps = {
  step: Step;
};

function StepIndicator({ step }: StepIndicatorProps): JSX.Element {
  return (
    <div
      aria-label={`Étape ${step} sur ${totalSteps}`}
      className='flex items-center gap-1.5'
    >
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map(
        (value) => (
          <span
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              value <= step
                ? 'bg-main-accent'
                : 'bg-light-border dark:bg-dark-border'
            )}
            key={value}
          />
        )
      )}
      <span className='ml-1 shrink-0 text-[11px] font-bold uppercase tracking-wide text-light-secondary dark:text-dark-secondary'>
        {step}/{totalSteps}
      </span>
    </div>
  );
}

type AcknowledgementProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

function Acknowledgement({
  checked,
  onChange,
  children
}: AcknowledgementProps): JSX.Element {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors',
        checked
          ? 'border-light-border bg-main-search-background/60 dark:border-dark-border dark:bg-dark-primary/10'
          : 'border-light-border hover:bg-main-search-background/60 dark:border-dark-border dark:hover:bg-dark-primary/10'
      )}
    >
      <input
        checked={checked}
        className='mt-0.5 h-4 w-4 shrink-0 accent-main-accent'
        onChange={(event) => onChange(event.target.checked)}
        type='checkbox'
      />
      <span className='text-sm leading-6 text-light-primary dark:text-dark-primary'>
        {children}
      </span>
    </label>
  );
}

export function DeleteAccountModal({
  open,
  user,
  onClose
}: DeleteAccountModalProps): JSX.Element {
  const { push } = useRouter();
  const authUser = auth.currentUser;
  const usesPassword =
    authUser?.providerData.some(
      ({ providerId }) => providerId === 'password'
    ) ?? false;
  const usesGoogle =
    authUser?.providerData.some(
      ({ providerId }) => providerId === 'google.com'
    ) ?? false;
  const {
    hasCode,
    requestUnlock,
    modal: deviceCodeModal
  } = useDeviceCode(user.id);

  const [step, setStep] = useState<Step>(1);
  const [hasRead, setHasRead] = useState(false);
  const [ackDefinitive, setAckDefinitive] = useState(false);
  const [ackRemaining, setAckRemaining] = useState(false);
  const [ackOwner, setAckOwner] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (!open) return;

    setStep(1);
    setHasRead(false);
    setAckDefinitive(false);
    setAckRemaining(false);
    setAckOwner(false);
    setConfirmation('');
    setPassword('');
    setPasswordVisible(false);
    setCode('');
    setError('');
    setLoading(false);
  }, [open]);

  /*
    Si les informations tiennent sans défiler (grand écran, texte agrandi),
    on considère la lecture faite pour ne pas bloquer la personne.
  */
  useEffect(() => {
    if (!open || step !== 1) return;

    const node = scrollRef.current;

    if (node) setHasRead(node.scrollHeight <= node.clientHeight + 8);
  }, [open, step]);

  const handleScroll = (): void => {
    const node = scrollRef.current;

    if (!node || hasRead) return;

    if (node.scrollTop + node.clientHeight >= node.scrollHeight - 8)
      setHasRead(true);
  };

  const isConfirmed = confirmation.trim().toUpperCase() === 'SUPPRIMER';
  const conditionsAccepted = ackDefinitive && ackRemaining && ackOwner;
  const canDelete =
    isConfirmed &&
    (!usesPassword || password.length > 0) &&
    (!hasCode || code.length === 4);

  const handleTogglePassword = (): void => {
    if (passwordVisible) {
      setPasswordVisible(false);
      return;
    }

    requestUnlock(() => setPasswordVisible(true));
  };

  const goToStep = (nextStep: Step): void => {
    setError('');
    setStep(nextStep);
  };

  const handleDelete = async (): Promise<void> => {
    setError('');

    if (!authUser) {
      setError('Vous n’êtes plus connecté. Reconnectez-vous puis réessayez.');
      return;
    }

    if (!isConfirmed) {
      setError('Tapez SUPPRIMER en majuscules pour confirmer.');
      return;
    }

    if (usesPassword && !password) {
      setError('Saisissez votre mot de passe pour confirmer.');
      return;
    }

    if (hasCode && !code) {
      setError('Saisissez votre code de l’appareil pour confirmer.');
      return;
    }

    setLoading(true);

    try {
      if (hasCode && !(await verifyDeviceCode(user.id, code))) {
        setError('Code de l’appareil incorrect.');
        return;
      }

      if (usesPassword && authUser.email)
        await reauthenticateWithCredential(
          authUser,
          EmailAuthProvider.credential(authUser.email, password)
        );
      else if (usesGoogle)
        await reauthenticateWithPopup(authUser, new GoogleAuthProvider());
      else {
        // Sans réauthentification récente, `deleteUser` échoue de toute façon.
        // On refuse donc d'effacer les données : sinon on se retrouve avec un
        // compte toujours actif mais dont le profil a été vidé.
        setError(
          'Impossible de vérifier votre identité avec cette méthode de connexion. Reconnectez-vous avec Google ou un mot de passe, puis réessayez.'
        );
        return;
      }

      // Copie de sécurité du profil : si la suppression du compte Firebase
      // Authentication échoue (réseau, session expirée…), on remet le profil
      // en place plutôt que de laisser la personne avec un profil vide.
      let profileBackup: DocumentData | null = null;

      try {
        const profileSnapshot = await getDoc(doc(usersCollection, user.id));
        if (profileSnapshot.exists()) profileBackup = profileSnapshot.data();
      } catch {
        profileBackup = null;
      }

      await deleteAccountData(user.id);

      try {
        await deleteUser(authUser);
      } catch (authDeletionError) {
        if (profileBackup && auth.currentUser)
          try {
            await setDoc(
              doc(usersCollection, user.id),
              profileBackup as WithFieldValue<User>
            );
          } catch {
            // On garde l'erreur d'origine, plus utile à afficher.
          }

        throw authDeletionError;
      }

      toast.success('Votre compte et vos données ont été supprimés');
      onClose();
      void push('/');
    } catch (deleteError) {
      setError(getAuthErrorMessage(deleteError));
    } finally {
      setLoading(false);
    }
  };

  const title =
    step === 1
      ? 'Supprimer votre compte ?'
      : step === 2
      ? 'Conditions de suppression'
      : 'Confirmer la suppression';

  const subtitle =
    step === 1
      ? 'Votre profil, vos publications et vos données seront supprimés définitivement.'
      : step === 2
      ? 'Cochez chaque point pour montrer que vous avez compris ce qui va se passer.'
      : 'Dernière vérification : cette action est immédiate et définitive.';

  return (
    <>
      <Modal
        open={open}
        closeModal={onClose}
        className='flex items-end justify-center p-0 xs:items-center xs:p-4'
        modalAnimation={sheetAnimation}
        modalClassName='fixed inset-x-0 bottom-0 flex max-h-[92dvh] w-full flex-col overflow-y-auto overscroll-contain rounded-t-2xl border-t border-light-border bg-main-background p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl dark:border-dark-border xs:static xs:max-h-[88vh] xs:max-w-lg xs:rounded-xl xs:border xs:p-6'
        drag='y'
        dragControls={dragControls}
        dragListener={false}
        dragElastic={0.25}
        dragMomentum={false}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 550) onClose();
        }}
      >
        <button
          aria-label='Faire glisser pour fermer'
          className='mb-3 flex w-full touch-none justify-center py-1 xs:hidden'
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
          type='button'
        >
          <span className='h-1.5 w-12 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>

        <StepIndicator step={step} />

        <div className='mb-4 mt-3 flex items-start justify-between gap-4'>
          <div className='min-w-0'>
            <h2 className='text-lg font-bold text-main-accent'>{title}</h2>
            <p className='mt-1 text-sm text-light-secondary dark:text-dark-secondary'>
              {subtitle}
            </p>
          </div>
          <Button
            aria-label='Fermer'
            className='-mr-2 -mt-2 shrink-0 p-2'
            onClick={onClose}
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </Button>
        </div>

        {step === 1 && (
          <div className='flex flex-col gap-3'>
            <div
              ref={scrollRef}
              aria-label='Conséquences de la suppression du compte'
              className='max-h-[38vh] overflow-y-auto overscroll-contain rounded-lg border border-light-border bg-main-search-background/20 p-4 text-sm font-normal leading-6 text-light-secondary dark:border-dark-border dark:bg-dark-primary/[0.04] dark:text-dark-secondary xs:max-h-[36vh]'
              onScroll={handleScroll}
              role='region'
              tabIndex={0}
            >
              <h3 className='text-sm font-bold text-main-accent'>
                Ce qui sera supprimé définitivement
              </h3>
              <ul className='mt-2 list-disc space-y-1.5 pl-5'>
                {deletionDetails.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3 className='mt-4 text-sm font-bold text-main-accent'>
                Ce qui peut rester en ligne
              </h3>
              <ul className='mt-2 list-disc space-y-1.5 pl-5'>
                {remainingDetails.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h3 className='mt-4 text-sm font-bold text-main-accent'>
                À vérifier avant de continuer
              </h3>
              <ul className='mt-2 list-disc space-y-1.5 pl-5'>
                {checksBeforeDeleting.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className='mt-4 border-t border-light-border pt-3 text-xs text-main-accent dark:border-dark-border'>
                Fin des informations.
              </p>
            </div>

            <p
              aria-live='polite'
              className='text-xs font-normal leading-5 text-light-secondary dark:text-dark-secondary'
            >
              {hasRead
                ? 'Tout est lu, vous pouvez continuer.'
                : 'Faites défiler le texte jusqu’en bas pour activer le bouton Continuer.'}
            </p>

            <div className='mt-1 flex flex-col-reverse gap-2 xs:flex-row xs:justify-end'>
              <Button
                className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                onClick={onClose}
              >
                Annuler
              </Button>
              <Button
                className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                disabled={!hasRead}
                onClick={() => goToStep(2)}
              >
                Continuer
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='flex flex-col gap-3'>
            <p className='rounded-xl border border-light-border bg-main-search-background/40 p-3 text-xs leading-5 text-light-secondary dark:border-dark-border dark:text-dark-secondary'>
              Rien n’est encore supprimé à cette étape. Vous pouvez revenir en
              arrière ou fermer cette fenêtre sans conséquence.
            </p>

            <div className='flex flex-col gap-2'>
              <Acknowledgement
                checked={ackDefinitive}
                onChange={setAckDefinitive}
              >
                Je comprends que la suppression de mon compte est{' '}
                <strong>définitive et irréversible</strong>.
              </Acknowledgement>
              <Acknowledgement
                checked={ackRemaining}
                onChange={setAckRemaining}
              >
                Je comprends que certaines publications d’autres personnes
                peuvent rester en ligne et que les images déjà envoyées restent
                dans le stockage privé jusqu’à une demande de suppression.
              </Acknowledgement>
              <Acknowledgement checked={ackOwner} onChange={setAckOwner}>
                Je confirme être à l’origine de cette demande et avoir accès à
                ce compte.
              </Acknowledgement>
            </div>

            <p className='text-xs leading-5 text-light-secondary dark:text-dark-secondary'>
              Après validation, votre compte sera supprimé immédiatement. Aucun
              délai de récupération n’est prévu.
            </p>

            <div className='mt-1 flex flex-col-reverse gap-2 xs:flex-row xs:items-center xs:justify-between'>
              <Button
                className='inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                onClick={() => goToStep(1)}
              >
                <MaterialIcon className='h-4 w-4' iconName='chevron_left' />
                Retour
              </Button>
              <div className='flex flex-col-reverse gap-2 xs:flex-row'>
                <Button
                  className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                  onClick={onClose}
                >
                  Annuler
                </Button>
                <Button
                  className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                  disabled={!conditionsAccepted}
                  onClick={() => goToStep(3)}
                >
                  Continuer
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between gap-3 rounded-lg border border-light-border bg-main-search-background/30 px-3.5 py-3 text-sm dark:border-dark-border dark:bg-dark-primary/[0.04]'>
              <span className='text-light-secondary dark:text-dark-secondary'>
                Compte concerné
              </span>
              <span className='truncate font-bold text-main-accent'>
                @{user.username}
              </span>
            </div>

            {usesPassword && (
              <PasswordField
                autoComplete='current-password'
                id='delete-password'
                label='Votre mot de passe'
                onChange={(value) => {
                  setPassword(value);
                  setError('');
                }}
                onToggleVisibility={handleTogglePassword}
                value={password}
                visible={passwordVisible}
              />
            )}

            {hasCode && (
              <label className='flex flex-col gap-2 text-sm font-bold'>
                Code de l’appareil (4 chiffres)
                <input
                  autoComplete='off'
                  className='w-full rounded-lg border border-light-line-reply bg-transparent px-4 py-3 text-center text-xl font-bold tracking-[0.4em] outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply'
                  inputMode='numeric'
                  maxLength={4}
                  onChange={(event) => {
                    setCode(event.target.value.replace(/\D/g, '').slice(0, 4));
                    setError('');
                  }}
                  placeholder='••••'
                  type='text'
                  value={code}
                />
              </label>
            )}

            <label className='flex flex-col gap-2 text-sm font-bold'>
              Tapez SUPPRIMER pour confirmer
              <input
                autoComplete='off'
                className='w-full rounded-lg border border-light-line-reply bg-transparent px-4 py-3 font-normal uppercase outline-none transition focus:border-main-accent focus:ring-2 focus:ring-main-accent/20 dark:border-dark-line-reply'
                onChange={(event) => {
                  setConfirmation(event.target.value);
                  setError('');
                }}
                placeholder='SUPPRIMER'
                type='text'
                value={confirmation}
              />
              <span className='text-xs font-normal leading-5 text-light-secondary dark:text-dark-secondary'>
                Cette saisie évite une suppression accidentelle. Le bouton de
                suppression ne s’active qu’une fois le mot exact tapé.
              </span>
            </label>

            {usesGoogle && !usesPassword && (
              <p className='text-xs text-light-secondary dark:text-dark-secondary'>
                Une fenêtre Google s’ouvrira pour vérifier votre identité avant
                la suppression.
              </p>
            )}

            {error && (
              <p
                className='rounded-lg border border-light-border bg-main-search-background/50 p-3 text-sm font-semibold text-light-primary dark:border-dark-border dark:bg-dark-primary/10 dark:text-dark-primary'
                role='alert'
              >
                {error}
              </p>
            )}

            <div className='flex flex-col gap-2 xs:flex-row xs:items-center xs:justify-between'>
              <Button
                className='inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 font-bold hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                onClick={() => goToStep(2)}
              >
                <MaterialIcon className='h-4 w-4' iconName='chevron_left' />
                Retour
              </Button>
              <div className='flex flex-col-reverse gap-2 xs:flex-row'>
                <Button
                  className='rounded-lg border border-light-line-reply px-4 py-2 font-bold hover:bg-light-primary/10 dark:border-dark-line-reply dark:hover:bg-dark-primary/10'
                  onClick={onClose}
                >
                  Annuler
                </Button>
                <Button
                  className='rounded-lg bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                  disabled={!canDelete}
                  loading={loading}
                  onClick={() => void handleDelete()}
                >
                  Supprimer définitivement
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      {deviceCodeModal}
    </>
  );
}
