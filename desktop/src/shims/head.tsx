import { useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';

/**
 * Remplace `next/head`.
 *
 * Le site s'en sert pour le titre et les balises Open Graph. Dans
 * l'application de bureau, seul le titre de la fenêtre est utile : il
 * est appliqué au document, et le titre de la fenêtre native suit
 * automatiquement.
 */
type HeadProps = {
  children?: ReactNode;
};

function extractTitle(children: ReactNode): string | null {
  let title: string | null = null;

  const visit = (node: ReactNode): void => {
    if (!title && Array.isArray(node)) {
      node.forEach(visit);
      return;
    }

    if (!title && node && typeof node === 'object' && 'props' in node) {
      const element = node as ReactElement<{ children?: ReactNode }>;

      if (
        element.type === 'title' &&
        typeof element.props.children === 'string'
      )
        title = element.props.children;
      else visit(element.props.children);
    }
  };

  visit(children);

  return title;
}

export default function Head({ children }: HeadProps) {
  const title = extractTitle(children);

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return null;
}
