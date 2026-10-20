import { useRouter } from 'next/router';
import cn from 'clsx';
import { SettingsNav } from './settings-nav';
import type { ReactNode } from 'react';

type SettingsFrameProps = {
  children: ReactNode;
};

/**
 * Cadre commun des paramètres : la colonne de catégories reste visible à
 * gauche et le contenu de la rubrique sélectionnée s'affiche à droite.
 *
 * Sur téléphone, une seule colonne est visible à la fois : la liste des
 * paramètres au départ, puis le détail après un clic. Cela évite d'afficher
 * le compte et toutes les rubriques à la suite sous la liste.
 */
export function SettingsFrame({ children }: SettingsFrameProps): JSX.Element {
  const { asPath, pathname } = useRouter();
  const isSettingsIndex = pathname === '/settings' && !asPath.includes('?');

  return (
    <main className='flex min-h-[100dvh] w-full max-w-[1120px] flex-col self-start border-light-border/70 bg-main-background pb-28 dark:border-dark-border/70 xs:border-x xs:pb-12 lg:flex-row lg:pb-0'>
      <SettingsNav
        className={cn(isSettingsIndex ? 'block' : 'hidden', 'lg:block')}
      />
      <section
        className={cn(
          'min-w-0 flex-1',
          isSettingsIndex ? 'hidden lg:block' : 'block'
        )}
      >
        {children}
      </section>
    </main>
  );
}
