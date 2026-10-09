import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import BookCover from "../components/BookCover.jsx";
import { APPS_SCRIPT_URL, BOOK, FORMATS, money } from "../data/config.js";
import "./Checkout.css";

const ESTADOS = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México",
  "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit",
  "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
  "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
];

const EMPTY = {
  nombre: "",
  correo: "",
  telefono: "",
  calle: "",
  colonia: "",
  ciudad: "",
  estado: "",
  cp: "",
  referencias: "",
};

export default function Checkout() {
  const params = useParams();
  const navigate = useNavigate();
  const formato = FORMATS[params.formato] ? params.formato : "fisico";
  const f = FORMATS[formato];
  const esFisico = formato === "fisico";

  const [form, setForm] = useState(EMPTY);
  const [cantidad, setCantidad] = useState(1);
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [errorMsg, setErrorMsg] = useState("");

  const subtotal = f.precio * (esFisico ? cantidad : 1);
  const envio = esFisico ? f.envio || 0 : 0;
  const total = subtotal + envio;

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    if (!APPS_SCRIPT_URL) {
      setStatus("error");
      setErrorMsg("El pago todavía no está conectado. Escríbenos por WhatsApp y te ayudamos con tu compra.");
      return;
    }

    try {
      const body = new URLSearchParams({
        action: "crear_preferencia_mp",
        formato,
        cantidad: String(esFisico ? cantidad : 1),
        ...form,
      });
      // x-www-form-urlencoded evita el preflight CORS con Apps Script.
      const res = await fetch(APPS_SCRIPT_URL, { method: "POST", body });
      const data = await res.json();
      if (!data.checkoutUrl) throw new Error(data.error || "No se recibió la URL de pago");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("No pudimos conectar con Mercado Pago. Intenta de nuevo en un momento.");
    }
  }

  return (
    <div className="checkout">
      <Header />

      <div className="container checkout__layout">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <p className="eyebrow">Tu compra</p>
          <h1>Completa tus datos</h1>

          <div className="format-switch" role="tablist" aria-label="Formato">
            {Object.values(FORMATS).map((opt) => (
              <button
                key={opt.key}
                type="button"
                role="tab"
                aria-selected={opt.key === formato}
                className={opt.key === formato ? "is-active" : ""}
                onClick={() => navigate(`/comprar/${opt.key}`, { replace: true })}
              >
                {opt.label}
                <span>{money(opt.precio)}</span>
              </button>
            ))}
          </div>

          <fieldset>
            <legend>Contacto</legend>
            <label className="field">
              <span>Nombre completo</span>
              <input required autoComplete="name" value={form.nombre} onChange={set("nombre")} />
            </label>
            <div className="field-row">
              <label className="field">
                <span>Correo electrónico</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={esFisico ? "para enviarte tu guía" : "aquí llegará tu ebook"}
                  value={form.correo}
                  onChange={set("correo")}
                />
              </label>
              <label className="field">
                <span>Teléfono {esFisico ? "" : "(opcional)"}</span>
                <input
                  type="tel"
                  required={esFisico}
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.telefono}
                  onChange={set("telefono")}
                />
              </label>
            </div>
          </fieldset>

          {esFisico && (
            <fieldset>
              <legend>Dirección de envío</legend>
              <label className="field">
                <span>Calle y número</span>
                <input required autoComplete="street-address" value={form.calle} onChange={set("calle")} />
              </label>
              <div className="field-row">
                <label className="field">
                  <span>Colonia</span>
                  <input required value={form.colonia} onChange={set("colonia")} />
                </label>
                <label className="field">
                  <span>Código postal</span>
                  <input
                    required
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    autoComplete="postal-code"
                    value={form.cp}
                    onChange={set("cp")}
                  />
                </label>
              </div>
              <div className="field-row">
                <label className="field">
                  <span>Ciudad o municipio</span>
                  <input required autoComplete="address-level2" value={form.ciudad} onChange={set("ciudad")} />
                </label>
                <label className="field">
                  <span>Estado</span>
                  <select required value={form.estado} onChange={set("estado")}>
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {ESTADOS.map((e) => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="field">
                <span>Referencias (opcional)</span>
                <input
                  placeholder="entre calles, color de la casa…"
                  value={form.referencias}
                  onChange={set("referencias")}
                />
              </label>
            </fieldset>
          )}

          <button type="submit" className="btn btn-gold btn-block" disabled={status === "sending"}>
            {status === "sending" ? "Conectando con Mercado Pago…" : `Pagar ${money(total)}`}
          </button>

          {status === "error" && <p className="checkout__error">{errorMsg}</p>}

          <p className="checkout__note">
            Te llevaremos a Mercado Pago para pagar con tarjeta, saldo Mercado Pago o efectivo en OXXO.
            {esFisico
              ? " En cuanto se confirme tu pago, preparamos tu envío y te avisamos por correo."
              : " En cuanto se confirme tu pago, recibes tu ebook por correo automáticamente."}
          </p>
        </form>

        <aside className="summary">
          <div className="summary__book">
            <BookCover size="sm" />
            <div>
              <p className="summary__title">{BOOK.title}</p>
              <p className="summary__author">{BOOK.author}</p>
              <p className="summary__format">{f.label}</p>
            </div>
          </div>

          {esFisico && (
            <div className="qty">
              <span>Cantidad</span>
              <div className="qty__ctrl">
                <button
                  type="button"
                  aria-label="Quitar uno"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                >
                  −
                </button>
                <span aria-live="polite">{cantidad}</span>
                <button
                  type="button"
                  aria-label="Agregar uno"
                  onClick={() => setCantidad((c) => Math.min(10, c + 1))}
                >
                  +
                </button>
              </div>
            </div>
          )}

          <dl className="summary__lines">
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            {esFisico && (
              <div>
                <dt>Envío</dt>
                <dd>{money(envio)}</dd>
              </div>
            )}
            <div className="summary__total">
              <dt>Total</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>

          <Link to="/#formatos" className="summary__back" reloadDocument>
            ← Volver al libro
          </Link>
        </aside>
      </div>
    </div>
  );
}
