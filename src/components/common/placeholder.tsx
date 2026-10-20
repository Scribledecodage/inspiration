import { SEO } from './seo';

export function Placeholder(): JSX.Element {
  return (
    <main className='min-h-screen bg-main-background'>
      <SEO
        title='Inspiration — Un réseau social pensé pour rapprocher les gens'
        description='Inspiration, le réseau social pensé pour rapprocher les gens.'
        image='/Discussion.jpg'
      />
    </main>
  );
}
