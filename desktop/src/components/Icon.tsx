/* Les icônes sont des tracé SVG (Material Symbols) : aucune police ni
   bibliothèque d'icônes n'est embarquée. */

export type IconName =
  | 'home'
  | 'search'
  | 'notifications'
  | 'mail'
  | 'person'
  | 'bookmark'
  | 'add'
  | 'close'
  | 'more'
  | 'heart'
  | 'chat'
  | 'repeat'
  | 'share'
  | 'verified'
  | 'logout'
  | 'update'
  | 'mood'
  | 'image'
  | 'refresh'
  | 'link'
  | 'arrow';

const PATHS: Record<IconName, string> = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  search: 'M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14',
  notifications:
    'M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1z',
  mail: 'M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5-8-5V6l8 5 8-5z',
  person: 'M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5m0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5',
  bookmark: 'M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z',
  close: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  more: 'M12 8a2 2 0 1 0-2-2 2 2 0 0 0 2 2m0 2a2 2 0 1 0 2 2 2 2 0 0 0-2-2m0 6a2 2 0 1 0 2 2 2 2 0 0 0-2-2',
  heart:
    'M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z',
  chat: 'M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2',
  repeat:
    'M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2z',
  share: 'M18 16.08a2.9 2.9 0 0 0-1.96.77L8.91 12.7a3.3 3.3 0 0 0 0-1.4l7.05-4.11A3 3 0 1 0 15 5a3 3 0 0 0 .06.6L8.04 9.71a3 3 0 1 0 0 4.58l7.12 4.16a2.8 2.8 0 0 0-.08.63A2.92 2.92 0 1 0 18 16.08',
  verified:
    'm12 1 3.09 2.26 3.91.94 1 3.76 3.09 2.26-1.35 3.62.53 3.85L18 20.02 14.91 21l-2.91-2.24L9.09 21 6 20.02 2.33 17.7l.53-3.85L1.5 10.22 4.59 7.96l1-3.76 3.91-.94zM10.5 15.5 16 10l-1.4-1.4-4.1 4.1-2.1-2.1L7 12z',
  logout: 'M10 17v-2H5V9h5V7l5 5zM14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5v-2h5V5h-5z',
  update:
    'M12 4V1L8 5l4 4V6a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8m0 10a2 2 0 1 0 2 2 2 2 0 0 0-2-2',
  mood: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8m3.5-9a1.5 1.5 0 1 0-1.5-1.5A1.5 1.5 0 0 0 15.5 11M8.5 11A1.5 1.5 0 1 0 7 9.5 1.5 1.5 0 0 0 8.5 11m3.5 6.5a5.5 5.5 0 0 1-5.4-4.5h10.8a5.5 5.5 0 0 1-5.4 4.5',
  image: 'M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5z',
  refresh:
    'M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z',
  link: 'M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7A3.1 3.1 0 0 1 3.9 12M8 13h8v-2H8zm9-6h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10',
  arrow: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z'
};

type IconProps = {
  name: IconName;
  className?: string;
  filled?: boolean;
};

export function Icon({ name, className, filled }: IconProps) {
  return (
    <svg
      aria-hidden='true'
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      height='24'
      viewBox='0 0 24 24'
      width='24'
    >
      <path d={PATHS[name]} fill='currentColor' />
    </svg>
  );
}
