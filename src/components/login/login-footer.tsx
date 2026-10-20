import Link from 'next/link';
import { ContactLink } from '@components/common/contact-link';
import { Copyright } from '@components/common/copyright';

const footerLinks = [
  ['Conditions d’utilisation', '/terms'],
  ['Politique de confidentialité', '/privacy'],
  ['Politique relative aux cookies', '/cookies'],
  ['Accessibilité', '/accessibility']
] as const;

export function LoginFooter(): JSX.Element {
  return (
    <footer className='justify-center border-t border-light-border px-4 py-3 text-xs text-light-secondary dark:border-dark-border dark:text-dark-secondary lg:border-0 lg:py-2'>
      <nav className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2'>
        {footerLinks.map(([linkName, href]) => (
          <Link href={href} key={linkName}>
            <a className='text-main-accent transition-colors hover:brightness-90 hover:underline'>
              {linkName}
            </a>
          </Link>
        ))}
        <ContactLink />
        <Copyright className='font-medium' />
      </nav>
    </footer>
  );
}
