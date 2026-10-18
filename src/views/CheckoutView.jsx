import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { saveOrden, descontarStockDeOrden } from "../services/storageService";
import { formatPrice } from "../components/ProductCard";
import { REGIONES, getComunasPorRegion } from "../data/chileData";

export const CheckoutView = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Estados del Formulario (con autorrelleno si el usuario ha iniciado sesión)
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    calle: "",
    depto: "",
    region: "Región Metropolitana de Santiago",
    comuna: "Cerrillos",
    indicaciones: "",
    metodoPago: "webpay",
    simularFallo: false
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Autorrelleno automático al detectar usuario autenticado (Requisito Anexo 1 Pág. 6)
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        nombre: currentUser.nombre || "",
        apellidos: currentUser.apellidos || "",
        correo: currentUser.correo || "",
        calle: currentUser.direccion || "",
        region: currentUser.region || "Región Metropolitana de Santiago",
        comuna: currentUser.comuna || "Cerrillos"
      }));
    }
  }, [currentUser]);

  const comunasDisponibles = getComunasPorRegion(formData.region);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "region") {
      const comunas = getComunasPorRegion(value);
      setFormData((prev) => ({
        ...prev,
        region: value,
        comuna: comunas[0] || ""
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }

    if (errorMessage) setErrorMessage("");
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (cartItems.length === 0) {
      setErrorMessage("El carrito de compras se encuentra vacío.");
      return;
    }

    const { nombre, apellidos, correo, calle, region, comuna } = formData;

    // Validación de campos obligatorios
    if (!nombre.trim() || !apellidos.trim() || !correo.trim() || !calle.trim() || !region || !comuna) {
      setErrorMessage("Por favor, completa todos los campos obligatorios del formulario de entrega.");
      return;
    }

    // Validación de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.trim())) {
      setErrorMessage("Ingresa un correo electrónico de contacto válido.");
      return;
    }

    setIsProcessing(true);

    const codigoOrdenNum = Math.floor(10000000 + Math.random() * 90000000);
    const codigoOrdenStr = `ORD-${Date.now().toString().slice(-6)}`;

    const datosOrden = {
      id: `ORD-${Date.now()}`,
      numeroBoleta: codigoOrdenNum,
      codigoOrden: codigoOrdenStr,
      fecha: new Date().toLocaleDateString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      cliente: {
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        correo: correo.trim()
      },
      despacho: {
        calle: calle.trim(),
        depto: formData.depto.trim(),
        region,
        comuna,
        indicaciones: formData.indicaciones.trim()
      },
      items: [...cartItems],
      total: totalPrice,
      metodoPago: formData.metodoPago,
      usuarioId: currentUser?.id || null
    };

    // Simulación de procesamiento de pasarela de pago
    setTimeout(() => {
      setIsProcessing(false);

      if (formData.simularFallo) {
        // Redirigir a vista de pago rechazado (preservando el carrito)
        navigate("/pago-fallido", {
          state: {
            orden: datosOrden,
            motivo: "Fondos insuficientes o transacción rechazada por la entidad bancaria."
          }
        });
      } else {
        // Pago exitoso: guardar orden, descontar stock, vaciar carrito y redirigir
        saveOrden(datosOrden);
        descontarStockDeOrden(cartItems);
        clearCart();
        navigate("/pago-exitoso", {
          state: { orden: datosOrden }
        });
      }
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center" data-testid="checkout-empty-cart">
        <div className="card bg-dark border-secondary p-5 shadow-lg mx-auto" style={{ maxWidth: "580px" }}>
          <i className="bi bi-cart-x fs-1 text-warning mb-3"></i>
          <h3 className="fw-bold text-light mb-2">No hay productos para pagar</h3>
          <p className="text-muted mb-4">
            Tu carrito de compras está actualmente vacío. Agrega componentes desde la tienda para proceder al checkout.
          </p>
          <div>
            <Link to="/" className="btn btn-nexus px-4 py-2">
              <i className="bi bi-arrow-left me-2"></i> Ir al Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" data-testid="checkout-view-container">
      {/* Tarjeta Principal de Checkout según Figura 6 */}
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card bg-dark border-secondary shadow-lg p-4 p-md-5">
            {/* Header y Resumen de Carrito */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom border-secondary gap-3">
              <div>
                <h3 className="fw-bold text-light mb-1">Carrito de compra</h3>
                <span className="text-muted small">Completa la siguiente información para finalizar tu pedido</span>
              </div>
              <div
                className="badge bg-primary fs-5 px-3 py-2 rounded-3 shadow-sm"
                data-testid="checkout-total-badge"
              >
                Total a pagar: {formatPrice(totalPrice)}
              </div>
            </div>

            {/* Aviso de usuario autenticado / autorrelleno */}
            {currentUser ? (
              <div className="alert alert-info py-2 d-flex align-items-center gap-2 mb-4" role="alert">
                <i className="bi bi-person-check-fill flex-shrink-0 fs-5"></i>
                <div className="small">
                  Sesión activa como <strong>{currentUser.nombre} {currentUser.apellidos}</strong>. Tus datos de cliente y dirección han sido autorrellenados automáticamente.
                </div>
              </div>
            ) : (
              <div className="alert alert-secondary py-2 d-flex align-items-center justify-content-between mb-4">
                <div className="small text-muted">
                  <i className="bi bi-info-circle me-1"></i> ¿Tienes cuenta en Hardware Nexus?{" "}
                  <Link to="/login?redirect=/checkout" className="text-info fw-bold text-decoration-none">
                    Inicia sesión
                  </Link>{" "}
                  para autocompletar tu dirección.
                </div>
              </div>
            )}

            {/* Tabla de Productos del Checkout */}
            <div className="table-responsive mb-4">
              <table className="table table-dark table-hover align-middle mb-0 border border-secondary">
                <thead className="table-secondary text-uppercase small">
                  <tr>
                    <th scope="col" style={{ width: "70px" }}>Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col" className="text-center">Precio</th>
                    <th scope="col" className="text-center">Cantidad</th>
                    <th scope="col" className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} data-testid={`checkout-row-${item.id}`}>
                      <td>
                        <img
                          src={item.imagenUrl}
                          alt={item.nombre}
                          className="rounded border border-secondary"
                          style={{ width: "45px", height: "45px", objectFit: "contain", backgroundColor: "#0f172a" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/100x100/1e293b/a78bfa?text=HN";
                          }}
                        />
                      </td>
                      <td className="fw-semibold text-light small">{item.nombre}</td>
                      <td className="text-center small text-info">{formatPrice(item.precio)}</td>
                      <td className="text-center small">{item.cantidad}</td>
                      <td className="text-end small fw-bold text-light">{formatPrice(item.precio * item.cantidad)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Alerta de Error si faltan datos */}
            {errorMessage && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2 mb-4" role="alert" data-testid="checkout-error-alert">
                <i className="bi bi-exclamation-octagon-fill flex-shrink-0"></i>
                <div className="small fw-semibold">{errorMessage}</div>
              </div>
            )}

            {/* Formulario de Checkout */}
            <form onSubmit={handleProcessPayment} data-testid="checkout-form" noValidate>
              {/* Sección 1: Información del Cliente */}
              <div className="mb-4">
                <h5 className="text-light fw-bold mb-1">Información del cliente</h5>
                <p className="text-muted small mb-3">Completa la siguiente información</p>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="chk-nombre" className="form-label text-light small fw-semibold">
                      Nombre <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      id="chk-nombre"
                      name="nombre"
                      placeholder="pedro"
                      value={formData.nombre}
                      onChange={handleChange}
                      data-testid="checkout-nombre"
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="chk-apellidos" className="form-label text-light small fw-semibold">
                      Apellidos <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      id="chk-apellidos"
                      name="apellidos"
                      placeholder="hacker"
                      value={formData.apellidos}
                      onChange={handleChange}
                      data-testid="checkout-apellidos"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="chk-correo" className="form-label text-light small fw-semibold">
                      Correo <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control bg-dark text-light border-secondary"
                      id="chk-correo"
                      name="correo"
                      placeholder="pedro.hacker20@example.com"
                      value={formData.correo}
                      onChange={handleChange}
                      data-testid="checkout-correo"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Dirección de Entrega */}
              <div className="mb-4 pt-3 border-top border-secondary">
                <h5 className="text-light fw-bold mb-1">Dirección de entrega de los productos</h5>
                <p className="text-muted small mb-3">Ingresa dirección de forma detallada</p>

                <div className="row g-3">
                  <div className="col-12 col-md-7">
                    <label htmlFor="chk-calle" className="form-label text-light small fw-semibold">
                      Calle <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      id="chk-calle"
                      name="calle"
                      placeholder="Los crisantemos, Edificio Norte"
                      value={formData.calle}
                      onChange={handleChange}
                      data-testid="checkout-calle"
                      required
                    />
                  </div>

                  <div className="col-12 col-md-5">
                    <label htmlFor="chk-depto" className="form-label text-light small fw-semibold">
                      Departamento (opcional)
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      id="chk-depto"
                      name="depto"
                      placeholder="Ej: 603"
                      value={formData.depto}
                      onChange={handleChange}
                      data-testid="checkout-depto"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="chk-region" className="form-label text-light small fw-semibold">
                      Región <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select bg-dark text-light border-secondary"
                      id="chk-region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      data-testid="checkout-region"
                    >
                      {REGIONES.map((reg) => (
                        <option key={reg} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="chk-comuna" className="form-label text-light small fw-semibold">
                      Comuna <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select bg-dark text-light border-secondary"
                      id="chk-comuna"
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleChange}
                      data-testid="checkout-comuna"
                    >
                      {comunasDisponibles.map((com) => (
                        <option key={com} value={com}>
                          {com}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="chk-indicaciones" className="form-label text-light small fw-semibold">
                      Indicaciones para la entrega (opcional)
                    </label>
                    <textarea
                      className="form-control bg-dark text-light border-secondary"
                      id="chk-indicaciones"
                      name="indicaciones"
                      rows="2"
                      placeholder="Ej: El martes no estaremos en el depto, pero puede dejárselo con el conserje."
                      value={formData.indicaciones}
                      onChange={handleChange}
                      data-testid="checkout-indicaciones"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Sección 3: Método de Pago */}
              <div className="mb-4 pt-3 border-top border-secondary">
                <h5 className="text-light fw-bold mb-3">Método de Pago</h5>
                <div className="row g-3">
                  <div className="col-12 col-md-4">
                    <label className={`card p-3 border cursor-pointer h-100 ${formData.metodoPago === "webpay" ? "border-info bg-secondary bg-opacity-25" : "border-secondary bg-dark"}`}>
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="metodoPago"
                          value="webpay"
                          checked={formData.metodoPago === "webpay"}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <span className="fw-semibold text-light">Webpay Plus</span>
                      </div>
                      <small className="text-muted mt-2 d-block">Tarjetas de Débito, Crédito y Redcompra Transbank</small>
                    </label>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className={`card p-3 border cursor-pointer h-100 ${formData.metodoPago === "transferencia" ? "border-info bg-secondary bg-opacity-25" : "border-secondary bg-dark"}`}>
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="metodoPago"
                          value="transferencia"
                          checked={formData.metodoPago === "transferencia"}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <span className="fw-semibold text-light">Transferencia</span>
                      </div>
                      <small className="text-muted mt-2 d-block">Transferencia bancaria directa con comprobante</small>
                    </label>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className={`card p-3 border cursor-pointer h-100 ${formData.metodoPago === "credito" ? "border-info bg-secondary bg-opacity-25" : "border-secondary bg-dark"}`}>
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="radio"
                          name="metodoPago"
                          value="credito"
                          checked={formData.metodoPago === "credito"}
                          onChange={handleChange}
                          className="form-check-input"
                        />
                        <span className="fw-semibold text-light">Crédito Directo</span>
                      </div>
                      <small className="text-muted mt-2 d-block">Hasta 12 cuotas sin interés en Hardware Nexus</small>
                    </label>
                  </div>
                </div>

                {/* Opción de prueba / simulación de error */}
                <div className="form-check form-switch mt-3 pt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="simularFallo"
                    name="simularFallo"
                    checked={formData.simularFallo}
                    onChange={handleChange}
                    data-testid="toggle-simular-fallo"
                  />
                  <label className="form-check-label text-warning small" htmlFor="simularFallo">
                    Simular rechazo bancario (para probar vista de pago fallido / reintentar)
                  </label>
                </div>
              </div>

              {/* Botón Final de Pago según Figura 6 */}
              <div className="d-flex justify-content-end mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-3 fw-bold fs-5 shadow-lg"
                  disabled={isProcessing}
                  data-testid="btn-pagar-ahora"
                  style={{ backgroundColor: "#2563eb", borderColor: "#1d4ed8" }}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Procesando Transacción...
                    </>
                  ) : (
                    <>Pagar ahora {formatPrice(totalPrice)}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutView;
