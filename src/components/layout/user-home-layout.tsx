import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '@lib/context/auth-context';
import { useUser } from '@lib/context/user-context';
import { SEO } from '@components/common/seo';
import { UserHomeCover } from '@components/user/user-home-cover';
import { UserHomeAvatar } from '@components/user/user-home-avatar';
import { UserDetails } from '@components/user/user-details';
import { UserNav } from '@components/user/user-nav';
import { Button } from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import { MaterialIcon } from '@components/ui/material-icon';
import { ToolTip } from '@components/ui/tooltip';
import { FollowButton } from '@components/ui/follow-button';
import { variants } from '@components/user/user-header';
import { UserEditProfile } from '@components/user/user-edit-profile';
import { UserShare } from '@components/user/user-share';
import { getAvatarSrc, getBannerSrc } from '@lib/media';
import type { LayoutProps } from './common-layout';

export function UserHomeLayout({ children }: LayoutProps): JSX.Element {
  const { user, isAdmin } = useAuth();
  const { user: userData, loading } = useUser();

  const router = useRouter();

  const { id } = router.query;

  const coverData = {
    src: getBannerSrc(userData?.coverPhotoURL),
    alt: userData?.name ?? 'Bannière Inspiration'
  };

  const profileData = userData
    ? {
        src: getAvatarSrc(userData.photoURL, userData.gender),
        alt: userData.name,
        gender: userData.gender,
        avatarShape: userData.avatarShape,
        avatarFrame: userData.avatarFrame
      }
    : null;

  const { id: userId } = user ?? {};

  const isOwner = userData?.id === userId;

  return (
    <>
      {userData && (
        <SEO
          title={`${`${userData.name} (@${userData.username})`} / Inspiration`}
        />
      )}
      <motion.section {...variants} exit={undefined}>
        {loading ? (
          <Loading className='mt-5' />
        ) : !userData ? (
          <>
            <UserHomeCover />
            <div className='flex flex-col gap-8'>
              <div className='relative flex flex-col gap-3 px-4 py-3'>
                <UserHomeAvatar />
                <p className='text-xl font-bold'>@{id}</p>
              </div>
              <div className='p-8 text-center'>
                <p className='text-3xl font-bold'>Ce compte n’existe pas</p>
                <p className='text-light-secondary dark:text-dark-secondary'>
                  Essayez d’en rechercher un autre.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <UserHomeCover coverData={coverData} />
            <div className='relative flex flex-col gap-3 px-4 py-3'>
              <div className='flex justify-between'>
                <UserHomeAvatar isOwner={isOwner} profileData={profileData} />
                {isOwner ? (
                  <UserEditProfile />
                ) : (
                  <div className='flex gap-2 self-start'>
                    <UserShare username={userData.username} />
                    <Button
                      className='dark-bg-tab group relative border border-light-line-reply p-2
                                 hover:bg-light-primary/10 active:bg-light-primary/20 dark:border-light-secondary 
                                 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
                      /* Ouvre la messagerie directement sur la conversation
                         privée avec cette personne (le pseudo est plus fiable
                         que l'identifiant, absent de certaines fiches). */
                      onClick={() =>
                        void router.push(
                          `/messages?user=${encodeURIComponent(
                            userData.username
                          )}`
                        )
                      }
                      title='Message'
                    >
                      <MaterialIcon className='h-5 w-5' iconName='mail' />
                      <ToolTip tip='Message' />
                    </Button>
                    <FollowButton
                      userTargetId={userData.id}
                      userTargetUsername={userData.username}
                    />
                    {isAdmin && <UserEditProfile hide />}
                  </div>
                )}
              </div>
              <UserDetails {...userData} />
            </div>
          </>
        )}
      </motion.section>
      {userData && (
        <>
          <UserNav />
          {children}
        </>
      )}
    </>
  );
}
