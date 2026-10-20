import type { ReactNode } from 'react';

type UserTooltipProps = {
  modal?: boolean;
  avatar?: boolean;
  children: ReactNode;
};

export function UserTooltip({ children }: UserTooltipProps): JSX.Element {
  return <>{children}</>;
}
