import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BookCover from "../components/BookCover.jsx";
import { BrushDefs, BrushStroke, CompassMark, Ripples, Sunburst } from "../components/Brush.jsx";
import useReveal from "../components/useReveal.js";
import { authorPhotoSrc, lifestyleSrc } from "../components/assets.js";
import {
  AUTHOR,
  BOOK,
  CLOSING_QUESTION,
  CONTENTS,
  FAQ,
  FORMATS,
  QUOTE,
  STORES,
  SYNOPSIS,
  TESTIMONIALS,
  money,
} from "../data/config.js";
import "./Landing.css";

export default function Landing() {
  useReveal();
  const formats = Object.values(FORMATS);
  const stores = STORES.filter((s) => s.url);

  return (
    <div className="landing">
      <BrushDefs />
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero">
        <Header overlay />
        <span className="hero__wash hero__wash--orange" aria-hidden="true" />
        <span className="hero__wash hero__wash--violet" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__kicker">Un libro de {BOOK.author}</p>
            <h1>
              Mi Dios{" "}
              <span className="hero__mid">
                no es el que
                <BrushStroke className="hero__stroke" />
              </span>{" "}
              me contaron
            </h1>
            <p className="hero__subtitle">{BOOK.subtitle}</p>
            <div className="hero__ctas">
              <a href="#formatos" className="btn btn-gold">
                Quiero el libro
              </a>
              <a href="#indice" className="btn btn-ghost">
                Ver el índice
              </a>
            </div>
            <p className="hero__formats">Ebook · Libro físico con envío a todo México</p>
          </div>
          <div className="hero__book">
            <Sunburst className="hero__sun" rays={18} />
            <BookCover />
          </div>
        </div>
      </section>

      {/* ── Sinopsis ───────────────────────────────────────── */}
      <section className="section synopsis" id="libro">
        <div className="container synopsis__grid">
          <div className="synopsis__lead reveal">
            <p className="eyebrow">El libro</p>
            <h2>{SYNOPSIS[0]}</h2>
          </div>
          <div className="synopsis__body reveal">
            {SYNOPSIS.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cita ───────────────────────────────────────────── */}
      <section className="quote">
        <div className="container quote__inner reveal">
          <Sunburst className="quote__sun" rays={16} />
          <blockquote>
            <p>{QUOTE.text}</p>
          </blockquote>
        </div>
      </section>

      {/* ── Índice ─────────────────────────────────────────── */}
      <section className="section contents" id="indice">
        <div className="container contents__grid">
          {lifestyleSrc && (
            <div className="contents__photo reveal">
              <img src={lifestyleSrc} alt={`El libro ${BOOK.title} sobre una mesa`} loading="lazy" />
            </div>
          )}
          <div className="contents__list reveal">
            <div className="contents__eyebrow">
              <CompassMark className="contents__compass" />
              <p className="eyebrow">Índice</p>
            </div>
            <h2>Lo que vas a recorrer</h2>
            <ol>
              {CONTENTS.map((c) => (
                <li key={c.title || c.label} className={c.num ? "" : "is-intro"}>
                  {c.num && <span className="contents__num">{c.num}</span>}
                  <span className="contents__title">{c.title || c.label}</span>
                  {c.page && <span className="contents__page">{c.page}</span>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Autora (solo si hay biografía) ─────────────────── */}
      {AUTHOR.bio.length > 0 && (
        <section className="section author" id="autora">
          <div className="container author__grid">
            <div className="author__photo reveal">
              {authorPhotoSrc ? (
                <img src={authorPhotoSrc} alt={BOOK.author} />
              ) : (
                <div className="author__monogram" aria-hidden="true">
                  AH
                </div>
              )}
            </div>
            <div className="author__copy reveal">
              <p className="eyebrow">La autora</p>
              <h2>{BOOK.author}</h2>
              {AUTHOR.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonios (solo si hay) ──────────────────────── */}
      {TESTIMONIALS.length > 0 && (
        <section className="section testimonials">
          <div className="container">
            <p className="eyebrow">Lectores</p>
            <h2>Lo que dicen quienes ya lo leyeron</h2>
            <div className="testimonials__grid">
              {TESTIMONIALS.map((t) => (
                <figure className="testimonial reveal" key={t.name}>
                  <blockquote>{t.text}</blockquote>
                  <figcaption>{t.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Formatos ───────────────────────────────────────── */}
      <section className="section formats" id="formatos">
        <div className="container">
          <div className="formats__head reveal">
            <p className="eyebrow">Consíguelo</p>
            <h2>Elige cómo quieres leerlo</h2>
            <BrushStroke className="formats__stroke" color="var(--lavender)" />
          </div>

          <div className="formats__grid">
            {formats.map((f) => (
              <article
                className={f.destacado ? "format reveal format--featured" : "format reveal"}
                key={f.key}
              >
                {f.destacado && <p className="format__badge">Más elegido</p>}
                <h3>{f.label}</h3>
                <p className="format__price">
                  {money(f.precio)}
                  {f.envio ? <span> + {money(f.envio)} de envío</span> : null}
                </p>
                <p className="format__desc">{f.descripcion}</p>
                <ul>
                  {f.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link
                  to={`/comprar/${f.key}`}
                  className={f.destacado ? "btn btn-gold btn-block" : "btn btn-primary btn-block"}
                >
                  Comprar {f.key === "ebook" ? "ebook" : "libro físico"}
                </Link>
              </article>
            ))}
          </div>

          <p className="formats__pay">
            Pago seguro con Mercado Pago: tarjeta de crédito o débito, saldo Mercado Pago u OXXO.
          </p>

          {stores.length > 0 && (
            <div className="stores reveal">
              <p>También disponible en</p>
              <div className="stores__list">
                {stores.map((s) => (
                  <a key={s.key} href={s.url} target="_blank" rel="noreferrer" className="store">
                    <strong>{s.name}</strong>
                    <span>{s.note}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <dl className="details reveal">
            {BOOK.details.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="section faq">
        <div className="container faq__inner">
          <div className="reveal">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Antes de comprar</h2>
          </div>
          <div className="faq__list">
            {FAQ.map((item) => (
              <details className="faq__item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cierre ─────────────────────────────────────────── */}
      <section className="closing">
        <div className="container closing__inner reveal">
          <Ripples className="closing__ripples" />
          <h2>{CLOSING_QUESTION}</h2>
          <a href="#formatos" className="btn btn-gold">
            Quiero el libro
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
