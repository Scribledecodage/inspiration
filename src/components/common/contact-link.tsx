import cn from 'clsx';
import { MaterialIcon } from '@components/ui/material-icon';

/* Adresse d'aide unique du site : pages légales, pieds de page et page 404. */
export const CONTACT_EMAIL = 'contact.inspiration@atomicmail.io';

type ContactLinkProps = {
  className?: string;
  iconClassName?: string;
  /** Masque l'adresse pour n'afficher que l'icône (petits espaces). */
  showEmail?: boolean;
};

export function ContactLink({
  className,
  iconClassName,
  showEmail = true
}: ContactLinkProps): JSX.Element {
  return (
    <a
      className={cn(
        'inline-flex items-center gap-1.5 text-main-accent transition hover:underline hover:brightness-90',
        className
      )}
      href={`mailto:${CONTACT_EMAIL}`}
      aria-label={`Envoyer un e-mail à ${CONTACT_EMAIL}`}
      title={CONTACT_EMAIL}
    >
      <MaterialIcon
        className={cn('h-4 w-4 shrink-0', iconClassName)}
        iconName='mail'
      />
      {showEmail && <span className='break-all'>{CONTACT_EMAIL}</span>}
    </a>
  );
}
