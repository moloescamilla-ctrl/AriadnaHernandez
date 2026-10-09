// Imágenes que se detectan solas en src/assets/. Si un archivo no existe,
// el sitio usa un respaldo (portada tipográfica, monograma) o lo omite.
const pick = (modules) => Object.values(modules)[0] || null;

// Portada en mockup 3D sobre fondo blanco.
export const coverSrc = pick(
  import.meta.glob("../assets/portada.{jpg,jpeg,png,webp}", { eager: true, import: "default" }),
);
// Foto del libro en ambiente (opcional).
export const lifestyleSrc = pick(
  import.meta.glob("../assets/libro-ambiente.{jpg,jpeg,png,webp}", { eager: true, import: "default" }),
);
export const authorPhotoSrc = pick(
  import.meta.glob("../assets/autora.{jpg,jpeg,png,webp}", { eager: true, import: "default" }),
);
