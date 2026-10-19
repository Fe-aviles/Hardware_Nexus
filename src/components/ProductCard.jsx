import React from "react";
import { Link } from "react-router-dom";
import { getCategoryIconData } from "../data/categoryIcons";

export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(price);
};

export const ProductCard = ({ product, onAddToCart }) => {
  if (!product) return null;

  const {
    id,
    nombre,
    precio,
    enOferta,
    precioOferta,
    categoria,
    stock,
    stock_critico,
    imagenUrl
  } = product;

  const isLowStock = stock <= (stock_critico || 3) && stock > 0;
  const isOutOfStock = stock <= 0;
  const categoryMeta = getCategoryIconData(categoria);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" data-testid={`product-card-${id}`}>
      <div className="product-card">
        <div className="img-container">
          <span className="badge-category d-inline-flex align-items-center gap-1">
            <i className={`bi ${categoryMeta.icon}`} style={{ color: categoryMeta.color }}></i>
            <span>{categoria}</span>
          </span>
          {enOferta && <span className="badge-offer">OFERTA</span>}
          <img
            src={imagenUrl}
            alt={nombre}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x400/1e293b/a78bfa?text=Hardware+Nexus";
            }}
          />
        </div>

        <div className="card-body">
          <h5 className="product-title" title={nombre}>
            <Link to={`/producto/${id}`} className="text-light text-decoration-none">
              {nombre}
            </Link>
          </h5>

          <div className="mt-auto">
            <div className="d-flex align-items-baseline">
              {enOferta && precioOferta ? (
                <>
                  <span className="product-price">{formatPrice(precioOferta)}</span>
                  <span className="product-old-price">{formatPrice(precio)}</span>
                </>
              ) : (
                <span className="product-price">{formatPrice(precio)}</span>
              )}
            </div>

            <div className="stock-indicator mb-3">
              {isOutOfStock ? (
                <span className="stock-indicator out-of-stock" data-testid="stock-status">
                  <i className="bi bi-x-circle-fill me-1"></i> Agotado
                </span>
              ) : isLowStock ? (
                <span className="stock-indicator low-stock" data-testid="stock-status">
                  <i className="bi bi-exclamation-triangle-fill me-1"></i> ¡Últimas {stock} unidades!
                </span>
              ) : (
                <span className="stock-indicator in-stock" data-testid="stock-status">
                  <i className="bi bi-check-circle-fill me-1"></i> Stock disponible ({stock})
                </span>
              )}
            </div>

            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-nexus w-100"
                onClick={() => onAddToCart && onAddToCart(product)}
                disabled={isOutOfStock}
                data-testid={`btn-add-cart-${id}`}
              >
                <i className="bi bi-cart-plus me-1"></i>
                {isOutOfStock ? "Sin Stock" : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
