import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "../data/config.js";
import "./Confirmation.css";

// Mercado Pago regresa aquí con ?status=approved|pending|failure (o
// collection_status). "f" lo agregamos nosotros en la back_url con el formato.
const MESSAGES = {
  approved: {
    ebook: {
      title: "¡Gracias! Tu ebook va en camino",
      body: "En unos minutos recibirás un correo con el acceso a tu ebook. Si no lo ves, revisa tu carpeta de spam o promociones.",
    },
    fisico: {
      title: "¡Gracias! Recibimos tu pedido",
      body: "Ya estamos preparando tu libro. Te enviaremos un correo con la guía de rastreo en cuanto salga tu paquete.",
    },
  },
  pending: {
    title: "Tu pago está pendiente",
    body: "Si elegiste pagar en OXXO, completa el pago con la referencia que te dio Mercado Pago. En cuanto se acredite, te avisaremos por correo.",
  },
  failure: {
    title: "No se pudo completar el pago",
    body: "No se realizó ningún cargo. Puedes intentarlo de nuevo con otro método o escribirnos y te ayudamos.",
  },
};

export default function Confirmation() {
  const [params] = useSearchParams();
  const rawStatus = params.get("status") || params.get("collection_status") || "approved";
  const status = rawStatus === "approved" ? "approved" : ["pending", "in_process"].includes(rawStatus) ? "pending" : "failure";
  const formato = params.get("f") === "ebook" ? "ebook" : "fisico";
  const msg = status === "approved" ? MESSAGES.approved[formato] : MESSAGES[status];

  return (
    <div className="confirmation">
      <Header />
      <div className="container confirmation__inner">
        <div className={`confirmation__badge confirmation__badge--${status}`} aria-hidden="true">
          {status === "approved" ? "✓" : status === "pending" ? "…" : "!"}
        </div>
        <h1>{msg.title}</h1>
        <p>{msg.body}</p>

        {status === "failure" && (
          <Link to={`/comprar/${formato}`} className="btn btn-gold">
            Intentar de nuevo
          </Link>
        )}

        <div className="confirmation__support">
          <p>¿Alguna duda con tu compra?</p>
          <a
            className="btn btn-primary"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            Escríbenos al {WHATSAPP_DISPLAY}
          </a>
        </div>

        <Link to="/" className="confirmation__back">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
