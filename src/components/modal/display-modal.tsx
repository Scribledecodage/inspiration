import cn from 'clsx';
import { useTheme } from '@lib/context/theme-context';
import { canUseTransparentWindow } from '@lib/desktop';
import { DEFAULT_FONT, fontOptions, fontStacks } from '@lib/fonts';
import { InputThemeRadio } from '@components/input/input-theme-radio';
import { Button } from '@components/ui/button';
import { InputAccentRadio } from '@components/input/input-accent-radio';
import { MaterialIcon } from '@components/ui/material-icon';
import { SiteLogo } from '@components/common/site-logo';
import { Toggle } from '@components/ui/toggle';
import type { IconName } from '@components/ui/material-icon';
import type { Theme, Accent } from '@lib/types/theme';

type DisplayModalProps = {
  closeModal: () => void;
};

const themes: Readonly<[Theme, string, string][]> = [
  ['auto', 'Automatique', 'S’adapte au réglage de votre système'],
  ['light', 'Clair', 'Interface lumineuse'],
  ['dim', 'Sombre', 'Bleu nuit apaisant'],
  ['dark', 'Noir absolu', 'Contraste maximal']
];

const accentsColor: Readonly<[Accent, string][]> = [
  ['blue', 'Bleu'],
  ['indigo', 'Indigo'],
  ['pink', 'Rose'],
  ['purple', 'Violet'],
  ['red', 'Rouge'],
  ['green', 'Vert']
];

type SectionHeaderProps = {
  iconName: IconName;
  title: string;
  description: string;
};

function SectionHeader({
  iconName,
  title,
  description
}: SectionHeaderProps): JSX.Element {
  return (
    <div className='flex items-start gap-3'>
      <span
        className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center
                   rounded-lg bg-main-accent/10 text-main-accent'
      >
        <MaterialIcon className='h-4 w-4' iconName={iconName} />
      </span>
      <div className='min-w-0'>
        <h3 className='text-sm font-semibold tracking-tight text-light-primary dark:text-dark-primary'>
          {title}
        </h3>
        <p className='mt-0.5 text-xs leading-relaxed text-light-secondary dark:text-dark-secondary'>
          {description}
        </p>
      </div>
    </div>
  );
}

export function DisplayModal({ closeModal }: DisplayModalProps): JSX.Element {
  const {
    font,
    setTheme,
    setAccent,
    setFont,
    transparentWindow,
    setTransparentWindow
  } = useTheme();

  const handleReset = (): void => {
    setTheme('auto');
    setAccent('blue');
    setFont(DEFAULT_FONT);
  };

  return (
    <div className='flex flex-col gap-7'>
      <header className='flex items-start gap-4'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-[1.25rem] leading-tight text-light-primary dark:text-dark-primary'>
            Apparence
          </h2>
          <p className='mt-2 max-w-md text-sm leading-relaxed text-light-secondary dark:text-dark-secondary'>
            Ajustez les couleurs, le thème et la typographie. Chaque
            modification s’applique en direct, dans toute l’application.
          </p>
        </div>
        <Button
          aria-label='Fermer la fenêtre Apparence'
          className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-light-secondary
                     transition-colors duration-200 hover:bg-light-primary/10 hover:text-light-primary
                     dark:text-dark-secondary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary'
          onClick={closeModal}
        >
          <MaterialIcon className='h-8 w-8' iconName='close' />
        </Button>
      </header>

      {/* Aperçu en direct — même mise en page qu’une publication */}
      <section
        aria-label='Aperçu du thème'
        className='overflow-hidden rounded-md border border-light-border bg-main-background dark:border-dark-border'
      >
        <div
          className='flex items-center justify-between border-b border-light-border px-4 py-2
                     dark:border-dark-border'
        >
          <span className='text-[11px] text-light-secondary dark:text-dark-secondary'>
            Aperçu en direct
          </span>
          <span className='text-[11px] text-light-secondary dark:text-dark-secondary'>
            Publication
          </span>
        </div>

        <article className='px-4 py-3.5'>
          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center gap-x-1.5 leading-none text-light-secondary dark:text-dark-secondary'>
              <SiteLogo size={20} className='shrink-0' />
              <span className='font-bold text-light-primary dark:text-dark-primary'>
                Inspiration
              </span>
              <span className='flex h-5 w-5 shrink-0 items-center justify-center'>
                <MaterialIcon
                  className='h-[18px] w-[18px] text-main-accent'
                  iconName='verified'
                  solid
                />
              </span>
              <span className='truncate'>@inspiration</span>
              <span>· maintenant</span>
            </div>
            <p className='mt-1 text-[15px] leading-normal text-light-primary dark:text-dark-primary'>
              Un espace pour partager vos idées, découvrir d’autres perspectives
              et créer des liens qui comptent. Prenez place : votre prochaine
              conversation commence ici.
            </p>
            <div className='mt-2 flex items-center justify-between text-light-secondary dark:text-dark-secondary'>
              <span className='flex items-center gap-1.5'>
                <span className='rounded-full p-1.5'>
                  <MaterialIcon className='h-5 w-5' iconName='chat_bubble' />
                </span>
                <span className='text-sm'>12</span>
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='rounded-full p-1.5'>
                  <MaterialIcon className='h-5 w-5' iconName='repeat' />
                </span>
                <span className='text-sm'>4</span>
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='rounded-full p-1.5'>
                  <MaterialIcon className='h-5 w-5' iconName='favorite' />
                </span>
                <span className='text-sm'>48</span>
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='rounded-full p-1.5'>
                  <MaterialIcon className='h-5 w-5' iconName='ios_share' />
                </span>
              </span>
            </div>
          </div>
        </article>
      </section>

      {/* Couleur d'accent */}
      <section className='flex flex-col gap-3'>
        <SectionHeader
          iconName='palette'
          title='Couleur d’accent'
          description='Utilisée pour les boutons, les liens et les éléments actifs.'
        />
        <div className='grid grid-cols-2 gap-2.5 sm:grid-cols-3'>
          {accentsColor.map(([accentColor, label]) => (
            <InputAccentRadio
              type={accentColor}
              label={label}
              key={accentColor}
            />
          ))}
        </div>
      </section>

      {/* Thème */}
      <section className='flex flex-col gap-3'>
        <SectionHeader
          iconName='appearance'
          title='Thème'
          description='Choisissez l’ambiance qui vous accompagne.'
        />
        <div
          className='divide-y divide-light-border overflow-hidden rounded-xl border
                     border-light-border dark:divide-dark-border dark:border-dark-border'
        >
          {themes.map(([themeType, label, description]) => (
            <InputThemeRadio
              type={themeType}
              label={label}
              description={description}
              key={themeType}
            />
          ))}
        </div>
      </section>

      {/* Typographie */}
      <section className='flex flex-col gap-3'>
        <SectionHeader
          iconName='description'
          title='Police de caractères'
          description='Sélectionnez la famille qui vous accompagne au quotidien.'
        />
        <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
          {fontOptions.map(({ key, label, description }): JSX.Element => {
            const isSelected = font === key;

            return (
              <button
                key={key}
                type='button'
                aria-pressed={isSelected}
                onClick={(): void => setFont(key)}
                className={cn(
                  `group flex h-[78px] items-center gap-3 overflow-hidden rounded-xl border
                   p-3 text-left transition-colors duration-200 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-main-accent/40`,
                  isSelected
                    ? 'border-main-accent bg-main-accent/10'
                    : 'border-light-border bg-light-primary/[0.02] hover:border-light-secondary/40 hover:bg-light-primary/[0.05] dark:border-dark-border dark:bg-dark-primary/[0.02] dark:hover:border-dark-secondary/60 dark:hover:bg-dark-primary/[0.05]'
                )}
              >
                <span
                  aria-hidden='true'
                  className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg
                             bg-main-accent/10 text-xl font-semibold text-main-accent'
                  style={{ fontFamily: fontStacks[key] }}
                >
                  Aa
                </span>
                <span className='min-w-0 flex-1'>
                  <span
                    className={cn(
                      'block truncate text-sm font-semibold',
                      isSelected
                        ? 'text-main-accent'
                        : 'text-light-primary dark:text-dark-primary'
                    )}
                  >
                    {label}
                  </span>
                  <span
                    className='mt-0.5 block overflow-hidden text-xs leading-snug
                               text-light-secondary [display:-webkit-box]
                               [-webkit-box-orient:vertical] [-webkit-line-clamp:2]
                               dark:text-dark-secondary'
                  >
                    {description}
                  </span>
                </span>
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
                    isSelected
                      ? 'border-transparent bg-main-accent text-white'
                      : 'border-light-border text-transparent dark:border-dark-border'
                  )}
                >
                  <MaterialIcon className='h-4 w-4' iconName='check' />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Fond transparent : uniquement dans l'application de bureau, et
          seulement sous Windows (c'est Windows qui floue le fond). */}
      {canUseTransparentWindow() && (
        <section className='flex flex-col gap-3'>
          <SectionHeader
            iconName='visibility'
            title='Fond transparent'
            description='La fenêtre laisse voir le bureau, flouté comme la barre des tâches de Windows.'
          />
          <div className='flex items-center justify-between gap-4 rounded-xl border border-light-border bg-main-background px-4 py-3 dark:border-dark-border'>
            <span className='text-sm font-semibold text-light-primary dark:text-dark-primary'>
              Fond flouté
            </span>
            <Toggle
              checked={transparentWindow}
              label='Fond transparent de la fenêtre'
              onChange={setTransparentWindow}
            />
          </div>
        </section>
      )}

      <footer
        className='flex flex-col gap-3 border-t border-light-border pt-5
                   dark:border-dark-border sm:flex-row sm:items-center sm:justify-between'
      >
        <p className='order-2 text-xs leading-relaxed text-light-secondary dark:text-dark-secondary sm:order-1'>
          Vos préférences sont appliquées en direct.
        </p>
        <div className='order-1 flex items-center justify-end gap-2 sm:order-2'>
          <Button
            className='rounded-full px-4 py-2 text-sm font-semibold text-light-secondary
                       transition-colors duration-200 hover:bg-light-primary/5 hover:text-light-primary
                       dark:text-dark-secondary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary'
            onClick={handleReset}
          >
            Réinitialiser
          </Button>
          <Button
            className='rounded-full bg-main-accent px-4 py-2 text-sm font-semibold text-white
                       transition hover:bg-main-accent/90 active:scale-[0.98]'
            onClick={closeModal}
          >
            Enregistrer
          </Button>
        </div>
      </footer>
    </div>
  );
}
