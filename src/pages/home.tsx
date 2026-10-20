import { AnimatePresence } from 'framer-motion';
import { where, orderBy } from 'firebase/firestore';
import { useWindow } from '@lib/context/window-context';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { tweetsCollection } from '@lib/firebase/collections';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { SiteLogo } from '@components/common/site-logo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { MainHeader } from '@components/home/main-header';
import { Tweet } from '@components/tweet/tweet';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
  const { isMobile } = useWindow();

  useEffect(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  const { data, loading, LoadMore } = useInfiniteScroll(
    tweetsCollection,
    [where('parent', '==', null), orderBy('createdAt', 'desc')],
    { includeUser: true, allowNull: true, preserve: true },
    { marginBottom: 50, stepSize: 10 }
  );

  /* La position de défilement n'est plus touchée ici : le navigateur recale
     déjà la vue tout seul quand une publication arrive au-dessus de la
     zone visible (« scroll anchoring »). Notre propre calcul s'ajoutait à
     celui du navigateur, et la page sautait deux fois — d'où l'impression
     qu'elle descendait toute seule. */

  return (
    <MainContainer>
      <SEO
        title='Accueil / Inspiration'
        description='Découvrez les publications, les tendances et les personnes à suivre sur Inspiration.'
        image='/LogoSite.png'
      />
      <MainHeader
        useMobileSidebar
        title='Accueil'
        className='flex items-center gap-3'
        beforeTitle={<SiteLogo size={30} className='xs:hidden' />}
      />
      {!isMobile && <Input />}
      <section className='mt-0.5 xs:mt-0'>
        {/* Tant qu'il y a des publications, la liste reste à l'écran : la
            remplacer par un chargement ferait sauter la page (le contenu se
            réduit et le navigateur revient en haut) et les publications
            réapparaîtraient en fondu. */}
        {!data ? (
          loading ? (
            <Loading className='mt-5' />
          ) : (
            <Error message='Une erreur s’est produite' />
          )
        ) : (
          <>
            <AnimatePresence initial={false}>
              {data.map((tweet) => (
                <Tweet {...tweet} key={tweet.id} />
              ))}
            </AnimatePresence>
            <LoadMore />
          </>
        )}
      </section>
    </MainContainer>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
