import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useAuth } from '@lib/context/auth-context';
import { checkUsernameAvailability, updateUsername } from '@lib/firebase/utils';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import {
  SettingsCard,
  SettingsShell,
  settingsPageLayout
} from '@components/settings/settings-shell';
import type { FormEvent } from 'react';

type Availability = 'idle' | 'checking' | 'available' | 'taken' | 'error';

export default function SettingsUsernamePage(): JSX.Element {
  const { user } = useAuth();
  const { push } = useRouter();
  const currentUsername = user?.username ?? '';

  const [username, setUsername] = useState(currentUsername);
  const [availability, setAvailability] = useState<Availability>('idle');
  const [loading, setLoading] = useState(false);

  const trimmedUsername = username.trim();

  const formatError = !trimmedUsername
    ? 'Saisissez un nom d’utilisateur.'
    : trimmedUsername.length < 4 || trimmedUsername.length > 15
    ? 'Choisissez un nom de 4 à 15 caractères.'
    : !/^\w+$/.test(trimmedUsername)
    ? 'Utilisez uniquement des lettres, des chiffres ou _ .'
    : !/[a-z]/i.test(trimmedUsername)
    ? 'Ajoutez au moins une lettre à votre nom d’utilisateur.'
    : trimmedUsername === currentUsername
    ? 'C’est déjà votre nom d’utilisateur actuel.'
    : '';

  useEffect(() => {
    if (formatError) {
      setAvailability('idle');
      return;
    }

    setAvailability('checking');
    let active = true;

    const timer = setTimeout(() => {
      checkUsernameAvailability(trimmedUsername)
        .then((available) => {
          if (active) setAvailability(available ? 'available' : 'taken');
        })
        .catch(() => {
          if (active) setAvailability('error');
        });
    }, 450);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [trimmedUsername, formatError]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!user || formatError) return;

    setLoading(true);

    try {
      const available = await checkUsernameAvailability(trimmedUsername);

      if (!available) {
        setAvailability('taken');
        toast.error('Ce nom d’utilisateur est déjà pris.');
        return;
      }

      await updateUsername(user.id, trimmedUsername);
      toast.success(`Vous vous appelez maintenant @${trimmedUsername}`);
      void push('/settings');
    } catch (updateError) {
      toast.error(
        updateError instanceof Error
          ? updateError.message
          : 'Impossible de modifier le nom d’utilisateur.'
      );
    } finally {
      setLoading(false);
    }
  };

  const availabilityMessage =
    availability === 'checking'
      ? 'Vérification de la disponibilité…'
      : availability === 'available'
      ? 'Ce nom d’utilisateur est disponible.'
      : availability === 'taken'
      ? 'Ce nom d’utilisateur est déjà utilisé.'
      : availability === 'error'
      ? 'Impossible de vérifier la disponibilité pour le moment.'
      : '';

  return (
    <SettingsShell
      description='Modifiez le nom unique qui permet de vous mentionner et de trouver votre profil.'
      seoTitle='Renommer / Réglages / Inspiration'
      title='Renommer'
    >
      <SettingsCard
        description='Votre nom d’utilisateur est unique : il sert à vous mentionner et à partager votre profil.'
        iconName='alternate_email'
        title='Nom d’utilisateur'
      >
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <label className='flex flex-col gap-2 text-sm font-bold'>
            Nouveau nom d’utilisateur
            <div className='flex items-center gap-2 rounded-lg border border-light-line-reply bg-transparent px-4 py-3 transition focus-within:border-main-accent focus-within:ring-2 focus-within:ring-main-accent/20 dark:border-dark-line-reply'>
              <span className='text-lg text-light-secondary dark:text-dark-secondary'>
                @
              </span>
              <input
                autoComplete='username'
                className='w-full bg-transparent font-normal outline-none'
                maxLength={15}
                minLength={4}
                onChange={(event): void => setUsername(event.target.value)}
                placeholder='votre_nom'
                spellCheck={false}
                type='text'
                value={username}
              />
            </div>
          </label>

          <p className='text-xs text-light-secondary dark:text-dark-secondary'>
            Actuel : <span className='font-semibold'>@{currentUsername}</span> —
            4 à 15 caractères : lettres, chiffres ou _ (avec au moins une
            lettre).
          </p>

          {availabilityMessage && (
            <p
              className={
                availability === 'available'
                  ? 'text-sm text-accent-green'
                  : availability === 'taken'
                  ? 'text-sm text-accent-red'
                  : 'text-sm text-light-secondary dark:text-dark-secondary'
              }
              role='status'
            >
              {availabilityMessage}
            </p>
          )}

          {formatError && (
            <p className='text-sm text-accent-red' role='alert'>
              {formatError}
            </p>
          )}

          <p className='flex items-center gap-2 rounded-lg bg-main-search-background/40 p-3 text-xs text-light-secondary dark:text-dark-secondary'>
            <MaterialIcon className='h-4 w-4 shrink-0' iconName='link' />
            <span className='truncate'>
              Votre profil : inspiration-reseau-social.vercel.app/user/
              {trimmedUsername || currentUsername}
            </span>
          </p>

          <Button
            className='self-start bg-main-accent px-5 py-2 font-bold text-white enabled:hover:brightness-90'
            disabled={Boolean(formatError) || !trimmedUsername}
            loading={loading}
            type='submit'
          >
            Enregistrer le nouveau nom
          </Button>
        </form>
      </SettingsCard>

      <p className='text-xs text-light-secondary dark:text-dark-secondary'>
        Les publications déjà publiées restent en ligne : elles afficheront
        automatiquement votre nouveau nom d’utilisateur. Les anciennes mentions
        @{currentUsername} ne pointeront plus vers votre profil.
      </p>
    </SettingsShell>
  );
}

SettingsUsernamePage.getLayout = settingsPageLayout;
