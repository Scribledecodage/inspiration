import { useEffect, useRef } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { useTheme } from '@lib/context/theme-context';

/**
 * Synchronise l'apparence entre le site et l'application de bureau.
 *
 * Le site enregistre le thème, l'accent et la police dans le profil de
 * l'utilisateur : l'application les relit au démarrage, ce qui donne
 * exactement la même apparence des deux côtés.
 */
export function ThemeSync() {
  const { user } = useAuth();
  const { theme, accent, font, setTheme, setAccent, setFont } = useTheme();

  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    if (!user) return;

    applied.current = true;

    if (user.theme && user.theme !== theme) setTheme(user.theme);
    if (user.accent && user.accent !== accent) setAccent(user.accent);
    if (user.customFont && user.customFont !== font) setFont(user.customFont);
  }, [user, theme, accent, font, setTheme, setAccent, setFont]);

  return null;
}
