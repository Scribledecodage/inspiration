import { useAuth } from '@lib/context/auth-context';

type UserFollowingProps = {
  userTargetId: string;
};

export function UserFollowing({
  userTargetId
}: UserFollowingProps): JSX.Element | null {
  const { user } = useAuth();

  const followers = user?.followers;
  const isOwner =
    user?.id !== userTargetId &&
    Array.isArray(followers) &&
    followers.includes(userTargetId);

  if (!isOwner) return null;

  return (
    <p className='rounded bg-main-search-background px-1 text-xs'>
      Vous suit
    </p>
  );
}
