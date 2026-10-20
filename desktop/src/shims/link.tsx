import { useRouter } from './router';
import { Children, cloneElement, isValidElement } from 'react';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';

/**
 * Remplace `next/link`.
 *
 * Le comportement est celui de Next.js : un lien vers une page interne
 * change de page sans recharger l'application ; un lien externe s'ouvre
 * dans le navigateur du système.
 */
type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href:
    | string
    | { pathname?: string; query?: Record<string, string>; hash?: string };
  children?: ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  locale?: string;
  legacyBehavior?: boolean;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function toUrl(href: LinkProps['href']): string {
  if (typeof href === 'string') return href;

  const search = href.query
    ? `?${new URLSearchParams(href.query).toString()}`
    : '';

  return `${href.pathname ?? ''}${search}${href.hash ?? ''}`;
}

export default function Link({
  href,
  children,
  onClick,
  onNavigate,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  legacyBehavior,
  ...rest
}: LinkProps) {
  const router = useRouter();
  const url = toUrl(href);
  const isExternal = /^(https?:)?\/\//.test(url) || url.startsWith('mailto:');

  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    onClick?.(event);
    onNavigate?.(event);

    if (event.defaultPrevented) return;
    if (isExternal) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    if (event.button !== 0) return;

    event.preventDefault();

    if (replace) router.replace(url);
    else router.push(url, undefined, { scroll });
  };

  /* Le site utilise la forme historique de Next.js : l'ancre est écrite
     dans le composant passé à `children`. On ne peut pas l'envelopper dans
     une autre ancre : le HTML l'interdit, le navigateur réécrit alors le
     document et la mise en page se casse (le texte se chevauche). */
  const child =
    Children.count(children) === 1 ? Children.toArray(children)[0] : null;

  if (isValidElement(child) && child.type === 'a') {
    const props = child.props as AnchorHTMLAttributes<HTMLAnchorElement>;

    return cloneElement(child, {
      ...rest,
      ...props,
      href: props.href ?? url,
      onClick: (event: MouseEvent<HTMLAnchorElement>): void => {
        props.onClick?.(event);
        handleClick(event);
      }
    } as never);
  }

  return (
    <a href={url} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
