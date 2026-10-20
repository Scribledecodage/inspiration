import { openUrl as openExternal } from '@tauri-apps/plugin-opener';

/**
 * Ouvre un lien dans le navigateur du système.
 *
 * L'application de bureau n'ouvre jamais de fenêtre de navigateur
 * intégrée : les liens sortants (site web, images) partent dans le
 * navigateur par défaut de l'utilisateur.
 */
export async function openUrl(url: string): Promise<void> {
  try {
    await openExternal(url);
  } catch {
    /* Le lien est ignoré si le navigateur par défaut est introuvable. */
  }
}

/** Copie un texte dans le presse-papiers. */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* Le presse-papiers peut être refusé : on l'ignore. */
  }
}
