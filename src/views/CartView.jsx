import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../components/ProductCard";

export const CartView = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-5" data-testid="cart-view-container">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-secondary">
        <h2 className="fw-bold text-light mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-cart3 text-info"></i> Carrito de Compras
        </h2>
        {cartItems.length > 0 && (
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={clearCart}
            data-testid="btn-clear-cart"
          >
            <i className="bi bi-trash3 me-1"></i> Vaciar Carrito
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 card bg-dark border-secondary p-5" data-testid="empty-cart-alert">
          <div className="mb-3">
            <i className="bi bi-cart-x fs-1 text-muted"></i>
          </div>
          <h3 className="text-light fw-bold">Tu carrito está vacío</h3>
          <p className="text-muted mb-4">
            Parece que aún no has añadido componentes de hardware a tu orden.
          </p>
          <div>
            <Link to="/" className="btn btn-nexus px-4 py-2">
              <i className="bi bi-arrow-left me-2"></i> Explorar Catálogo
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4" data-testid="active-cart-content">
          {/* Listado de Productos */}
          <div className="col-12 col-lg-8">
            <div className="card bg-dark border-secondary shadow-sm">
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle mb-0">
                  <thead className="table-secondary text-uppercase small">
                    <tr>
                      <th scope="col" style={{ width: "80px" }}>Item</th>
                      <th scope="col">Producto</th>
                      <th scope="col" className="text-center">Precio</th>
                      <th scope="col" className="text-center" style={{ width: "140px" }}>Cantidad</th>
                      <th scope="col" className="text-end">Subtotal</th>
                      <th scope="col" className="text-center" style={{ width: "50px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      const subtotal = item.precio * item.cantidad;
                      return (
                        <tr key={item.id} data-testid={`cart-row-${item.id}`}>
                          <td>
                            <img
                              src={item.imagenUrl}
                              alt={item.nombre}
                              className="rounded border border-secondary"
                              style={{ width: "50px", height: "50px", objectFit: "contain", backgroundColor: "#0f172a" }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/100x100/1e293b/a78bfa?text=HN";
                              }}
                            />
                          </td>
                          <td>
                            <h6 className="mb-0 text-light small fw-bold">{item.nombre}</h6>
                            <span className="text-muted small">{item.categoria}</span>
                          </td>
                          <td className="text-center small text-info fw-semibold">
                            {formatPrice(item.precio)}
                          </td>
                          <td>
                            <div className="input-group input-group-sm justify-content-center">
                              <button
                                className="btn btn-outline-secondary text-light"
                                type="button"
                                onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                                data-testid={`qty-decrease-${item.id}`}
                              >
                                -
                              </button>
                              <span
                                className="input-group-text bg-dark text-light border-secondary px-3"
                                data-testid={`qty-display-${item.id}`}
                              >
                                {item.cantidad}
                              </span>
                              <button
                                className="btn btn-outline-secondary text-light"
                                type="button"
                                onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                                disabled={item.cantidad >= (item.stock || 999)}
                                data-testid={`qty-increase-${item.id}`}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-end fw-bold text-light" data-testid={`subtotal-${item.id}`}>
                            {formatPrice(subtotal)}
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-link text-danger p-0"
                              onClick={() => removeFromCart(item.id)}
                              title="Eliminar producto"
                              data-testid={`btn-remove-${item.id}`}
                            >
                              <i className="bi bi-trash fs-5"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3">
              <Link to="/" className="text-muted small text-decoration-none">
                <i className="bi bi-arrow-left me-1"></i> Seguir comprando
              </Link>
            </div>
          </div>

          {/* Resumen de Compra */}
          <div className="col-12 col-lg-4">
            <div className="card bg-dark border-secondary shadow-sm p-4">
              <h5 className="fw-bold text-light mb-3">Resumen del Pedido</h5>

              <div className="d-flex justify-content-between text-muted mb-2 small">
                <span>Subtotal ({cartItems.length} tipos de producto)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-3 small">
                <span>Costo de envío estimado</span>
                <span className="text-success fw-bold">GRATIS</span>
              </div>

              <hr className="border-secondary my-3" />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold text-light fs-5">Total a Pagar</span>
                <span className="fw-extrabold text-info fs-4" data-testid="cart-total-price">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                type="button"
                className="btn btn-nexus w-100 py-3 fw-bold"
                onClick={() => navigate("/checkout")}
                data-testid="btn-proceed-checkout"
              >
                <i className="bi bi-credit-card me-2"></i> Continuar al Pago
              </button>

              <div className="text-center mt-3 text-muted small">
                <i className="bi bi-shield-lock me-1 text-success"></i> Pago 100% seguro y encriptado
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
