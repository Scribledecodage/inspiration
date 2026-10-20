import cn from 'clsx';
import { CustomIcon } from './custom-icon';

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({
  className,
  iconClassName
}: LoadingProps): JSX.Element {
  /* Le margeur fait TOUJOURS partie de la classe : avant, il disparaissait
     dès qu'une classe était passée, et le bloc de chargement changeait de
     hauteur d'un appel à l'autre (le contenu en dessous se décalait). */
  return (
    <i className={cn('flex justify-center p-4', className)}>
      <CustomIcon
        className={cn('text-main-accent', iconClassName ?? 'h-7 w-7')}
        iconName='SpinnerIcon'
      />
    </i>
  );
}
