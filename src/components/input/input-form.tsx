import { useEffect, useRef } from 'react';
import TextArea from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import { useWindow } from '@lib/context/window-context';
import { MaterialIcon } from '@components/ui/material-icon';
import { ComposerText } from '@components/common/composer-text';
import { Button } from '@components/ui/button';
import type {
  ReactNode,
  RefObject,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent
} from 'react';
import type { Variants } from 'framer-motion';

type InputFormProps = {
  modal?: boolean;
  formId: string;
  loading: boolean;
  visited: boolean;
  reply?: boolean;
  children: ReactNode;
  inputRef: RefObject<HTMLTextAreaElement>;
  inputValue: string;
  replyModal?: boolean;
  isValidTweet: boolean;
  isUploadingImages: boolean;
  sendTweet: () => Promise<void>;
  handleFocus: () => void;
  discardTweet: () => void;
  handleChange: ({
    target: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => void;
  handleImageUpload: (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ) => void;
  /** Un enregistrement est en cours : on remplace la zone de texte. */
  recording?: boolean;
  /** Panneau d'enregistrement, affiché à la place du texte. */
  recorder?: ReactNode;
  /** Demande la confirmation avant d'effacer la publication (touche
   *  Échap, icône de la poubelle). */
  onDiscardRequest: () => void;
  /** Un menu est ouvert par-dessus (emoji, GIF, média…) : les clics dehors
   *  ne referment que ce menu, pas la zone de publication. */
  popupOpen?: boolean;
};

const variants: Variants[] = [
  {
    initial: { y: -25, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring' } }
  },
  {
    initial: { x: 25, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring' } }
  }
];

export const [fromTop, fromBottom] = variants;

export function InputForm({
  modal,
  reply,
  formId,
  loading,
  visited,
  children,
  inputRef,
  replyModal,
  inputValue,
  isValidTweet,
  isUploadingImages,
  sendTweet,
  handleFocus,
  discardTweet,
  handleChange,
  handleImageUpload,
  recording,
  recorder,
  onDiscardRequest,
  popupOpen
}: InputFormProps): JSX.Element {
  const { isMobile } = useWindow();
  const formRef = useRef<HTMLDivElement>(null);
  /* Clics dehors successifs (téléphone) : il en faut deux pour refermer la
     feuille de publication. */
  const outsideClicksRef = useRef(0);
  /* Un menu vient d'être refermé par un clic dehors : le clic suivant
     refermera la feuille de publication. */
  const menuJustClosedRef = useRef(false);
  const previousPopupOpenRef = useRef(popupOpen);

  useEffect(() => {
    if (previousPopupOpenRef.current && !popupOpen)
      menuJustClosedRef.current = true;

    previousPopupOpenRef.current = popupOpen;
  }, [popupOpen]);

  useEffect(() => handleShowHideNav(true), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const form = formRef.current?.closest('form');

      if (!form || form.contains(event.target as Node)) return;

      /* Le sélecteur d'emoji est une fenêtre native du navigateur : elle
         vit dans un calque au-dessus de la page, et son clic de fermeture
         (au-dessus de la barre du haut) ne doit surtout pas refermer la
         publication. */
      const target = event.target as Element;

      if (target.closest('[popover]')) return;

      /* Un menu est ouvert par-dessus (emoji, GIF, média…) : le clic dehors
         ne referme que ce menu, la zone de publication reste ouverte. */
      if (popupOpen) return;

      /* Un clic dans une fenêtre ouverte par-dessus (emoji, GIF, média…)
         ne referme que cette fenêtre : la zone de publication, elle, reste
         ouverte. La feuille de publication, en revanche, compte comme un
         clic dehors. */
      const dialog = target.closest('[role="dialog"]');

      if (dialog && !dialog.contains(form)) return;

      /* Zone vide : le clic dehors la referme, c'est la façon la plus
         simple d'en sortir. */
      if (!inputValue.trim()) {
        outsideClicksRef.current = 0;
        discardTweet();
        return;
      }

      /* Sur ordinateur, la zone de publication ne se referme plus au clic
         dehors quand elle contient quelque chose : on ne perd pas son
         brouillon d'un clic malencontreux. La croix en haut à droite
         reste le moyen de la fermer. */
      if (typeof window !== 'undefined' && window.innerWidth >= 500) return;

      /* Sur téléphone, il faut deux clics dehors : le premier ne referme que
         le menu ouvert au-dessus, le second referme la feuille de
         publication. */
      if (menuJustClosedRef.current) {
        menuJustClosedRef.current = false;
        outsideClicksRef.current = 0;
        discardTweet();
        return;
      }

      outsideClicksRef.current += 1;

      if (outsideClicksRef.current >= 2) {
        outsideClicksRef.current = 0;
        discardTweet();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inputValue, isValidTweet, discardTweet, popupOpen]);

  const handleKeyboardShortcut = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    const { key, ctrlKey, metaKey, shiftKey } = event;

    if (!modal && key === 'Escape') {
      if (isValidTweet) {
        inputRef.current?.blur();
        onDiscardRequest();
      } else discardTweet();
      return;
    }

    /* Sur ordinateur, la touche Entrée publie (Maj + Entrée pour aller à la
       ligne). Sur mobile, Entrée continue d'aller à la ligne. */
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 500;

    if (
      key === 'Enter' &&
      !shiftKey &&
      (ctrlKey || metaKey || isDesktop) &&
      isValidTweet
    ) {
      event.preventDefault();
      void sendTweet();
    }
  };

  /* Sur téléphone, la barre du bas s'efface quand on écrit (le clavier
     prend la place) et revient quand le champ perd le focus. La transition
     d'opacité est déjà en CSS : inutile de la piloter au chronomètre, ce qui
     faisait clignoter la barre. */
  const handleShowHideNav = (blur?: boolean) => (): void => {
    const sidebar = document.getElementById('sidebar') as HTMLElement;

    if (!sidebar) return;

    if (blur) {
      sidebar.style.opacity = '';

      /* La barre doit revenir avec le clavier : sinon l'utilisateur se
         retrouve sans navigation (elle peut s'être effacée au défilement
         pendant la saisie). */
      const bar = document.querySelector('[data-mobile-bar]');

      if (bar) bar.classList.remove('mobile-bar-hidden');

      return;
    }

    if (window.innerWidth < 500) sidebar.style.opacity = '0';
  };

  const handleFormFocus = (): void => {
    handleShowHideNav()();
    handleFocus();
  };

  const isVisibilityShown = visited && !reply && !replyModal && !loading;

  return (
    <div
      ref={formRef}
      className='flex min-h-[48px] w-full min-w-0 flex-col justify-center gap-4'
    >
      <div className='flex flex-col gap-6'>
        {isVisibilityShown && (
          <motion.button
            type='button'
            className='custom-button accent-tab accent-bg-tab flex cursor-not-allowed items-center gap-1
                       self-start border border-light-line-reply py-0 px-3 text-main-accent
                       hover:bg-main-accent/10 active:bg-main-accent/20 dark:border-light-secondary'
            {...fromTop}
          >
            <p className='font-bold'>Tout le monde</p>
            <MaterialIcon className='h-4 w-4' iconName='keyboard_arrow_down' />
          </motion.button>
        )}
        <div className='flex min-w-0 items-center gap-3'>
          {recording ? (
            /* L'enregistreur prend la place du texte, dans la même rangée :
               la largeur de la barre ne change donc pas d'un coup. */
            recorder
          ) : (
            <>
              <div className='relative min-w-0 flex-1'>
                <TextArea
                  id={formId}
                  className='relative z-10 w-full min-w-0 resize-none break-all
                         bg-transparent py-1 text-xl leading-tight
                         text-transparent caret-light-primary outline-none
                         placeholder:text-transparent dark:caret-dark-primary'
                  value={inputValue}
                  placeholder={
                    reply || replyModal
                      ? 'Publiez votre réponse'
                      : 'Que se passe-t-il ?'
                  }
                  onBlur={handleShowHideNav(true)}
                  /* Sur téléphone, la zone de saisie démarre un peu plus
                     haute : on écrit plus confortablement au doigt. Sur
                     ordinateur et tablette, elle reste compacte tant
                     qu'elle est vide. */
                  minRows={isMobile ? 2 : 1}
                  maxRows={isUploadingImages ? 5 : 15}
                  onFocus={handleFormFocus}
                  onPaste={handleImageUpload}
                  onKeyDown={handleKeyboardShortcut}
                  onChange={handleChange}
                  ref={inputRef}
                />
                {/* Calque derrière le champ, avec exactement les mêmes styles
                    de texte : les liens y sont bleus sans décaler le texte. */}
                <span className='pointer-events-none absolute inset-0 py-1'>
                  {!inputValue ? (
                    <span className='block text-xl leading-tight text-light-secondary dark:text-dark-secondary'>
                      {reply || replyModal
                        ? 'Publiez votre réponse'
                        : 'Que se passe-t-il ?'}
                    </span>
                  ) : (
                    <ComposerText
                      className='block break-all text-xl leading-tight text-light-primary dark:text-dark-primary'
                      text={inputValue}
                    />
                  )}
                </span>
              </div>
              {reply && !visited && (
                <Button
                  className='cursor-pointer bg-main-accent px-4 py-1.5 font-bold text-white opacity-50'
                  onClick={handleFocus}
                >
                  Répondre
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      {children}
      {isVisibilityShown && (
        <motion.div
          className='flex border-b border-light-border pb-2 dark:border-dark-border'
          {...fromBottom}
        >
          <button
            type='button'
            className='custom-button accent-tab accent-bg-tab flex cursor-not-allowed items-center gap-1 py-0
                       px-3 text-main-accent hover:bg-main-accent/10 active:bg-main-accent/20'
          >
            <MaterialIcon className='h-4 w-4' iconName='public' />
            <p className='font-bold'>Tout le monde peut répondre</p>
          </button>
        </motion.div>
      )}
    </div>
  );
}
