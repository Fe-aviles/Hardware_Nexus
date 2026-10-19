import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { formatPrice } from "../components/ProductCard";
import { getOrdenes } from "../services/storageService";

export const PaymentSuccessView = () => {
  const location = useLocation();
  const [emailSent, setEmailSent] = useState(false);

  // Obtener la orden desde el estado de navegación o tomar la más reciente del storage
  const orden = location.state?.orden || getOrdenes()[0] || {
    numeroBoleta: 20240705,
    codigoOrden: "ORDER12345",
    cliente: {
      nombre: "pedro",
      apellidos: "hacker",
      correo: "pedro.hacker20@example.com"
    },
    despacho: {
      calle: "Los crisantemos, Edificio Norte",
      depto: "Depto 603",
      region: "Región Metropolitana de Santiago",
      comuna: "Cerrillos",
      indicaciones: "El martes no estaremos en el depto, pero puede dejárselo con el conserje."
    },
    items: [
      { id: "PROD-001", nombre: "Procesador AMD Ryzen 5 5500", precio: 110000, cantidad: 1, imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 5500.jpg" }
    ],
    total: 110000
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 4000);
  };

  return (
    <div className="container py-5" data-testid="payment-success-view">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card bg-dark border-secondary shadow-lg p-4 p-md-5">
            {/* Header según Figura 7 */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom border-secondary">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-success fs-3"></i>
                <h4 className="fw-bold text-light mb-0" data-testid="success-title">
                  Se ha realizado la compra. nro #{orden.numeroBoleta || "20240705"}
                </h4>
              </div>
              <div className="text-muted small mt-2 mt-sm-0" data-testid="success-order-code">
                Código orden: <strong className="text-info">{orden.codigoOrden || "ORDER12345"}</strong>
              </div>
            </div>

            {emailSent && (
              <div className="alert alert-success d-flex align-items-center gap-2 py-2 mb-4" role="alert">
                <i className="bi bi-envelope-check-fill flex-shrink-0"></i>
                <div className="small fw-semibold">
                  ¡Boleta electrónica enviada con éxito a {orden.cliente?.correo}!
                </div>
              </div>
            )}

            {/* Información del cliente */}
            <div className="mb-4">
              <div className="text-muted small mb-2">Comprueba la siguiente información</div>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label className="text-muted small d-block">Nombre*</label>
                  <div className="p-2 bg-surface rounded border border-secondary text-light small fw-semibold">
                    {orden.cliente?.nombre || "N/A"}
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <label className="text-muted small d-block">Apellidos*</label>
                  <div className="p-2 bg-surface rounded border border-secondary text-light small fw-semibold">
                    {orden.cliente?.apellidos || "N/A"}
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <label className="text-muted small d-block">Correo*</label>
                  <div className="p-2 bg-surface rounded border border-secondary text-light small fw-semibold">
                    {orden.cliente?.correo || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Dirección de entrega de los productos */}
            <div className="mb-4 pt-3 border-top border-secondary">
              <h6 className="text-light fw-bold mb-3">Dirección de entrega de los productos</h6>
              <div className="row g-3">
                <div className="col-12 col-md-7">
                  <label className="text-muted small d-block">Calle*</label>
                  <div className="p-2 bg-surface rounded border border-secondary text-light small">
                    {orden.despacho?.calle || "N/A"}
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <label className="text-muted small d-block">Departamento (opcional)</label>
                  <div className="p-2 bg-surface rounded border border-secondary text-light small">
                    {orden.despacho?.depto || "Sin departamento"}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <label className="text-muted small d-block">Región*</label>
                  <div className="p-2 bg-surface rounded border border-secondary text-light small">
                    {orden.despacho?.region || "N/A"}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <label className="text-muted small d-block">Comuna*</label>
                  <div className="p-2 bg-surface rounded border border-secondary text-light small">
                    {orden.despacho?.comuna || "N/A"}
                  </div>
                </div>
                <div className="col-12">
                  <label className="text-muted small d-block">Indicaciones para la entrega (opcional)</label>
                  <div className="p-2 bg-surface rounded border border-secondary text-light small fst-italic">
                    {orden.despacho?.indicaciones || "Ninguna especificada."}
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen de Productos */}
            <div className="table-responsive mb-4 pt-3 border-top border-secondary">
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
                  {(orden.items || []).map((item, index) => (
                    <tr key={item.id || index}>
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
                      <td className="small fw-semibold text-light">{item.nombre}</td>
                      <td className="text-center small text-info">{formatPrice(item.precio)}</td>
                      <td className="text-center small">{item.cantidad}</td>
                      <td className="text-end small fw-bold text-light">{formatPrice(item.precio * item.cantidad)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Pagado según Figura 7 */}
            <div className="text-center my-4 py-3 border-top border-bottom border-secondary">
              <h4 className="fw-bold text-light mb-0">
                Total pagado: <span className="text-info">{formatPrice(orden.total)}</span>
              </h4>
            </div>

            {/* Acciones según Figura 7 */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4 print-hide">
              <button
                type="button"
                className="btn btn-danger px-4 py-2 fw-semibold"
                onClick={handlePrint}
                data-testid="btn-print-receipt"
              >
                <i className="bi bi-printer me-2"></i> Imprimir boleta en PDF
              </button>
              <button
                type="button"
                className="btn btn-info text-dark px-4 py-2 fw-semibold"
                onClick={handleSendEmail}
                data-testid="btn-email-receipt"
              >
                <i className="bi bi-envelope-paper me-2"></i> Enviar boleta por email
              </button>
              <Link to="/" className="btn btn-outline-light px-4 py-2">
                <i className="bi bi-arrow-left me-2"></i> Volver a la Tienda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccessView;
