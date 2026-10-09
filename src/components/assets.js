// Detecta automáticamente la portada y la foto de la autora si existen en
// src/assets/ (portada.jpg/.png/.webp y autora.jpg/.png/.webp). Si no están,
// el sitio muestra una portada tipográfica y un monograma provisionales.
const covers = import.meta.glob("../assets/portada.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const photos = import.meta.glob("../assets/autora.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

export const coverSrc = Object.values(covers)[0] || null;
export const authorPhotoSrc = Object.values(photos)[0] || null;
