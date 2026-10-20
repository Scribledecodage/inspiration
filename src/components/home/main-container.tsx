import cn from 'clsx';
import type { ReactNode } from 'react';

type MainContainerProps = {
  children: ReactNode;
  className?: string;
};

export function MainContainer({
  children,
  className
}: MainContainerProps): JSX.Element {
  return (
    <main
      className={cn(
        `hover-animation flex min-h-[100dvh] w-full max-w-xl flex-col border-x-0
         border-light-border/70 pb-28 dark:border-dark-border/70 xs:border-x xs:pb-12 min-w-0`,
        className
      )}
    >
      {children}
    </main>
  );
}
