# Mi Dios no es el que me contaron — sitio del libro

Sitio de venta del libro de **Ariadna Hernández**. Hecho con React + Vite y publicado en Vercel; la venta se hace en Mercado Libre.

## Qué hace

- **Landing**: portada, sinopsis, cita, índice, autora (cuando haya biografía), testimonios (cuando haya), compra, preguntas frecuentes.
- **Venta**: única opción, el libro impreso en Mercado Libre. El botón lleva a la publicación y Mercado Libre se encarga del cobro y el envío. El enlace y el precio están en `MERCADO_LIBRE` dentro de `src/data/config.js`.

## Editar contenido

Todo el texto, precios y datos de contacto están en `src/data/config.js`. Lo marcado con `TODO` es provisional.

- **Portada**: `src/assets/portada.jpg` (mockup 3D sobre fondo blanco). Se detecta sola.
- **Foto del libro en ambiente**: `src/assets/libro-ambiente.jpg` (se usa junto al índice).
- **Ornamentos**: `src/components/Brush.jsx` dibuja en SVG soles, ondas y trazos de pincel inspirados en las ilustraciones del libro (no usa las ilustraciones originales).
- **Foto de la autora**: `src/assets/autora.jpg`.
- **Precio**: `MERCADO_LIBRE.price` en `config.js`. Si cambias el precio en Mercado Libre, actualízalo aquí también.

## Desarrollo local

```bash
npm install
npm run dev
```

## Publicación

El sitio está en Vercel, conectado a este repo: cada cambio que llega a `main` se publica solo.
