import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { formatPrice } from "../components/ProductCard";

export const PaymentFailedView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orden = location.state?.orden || {
    numeroBoleta: 20240705,
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

  const motivo = location.state?.motivo || "Fondos insuficientes o transacción rechazada por la entidad bancaria emisora.";

  return (
    <div className="container py-5" data-testid="payment-failed-view">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card bg-dark border-danger shadow-lg p-4 p-md-5">
            {/* Header según Figura 8 */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-x-circle-fill text-danger fs-3"></i>
              <h4 className="fw-bold text-light mb-0" data-testid="failed-title">
                No se pudo realizar el pago. nro #{orden.numeroBoleta || "20240705"}
              </h4>
            </div>

            <div className="alert alert-danger py-2 mb-4 d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
              <div className="small">
                <strong>Motivo del rechazo:</strong> {motivo} Tus componentes siguen guardados en el carrito de compras.
              </div>
            </div>

            {/* Botón Destacado: VOLVER A REALIZAR EL PAGO según Figura 8 */}
            <div className="d-flex justify-content-center my-3">
              <button
                type="button"
                className="btn btn-success px-5 py-3 fw-bold fs-5 shadow text-uppercase"
                onClick={() => navigate("/checkout")}
                data-testid="btn-retry-payment"
                style={{ backgroundColor: "#15803d", borderColor: "#166534" }}
              >
                <i className="bi bi-arrow-repeat me-2"></i> Volver a Realizar el Pago
              </button>
            </div>

            <h6 className="text-light fw-bold mt-4 mb-3 border-bottom border-secondary pb-2">
              Detalle de compra
            </h6>

            {/* Datos del cliente */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-4">
                <label className="text-muted small d-block">Nombre*</label>
                <div className="p-2 bg-surface rounded border border-secondary text-light small">
                  {orden.cliente?.nombre || "pedro"}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <label className="text-muted small d-block">Apellidos*</label>
                <div className="p-2 bg-surface rounded border border-secondary text-light small">
                  {orden.cliente?.apellidos || "hacker"}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <label className="text-muted small d-block">Correo*</label>
                <div className="p-2 bg-surface rounded border border-secondary text-light small">
                  {orden.cliente?.correo || "pedro.hacker20@example.com"}
                </div>
              </div>
            </div>

            {/* Dirección de entrega */}
            <h6 className="text-light fw-bold mt-3 mb-2">Dirección de entrega de los productos</h6>
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-7">
                <label className="text-muted small d-block">Calle*</label>
                <div className="p-2 bg-surface rounded border border-secondary text-light small">
                  {orden.despacho?.calle || "Los crisantemos, Edificio Norte"}
                </div>
              </div>
              <div className="col-12 col-md-5">
                <label className="text-muted small d-block">Departamento (opcional)</label>
                <div className="p-2 bg-surface rounded border border-secondary text-light small">
                  {orden.despacho?.depto || "Depto 603"}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label className="text-muted small d-block">Región*</label>
                <div className="p-2 bg-surface rounded border border-secondary text-light small">
                  {orden.despacho?.region || "Región Metropolitana de Santiago"}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label className="text-muted small d-block">Comuna*</label>
                <div className="p-2 bg-surface rounded border border-secondary text-light small">
                  {orden.despacho?.comuna || "Cerrillos"}
                </div>
              </div>
              <div className="col-12">
                <label className="text-muted small d-block">Indicaciones para la entrega (opcional)</label>
                <div className="p-2 bg-surface rounded border border-secondary text-light small fst-italic">
                  {orden.despacho?.indicaciones || "El martes no estaremos en el depto, pero puede dejárselo con el conserje."}
                </div>
              </div>
            </div>

            {/* Tabla de Productos */}
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
                  {(orden.items || []).map((item, idx) => (
                    <tr key={item.id || idx}>
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

            {/* Total Pagado / Pendiente */}
            <div className="text-center my-3 py-3 border-top border-bottom border-secondary">
              <h4 className="fw-bold text-light mb-0">
                Total pagado: <span className="text-warning">{formatPrice(orden.total)}</span>
              </h4>
            </div>

            <div className="text-center mt-3">
              <Link to="/carrito" className="text-muted small text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i> Modificar productos en el carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentFailedView;
