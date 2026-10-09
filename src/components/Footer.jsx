import { BOOK, SOCIAL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "../data/config.js";
import "./Footer.css";

const SOCIAL_LABELS = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };

export default function Footer() {
  const socials = Object.entries(SOCIAL).filter(([, url]) => url);
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__title">{BOOK.title}</p>
          <p className="site-footer__by">{BOOK.author}</p>
        </div>
        <div className="site-footer__links">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          {socials.map(([key, url]) => (
            <a key={key} href={url} target="_blank" rel="noreferrer">
              {SOCIAL_LABELS[key]}
            </a>
          ))}
        </div>
      </div>
      <div className="container site-footer__legal">
        © {new Date().getFullYear()} {BOOK.legalName}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
