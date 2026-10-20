import Link from 'next/link';
import { useMemo } from 'react';
import cn from 'clsx';
import { splitLinks } from '@lib/link-preview';
import { splitMentions } from '@lib/mentions';

type LinkifiedTextProps = {
  text: string;
  className?: string;
  /** Le texte est-il sur une bulle colorée (message envoyé) ? */
  mine?: boolean;
};

/**
 * Texte dans lequel les liens et les mentions deviennent cliquables.
 *
 * Sur une bulle de couleur (message envoyé), le bleu de l'accent se confondrait
 * avec le fond : le lien passe alors en blanc souligné, comme dans WhatsApp.
 */
export function LinkifiedText({
  text,
  className,
  mine = false
}: LinkifiedTextProps): JSX.Element {
  const parts = useMemo(() => splitLinks(text), [text]);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.type === 'link' ? (
          <Link href={part.value} key={`${part.value}-${index}`}>
            <a
              className={cn(
                /* Le lien reste sur une seule ligne : une URL complète est
                   illisible et ferait déborder la bulle. Le titre complet reste
                   accessible via l'attribut `title`. */
                'inline-block max-w-full truncate align-bottom font-medium underline underline-offset-2',
                mine
                  ? 'text-white decoration-white/60 hover:decoration-white'
                  : 'text-main-accent decoration-main-accent/40 hover:decoration-main-accent'
              )}
              title={part.value}
              rel='noopener noreferrer nofollow'
              target='_blank'
            >
              {part.value}
            </a>
          </Link>
        ) : (
          <span key={`text-${index}`}>
            {splitMentions(part.value).map((mention, mentionIndex) =>
              mention.type === 'mention' ? (
                /* Une mention mène au profil de la personne. */
                <Link
                  href={`/user/${mention.username}`}
                  key={`mention-${mentionIndex}`}
                >
                  <a
                    className={cn(
                      'font-medium underline underline-offset-2',
                      mine
                        ? 'text-white decoration-white/60 hover:decoration-white'
                        : 'text-main-accent decoration-main-accent/40 hover:decoration-main-accent'
                    )}
                  >
                    {mention.value}
                  </a>
                </Link>
              ) : (
                <span key={`mention-text-${mentionIndex}`}>
                  {mention.value}
                </span>
              )
            )}
          </span>
        )
      )}
    </span>
  );
}
