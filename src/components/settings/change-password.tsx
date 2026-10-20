import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth';
import { auth } from '@lib/firebase/app';
import { getAuthErrorMessage } from '@lib/firebase/auth-errors';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { PasswordField } from '@components/input/password-field';
import { SettingsCard } from './settings-shell';
import { useDeviceCode } from './use-device-code';
import type { FormEvent } from 'react';
import type { User } from '@lib/types/user';

type PasswordInput = 'current' | 'next' | 'confirmation';

type ChangePasswordProps = {
  user: User;
};

export function ChangePassword({ user }: ChangePasswordProps): JSX.Element {
  const authUser = auth.currentUser;
  const usesPassword =
    authUser?.providerData.some(
      ({ providerId }) => providerId === 'password'
    ) ?? false;
  const { hasCode, unlocked, requestUnlock, modal } = useDeviceCode(user.id);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [visibleInput, setVisibleInput] = useState<PasswordInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  useEffect(() => {
    if (!unlocked) setVisibleInput(null);
  }, [unlocked]);

  const handleToggleVisibility = (input: PasswordInput): void => {
    if (visibleInput === input) {
      setVisibleInput(null);
      return;
    }

    requestUnlock(() => setVisibleInput(input));
  };

  const handleResetEmail = async (): Promise<void> => {
    if (!authUser?.email) {
      toast.error('Aucune adresse e-mail n’est associée à ce compte.');
      return;
    }

    setSendingReset(true);

    try {
      await sendPasswordResetEmail(auth, authUser.email);
      toast.success(`E-mail de réinitialisation envoyé à ${authUser.email}`);
    } catch (resetError) {
      toast.error(getAuthErrorMessage(resetError));
    } finally {
      setSendingReset(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!authUser?.email) {
      toast.error('Aucune adresse e-mail n’est associée à ce compte.');
      return;
    }

    if (!currentPassword) {
      toast.error('Saisissez votre mot de passe actuel.');
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        'Le nouveau mot de passe doit contenir au moins 6 caractères.'
      );
      return;
    }

    if (newPassword !== confirmation) {
      toast.error('Les deux mots de passe ne correspondent pas.');
      return;
    }

    if (newPassword === currentPassword) {
      toast.error('Le nouveau mot de passe doit être différent de l’actuel.');
      return;
    }

    setLoading(true);

    try {
      await reauthenticateWithCredential(
        authUser,
        EmailAuthProvider.credential(authUser.email, currentPassword)
      );
      await updatePassword(authUser, newPassword);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmation('');
      setVisibleInput(null);
      toast.success('Votre mot de passe a été modifié');
    } catch (updateError) {
      toast.error(getAuthErrorMessage(updateError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SettingsCard
        title='Mot de passe'
        description='Votre mot de passe Inspiration sert à vous connecter. Il est chiffré et n’est jamais accessible en clair, même pour nous : personne, pas même l’application, ne peut donc afficher le mot de passe existant.'
        iconName='key'
      >
        {usesPassword ? (
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <PasswordField
              autoComplete='current-password'
              id='current-password'
              label='Mot de passe actuel'
              onChange={setCurrentPassword}
              onToggleVisibility={() => handleToggleVisibility('current')}
              placeholder='Votre mot de passe actuel'
              value={currentPassword}
              visible={visibleInput === 'current'}
            />

            <PasswordField
              autoComplete='new-password'
              hint='6 caractères minimum.'
              id='new-password'
              label='Nouveau mot de passe'
              minLength={6}
              onChange={setNewPassword}
              onToggleVisibility={() => handleToggleVisibility('next')}
              placeholder='Votre nouveau mot de passe'
              value={newPassword}
              visible={visibleInput === 'next'}
            />

            <PasswordField
              autoComplete='new-password'
              id='confirm-password'
              label='Confirmer le nouveau mot de passe'
              onChange={setConfirmation}
              onToggleVisibility={() => handleToggleVisibility('confirmation')}
              placeholder='Répétez le nouveau mot de passe'
              value={confirmation}
              visible={visibleInput === 'confirmation'}
            />

            <p className='flex items-start gap-2 rounded-lg bg-main-search-background/40 p-3 text-xs text-light-secondary dark:text-dark-secondary'>
              <MaterialIcon
                className='mt-0.5 h-4 w-4 shrink-0 text-main-accent'
                iconName={hasCode ? 'lock' : 'gpp_bad'}
              />
              <span>
                {hasCode
                  ? 'Afficher un mot de passe demande votre code de l’appareil. Le déverrouillage reste actif une minute, puis les mots de passe sont masqués à nouveau.'
                  : 'Créez un code de l’appareil pour protéger l’affichage des mots de passe sur ce navigateur.'}
              </span>
            </p>

            <div className='flex flex-wrap items-center gap-3'>
              <Button
                className='bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
                loading={loading}
                type='submit'
              >
                Modifier le mot de passe
              </Button>
              <Button
                className='px-3 py-2 text-sm text-main-accent hover:underline'
                loading={sendingReset}
                onClick={() => void handleResetEmail()}
              >
                Recevoir un e-mail de réinitialisation
              </Button>
            </div>
          </form>
        ) : (
          <div className='flex flex-col gap-3 text-sm text-light-secondary dark:text-dark-secondary'>
            <p>
              Votre compte utilise la connexion Google : il n’y a donc aucun mot
              de passe Inspiration à modifier. Le mot de passe et la double
              authentification se gèrent directement depuis votre compte Google.
            </p>
            <a
              className='inline-flex items-center gap-2 self-start text-main-accent hover:underline'
              href='https://myaccount.google.com/security'
              rel='noreferrer'
              target='_blank'
            >
              Ouvrir la sécurité de mon compte Google
              <MaterialIcon className='h-4 w-4' iconName='open_in_new' />
            </a>
          </div>
        )}
      </SettingsCard>
      {modal}
    </>
  );
}
