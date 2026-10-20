import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { where } from 'firebase/firestore';
import { useState, useRef, useMemo } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { usersCollection } from '@lib/firebase/collections';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import {
  PeopleLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { UserCard } from '@components/user/user-card';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { MaterialIcon } from '@components/ui/material-icon';
import { Button } from '@components/ui/button';
import { variants } from '@components/aside/aside-trends';
import cn from 'clsx';
import type {
  ReactElement,
  ReactNode,
  ChangeEvent,
  KeyboardEvent
} from 'react';

export default function People(): JSX.Element {
  const { user } = useAuth();
  const { back } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, loading, LoadMore } = useInfiniteScroll(
    usersCollection,
    [where('id', '!=', user?.id)],
    { allowNull: true, preserve: true },
    { marginBottom: 500 }
  );

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data?.filter((userData) => {
      const name = userData.name?.toLowerCase() || '';
      const username = userData.username?.toLowerCase() || '';
      return name.includes(query) || username.includes(query);
    });
  }, [data, searchQuery]);

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setSearchQuery(value);

  const clearInputValue = (focus?: boolean) => (): void => {
    if (focus) inputRef.current?.focus();
    else inputRef.current?.blur();
    setSearchQuery('');
  };

  const handleEscape = ({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Escape') clearInputValue()();
  };

  return (
    <MainContainer>
      <SEO title='Personnes / Inspiration' />
      <MainHeader
        useActionButton
        useMobileSidebar
        title='Personnes'
        action={back}
      />
      <section className='mt-4'>
        <div className='mx-4 mb-4'>
          <label
            className='group flex items-center justify-between gap-4 rounded-full
                       bg-main-search-background px-4 py-2 transition focus-within:bg-main-background
                       focus-within:ring-2 focus-within:ring-main-accent'
          >
            <i>
              <MaterialIcon
                className='h-5 w-5 text-light-secondary transition-colors
                           group-focus-within:text-main-accent dark:text-dark-secondary'
                iconName='search'
              />
            </i>
            <input
              className='peer flex-1 bg-transparent outline-none
                         placeholder:text-light-secondary dark:placeholder:text-dark-secondary'
              type='text'
              placeholder='Rechercher des personnes'
              ref={inputRef}
              value={searchQuery}
              onChange={handleChange}
              onKeyUp={handleEscape}
            />
            <Button
              className={cn(
                'accent-tab scale-50 bg-main-accent p-1 opacity-0 transition hover:brightness-90 disabled:opacity-0',
                searchQuery &&
                  'focus:scale-100 focus:opacity-100 peer-focus:scale-100 peer-focus:opacity-100'
              )}
              onClick={clearInputValue(true)}
              disabled={!searchQuery}
            >
              <MaterialIcon className='h-3 w-3 fill-white' iconName='close' />
            </Button>
          </label>
        </div>
        {!data ? (
          loading ? (
            <Loading className='mt-5' />
          ) : (
            <Error message='Une erreur s&#39;est produite' />
          )
        ) : (
          <>
            <motion.div className='mt-0.5' {...variants}>
              {filteredData?.map((userData) => (
                <UserCard {...userData} key={userData.id} follow />
              ))}
              {filteredData?.length === 0 && searchQuery && (
                <div className='p-8 text-center text-light-secondary dark:text-dark-secondary'>
                  Aucun resultat pour &quot;{searchQuery}&quot;
                </div>
              )}
            </motion.div>
            {!searchQuery && <LoadMore />}
          </>
        )}
      </section>
    </MainContainer>
  );
}

People.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <PeopleLayout>{page}</PeopleLayout>
    </MainLayout>
  </ProtectedLayout>
);
