import { useState } from 'react';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import type { DragControls } from 'framer-motion';

type EmailAuthModalProps = {
  mode: 'signIn' | 'signUp';
  dragControls: DragControls;
  sheetExpanded: boolean;
  loading: boolean;
  error: Error | null;
  closeModal: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    name: string,
    username: string,
    gender: 'homme' | 'femme' | 'autre',
    email: string,
    password: string
  ) => Promise<void>;
};

export function EmailAuthModal({
  mode,
  dragControls,
  sheetExpanded,
  loading,
  error,
  closeModal,
  signInWithEmail,
  signUpWithEmail
}: EmailAuthModalProps): JSX.Element {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState<'homme' | 'femme' | 'autre'>('homme');
  const [usernameError, setUsernameError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isSignUp = mode === 'signUp';
  const [showPassword, setShowPassword] = useState(false);

  const getAuthErrorMessage = (authError: Error): string => {
    const code = (authError as Error & { code?: string }).code ?? '';

    if (
      [
        'auth/invalid-login-credentials',
        'auth/invalid-credential',
        'auth/wrong-password',
        'auth/user-not-found'
      ].includes(code) ||
      authError.message.includes('auth/invalid-login-credentials')
    ) {
      return 'E-mail ou mot de passe incorrect. Vérifiez vos informations puis réessayez.';
    }

    if (code === 'auth/email-already-in-use')
      return 'Cette adresse e-mail est déjà utilisée. Connectez-vous ou utilisez une autre adresse.';

    if (code === 'auth/weak-password')
      return 'Le mot de passe doit contenir au moins 6 caractères.';

    if (code === 'auth/invalid-email')
      return 'Veuillez saisir une adresse e-mail valide.';

    return (
      authError.message.replace(/^Firebase:\s*Error\s*\([^)]*\)\.?\s*/i, '') ||
      'Une erreur est survenue. Veuillez réessayer.'
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSignUp) {
      const normalizedUsername = username.trim();

      if (normalizedUsername.length < 4 || normalizedUsername.length > 15) {
        setUsernameError('Choisissez un nom de 4 à 15 caractères.');
        return;
      }

      if (
        !/^\w+$/i.test(normalizedUsername) ||
        !/[a-z]/i.test(normalizedUsername)
      ) {
        setUsernameError(
          'Utilisez des lettres, chiffres ou _ (avec au moins une lettre).'
        );
        return;
      }

      setUsernameError('');
      await signUpWithEmail(name, normalizedUsername, gender, email, password);
    } else await signInWithEmail(email, password);
  };

  return (
    <div
      className={`w-full max-w-md overflow-y-auto overscroll-contain bg-main-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-light-primary shadow-xl transition-[height,max-height,border-radius] duration-300 ease-out dark:text-dark-primary ${
        sheetExpanded
          ? 'h-[100dvh] rounded-none pt-[max(1rem,env(safe-area-inset-top))]'
          : 'max-h-[100dvh] rounded-t-3xl pt-3'
      } sm:h-auto sm:max-h-[90vh] sm:rounded-lg sm:p-8`}
    >
      <button
        aria-label='Faire glisser pour agrandir ou fermer le formulaire'
        className='mb-3 flex w-full touch-none justify-center py-1 sm:hidden'
        onPointerDown={(event) => dragControls.start(event.nativeEvent)}
        type='button'
      >
        <span className='h-1 w-8 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
      </button>
      <div className='mb-6 flex items-start justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold'>
            {isSignUp ? 'Créer votre compte' : 'Se connecter'}
          </h2>
          <p className='mt-2 text-sm text-light-secondary dark:text-dark-secondary'>
            {isSignUp
              ? 'Rejoignez Inspiration avec votre adresse e-mail.'
              : 'Retrouvez votre compte Inspiration.'}
          </p>
        </div>
        <button
          className='custom-button accent-tab -mr-2 -mt-2 rounded-full p-2 text-2xl text-light-secondary dark:text-dark-secondary'
          aria-label='Fermer'
          onClick={closeModal}
          type='button'
        >
          ×
        </button>
      </div>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {isSignUp && (
          <label className='flex flex-col gap-2 text-sm font-bold'>
            Nom
            <input
              className='rounded-lg border border-light-line-reply bg-transparent px-4 py-3 font-normal outline-none transition focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 dark:border-dark-line-reply'
              onChange={(event) => setName(event.target.value)}
              placeholder='Votre nom'
              required
              type='text'
              value={name}
            />
          </label>
        )}
        {isSignUp && (
          <fieldset className='flex items-center gap-3 text-sm'>
            <legend className='shrink-0 font-bold'>Sexe</legend>
            <div className='flex min-w-0 flex-1 gap-2'>
              {(['homme', 'femme', 'autre'] as const).map((option) => (
                <label
                  className={`flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-2 py-1.5 text-xs capitalize transition sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
                    gender === option
                      ? 'border-accent-blue bg-accent-blue/10 text-accent-blue'
                      : 'border-light-line-reply dark:border-dark-line-reply'
                  }`}
                  key={option}
                >
                  <input
                    checked={gender === option}
                    className='h-3.5 w-3.5 shrink-0 accent-accent-blue sm:h-4 sm:w-4'
                    name='gender'
                    onChange={() => setGender(option)}
                    type='radio'
                    value={option}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        {isSignUp && (
          <label className='flex flex-col gap-2 text-sm font-bold'>
            Nom d’utilisateur
            <input
              autoComplete='username'
              className='rounded-lg border border-light-line-reply bg-transparent px-4 py-3 font-normal outline-none transition focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 dark:border-dark-line-reply'
              maxLength={15}
              minLength={4}
              onChange={(event) => {
                setUsername(event.target.value);
                setUsernameError('');
              }}
              placeholder='votre_nom'
              required
              type='text'
              value={username}
            />
            <span className='font-normal text-light-secondary dark:text-dark-secondary'>
              4 à 15 caractères : lettres, chiffres ou _.
            </span>
            {usernameError && (
              <span className='font-normal text-red-600' role='alert'>
                {usernameError}
              </span>
            )}
          </label>
        )}
        <label className='flex flex-col gap-2 text-sm font-bold'>
          E-mail
          <input
            autoComplete='email'
            className='rounded-lg border border-light-line-reply bg-transparent px-4 py-3 font-normal outline-none transition focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 dark:border-dark-line-reply'
            onChange={(event) => setEmail(event.target.value)}
            placeholder='vous@exemple.com'
            required
            type='email'
            value={email}
          />
        </label>
        <label className='flex flex-col gap-2 text-sm font-bold'>
          Mot de passe
          <div className='relative'>
            <input
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              className='w-full rounded-lg border border-light-line-reply bg-transparent px-4 py-3 pr-12 font-normal outline-none transition focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 dark:border-dark-line-reply'
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              placeholder='6 caractères minimum'
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
            />
            <button
              aria-label={
                showPassword
                  ? 'Masquer le mot de passe'
                  : 'Afficher le mot de passe'
              }
              className='custom-button absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-light-secondary hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10'
              onClick={() => setShowPassword((visible) => !visible)}
              type='button'
            >
              <MaterialIcon
                className='h-5 w-5'
                iconName={showPassword ? 'visibility_off' : 'visibility'}
              />
            </button>
          </div>
        </label>
        {error && (
          <p
            className='rounded-lg bg-red-500/10 p-3 text-sm text-red-600'
            role='alert'
          >
            {getAuthErrorMessage(error)}
          </p>
        )}
        <Button
          className='mt-2 bg-accent-blue font-bold text-white hover:brightness-90 focus-visible:!ring-accent-blue/80'
          loading={loading}
          type='submit'
        >
          {isSignUp ? "S'inscrire" : 'Se connecter'}
        </Button>
      </form>
    </div>
  );
}
