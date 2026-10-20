import { render } from 'preact';
import Root from './app';

/* Le point d'entrée de l'application de bureau. */
render(<Root />, document.getElementById('root') as HTMLElement);
