import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { LinkifiedText } from '@components/common/linkified-text';

/* Nombre de lignes affichées quand une publication est repliée. Au-delà, elle
   affiche « Voir plus » : la page ne prend donc jamais toute la hauteur de
   l'écran à cause d'un seul message. */
const COLLAPSED_LINES = 2;

type TweetTextProps = {
  text: string;
  className?: string;
  /* Lignes visibles une fois replié (4 par défaut). */
  lines?: number;
};

/* Texte d'une publication. Les longs textes (beaucoup de lignes, ou des
   lignes très longues) sont repliés d'office : c'est la hauteur réellement
   affichée qui décide, une publication courte n'a donc jamais de bouton. */
export function TweetText({
  text,
  className,
  lines = COLLAPSED_LINES
}: TweetTextProps): JSX.Element {
  const textRef = useRef<HTMLParagraphElement>(null);

  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  /* Première estimation (avant la mesure) : un texte déjà très fourni est
     replié tout de suite, ce qui évite de le voir s'afficher en entier puis
     se réduire. La mesure ci-dessous corrige le tir si besoin. */
  const [isLongText, setIsLongText] = useState(
    () => text.length > 200 || text.split('\n').length > lines
  );

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const measure = (): void => {
      /* La hauteur d'une ligne vient du style calculé : la coupure tombe donc
         toujours entre deux lignes, jamais au milieu d'une ligne. */
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 20;
      const limit = Math.round(lineHeight * lines);

      setMaxHeight(limit);
      setIsLongText(element.scrollHeight > limit + 2);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, [text, lines]);

  const collapsed = isLongText && !expanded;

  return (
    <>
      <p
        ref={textRef}
        className={cn(
          'whitespace-pre-line break-words',
          collapsed && 'overflow-hidden',
          className
        )}
        style={collapsed && maxHeight ? { maxHeight } : undefined}
      >
        {/* Les liens restent bleus et cliquables, même repliés. */}
        <LinkifiedText text={text} />
      </p>

      {isLongText && (
        <button
          className='accent-tab -mt-0.5 self-start py-1 text-sm font-bold text-main-accent outline-none transition-colors hover:underline'
          type='button'
          onClick={(): void => setExpanded((value) => !value)}
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </button>
      )}
    </>
  );
}
