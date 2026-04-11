export type MimeType =
  // Imagenes
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  // Animaciones
  | "image/gif"
  // Videos
  | "video/mp4"
  | "video/webm"
  // Documentos
  | "application/pdf";

export type Type = "image" | "video" | "document" | "animation";
export interface Attachment {
  url: string;
  type: Type;
  size_bytes: number;
  mime_type: MimeType;
  dimensions?: Dimension;
}

export interface Dimension {
  width: number;
  height: number;
}
