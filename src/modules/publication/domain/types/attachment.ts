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

export interface Attachment {
  url: string;
  type: string;
  size_bytes: number;
  mime_type: MimeType;
  dimensions?: Dimension;
  duration_seconds?: number;
  is_looping?: boolean;
}

export interface Dimension {
  width: number;
  height: number;
}

// Ejemplo de datos.
// "attachments": [
//     {
//       "url": "https://s3.amazonaws.com/my-bucket/foto1.jpg",
//       "type": "image",
//       "size_bytes": 1048576,
//       "dimensions": { "width": 1920, "height": 1080 },
//       "mime_type": "image/jpeg"
//     },
//     {
//       "url": "https://s3.amazonaws.com/my-bucket/video1.mp4",
//       "type": "video",
//       "size_bytes": 52428800,
//       "duration_seconds": 30,
//       "mime_type": "video/mp4"
//     },
//     {
//       "url": "https://s3.amazonaws.com/my-bucket/guia.pdf",
//       "type": "document",
//       "size_bytes": 204800,
//       "mime_type": "application/pdf"
//     },
//     {
//       "url": "https://s3.amazonaws.com/my-bucket/sticker_animado.gif",
//       "type": "animation",
//       "size_bytes": 450000,
//       "dimensions": { "width": 500, "height": 500 },
//       "mime_type": "image/gif",
//       "is_looping": true
//     }
//   ]
