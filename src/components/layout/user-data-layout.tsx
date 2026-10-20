import { useRouter } from 'next/router';
import { query, where, limit } from 'firebase/firestore';
import { UserContextProvider } from '@lib/context/user-context';
import { getAvatarSrc, getBannerSrc } from '@lib/media';
import { useCollection } from '@lib/hooks/useCollection';
import { usersCollection } from '@lib/firebase/collections';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { UserHeader } from '@components/user/user-header';
import type { LayoutProps } from './common-layout';

export function UserDataLayout({ children }: LayoutProps): JSX.Element {
  const {
    query: { id }
  } = useRouter();

  const { data, loading } = useCollection(
    query(usersCollection, where('username', '==', id), limit(1)),
    { allowNull: true }
  );

  const user = data?.[0]
    ? {
        ...data[0],
        photoURL: getAvatarSrc(data[0].photoURL, data[0].gender),
        coverPhotoURL: getBannerSrc(data[0].coverPhotoURL)
      }
    : null;

  return (
    <UserContextProvider value={{ user, loading }}>
      {!user && !loading && <SEO title='User not found / Inspiration' />}
      <MainContainer>
        <MainHeader useMobileSidebar beforeTitle={<UserHeader />} />
        {children}
      </MainContainer>
    </UserContextProvider>
  );
}
