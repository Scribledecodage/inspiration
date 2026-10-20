import {
  appleIconPaths,
  type AppleIconPair,
  type AppleIconVariant
} from './apple-icons';
import { materialIconPaths } from './material-icons';

export type IconName =
  | keyof typeof materialIconPaths
  | keyof typeof appleIconPaths;

const iconPaths: Record<IconName, AppleIconPair> = {
  ...materialIconPaths,
  ...appleIconPaths
};

type MaterialIconProps = {
  /** Variante pleine (état actif), comme la paire contour/plein d'Heroicons. */
  solid?: boolean;
  iconName: IconName;
  className?: string;
};

/**
 * Icône Material Symbols (Google).
 *
 * Reprend exactement l'interface de l'ancien composant MaterialIcon : mêmes props,
 * mêmes classes de taille (`h-6 w-6`, etc.), donc aucun autre changement dans
 * l'application. Les tracés viennent du jeu d'icônes officiel, embarqué dans
 * `material-icons.ts` — pas de police à télécharger (la police Material
 * Symbols pèse 4 à 5 Mo) et pas de clignotement au chargement.
 */
export function MaterialIcon({
  solid,
  iconName,
  className
}: MaterialIconProps): JSX.Element {
  const variant: AppleIconVariant =
    iconPaths[iconName][solid ? 'plein' : 'contour'];
  const { viewBox, traces, transform, fillRule } = variant;

  return (
    <svg
      className={className ?? 'h-6 w-6'}
      viewBox={viewBox}
      fill='currentColor'
      fillRule={fillRule}
      aria-hidden='true'
      focusable='false'
    >
      {traces.map((trace) => (
        <path key={trace} d={trace} transform={transform} />
      ))}
    </svg>
  );
}
