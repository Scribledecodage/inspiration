import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { fetchJSON } from '@lib/fetch';
import { WindowContextProvider } from '@lib/context/window-context';
import { Sidebar } from '@components/sidebar/sidebar';
import { SwipeContainer } from '@components/home/swipe-container';
import type { DefaultToastOptions } from 'react-hot-toast';
import type { LayoutProps } from './common-layout';

const toastOptions: DefaultToastOptions = {
  style: {
    color: 'white',
    borderRadius: '4px',
    backgroundColor: 'rgb(var(--main-accent))'
  },
  success: { duration: 4000 }
};

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className='flex w-full justify-center gap-0 lg:gap-4'>
      <WindowContextProvider>
        <div className='flex min-h-[100dvh] w-full max-w-[1440px] gap-0 lg:gap-4'>
          <Sidebar />
          <SWRConfig value={{ fetcher: fetchJSON }}>
            <div className='flex min-w-0 flex-1 justify-center gap-0 overflow-x-clip lg:gap-4'>
              <SwipeContainer>{children}</SwipeContainer>
            </div>
          </SWRConfig>
        </div>
      </WindowContextProvider>
      <Toaster
        position='bottom-center'
        toastOptions={toastOptions}
        containerClassName='mb-12 xs:mb-0'
      />
    </div>
  );
}
