import { BOOK } from "../data/config.js";
import { coverSrc } from "./assets.js";
import "./BookCover.css";

export default function BookCover({ size = "lg" }) {
  return (
    <div className={`book book--${size}`}>
      <div className="book__spine" aria-hidden="true" />
      {coverSrc ? (
        <img className="book__img" src={coverSrc} alt={`Portada de ${BOOK.title}`} />
      ) : (
        <div className="book__face" role="img" aria-label={`Portada de ${BOOK.title}`}>
          <span className="book__sun" aria-hidden="true" />
          <span className="book__title">
            Mi Dios
            <br />
            no es el que
            <br />
            me contaron
          </span>
          <span className="book__rule" aria-hidden="true" />
          <span className="book__author">{BOOK.author}</span>
        </div>
      )}
    </div>
  );
}
