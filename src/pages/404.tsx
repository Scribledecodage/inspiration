import Link from 'next/link';
import Image from 'next/image';
import { ContactLink } from '@components/common/contact-link';
import { Copyright } from '@components/common/copyright';
import { SEO } from '@components/common/seo';
import { Button } from '@components/ui/button';

/* Mêmes liens que le pied de page : tous prennent la couleur d'accentuation
   choisie dans Apparence (variable --main-accent). */
const legalLinks = [
  ['Conditions d’utilisation', '/terms', false],
  ['Politique de confidentialité', '/privacy', false],
  ['Politique relative aux cookies', '/cookies', false],
  ['Accessibilité', '/accessibility', false],
  ['404', '/404', false],
  ['sitemap.xml', '/sitemap.xml', true],
  ['robots.txt', '/robots.txt', true],
  ['security.txt', '/security.txt', true]
] as const;

export default function NotFound(): JSX.Element {
  return (
    <>
      <SEO
        title='Page non trouvée / Inspiration'
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        image='/404.png'
      />
      <div className='relative flex h-screen flex-col items-center justify-center overflow-hidden px-4 py-12'>
        <div className='absolute inset-0 z-0'>
          <Image
            src='/404.png'
            alt='Erreur 404'
            layout='fill'
            objectFit='cover'
            priority
            quality={60}
          />
        </div>

        <div className='relative z-10 flex max-w-2xl flex-col items-center gap-8 text-center'>
          <h1 className='font-title text-7xl font-bold tracking-tight text-white drop-shadow-lg md:text-8xl'>
            404
          </h1>

          <h2 className='text-3xl font-bold text-white drop-shadow-md md:text-4xl'>
            Page non trouvée
          </h2>

          <p className='max-w-lg text-lg leading-relaxed text-white/90 drop-shadow-sm'>
            La page que vous recherchez n&apos;existe pas, a été déplacée ou
            n&apos;est plus disponible.
          </p>

          <div className='flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4'>
            <Link href='/home'>
              <Button className='w-full bg-main-accent px-8 py-3 font-bold text-white transition hover:brightness-90 active:brightness-75 sm:w-auto'>
                Retour à l&apos;accueil
              </Button>
            </Link>

            <Link href='/trends'>
              <Button className='w-full border border-white/50 bg-white/10 px-8 py-3 font-bold text-white transition hover:bg-white/20 sm:w-auto'>
                Découvrir
              </Button>
            </Link>
          </div>
        </div>

        <div className='relative z-10 mt-12 flex flex-col gap-3 text-center text-white'>
          <nav className='flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:text-base'>
            {legalLinks.map(([linkName, href, isStatic]) =>
              isStatic ? (
                <a
                  className='text-main-accent underline-offset-2 transition hover:underline'
                  href={href}
                  key={linkName}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {linkName}
                </a>
              ) : (
                <Link href={href} key={linkName}>
                  <a className='text-main-accent underline-offset-2 transition hover:underline'>
                    {linkName}
                  </a>
                </Link>
              )
            )}
            <ContactLink />
          </nav>
          <p>
            <Copyright />
          </p>
        </div>
      </div>
    </>
  );
}
