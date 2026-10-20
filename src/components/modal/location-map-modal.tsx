/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { useWindow } from '@lib/context/window-context';
import { Modal } from './modal';
import { Button } from '@components/ui/button';
import { MaterialIcon } from '@components/ui/material-icon';
import type { Variants } from 'framer-motion';

const sheetAnimation: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  exit: { opacity: 0, y: '100%', transition: { duration: 0.2 } }
};

type LayerMode = 'standard' | 'satellite';

type LocationMapModalProps = {
  open: boolean;
  closeModal: () => void;
  location: string;
};

declare global {
  interface Window {
    L?: any;
  }
}

/* Charge Leaflet (gratuit, sans clé) depuis le CDN si nécessaire. */
function loadLeaflet(): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.L) return Promise.resolve(window.L);

  return new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-leaflet]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.setAttribute('data-leaflet', '1');
      document.head.appendChild(link);
    }

    const existing = document.querySelector('script[data-leaflet]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.L));
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.setAttribute('data-leaflet', '1');
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error('Leaflet load failed'));
    document.head.appendChild(script);
  });
}

/* Fenêtre qui affiche un vrai plan (OpenStreetMap / Esri satellite) pour le
   lieu d'une publication. Sur mobile elle s'ouvre comme un menu collé au bas. */
export function LocationMapModal({
  open,
  closeModal,
  location
}: LocationMapModalProps): JSX.Element {
  const { isMobile } = useWindow();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<{ standard?: any; satellite?: any }>({});
  const [mode, setMode] = useState<LayerMode>('standard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const setup = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const L = await loadLeaflet();
        if (cancelled || !mapContainerRef.current) return;

        // Géocodage du lieu pour centrer la carte.
        let lat = 0;
        let lon = 0;
        try {
          const res = await fetch(
            `/api/location/geocode?q=${encodeURIComponent(location)}`
          );
          if (res.ok) {
            const data = (await res.json()) as { lat: number | null; lon: number | null };
            if (data.lat != null && data.lon != null) {
              lat = data.lat;
              lon = data.lon;
            }
          }
        } catch {
          // on garde 0,0
        }

        if (cancelled || !mapContainerRef.current) return;

        const map = L.map(mapContainerRef.current, { zoomControl: true });
        const standard = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { attribution: '© OpenStreetMap' }
        );
        const satellite = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          { attribution: '© Esri' }
        );

        standard.addTo(map);
        layersRef.current = { standard, satellite };

        const startZoom = lat && lon ? 13 : 2;
        map.setView([lat || 20, lon || 0], startZoom);

        if (lat && lon) {
          L.marker([lat, lon]).addTo(map).bindPopup(location).openPopup();
        }

        mapRef.current = map;
      } catch {
        if (!cancelled) setError('Impossible de charger la carte.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Laisser le DOM s'afficher avant d'initialiser Leaflet.
    const timer = window.setTimeout(() => void setup(), 50);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      layersRef.current = {};
    };
  }, [open, location]);

  // Bascule de couche (plan / satellite).
  useEffect(() => {
    const map = mapRef.current;
    const layers = layersRef.current;
    if (!map || !layers.standard || !layers.satellite) return;

    if (mode === 'standard') {
      map.removeLayer(layers.satellite);
      layers.standard.addTo(map);
    } else {
      map.removeLayer(layers.standard);
      layers.satellite.addTo(map);
    }
  }, [mode]);

  const useGPS = (): void => {
    if (!navigator.geolocation) {
      setError('Géolocalisation indisponible.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const map = mapRef.current;
        const L = window.L;
        if (map && L) {
          map.setView([coords.latitude, coords.longitude], 15);
          L.marker([coords.latitude, coords.longitude])
            .addTo(map)
            .bindPopup('Ma position')
            .openPopup();
        }
      },
      () => setError('Accès à la position refusé.'),
      { timeout: 10000 }
    );
  };

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      className={isMobile ? 'flex items-end !p-0' : undefined}
      modalAnimation={isMobile ? sheetAnimation : undefined}
      modalClassName={
        isMobile
          ? 'w-full overflow-hidden rounded-t-3xl border-t border-light-border bg-main-background pb-[env(safe-area-inset-bottom)] dark:border-dark-border'
          : 'w-full max-w-2xl overflow-hidden rounded-lg bg-main-background shadow-xl'
      }
      drag={isMobile ? 'y' : undefined}
      onDragEnd={(_, info) => {
        if (isMobile && info.offset.y > 80) closeModal();
      }}
    >
      <div className='flex items-center justify-between border-b border-light-border px-4 py-3 dark:border-dark-border'>
        <h2 className={cn('font-bold', isMobile ? 'mt-4 text-lg' : 'text-xl')}>
          {location}
        </h2>
        <Button
          className='accent-tab rounded-full p-2 hover:bg-main-accent/10'
          onClick={closeModal}
          aria-label='Fermer'
        >
          <MaterialIcon className='h-5 w-5' iconName='close' />
        </Button>
      </div>

      <div className='relative'>
        {loading && (
          <div className='absolute inset-0 z-[1000] flex items-center justify-center bg-main-background/70'>
            <span className='inline-block h-6 w-6 animate-spin rounded-full border-2 border-main-accent border-t-transparent' />
          </div>
        )}
        {error && (
          <p className='px-4 py-2 text-sm text-accent-red'>{error}</p>
        )}
        <div
          ref={mapContainerRef}
          className={cn('w-full', isMobile ? 'h-[45vh]' : 'h-[60vh]')}
        />
      </div>

      <div className='flex flex-wrap items-center gap-2 border-t border-light-border px-4 py-3 dark:border-dark-border'>
        <Button
          className={cn(
            'rounded-full px-3 py-1.5 text-sm font-bold',
            mode === 'standard'
              ? 'bg-main-accent text-white'
              : 'hover:bg-main-accent/10 text-main-accent'
          )}
          onClick={() => setMode('standard')}
        >
          Plan
        </Button>
        <Button
          className={cn(
            'rounded-full px-3 py-1.5 text-sm font-bold',
            mode === 'satellite'
              ? 'bg-main-accent text-white'
              : 'hover:bg-main-accent/10 text-main-accent'
          )}
          onClick={() => setMode('satellite')}
        >
          Satellite
        </Button>
        <Button
          className='rounded-full px-3 py-1.5 text-sm font-bold text-main-accent hover:bg-main-accent/10'
          onClick={useGPS}
        >
          <MaterialIcon className='mr-1 inline h-4 w-4' iconName='location_on' />
          Ma position
        </Button>
      </div>
    </Modal>
  );
}
