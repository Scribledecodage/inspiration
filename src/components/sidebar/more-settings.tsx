import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { useModal } from '@lib/hooks/useModal';
import { preventBubbling } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { DisplayModal } from '@components/modal/display-modal';
import { MaterialIcon } from '@components/ui/material-icon';
import { Button } from '@components/ui/button';
import { MenuLink } from './menu-link';
import type { Variants } from 'framer-motion';

export const variants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
};

export function MoreSettings(): JSX.Element {
  const { open, openModal, closeModal } = useModal();

  const menuVariants: Variants = {
    initial: { opacity: 0, y: 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.16, ease: 'easeOut' }
    },
    exit: { opacity: 0, y: 8, transition: { duration: 0.12 } }
  };

  return (
    <>
      <Modal
        modalClassName='max-w-xl max-h-[85vh] bg-main-background w-full overflow-y-auto rounded-md p-8 hover-animation'
        open={open}
        closeModal={closeModal}
      >
        <DisplayModal closeModal={closeModal} />
      </Modal>
      <Menu className='relative' as='div'>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button className='group relative flex w-full py-1 outline-none'>
              <div
                className={cn(
                  `custom-button flex gap-4 text-xl transition group-hover:bg-light-primary/10 group-focus-visible:ring-2
                   group-focus-visible:ring-[#878a8c] dark:group-hover:bg-dark-primary/10 dark:group-focus-visible:ring-white
                   xl:pr-5`,
                  open && 'bg-light-primary/10 dark:bg-dark-primary/10'
                )}
              >
                <MaterialIcon className='h-7 w-7' iconName='pending' />{' '}
                <p className='hidden xl:block'>Plus</p>
              </div>
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='menu-container absolute bottom-[calc(100%+0.75rem)] left-0 z-30 w-72 overflow-hidden rounded-lg border border-light-border bg-main-background p-1.5 font-medium dark:border-dark-border'
                  as={motion.div}
                  {...menuVariants}
                  static
                >
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <MenuLink
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] transition-colors duration-150',
                          active &&
                            'bg-main-sidebar-background text-main-accent'
                        )}
                        href='/settings'
                      >
                        <MaterialIcon
                          className='h-5 w-5 shrink-0'
                          iconName='tune'
                        />
                        <span>Réglages</span>
                      </MenuLink>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] transition-colors duration-150',
                          active &&
                            'bg-main-sidebar-background text-main-accent'
                        )}
                        onClick={openModal}
                      >
                        <MaterialIcon
                          className='h-5 w-5 shrink-0'
                          iconName='appearance'
                        />
                        <span>Apparence</span>
                      </Button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}
