import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';
import { EMOJI_CATEGORIES, EMOJIS, normalizeEmojiSearch } from '@lib/emoji';
import { useWindow } from '@lib/context/window-context';
import type { EmojiEntry } from '@lib/emoji';

type EmojiPickerProps = {
  open: boolean;
  closeModal: () => void;
  onSelect: (emoji: string) => void;
  /** Texte en cours de saisie : il est repris en aperçu dans la fenêtre. */
  value?: string;
  /** Position du curseur dans le texte. */
  caret?: number;
};

/* Clé de stockage des emojis utilisés récemment. */
const RECENT_KEY = 'recentEmojis';
/* Nombre d'emojis gardés dans les « récents » : de quoi remplir une ligne
   entière de la grille. */
const MAX_RECENT = 12;
/* Nombre maximum de résultats affichés pour une recherche. */
const MAX_RESULTS = 60;
/* En dessous de cette largeur, c'est une feuille qui remonte du bas. */
const SHEET_WIDTH = 640;
/* Distance de glissement au-delà de laquelle la feuille se referme. */
const DRAG_CLOSE = 80;

function readRecentEmojis(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) return [];

    /* Les doublons sont retirés : une ancienne version du sélecteur pouvait
       en enregistrer, et deux emojis identiques ne doivent pas partager la
       même clé. */
    const seen = new Set<string>();

    return parsed.filter((item): item is string => {
      if (typeof item !== 'string' || seen.has(item)) return false;

      seen.add(item);
      return true;
    });
  } catch {
    return [];
  }
}

function writeRecentEmojis(emojis: string[]): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(emojis));
  } catch {
    /* Stockage indisponible (navigation privée) : on continue sans
       mémoriser les emojis récents. */
  }
}

type EmojiButtonProps = {
  emoji: string;
  title?: string;
  onSelect: (emoji: string) => void;
  /* L'emoji survolé : il apparaît dans l'aperçu du message. */
  onHover?: (emoji: string | null) => void;
};

function EmojiButton({
  emoji,
  title,
  onSelect,
  onHover
}: EmojiButtonProps): JSX.Element {
  return (
    <button
      aria-label={title ?? emoji}
      className='flex h-9 w-9 items-center justify-center rounded-lg text-2xl leading-none transition
                 hover:bg-light-secondary/10 active:scale-90 dark:hover:bg-dark-secondary/10'
      onClick={(): void => onSelect(emoji)}
      onMouseEnter={(): void => onHover?.(emoji)}
      onMouseLeave={(): void => onHover?.(null)}
      onFocus={(): void => onHover?.(emoji)}
      onBlur={(): void => onHover?.(null)}
      title={title}
      type='button'
    >
      {emoji}
    </button>
  );
}

/**
 * Sélecteur d'emoji.
 *
 * Il s'appuie sur la fenêtre native du navigateur (API Popover) : le
 * navigateur gère l'affichage dans son calque supérieur, la fermeture au
 * clic dehors, la touche Échap, et l'animation (transitions CSS). Rien
 * n'est calculé en JavaScript pendant l'ouverture, et la page n'est jamais
 * verrouillée : sa barre de défilement ne bouge pas.
 *
 * Sur téléphone, c'est une feuille qui remonte du bas, que l'on peut
 * refermer en la tirant vers le bas. Sur ordinateur, une fenêtre centrée
 * comme les autres : les catégories sont listées à la verticale et le
 * bouton bleu suit la section que l'on est en train de parcourir.
 */
export function EmojiPicker({
  open,
  closeModal,
  onSelect,
  value,
  caret
}: EmojiPickerProps): JSX.Element {
  const { width } = useWindow();
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const dragRef = useRef<{ startY: number; distance: number } | null>(null);

  /* En dessous de cette largeur, c'est une feuille qui remonte du bas. */
  const isSheet = width < SHEET_WIDTH;

  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('all');
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);
  const [nativePopover, setNativePopover] = useState<boolean | null>(null);

  /* Les navigateurs récents savent faire cette fenêtre eux-mêmes ; sinon on
     retombe sur un simple affichage conditionnel. */
  useEffect((): void => {
    setNativePopover(
      typeof HTMLElement !== 'undefined' &&
        typeof HTMLElement.prototype.showPopover === 'function'
    );
  }, []);

  /* Ouverture et fermeture de la fenêtre native. L'effet est exécuté avant
     celui qui positionne le menu, pour que la mesure soit faite sur la
     fenêtre déjà affichée (et éviter un clignotement). */
  useLayoutEffect((): void => {
    const panel = panelRef.current;
    if (!panel || !nativePopover) return;

    if (open) {
      if (!panel.matches(':popover-open')) {
        /* Le navigateur donne le focus à la fenêtre native qu'il ouvre. Sur
           téléphone, la zone de saisie perd alors le focus : le clavier se
           ferme, la page change de hauteur, et tout clignote. On lui rend
           donc le focus (sans faire défiler la page).

           Sur téléphone, en revanche, on laisse faire : la feuille d'emoji
           est en bas de l'écran, le clavier la recouvrirait. */
        const previous = document.activeElement as HTMLElement | null;

        panel.showPopover();

        if (
          !isSheet &&
          previous &&
          previous !== document.body &&
          document.activeElement === panel
        ) {
          previous.focus({ preventScroll: true });
        }
      }
    } else if (panel.matches(':popover-open')) {
      panel.hidePopover();
    }
  }, [open, nativePopover, isSheet]);

  /* Tant que la fenêtre est ouverte, la page derrière ne défile plus (à la
     molette comme au doigt). La grille, elle, défile normalement. */
  useEffect((): (() => void) => {
    const panel = panelRef.current;
    if (!panel || !nativePopover) return () => undefined;

    const preventScroll = (event: Event): void => {
      if (!panel.matches(':popover-open')) return;

      const target = event.target as Node | null;
      if (target && panel.contains(target)) return;

      event.preventDefault();
    };

    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [nativePopover]);

  /* La fenêtre native reste ouverte pendant tout le clic : si elle se
     refermait dès l'appui, le clic suivant viserait la publication (en
     dessous) et la refermerait aussi. La fermeture au clic dehors est donc
     gérée à la main, sur le clic. */
  useEffect((): (() => void) => {
    const panel = panelRef.current;
    if (!panel || !nativePopover) return () => undefined;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      if (!panel.matches(':popover-open')) return;

      /* Échap ne referme que le menu emoji, pas la publication. */
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [closeModal, nativePopover]);

  /* La fermeture au clic dehors (native) doit être remontée au parent. */
  useEffect((): (() => void) => {
    const panel = panelRef.current;
    if (!panel || !nativePopover) return () => undefined;

    const handleToggle = (event: Event): void => {
      const { newState } = event as ToggleEvent;

      if (newState === 'closed') closeModal();
    };

    panel.addEventListener('toggle', handleToggle);
    return () => panel.removeEventListener('toggle', handleToggle);
  }, [closeModal, nativePopover]);

  /* Le clic qui referme le menu emoji ne doit pas atteindre la
     publication : on l'avale (au cas où le clic atterrirait vraiment à
     côté du fond). */
  useEffect((): (() => void) => {
    const panel = panelRef.current;
    if (!panel || !nativePopover) return () => undefined;

    const handlePointerDown = (event: PointerEvent): void => {
      if (!panel.matches(':popover-open')) return;

      const target = event.target as Node | null;
      if (target && panel.contains(target)) return;

      const swallow = (clickEvent: MouseEvent): void => {
        clickEvent.stopPropagation();
        clickEvent.preventDefault();
        document.removeEventListener('click', swallow, true);
        closeModal();
      };

      document.addEventListener('click', swallow, true);
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () =>
      document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [closeModal, nativePopover]);

  /* À chaque ouverture, on repart d'une recherche vide et on relit les
     emojis récemment utilisés. */
  useEffect((): void => {
    if (!open) return;

    setQuery('');
    setActiveSection('all');
    setHoveredEmoji(null);
    setRecent(readRecentEmojis());
  }, [open]);

  const normalizedQuery = useMemo(() => normalizeEmojiSearch(query), [query]);

  /* Recherche dans tout le catalogue, doublons retirés (un emoji peut
     appartenir à deux catégories). */
  const results = useMemo((): EmojiEntry[] => {
    if (!normalizedQuery) return [];

    const seen = new Set<string>();
    const found: EmojiEntry[] = [];

    for (const entry of EMOJIS) {
      if (seen.has(entry.emoji)) continue;

      const haystack = normalizeEmojiSearch(
        `${entry.name} ${entry.keywords} ${entry.category}`
      );

      if (!haystack.includes(normalizedQuery)) continue;

      seen.add(entry.emoji);
      found.push(entry);

      if (found.length >= MAX_RESULTS) break;
    }

    return found;
  }, [normalizedQuery]);

  const entriesByCategory = useMemo(() => {
    const grouped: Record<string, EmojiEntry[]> = {};

    EMOJI_CATEGORIES.forEach(({ id }) => {
      grouped[id] = EMOJIS.filter((entry) => entry.category === id);
    });

    return grouped;
  }, []);

  const isSearching = normalizedQuery.length > 0;

  /* Aperçu du message : le texte est coupé au curseur, et l'emoji survolé
     s'y insère comme il le fera. */
  const preview = useMemo(() => {
    const text = value ?? '';
    const position = Math.max(0, Math.min(caret ?? text.length, text.length));

    return { before: text.slice(0, position), after: text.slice(position) };
  }, [value, caret]);

  /* Le défilement met en bleu la catégorie que l'on est en train de
     parcourir : on sait toujours où l'on se trouve. Les positions sont
     mesurées à l'écran (et non avec `offsetTop`, qui dépend du parent
     positionné). */
  const handleScroll = useCallback((): void => {
    const grid = gridRef.current;
    if (!grid) return;

    const gridTop = grid.getBoundingClientRect().top;
    let current = 'all';

    EMOJI_CATEGORIES.forEach(({ id }) => {
      const element = sectionRefs.current[id];

      if (element && element.getBoundingClientRect().top <= gridTop + 16)
        current = id;
    });

    setActiveSection((previous) => (previous === current ? previous : current));
  }, []);

  /* Un clic sur une catégorie amène à sa section. */
  const scrollToSection = useCallback((id: string): void => {
    const grid = gridRef.current;
    const element = sectionRefs.current[id];

    if (!grid) return;

    if (id === 'all') {
      grid.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!element) return;

    const offset =
      grid.scrollTop +
      element.getBoundingClientRect().top -
      grid.getBoundingClientRect().top;

    grid.scrollTo({ top: offset - 4, behavior: 'smooth' });
  }, []);

  const handleSelect = (emoji: string): void => {
    const next = [emoji, ...recent.filter((item) => item !== emoji)].slice(
      0,
      MAX_RECENT
    );

    setRecent(next);
    writeRecentEmojis(next);

    onSelect(emoji);
  };

  /* Sur téléphone, la barre du haut permet de faire glisser la feuille vers
     le bas pour la refermer. */
  const handleDragStart = (
    event: React.PointerEvent<HTMLButtonElement>
  ): void => {
    if (!isSheet) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startY: event.clientY, distance: 0 };
  };

  const handleDragMove = (
    event: React.PointerEvent<HTMLButtonElement>
  ): void => {
    const drag = dragRef.current;
    const panel = panelRef.current;

    if (!drag || !panel) return;

    const distance = Math.max(0, event.clientY - drag.startY);
    drag.distance = distance;

    panel.style.transform = `translateY(${distance}px)`;
  };

  const handleDragEnd = (): void => {
    const drag = dragRef.current;
    const panel = panelRef.current;

    dragRef.current = null;

    if (!drag || !panel) return;

    panel.style.transform = '';

    if (drag.distance > DRAG_CLOSE) closeModal();
  };

  /* Sans l'API native, on se contente d'afficher ou non la fenêtre. */
  if (nativePopover === null) return <></>;
  if (!nativePopover && !open) return <></>;

  return (
    <>
      {/* Repli sans l'API native : un fond qui referme la fenêtre au clic
          dehors (l'API native fait déjà ça toute seule). */}
      {!nativePopover && (
        <div
          aria-hidden='true'
          className='fixed inset-0 z-[70] bg-black/40 dark:bg-[#5B7083]/40'
          onClick={closeModal}
        />
      )}

      <div
        aria-label='Sélecteur d’emoji'
        className={cn(
          /* La fenêtre native reste en position fixe (c'est le navigateur qui
             la place dans son calque supérieur et qui la centre) : la mettre
             dans le flux la ferait repousser le reste de la page.
             Dès que la fenêtre n'est plus une feuille (à partir de 640 px,
             comme le test `isSheet`), elle garde une taille de fenêtre
             classique : sans cela, elle occupait tout l'écran. */
          'emoji-picker max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-lg border-t border-light-border bg-main-background shadow-2xl dark:border-dark-border sm:h-[560px] sm:max-h-[85vh] sm:max-w-2xl sm:rounded-lg sm:border',
          /* Repli sans l'API native : la fenêtre est affichée normalement. */
          !nativePopover && '!flex !transform-none !opacity-100'
        )}
        /* Fenêtre native en mode « manuel » : le navigateur ne referme
           rien tout seul, on s'en charge ici (au clic). Le mode « auto »
           refermerait la fenêtre dès l'appui, et le clic suivant viserait
           la publication, en dessous : elle se refermerait aussi. */
        {...(nativePopover ? { popover: 'manual' } : {})}
        ref={panelRef}
        role='dialog'
        /* Un clic sur le fond (au-dessus de la feuille) referme le menu. */
        onClick={(event): void => {
          if (event.target === event.currentTarget) closeModal();
        }}
        /* La fenêtre vit dans le calque supérieur du navigateur : on
           empêche le clic de remonter jusqu'à la feuille de publication
           (qui se mettrait à glisser) et la touche Échap de fermer les
           deux fenêtres à la fois. */
        onKeyDown={(event): void => {
          if (event.key === 'Escape') event.stopPropagation();
        }}
        onPointerDown={(event): void => event.stopPropagation()}
      >
        {/* Barre fine : sur téléphone, elle sert de poignée pour faire
          glisser la feuille vers le bas et la refermer. Au-delà de 640 px
          (la fenêtre n'est plus une feuille), elle n'a plus lieu d'être. */}
        <button
          aria-label='Faire glisser pour fermer le sélecteur d’emoji'
          className='flex w-full shrink-0 touch-none justify-center py-3 sm:hidden'
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          type='button'
        >
          <span className='h-1 w-10 rounded-full bg-light-secondary/40 dark:bg-dark-secondary/50' />
        </button>

        <div className='flex shrink-0 items-center justify-between gap-3 px-4 py-2.5'>
          <h2 className='text-lg font-bold text-light-primary dark:text-dark-primary'>
            Emojis
          </h2>
          <button
            aria-label='Fermer le sélecteur d’emoji'
            className='-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10'
            onClick={closeModal}
            type='button'
          >
            <MaterialIcon className='h-5 w-5' iconName='close' />
          </button>
        </div>

        {/* Recherche : elle filtre tout le catalogue, pas seulement la
          catégorie affichée. */}
        <div className='shrink-0 px-3 pt-1'>
          <label className='relative block'>
            <MaterialIcon
              className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-light-secondary dark:text-dark-secondary'
              iconName='search'
            />
            <input
              aria-label='Rechercher un emoji'
              autoComplete='off'
              className='w-full rounded-full bg-light-secondary/10 py-2 pl-9 pr-8 text-sm text-light-primary outline-none ring-main-accent focus:ring-2 dark:bg-dark-secondary/10 dark:text-dark-primary'
              onChange={(event): void => setQuery(event.target.value)}
              onKeyDown={(event): void => {
                if (event.key === 'Escape') closeModal();
              }}
              placeholder='Rechercher un emoji…'
              type='search'
              value={query}
            />
            {isSearching && (
              <button
                aria-label='Effacer la recherche'
                className='absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-light-secondary transition hover:bg-light-primary/10 dark:text-dark-secondary dark:hover:bg-dark-primary/10'
                onClick={(): void => setQuery('')}
                type='button'
              >
                <MaterialIcon className='h-4 w-4' iconName='close' />
              </button>
            )}
          </label>
        </div>

        {/* Aperçu du message : on voit tout de suite où l'emoji va tomber.
          Sa hauteur est fixe : le texte qui s'y affiche ne doit pas
          déplacer la fenêtre. */}
        <div className='mx-3 mt-2 h-[3.75rem] shrink-0 overflow-hidden rounded-lg border border-light-line-reply bg-main-search-background/40 p-3 dark:border-dark-line-reply'>
          {preview.before || preview.after || hoveredEmoji ? (
            <p className='line-clamp-2 whitespace-pre-wrap break-words text-sm leading-6 text-light-primary dark:text-dark-primary'>
              {preview.before}
              {hoveredEmoji && (
                <span className='bg-main-accent/15 rounded px-0.5'>
                  {hoveredEmoji}
                </span>
              )}
              <span className='inline-block h-4 w-0.5 translate-y-0.5 bg-main-accent' />
              {preview.after}
            </p>
          ) : (
            <p className='text-sm text-light-secondary dark:text-dark-secondary'>
              Votre message apparaîtra ici.
            </p>
          )}
        </div>

        <div className='flex min-h-0 flex-1'>
          {/* Sur ordinateur : les catégories sont listées à la verticale, et
            la section parcourue est en bleu. */}
          {!isSheet && !isSearching && (
            <nav
              aria-label='Catégories d’emoji'
              className='flex w-32 shrink-0 flex-col items-stretch gap-0.5 overflow-y-auto border-r border-light-border/60 py-2 dark:border-dark-border/60'
            >
              <SectionButton
                active={activeSection === 'all'}
                full
                label='Tout'
                onClick={(): void => scrollToSection('all')}
              />
              {EMOJI_CATEGORIES.map(({ id, label }) => (
                <SectionButton
                  active={activeSection === id}
                  full
                  key={id}
                  label={label}
                  onClick={(): void => scrollToSection(id)}
                />
              ))}
            </nav>
          )}

          <div className='flex min-w-0 flex-1 flex-col'>
            {/* Sur téléphone : les catégories restent en ligne, et celle que
              l'on parcourt passe en bleu. */}
            {isSheet && !isSearching && (
              <div className='flex shrink-0 gap-1 overflow-x-auto px-3 py-2'>
                <SectionButton
                  active={activeSection === 'all'}
                  label='Tout'
                  onClick={(): void => scrollToSection('all')}
                />
                {EMOJI_CATEGORIES.map(({ id, label }) => (
                  <SectionButton
                    active={activeSection === id}
                    key={id}
                    label={label}
                    onClick={(): void => scrollToSection(id)}
                  />
                ))}
              </div>
            )}

            {/* La liste : toutes les sections à la suite. En descendant, on
              voit tous les emojis ; le bouton bleu suit la progression. */}
            <div
              className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3'
              onScroll={handleScroll}
              ref={gridRef}
            >
              {isSearching ? (
                results.length ? (
                  <div className='grid grid-cols-8 gap-0.5 sm:grid-cols-10 lg:grid-cols-12'>
                    {results.map((entry) => (
                      <EmojiButton
                        emoji={entry.emoji}
                        key={entry.emoji}
                        onHover={setHoveredEmoji}
                        onSelect={handleSelect}
                        title={entry.name}
                      />
                    ))}
                  </div>
                ) : (
                  <p className='px-2 py-6 text-center text-sm text-light-secondary dark:text-dark-secondary'>
                    Aucun emoji trouvé.
                  </p>
                )
              ) : (
                <>
                  {recent.length > 0 && (
                    <section>
                      {/* L'en-tête colle au défilement, mais il n'est pas collé
                        aux bords : un peu de marge et des coins arrondis. */}
                      <h3 className='dark:bg-dark-background/90 sticky top-1 z-10 mb-1 ml-1 inline-block rounded-full bg-main-background/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-light-secondary backdrop-blur dark:text-dark-secondary'>
                        Récents
                      </h3>
                      {/* Les emojis récents remplissent la ligne, comme les
                        autres sections. */}
                      <div className='grid grid-cols-8 gap-0.5 sm:grid-cols-10 lg:grid-cols-12'>
                        {recent.map((emoji) => (
                          <EmojiButton
                            emoji={emoji}
                            key={emoji}
                            onHover={setHoveredEmoji}
                            onSelect={handleSelect}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {EMOJI_CATEGORIES.map(({ id, label }) => (
                    <section
                      key={id}
                      ref={(element): void => {
                        sectionRefs.current[id] = element;
                      }}
                    >
                      <h3 className='dark:bg-dark-background/90 sticky top-1 z-10 mb-1 ml-1 inline-block rounded-full bg-main-background/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-light-secondary backdrop-blur dark:text-dark-secondary'>
                        {label}
                      </h3>
                      <div className='grid grid-cols-8 gap-0.5 sm:grid-cols-10 lg:grid-cols-12'>
                        {entriesByCategory[id].map((entry) => (
                          <EmojiButton
                            emoji={entry.emoji}
                            key={entry.emoji}
                            onHover={setHoveredEmoji}
                            onSelect={handleSelect}
                            title={entry.name}
                          />
                        ))}
                      </div>
                    </section>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type SectionButtonProps = {
  label: string;
  active: boolean;
  /* Dans la colonne verticale, le bouton occupe toute la largeur ; dans la
     rangée du téléphone, il garde sa largeur naturelle. */
  full?: boolean;
  onClick: () => void;
};

function SectionButton({
  label,
  active,
  full = false,
  onClick
}: SectionButtonProps): JSX.Element {
  return (
    <button
      className={cn(
        'whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold transition',
        full ? 'block w-full text-left' : 'inline-block',
        active
          ? 'bg-main-accent/15 text-main-accent'
          : 'text-light-secondary hover:bg-light-secondary/10 dark:text-dark-secondary dark:hover:bg-dark-secondary/10'
      )}
      onClick={onClick}
      type='button'
    >
      {label}
    </button>
  );
}
