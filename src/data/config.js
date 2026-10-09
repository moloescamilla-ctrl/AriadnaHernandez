// ─────────────────────────────────────────────────────────────────────────
// Configuración y contenido del sitio de "Mi Dios no es el que me contaron".
// Todo el texto editable vive aquí. Lo marcado con TODO es provisional y hay
// que reemplazarlo con la información real de Ariadna antes de publicar.
// ─────────────────────────────────────────────────────────────────────────

// URL del Web App de Google Apps Script (termina en /exec).
// TODO: pegar aquí la URL después del primer despliegue del Apps Script.
export const APPS_SCRIPT_URL = "";

// TODO: número real de WhatsApp (formato internacional sin "+", con 521 para MX).
export const WHATSAPP_NUMBER = "5210000000000";
export const WHATSAPP_DISPLAY = "000 000 0000";

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

// TODO: confirmar precios reales y costo de envío.
export const FORMATS = {
  ebook: {
    key: "ebook",
    label: "Ebook (PDF)",
    precio: 149,
    descripcion: "Lo recibes en tu correo en cuanto se confirma tu pago. Léelo en celular, tablet o computadora.",
    bullets: ["Entrega inmediata y automática", "Acceso permanente", "Pago con tarjeta u OXXO"],
  },
  fisico: {
    key: "fisico",
    label: "Libro físico",
    precio: 349,
    envio: 99,
    descripcion: "El libro impreso, enviado a tu domicilio en cualquier parte de México.",
    bullets: ["Envío a todo México", "Te avisamos cuando salga tu paquete", "Pago con tarjeta u OXXO"],
    destacado: true,
  },
};

// Otras tiendas. Las que tengan url "" no aparecen.
// TODO: confirmar que el link de Mercado Libre abre la publicación correcta
// (se armó con el código MLM6362964260) y agregar el de Amazon.
export const STORES = [
  {
    key: "mercadolibre",
    name: "Mercado Libre",
    note: "Compra con tu cuenta de Mercado Libre y su envío.",
    url: "https://articulo.mercadolibre.com.mx/MLM-6362964260",
  },
  {
    key: "amazon",
    name: "Amazon",
    note: "Si ya compras en Amazon, también lo encuentras ahí.",
    url: "",
  },
];

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
    q: "¿Cómo recibo el ebook?",
    a: "En cuanto Mercado Pago confirma tu pago, te llega un correo con el acceso a tu ebook en PDF. Si pagaste en OXXO, el correo llega cuando el pago se acredita (normalmente en minutos, a veces hasta 24 horas).",
  },
  {
    q: "¿Cuánto tarda en llegar el libro físico?",
    // TODO: tiempos y paquetería reales.
    a: "Enviamos tu libro en un plazo de 2 a 3 días hábiles después de confirmar tu pago. El tiempo de entrega depende de tu ciudad; te mandamos la guía de rastreo por correo.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Tarjeta de crédito o débito, saldo de Mercado Pago y efectivo en OXXO, todo a través de Mercado Pago de forma segura.",
  },
  {
    q: "¿Lo venden en otras tiendas?",
    a: "Sí. También puedes encontrarlo en Mercado Libre; los enlaces están en la sección para conseguir el libro.",
  },
  {
    q: "¿De qué trata?",
    a: "Es un viaje personal que cuestiona la imagen de un Dios distante y castigador para descubrir uno vivo y cercano, a través de experiencias de la autora que van de lo cotidiano a lo milagroso. Habla de la fe, la oración, la intención y la conciencia.",
  },
  {
    q: "No me llegó mi correo, ¿qué hago?",
    a: "Revisa tu carpeta de spam o promociones. Si no aparece, escríbenos por WhatsApp con el correo que usaste y lo resolvemos.",
  },
];

export function totalFor(formatKey) {
  const f = FORMATS[formatKey];
  if (!f) return 0;
  return f.precio + (f.envio || 0);
}

export function money(n) {
  return `$${n.toLocaleString("es-MX")} MXN`;
}
