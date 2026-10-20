/**
 * Types de l'API « File System Access » (Chrome, Edge).
 *
 * Elle permet à la page de lister les images d'un dossier choisi par
 * l'utilisateur et d'en sélectionner plusieurs. Elle n'existe pas sur
 * Firefox, Safari et iOS : le site détecte son absence et propose alors le
 * sélecteur du système, qui reste le seul moyen d'ajouter une image.
 */

export type FileSystemHandleLike = {
  kind: 'file' | 'directory';
  name: string;
};

export type FileSystemFileHandleLike = FileSystemHandleLike & {
  getFile: () => Promise<File>;
};

export type DirectoryHandleLike = FileSystemHandleLike & {
  values: () => AsyncIterableIterator<FileSystemHandleLike>;
};

declare global {
  interface Window {
    showDirectoryPicker?: (options?: {
      mode?: 'read' | 'readwrite';
      id?: string;
      startIn?: string;
    }) => Promise<DirectoryHandleLike>;
  }
}
