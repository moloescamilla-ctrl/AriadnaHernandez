import { BOOK } from "../data/config.js";
import { coverSrc } from "./assets.js";
import "./BookCover.css";

// Con portada real muestra el mockup tal cual (ya trae volumen y sombra).
// Sin portada, dibuja una provisional tipográfica.
export default function BookCover({ size = "lg" }) {
  if (coverSrc) {
    return (
      <img
        className={`book-mockup book-mockup--${size}`}
        src={coverSrc}
        alt={`Portada de ${BOOK.title}, de ${BOOK.author}`}
      />
    );
  }
  return (
    <div className={`book book--${size}`}>
      <div className="book__spine" aria-hidden="true" />
      <div className="book__face" role="img" aria-label={`Portada de ${BOOK.title}`}>
        <span className="book__author">{BOOK.author}</span>
        <span className="book__title">{BOOK.title}</span>
      </div>
    </div>
  );
}
