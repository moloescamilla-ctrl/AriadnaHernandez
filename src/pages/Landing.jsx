import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BookCover from "../components/BookCover.jsx";
import useReveal from "../components/useReveal.js";
import { authorPhotoSrc } from "../components/assets.js";
import {
  AMAZON_URL,
  AUTHOR,
  BOOK,
  EXCERPT,
  FAQ,
  FORMATS,
  SYNOPSIS,
  TESTIMONIALS,
  THEMES,
  money,
} from "../data/config.js";
import "./Landing.css";

export default function Landing() {
  useReveal();
  const formats = Object.values(FORMATS);

  return (
    <div className="landing">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero">
        <Header overlay />
        <div className="hero__glow" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__kicker">Un libro de {BOOK.author}</p>
            <h1>{BOOK.title}</h1>
            {BOOK.subtitle && <p className="hero__subtitle">{BOOK.subtitle}</p>}
            <div className="hero__ctas">
              <a href="#formatos" className="btn btn-gold">
                Quiero el libro
              </a>
              <a href="#fragmento" className="btn btn-ghost">
                Leer un fragmento
              </a>
            </div>
            <p className="hero__formats">Ebook · Libro físico con envío · Amazon</p>
          </div>
          <div className="hero__book">
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

        <div className="container themes">
          {THEMES.map((t, i) => (
            <article className="theme reveal" key={t.title}>
              <span className="theme__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Fragmento ──────────────────────────────────────── */}
      <section className="excerpt" id="fragmento">
        <div className="container excerpt__inner reveal">
          <span className="excerpt__mark" aria-hidden="true">
            “
          </span>
          <blockquote>
            <p>{EXCERPT.text}</p>
            <footer>{EXCERPT.source}</footer>
          </blockquote>
        </div>
      </section>

      {/* ── Autora ─────────────────────────────────────────── */}
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

            {AMAZON_URL && (
              <article className="format format--amazon reveal">
                <h3>Amazon</h3>
                <p className="format__price">Kindle y pasta blanda</p>
                <p className="format__desc">
                  Si ya compras en Amazon, también puedes encontrarlo ahí.
                </p>
                <ul>
                  <li>Lectura en Kindle</li>
                  <li>Envío con Amazon</li>
                </ul>
                <a
                  href={AMAZON_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost btn-block"
                >
                  Ver en Amazon
                </a>
              </article>
            )}
          </div>

          <p className="formats__pay">
            Pago seguro con Mercado Pago: tarjeta de crédito o débito, saldo Mercado Pago u OXXO.
          </p>
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

      {/* ── CTA final ──────────────────────────────────────── */}
      <section className="closing">
        <div className="container closing__inner reveal">
          <BookCover size="sm" />
          <div>
            <h2>Tal vez no es la fe lo que tienes que dejar, sino lo que te contaron de ella.</h2>
            <a href="#formatos" className="btn btn-gold">
              Quiero el libro
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
