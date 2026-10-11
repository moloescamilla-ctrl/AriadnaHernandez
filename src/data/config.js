// ─────────────────────────────────────────────────────────────────────────
// Configuración y contenido del sitio de "Mi Dios no es el que me contaron".
// Todo el texto editable vive aquí. Lo marcado con TODO es provisional y hay
// que reemplazarlo con la información real de Ariadna antes de publicar.
// ─────────────────────────────────────────────────────────────────────────

// TODO: número real de WhatsApp (formato internacional sin "+", con 521 para MX).
// Mientras esté vacío, el botón flotante y el enlace del pie no aparecen.
export const WHATSAPP_NUMBER = "";
export const WHATSAPP_DISPLAY = "";

// TODO: redes de la autora (deja "" las que no use; no se muestran).
export const SOCIAL = {
  instagram: "",
  facebook: "",
  tiktok: "",
};

export const BOOK = {
  title: "Mi Dios no es el que me contaron",
  author: "Ariadna Hernández",
  legalName: "Ariadna Hernández Rodríguez",
  subtitle: "Un viaje íntimo para descubrir un Dios vivo, cercano y transformador.",
  // La portada se detecta sola en src/assets/portada.jpg.
  details: [
    { label: "ISBN", value: "978-607-29-9118-7" },
    { label: "Edición", value: "Fernando Alonso Muñoz Marmolejo" },
    { label: "Año", value: "2025" },
    { label: "Impreso en", value: "México" },
  ],
};

// Venta: única opción, libro físico en Mercado Libre (cobro y envío los
// maneja Mercado Libre).
export const MERCADO_LIBRE = {
  url: "https://articulo.mercadolibre.com.mx/MLM-6380034056",
  // TODO: precio de la publicación en MXN (ej. 349). Si es null, la tarjeta
  // dice "Ver precio en Mercado Libre". Si cambias el precio allá, cámbialo aquí.
  price: null,
  bullets: [
    "Envío gratis",
    "Libro impreso, envío a todo México",
    "Paga con tarjeta, OXXO o Mercado Pago",
    "Compra protegida por Mercado Libre",
  ],
};

// Sinopsis (contraportada). El primer elemento es la pregunta de entrada.
export const SYNOPSIS = [
  "¿Qué es Dios? ¿Acaso no es el ser distante y castigador que nos enseñaron?",
  "En Mi Dios no es el que me contaron, la autora nos invita a un viaje íntimo y revelador que desafía las creencias tradicionales para descubrir un Dios vivo, cercano y transformador. A través de experiencias personales y vivencias que oscilan entre lo cotidiano y lo milagroso, la autora desmantela la imagen limitada de lo divino y nos muestra que Dios se esconde en cada amanecer, en el abrazo de un ser querido, en el murmullo del viento y en la resiliencia del espíritu humano.",
  "Esta obra es un llamado a abrir los ojos a una presencia que se manifiesta en el amor, en la fe y en la fuerza interior. Descubre cómo, al cuestionar lo establecido, se revela un Dios que no solo nos acompaña, sino que transforma nuestra vida de formas insospechadas.",
];

export const CLOSING_QUESTION =
  "¿Estás listo para replantearte todo lo que creías saber y abrazar un Dios que es, en esencia, vida, amor y libertad?";

export const QUOTE = {
  text: "Dios se esconde en cada amanecer, en el abrazo de un ser querido, en el murmullo del viento y en la resiliencia del espíritu humano.",
  source: "De la contraportada",
};

export const CONTENTS = [
  { label: "Introducción" },
  { num: "I", title: "¿Y qué es Dios?", page: 13 },
  { num: "II", title: "Manifestaciones de Dios", page: 27 },
  { num: "III", title: "Los caminos", page: 49 },
  { num: "IV", title: "El cambio", page: 57 },
  { num: "V", title: "La transición", page: 69 },
  { num: "VI", title: "La fe", page: 77 },
  { num: "VII", title: "El poder de la oración", page: 85 },
  { num: "VIII", title: "La brújula", page: 101 },
  { num: "IX", title: "Afirmación, intención y vibración", page: 111 },
  { num: "X", title: "La conciencia", page: 127 },
  { num: "XI", title: "Todos los caminos llegan a Roma", page: 143 },
  { num: "XII", title: "Dios", page: 155 },
];

// TODO: biografía de Ariadna (2 o 3 párrafos cortos). Mientras el arreglo
// esté vacío, la sección "La autora" no aparece. La foto se detecta sola en
// src/assets/autora.jpg.
export const AUTHOR = {
  bio: [],
};

// Testimonios de lectores. Si el arreglo está vacío, la sección no aparece.
// TODO: agregar testimonios reales (con permiso de cada persona).
export const TESTIMONIALS = [];

export const FAQ = [
  {
    q: "¿Dónde compro el libro?",
    a: "El libro se vende en Mercado Libre. Al dar clic en \u201cComprar en Mercado Libre\u201d llegas directo a la publicación, donde pagas y eliges tu envío.",
  },
  {
    q: "¿Cuánto tarda en llegar?",
    a: "Mercado Libre te muestra la fecha estimada de entrega en la publicación al poner tu código postal, y te da la guía para rastrear tu paquete.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Las que ofrece Mercado Libre: tarjeta de crédito o débito, saldo de Mercado Pago y efectivo en OXXO, entre otras.",
  },
  {
    q: "¿Hay versión digital?",
    a: "Por ahora el libro está disponible solo en formato impreso.",
  },
  {
    q: "¿De qué trata?",
    a: "Es un viaje personal que cuestiona la imagen de un Dios distante y castigador para descubrir uno vivo y cercano, a través de experiencias de la autora que van de lo cotidiano a lo milagroso. Habla de la fe, la oración, la intención y la conciencia.",
  },
];

export function money(n) {
  return `$${n.toLocaleString("es-MX")} MXN`;
}
