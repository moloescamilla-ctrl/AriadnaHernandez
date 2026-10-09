# Mi Dios no es el que me contaron — sitio del libro

Sitio de venta del libro de **Ariadna Hernández**. Misma base que Faro del Infinito: React + Vite en Vercel, con Google Apps Script como backend y Mercado Pago Checkout Pro para cobrar.

## Qué hace

- **Landing**: portada, sinopsis, temas, fragmento, autora, testimonios, formatos, preguntas frecuentes.
- **/comprar/ebook** y **/comprar/fisico**: datos del comprador (y dirección para el físico) → Mercado Pago (tarjeta, saldo MP u OXXO).
- **/confirmacion**: mensaje según el resultado del pago (aprobado / pendiente / rechazado).
- **Ebook**: al aprobarse el pago, el PDF llega por correo automáticamente.
- **Libro físico**: el pedido queda "Por enviar" en el Sheet, al comprador le llega confirmación y a la autora un aviso. Cuando se envía, menú **Libro → Marcar como enviado** en el Sheet captura la guía y se la manda al comprador.
- **Amazon**: tarjeta con enlace externo (aparece solo si hay link).

## Editar contenido

Todo el texto, precios y datos de contacto están en `src/data/config.js`. Lo marcado con `TODO` es provisional.

- **Portada**: `src/assets/portada.jpg` (mockup 3D sobre fondo blanco). Se detecta sola.
- **Foto del libro en ambiente**: `src/assets/libro-ambiente.jpg` (se usa junto al índice).
- **Ornamentos**: `src/components/Brush.jsx` dibuja en SVG soles, ondas y trazos de pincel inspirados en las ilustraciones del libro (no usa las ilustraciones originales).
- **Foto de la autora**: `src/assets/autora.jpg`.
- **Precios**: si los cambias en `config.js`, cámbialos igual en `PRECIOS` de `apps-script/Code.gs` (el servidor es el que cobra).

## Desarrollo local

```bash
npm install
npm run dev
```

## Puesta en marcha

### 1. Google Sheet y Drive
1. Crea un Google Sheet vacío (ej. "Pedidos del libro") y copia su ID.
2. Sube el PDF del ebook a Drive y copia su ID (`drive.google.com/file/d/ID/view`).

### 2. Apps Script
1. En [script.google.com](https://script.google.com) crea un proyecto nuevo.
2. Pega `apps-script/Code.gs` y crea un segundo archivo `mercadopago.gs` con su contenido.
3. En `Code.gs`, cambia `SPREADSHEET_ID`.
4. **Configuración del proyecto → Propiedades del script**:
   - `MP_ACCESS_TOKEN` — Access Token de Mercado Pago (empieza con `TEST-` para pruebas).
   - `EBOOK_FILE_ID` — ID del PDF.
   - `OWNER_EMAIL` — correo para recibir avisos de pedidos físicos.
5. **Implementar → Nueva implementación → Aplicación web**. Ejecutar como: *yo*. Acceso: *cualquier usuario*. Copia la URL `/exec`.
6. Pega esa URL en `WEBAPP_URL` (`mercadopago.gs`) y pon tu dominio en `SITE_URL`. Vuelve a implementar (*Administrar implementaciones → Editar → Nueva versión*).
7. Corre una vez `instalarTriggerOnOpen` desde el editor para tener el menú "Libro" en el Sheet.

### 3. Sitio
1. Pega la URL `/exec` en `APPS_SCRIPT_URL` de `src/data/config.js`.
2. Importa este repo en [Vercel](https://vercel.com) (detecta Vite solo). `vercel.json` ya resuelve las rutas.
3. Conecta el dominio propio en Vercel y actualiza `SITE_URL` en el Apps Script.

### 4. Probar
Con credenciales `TEST-` haz una compra de cada formato usando las tarjetas de prueba de Mercado Pago. Verifica que aparezca la fila en el Sheet, que llegue el ebook y que el pedido físico pase a "Por enviar". Luego cambia `MP_ACCESS_TOKEN` por el de producción.
