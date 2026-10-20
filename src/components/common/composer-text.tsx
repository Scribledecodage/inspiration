import { useMemo } from 'react';
import cn from 'clsx';
import { splitLinks } from '@lib/link-preview';
import { splitMentions } from '@lib/mentions';

type ComposerTextProps = {
  text: string;
  className?: string;
};

/**
 * Copie du texte en cours de saisie où les liens et les mentions sont
 * colorés.
 *
 * Elle est placée derrière un `textarea` transparent : ce que l'utilisateur
 * voit, ce sont les liens colorés, tout en gardant un vrai champ de saisie
 * (copier-coller, autocorrectif, sélection du texte…). On garde ici la même
 * police et le même espacement que le champ, sinon les deux couches ne se
 * superposent pas.
 */
export function ComposerText({
  text,
  className
}: ComposerTextProps): JSX.Element {
  const parts = useMemo(() => splitLinks(text), [text]);

  return (
    <span aria-hidden='true' className={cn('whitespace-pre-wrap', className)}>
      {parts.map((part, index) =>
        part.type === 'link' ? (
          <span className='text-main-accent underline' key={`link-${index}`}>
            {part.value}
          </span>
        ) : (
          <span key={`text-${index}`}>
            {splitMentions(part.value).map((mention, mentionIndex) =>
              mention.type === 'mention' ? (
                <span
                  className='font-semibold text-main-accent'
                  key={`mention-${mentionIndex}`}
                >
                  {mention.value}
                </span>
              ) : (
                <span key={`mention-text-${mentionIndex}`}>
                  {mention.value}
                </span>
              )
            )}
          </span>
        )
      )}
      {/* Une barre vide ferait collapsing la couche : on garde sa hauteur. */}
      {text.endsWith('\n') && ' '}
    </span>
  );
}
