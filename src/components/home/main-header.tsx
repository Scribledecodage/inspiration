import cn from 'clsx';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import { ToolTip } from '@components/ui/tooltip';
import { MobileSidebar } from '@components/sidebar/mobile-sidebar';
import type { ReactNode } from 'react';
import type { IconName } from '@components/ui/material-icon';

type HomeHeaderProps = {
  tip?: string;
  title?: string;
  children?: ReactNode;
  iconName?: IconName;
  className?: string;
  disableSticky?: boolean;
  useActionButton?: boolean;
  useMobileSidebar?: boolean;
  beforeTitle?: ReactNode;
  action?: () => void;
};

export function MainHeader({
  tip,
  title,
  children,
  iconName,
  className,
  disableSticky,
  useActionButton,
  useMobileSidebar,
  beforeTitle,
  action
}: HomeHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        'hover-animation glass-header z-20 flex min-h-[var(--header-height)] items-center gap-6 border-b border-light-border/60 px-4 py-3 transition-colors dark:border-dark-border/60',
        !disableSticky && 'sticky top-0',
        className ?? 'flex items-center gap-6'
      )}
    >
      {useActionButton && (
        <Button
          className='dark-bg-tab group relative p-2.5 hover:bg-light-primary/10 active:bg-light-primary/20
                     dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
          onClick={action}
        >
          <MaterialIcon
            className='h-5 w-5'
            iconName={iconName ?? 'arrow_back'}
          />
          <ToolTip tip={tip ?? 'Retour'} />
        </Button>
      )}
      {beforeTitle}
      {title && (
        <h2 className='text-[1.375rem] font-bold leading-tight' key={title}>
          {title}
        </h2>
      )}
      {children && (
        <div className='ml-auto flex items-center gap-2'>{children}</div>
      )}
      {useMobileSidebar && (
        <div className={cn(!children && 'ml-auto')}>
          <MobileSidebar hideTrigger />
        </div>
      )}
    </header>
  );
}
