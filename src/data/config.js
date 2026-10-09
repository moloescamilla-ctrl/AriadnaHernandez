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
  // TODO: subtítulo real del libro (o "" si no tiene).
  subtitle: "Un camino honesto para reencontrarte con la fe",
  // La portada se detecta sola: guárdala como src/assets/portada.jpg
  // (o .png/.webp). Mientras no exista, se muestra una portada provisional.
  // TODO: datos editoriales reales.
  details: [
    { label: "Páginas", value: "—" },
    { label: "Editorial", value: "—" },
    { label: "ISBN", value: "—" },
  ],
};

// Formatos de venta. "precio" en MXN. "envio" solo aplica al físico.
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

// TODO: link real del libro en Amazon (si es "", la tarjeta de Amazon no aparece).
export const AMAZON_URL = "";

// TODO: sinopsis real (contraportada).
export const SYNOPSIS = [
  "¿Y si el Dios que te enseñaron a temer no es el mismo que te está buscando?",
  "En este libro, Ariadna Hernández comparte el camino que la llevó a cuestionar las ideas sobre Dios que recibió desde niña: la culpa, el miedo al castigo, la sensación de nunca ser suficiente. Con honestidad y sin fórmulas, invita al lector a separar lo que le contaron de lo que de verdad ha vivido.",
  "No es un libro para quitarte la fe, sino para ayudarte a encontrar una que puedas habitar.",
];

// TODO: ajustar a los temas reales del libro.
export const THEMES = [
  {
    title: "Soltar el miedo",
    text: "Reconocer las ideas que te enseñaron desde la culpa y el castigo, y por qué siguen pesando.",
  },
  {
    title: "Hacer preguntas",
    text: "Dudar no es perder la fe: es el primer paso para que deje de ser prestada y se vuelva tuya.",
  },
  {
    title: "Reencontrarte",
    text: "Construir una relación con lo sagrado basada en el amor, no en la obligación.",
  },
];

// TODO: fragmento real del libro (un párrafo corto funciona mejor).
export const EXCERPT = {
  text: "Durante años creí que Dios llevaba una lista de todo lo que hacía mal. Tardé mucho en entender que esa lista nunca fue suya: la escribieron otros, con su miedo, y me la entregaron como si fuera verdad.",
  source: "Fragmento del capítulo 1",
};

// TODO: biografía real. La foto se detecta sola en src/assets/autora.jpg.
export const AUTHOR = {
  bio: [
    "Ariadna Hernández es escritora y acompaña a personas que buscan reconciliarse con su espiritualidad después de experiencias religiosas difíciles.",
    "Mi Dios no es el que me contaron es su primer libro, nacido de su propia historia y de las conversaciones con quienes, como ella, sintieron que tenían que elegir entre su fe y su paz.",
  ],
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
    q: "¿Puedo comprarlo en Amazon?",
    a: "Sí. Si prefieres comprar por Amazon, encontrarás el enlace en la sección de formatos.",
  },
  {
    q: "¿Es un libro religioso?",
    // TODO: que Ariadna confirme cómo quiere describirlo.
    a: "Es un libro sobre espiritualidad y fe, escrito para cualquier persona que se haya sentido lejos de Dios por lo que le enseñaron, sin importar su religión o si hoy pertenece a alguna.",
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
