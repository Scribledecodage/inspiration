export type ImageData = {
  src: string;
  alt: string;
  type?: string;
  /* Dimensions naturelles de l'image, en pixels. Elles servent à réserver
     la place exacte de l'image avant son chargement : sans elles, la
     publication change de hauteur quand l'image arrive, et le fil bouge
     sous les yeux du lecteur. */
  width?: number;
  height?: number;
};

export type ImagesPreview = (ImageData & {
  id: string;
})[];

export type ImagePreview = ImageData & { id: string };
export type FileWithId = File & { id: string };

export type FilesWithId = (File & {
  id: string;
})[];
