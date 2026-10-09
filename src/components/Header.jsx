import { Link } from "react-router-dom";
import { BOOK } from "../data/config.js";
import "./Header.css";

export default function Header({ overlay = false }) {
  return (
    <header className={overlay ? "site-header site-header--overlay" : "site-header"}>
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={`${BOOK.author} — inicio`}>
          {BOOK.author}
        </Link>
        <nav className="site-nav" aria-label="Secciones">
          {overlay && (
            <>
              <a href="#libro">El libro</a>
              <a href="#indice">Índice</a>
            </>
          )}
          <a href={overlay ? "#formatos" : "/#formatos"} className="navcta">
            Comprar
          </a>
        </nav>
      </div>
    </header>
  );
}
