/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, createContext, useContext } from 'react';
import { updateUserTheme, updateUserData } from '@lib/firebase/utils';
import { avatarFrameOptions } from '@lib/avatar-shape';
import { DEFAULT_FONT, fontStacks, normalizeFont } from '@lib/fonts';
import { useAuth } from './auth-context';
import type { ReactNode, ChangeEvent } from 'react';
import type {
  Theme,
  Accent,
  FontType,
  AvatarShape,
  AvatarFrame
} from '@lib/types/theme';

type ThemeContext = {
  theme: Theme;
  accent: Accent;
  font: FontType;
  avatarShape: AvatarShape;
  avatarFrame: AvatarFrame;
  changeTheme: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  changeAccent: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  setFont: (font: FontType) => void;
  setAvatarShape: (shape: AvatarShape) => void;
  setAvatarFrame: (frame: AvatarFrame) => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

type ThemeContextProviderProps = {
  children: ReactNode;
};

const systemThemeQuery = '(prefers-color-scheme: dark)';

const availableThemes: Theme[] = ['auto', 'light', 'dim', 'dark'];

function normalizeTheme(theme: string | null | undefined): Theme {
  return availableThemes.includes(theme as Theme) ? (theme as Theme) : 'auto';
}

/* Thème réellement peint à l'écran. « Automatique » suit le réglage du
   système : bleu nuit la nuit, interface claire le jour. */
function resolveTheme(theme: Theme): Exclude<Theme, 'auto'> {
  if (theme !== 'auto') return theme;

  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia(systemThemeQuery).matches;

  return prefersDark ? 'dim' : 'light';
}

function setInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'auto';

  /* « Automatique » est le choix par défaut : l'interface suit le réglage
     clair / sombre du système tant que rien n'a été sélectionné. */
  return normalizeTheme(localStorage.getItem('theme'));
}

/* Applique le thème directement sur <html>, sans attendre le prochain rendu
   React. Le clic sur Automatique / Clair / Sombre / Noir absolu est donc
   instantané, même si l'interface contient beaucoup d'éléments à repeindre. */
function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const resolvedTheme = resolveTheme(theme);
  const targetTheme = resolvedTheme === 'dim' ? 'dark' : resolvedTheme;

  /* `data-theme` pilote les tons de texte et de bordure propres à chaque
     ambiance (voir globals.scss), `color-scheme` adapte les contrôles natifs. */
  root.setAttribute('data-theme', resolvedTheme);
  root.style.colorScheme = targetTheme === 'dark' ? 'dark' : 'light';
  root.classList.toggle('dark', targetTheme === 'dark');
  root.style.setProperty(
    '--main-background',
    `var(--${resolvedTheme}-background)`
  );
  root.style.setProperty(
    '--main-search-background',
    `var(--${resolvedTheme}-search-background)`
  );
  root.style.setProperty(
    '--main-sidebar-background',
    `var(--${resolvedTheme}-sidebar-background)`
  );
  localStorage.setItem('theme', theme);
}

function applyAccent(accent: Accent): void {
  if (typeof document === 'undefined') return;

  document.documentElement.style.setProperty(
    '--main-accent',
    `var(--accent-${accent})`
  );
  localStorage.setItem('accent', accent);
}

function applyFont(font: FontType): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const stack = fontStacks[font];

  root.style.setProperty('--font-main', stack);
  root.style.setProperty('--font-title', stack);
  localStorage.setItem('font', font);
}

const availableAccents: Accent[] = [
  'blue',
  'indigo',
  'pink',
  'purple',
  'red',
  'green'
];

function normalizeAccent(accent: string | null | undefined): Accent {
  if (availableAccents.includes(accent as Accent)) return accent as Accent;

  /* Anciennes couleurs retirées : le jaune, l'orange et le cyan manquaient
     de contraste ou se confondaient avec le bleu. On les remplace par les
     teintes les plus proches de la palette actuelle. */
  if (accent === 'yellow' || accent === 'cyan') return 'indigo';
  if (accent === 'orange') return 'red';

  return 'blue';
}

function setInitialAccent(): Accent {
  if (typeof window === 'undefined') return 'blue';
  return normalizeAccent(localStorage.getItem('accent'));
}

function setInitialFont(): FontType {
  if (typeof window === 'undefined') return DEFAULT_FONT;
  return normalizeFont(localStorage.getItem('font'));
}

/* Formes encore proposées aujourd'hui. Toutes les anciennes (fleur, nuage,
   ovale, rosette, carré arrondi, étoile, pentagone, décagone, triangle…)
   deviennent le carré : les profils enregistrés avant le changement gardent
   ainsi une forme cohérente. */
const avatarShapes: AvatarShape[] = [
  'circle',
  'square',
  'squircle',
  'heart',
  'diamond',
  'hexagon'
];

function normalizeAvatarShape(
  shape: AvatarShape | null | undefined
): AvatarShape {
  if (!shape) return 'circle';
  return avatarShapes.includes(shape) ? shape : 'square';
}

function setInitialAvatarShape(): AvatarShape {
  if (typeof window === 'undefined') return 'circle';
  const savedShape = localStorage.getItem('avatarShape') as AvatarShape | null;
  return normalizeAvatarShape(savedShape);
}

/* Cadres encore proposés : « aucun » et les décorations d'avatar. Tous les
   anciens cadres (halo, anneau, double, dégradé, pointillé, néon, or) ne
   dessinent plus rien. */
function normalizeAvatarFrame(
  frame: AvatarFrame | null | undefined
): AvatarFrame {
  return avatarFrameOptions.some(([frameKey]) => frameKey === frame)
    ? (frame as AvatarFrame)
    : 'none';
}

function setInitialAvatarFrame(): AvatarFrame {
  if (typeof window === 'undefined') return 'none';
  const savedFrame = localStorage.getItem('avatarFrame') as AvatarFrame | null;
  return normalizeAvatarFrame(savedFrame);
}

export function ThemeContextProvider({
  children
}: ThemeContextProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(setInitialTheme);
  const [accent, setAccent] = useState<Accent>(setInitialAccent);
  const [font, setFont] = useState<FontType>(setInitialFont);
  const [avatarShape, setAvatarShape] = useState<AvatarShape>(
    setInitialAvatarShape
  );
  const [avatarFrame, setAvatarFrame] = useState<AvatarFrame>(
    setInitialAvatarFrame
  );

  const { user } = useAuth();
  const {
    id: userId,
    theme: userTheme,
    accent: userAccent,
    avatarShape: userAvatarShape,
    avatarFrame: userAvatarFrame,
    customFont: userCustomFont
  } = user ?? {};

  useEffect(() => {
    if (user && userTheme) setTheme(normalizeTheme(userTheme));
  }, [userId, userTheme]);

  useEffect(() => {
    if (user && userAccent) setAccent(normalizeAccent(userAccent));
  }, [userId, userAccent]);

  useEffect(() => {
    if (user && userAvatarShape)
      setAvatarShape(normalizeAvatarShape(userAvatarShape));
  }, [userId, userAvatarShape]);

  useEffect(() => {
    if (user && userAvatarFrame)
      setAvatarFrame(normalizeAvatarFrame(userAvatarFrame));
  }, [userId, userAvatarFrame]);

  useEffect(() => {
    if (user && userCustomFont) setFont(normalizeFont(userCustomFont));
  }, [userId, userCustomFont]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  /* En mode « Automatique », on réagit en direct au changement de réglage
     clair / sombre du système. */
  useEffect(() => {
    if (theme !== 'auto') return undefined;

    const media = window.matchMedia(systemThemeQuery);
    const handleChange = (): void => applyTheme('auto');

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    if (!user) return undefined;

    /* L'interface a déjà changé : on laisse simplement le temps au clic
       suivant avant d'enregistrer sur le profil. */
    const timeoutId = setTimeout(
      () => void updateUserTheme(user.id, { theme }),
      400
    );

    return () => clearTimeout(timeoutId);
  }, [userId, theme]);

  useEffect(() => {
    applyAccent(accent);
  }, [accent]);

  useEffect(() => {
    if (!user) return undefined;

    const timeoutId = setTimeout(
      () => void updateUserTheme(user.id, { accent }),
      400
    );

    return () => clearTimeout(timeoutId);
  }, [userId, accent]);

  useEffect(() => {
    applyFont(font);
  }, [font]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-avatar-shape', avatarShape);
    localStorage.setItem('avatarShape', avatarShape);

    if (user?.id)
      void updateUserData(user.id, { avatarShape }).catch(() => undefined);
  }, [userId, avatarShape]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-avatar-frame', avatarFrame);
    localStorage.setItem('avatarFrame', avatarFrame);

    if (user?.id)
      void updateUserData(user.id, { avatarFrame }).catch(() => undefined);
  }, [userId, avatarFrame]);

  const selectTheme = (newTheme: Theme): void => {
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  const selectAccent = (newAccent: Accent): void => {
    applyAccent(newAccent);
    setAccent(newAccent);
  };

  const changeTheme = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => selectTheme(value as Theme);

  const changeAccent = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => selectAccent(value as Accent);

  const handleSetFont = (newFont: FontType): void => {
    applyFont(newFont);
    setFont(newFont);

    if (user?.id)
      void updateUserData(user.id, { customFont: newFont }).catch(
        () => undefined
      );
  };

  const value: ThemeContext = {
    theme,
    accent,
    font,
    avatarShape,
    avatarFrame,
    changeTheme,
    changeAccent,
    setTheme: selectTheme,
    setAccent: selectAccent,
    setFont: handleSetFont,
    setAvatarShape,
    setAvatarFrame
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContext {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('useTheme must be used within an ThemeContextProvider');

  return context;
}
