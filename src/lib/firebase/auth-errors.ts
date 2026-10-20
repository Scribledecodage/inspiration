/**
 * Messages d'erreur Firebase Authentication en français, partagés par les
 * écrans de connexion et de sécurité du compte.
 */
export function getAuthErrorMessage(authError: unknown): string {
  const error = authError as Error & { code?: string };
  const code = error?.code ?? '';

  if (
    [
      'auth/wrong-password',
      'auth/invalid-credential',
      'auth/invalid-login-credentials'
    ].includes(code)
  )
    return 'Mot de passe incorrect. Vérifiez votre saisie puis réessayez.';

  if (code === 'auth/weak-password')
    return 'Le mot de passe doit contenir au moins 6 caractères.';

  if (code === 'auth/requires-recent-login')
    return 'Pour votre sécurité, reconnectez-vous à votre compte avant de réessayer.';

  if (code === 'auth/too-many-requests')
    return 'Trop de tentatives. Patientez quelques minutes avant de réessayer.';

  if (code === 'auth/network-request-failed')
    return 'Connexion impossible. Vérifiez votre connexion internet puis réessayez.';

  if (code === 'auth/user-disabled') return 'Ce compte a été désactivé.';

  if (code === 'auth/invalid-email')
    return 'Cette adresse e-mail n’est pas valide.';

  if (code === 'auth/missing-password')
    return 'Saisissez votre mot de passe pour continuer.';

  const message = error?.message ?? '';
  if (!message) return 'Une erreur est survenue. Réessayez dans un instant.';

  return message.replace(/^Firebase:\s*Error\s*\([^)]*\)\.?\s*/i, '');
}
