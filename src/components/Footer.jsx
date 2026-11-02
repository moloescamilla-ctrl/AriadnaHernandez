import { BOOK, FEATURED_LINKS, SOCIAL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "../data/config.js";
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
          {FEATURED_LINKS.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-btn"
              aria-label={`${l.label} en ${l.network} (se abre en una pestaña nueva)`}
            >
              {l.network === "Facebook" && (
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z"
                  />
                </svg>
              )}
              {l.label}
            </a>
          ))}
          {WHATSAPP_NUMBER && (
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          )}
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
