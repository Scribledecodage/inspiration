import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { MaterialIcon } from '@components/ui/material-icon';
import { ContactLink } from '@components/common/contact-link';
import { Copyright } from '@components/common/copyright';
import { StatusActivity } from '@components/status/status-activity';

const footerLinks = [
  ['Conditions d’utilisation', '/terms', false],
  ['Politique de confidentialité', '/privacy', false],
  ['Politique relative aux cookies', '/cookies', false],
  ['Accessibilité', '/accessibility', false],
  ['404', '/404', false],
  ['sitemap.xml', '/sitemap.xml', true],
  ['robots.txt', '/robots.txt', true],
  ['security.txt', '/security.txt', true]
] as const;

/* Le pied de page n'affiche que quelques liens : la liste complète est
   dépliable, pour ne pas voler de place au bas de la colonne. */
const visibleLinkCount = 3;

type AsideFooterProps = {
  inTrendsPage?: boolean;
};

export function AsideFooter({ inTrendsPage }: AsideFooterProps = {}): JSX.Element {
  const [showActivity, setShowActivity] = useState(true);
  const [showAllLinks, setShowAllLinks] = useState(false);

  const displayedLinks = showAllLinks
    ? footerLinks
    : footerLinks.slice(0, visibleLinkCount);

  return (
    <footer
      className='sticky top-0 flex flex-col gap-2.5 px-3 py-2 text-center text-xs
                 text-light-secondary dark:text-dark-secondary bg-main-background dark:bg-main-background z-10'
    >
      {inTrendsPage && (
        <div className='mt-3 overflow-hidden rounded-xl bg-main-sidebar-background text-left'>
          <div
            className='flex items-center justify-between gap-2 pb-1 pl-4 pr-1.5 pt-2'
          >
            <h2 className='text-xl font-bold text-light-primary dark:text-dark-primary'>
              Activité de vos abonnements
            </h2>
            <button
              className='accent-tab shrink-0 rounded-full p-2 text-light-secondary transition
                         hover:bg-light-secondary/10 hover:text-light-primary
                         active:bg-light-secondary/20 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-main-accent
                         dark:text-dark-secondary dark:hover:bg-dark-secondary/10
                         dark:hover:text-dark-primary dark:active:bg-dark-secondary/20'
              type='button'
              aria-expanded={showActivity}
              aria-label={
                showActivity
                  ? 'Masquer l’activité de vos abonnements'
                  : 'Afficher l’activité de vos abonnements'
              }
              onClick={(): void => setShowActivity((value) => !value)}
            >
              <MaterialIcon
                className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
                  showActivity ? '' : 'rotate-180'
                }`}
                iconName='keyboard_arrow_up'
              />
            </button>
          </div>
          <AnimatePresence initial={false}>
            {showActivity && (
              <motion.div
                animate={{ height: 'auto', opacity: 1 }}
                className='overflow-hidden'
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              >
                <p className='px-4 pb-3 text-sm text-light-secondary dark:text-dark-secondary'>
                  Voyez les derniers statuts des utilisateurs que vous suivez
                </p>
                <div className='px-3 pb-4'>
                  <StatusActivity />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <nav className='flex flex-wrap justify-center gap-x-3 gap-y-1.5'>
        {displayedLinks.map(([linkName, href, isStatic]) => (
          isStatic ? (
            <a
              href={href}
              key={linkName}
              className='custom-underline text-main-accent hover:brightness-90 hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              {linkName}
            </a>
          ) : (
            <Link href={href} key={linkName}>
              <a className='custom-underline text-main-accent hover:brightness-90 hover:underline'>
                {linkName}
              </a>
            </Link>
          )
        ))}
        <ContactLink showEmail={showAllLinks} />
        <button
          type='button'
          aria-expanded={showAllLinks}
          onClick={(): void => setShowAllLinks((value) => !value)}
          className='custom-underline text-main-accent hover:brightness-90 hover:underline'
        >
          {showAllLinks ? 'Voir moins' : 'Voir plus'}
        </button>
      </nav>
      <p className='font-medium'>
        <Copyright />
      </p>
    </footer>
  );
}
