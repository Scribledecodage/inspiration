import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { getVersion } from '@tauri-apps/api/app';
import { listen } from '@tauri-apps/api/event';

export type UpdateInfo = {
  version: string;
  notes: string;
  date: string;
};

export type UpdateState = {
  status: 'idle' | 'checking' | 'downloading' | 'ready' | 'error';
  info?: UpdateInfo;
  progress?: number;
  error?: string;
};

const listeners = new Set<(state: UpdateState) => void>();

let state: UpdateState = { status: 'idle' };

function emit(next: UpdateState): void {
  state = next;
  listeners.forEach((listener) => listener(next));
}

export function onUpdateState(
  listener: (state: UpdateState) => void
): () => void {
  listeners.add(listener);
  listener(state);

  return () => listeners.delete(listener);
}

/**
 * Vérifie si une mise à jour est disponible.
 *
 * Les paquets sont signés : l'application refuse d'installer une mise à
 * jour dont la signature ne correspond pas à la clé publique embarquée.
 */
export async function checkForUpdates(manual = false): Promise<void> {
  emit({ status: 'checking' });

  try {
    const update = await check();

    if (!update) {
      emit({ status: 'idle' });

      if (manual)
        emit({
          status: 'idle',
          error: 'Vous utilisez la dernière version.'
        });

      return;
    }

    emit({
      status: 'idle',
      info: {
        version: update.version,
        notes: update.body ?? '',
        date: update.date ?? ''
      }
    });
  } catch (error) {
    emit({
      status: 'error',
      error: error instanceof Error ? error.message : 'Vérification impossible.'
    });
  }
}

/**
 * Télécharge et installe la mise à jour.
 *
 * Le téléchargement se fait en arrière-plan : l'application reste
 * utilisable, et l'installation est silencieuse (« passive »).
 */
export async function installUpdate(): Promise<void> {
  try {
    const update = await check();

    if (!update) {
      emit({ status: 'idle' });
      return;
    }

    let downloaded = 0;
    let total = 0;

    await update.downloadAndInstall((event) => {
      switch (event.event) {
        case 'Started':
          total = event.data.contentLength ?? 0;
          emit({
            status: 'downloading',
            progress: 0,
            info: {
              version: update.version,
              notes: update.body ?? '',
              date: ''
            }
          });
          break;
        case 'Progress':
          downloaded += event.data.chunkLength;
          emit({
            status: 'downloading',
            progress: total ? Math.round((downloaded / total) * 100) : 0,
            info: {
              version: update.version,
              notes: update.body ?? '',
              date: ''
            }
          });
          break;
        case 'Finished':
          emit({
            status: 'ready',
            info: {
              version: update.version,
              notes: update.body ?? '',
              date: ''
            }
          });
          break;
      }
    });

    await relaunch();
  } catch (error) {
    emit({
      status: 'error',
      error: error instanceof Error ? error.message : 'Installation impossible.'
    });
  }
}

/**
 * Vérification automatique.
 *
 * Une fois au démarrage (tard, pour ne pas ralentir l'ouverture), puis
 * toutes les six heures. L'application ne consomme de la connexion que
 * pour cette vérification : le fil, lui, passe par l'écoute Firestore,
 * qui ne télécharge que les différences.
 */
export function startUpdateWatcher(): () => void {
  const timer = setTimeout(() => {
    void checkForUpdates();
  }, 15_000);

  const interval = setInterval(() => {
    void checkForUpdates();
  }, 6 * 60 * 60 * 1000);

  // Le menu de l'icône de la zone de notification demande une
  // vérification immédiate.
  const unlisten = listen('menu://update', () => {
    void checkForUpdates(true);
  });

  return () => {
    clearTimeout(timer);
    clearInterval(interval);
    unlisten.then((stop) => stop());
  };
}

export async function currentVersion(): Promise<string> {
  try {
    return await getVersion();
  } catch {
    return '1.0.0';
  }
}

/**
 * Version annoncée par le manifeste distant (celle de la dernière version
 * publiée). Sert à afficher l'état du système de mise à jour.
 */
export async function latestPublishedVersion(): Promise<string | null> {
  try {
    const response = await fetch(
      'https://github.com/Scribledecodage/inspiration/releases/latest/download/latest.json'
    );

    if (!response.ok) return null;

    const manifest = (await response.json()) as { version?: string };

    return manifest.version ?? null;
  } catch {
    return null;
  }
}
