import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductoById } from "../services/storageService";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../components/ProductCard";

export const ProductDetailView = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = getProductoById(id);
    setProduct(found);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <div className="card bg-dark border-secondary p-5">
          <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
          <h3 className="text-light">Producto no encontrado</h3>
          <p className="text-muted">El componente solicitado no existe o fue descontinuado.</p>
          <div>
            <Link to="/" className="btn btn-nexus">
              Volver al Catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    nombre,
    precio,
    enOferta,
    precioOferta,
    categoria,
    stock,
    stock_critico,
    imagenUrl,
    descripcion,
    especificaciones
  } = product;

  const isOutOfStock = stock <= 0;
  const isLowStock = stock <= (stock_critico || 3) && stock > 0;

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to={`/categorias?cat=${categoria}`} className="text-muted text-decoration-none">{categoria}</Link></li>
          <li className="breadcrumb-item active text-info" aria-current="page">{nombre}</li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* Galería / Imagen */}
        <div className="col-12 col-md-6">
          <div className="card bg-dark border-secondary p-4 text-center rounded-4 shadow-sm position-relative">
            {enOferta && <span className="badge-offer">OFERTA ESPECIAL</span>}
            <img
              src={imagenUrl}
              alt={nombre}
              className="img-fluid rounded"
              style={{ maxHeight: "380px", objectFit: "contain" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/500x500/1e293b/a78bfa?text=Hardware+Nexus";
              }}
            />
          </div>
        </div>

        {/* Ficha de Detalles y Compra */}
        <div className="col-12 col-md-6 d-flex flex-column">
          <div className="mb-2">
            <span className="badge bg-secondary me-2">{categoria}</span>
            <span className="badge bg-dark border border-secondary text-muted">ID: {product.id}</span>
          </div>

          <h2 className="fw-bold text-light mb-3">{nombre}</h2>

          <div className="mb-4">
            {enOferta && precioOferta ? (
              <div className="d-flex align-items-baseline gap-3">
                <span className="fs-2 fw-extrabold text-info">{formatPrice(precioOferta)}</span>
                <span className="fs-5 text-muted text-decoration-line-through">{formatPrice(precio)}</span>
                <span className="badge bg-danger">Ahorras {formatPrice(precio - precioOferta)}</span>
              </div>
            ) : (
              <span className="fs-2 fw-extrabold text-info">{formatPrice(precio)}</span>
            )}
          </div>

          <div className="stock-indicator mb-3 fs-6">
            {isOutOfStock ? (
              <span className="stock-indicator out-of-stock">
                <i className="bi bi-x-circle-fill me-1"></i> Agotado / Sin existencias
              </span>
            ) : isLowStock ? (
              <span className="stock-indicator low-stock">
                <i className="bi bi-exclamation-triangle-fill me-1"></i> ¡Quedan sólo {stock} unidades!
              </span>
            ) : (
              <span className="stock-indicator in-stock">
                <i className="bi bi-check-circle-fill me-1"></i> Stock disponible para entrega inmediata ({stock} u.)
              </span>
            )}
          </div>

          <p className="text-light lead fs-6 mb-4">{descripcion}</p>

          {/* Selector de Cantidad y Botones de Compra */}
          <div className="card bg-dark border-secondary p-3 mb-4 rounded-3">
            <div className="d-flex align-items-center gap-3 mb-3">
              <label className="text-muted small fw-bold">Cantidad:</label>
              <div className="input-group" style={{ width: "130px" }}>
                <button
                  className="btn btn-outline-secondary text-light"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control bg-dark text-light border-secondary text-center"
                  value={quantity}
                  min="1"
                  max={stock}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary text-light"
                  type="button"
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  disabled={quantity >= stock || isOutOfStock}
                >
                  +
                </button>
              </div>
              <span className="text-muted small">Máx: {stock} unidades</span>
            </div>

            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-nexus flex-grow-1 py-3"
                onClick={handleAdd}
                disabled={isOutOfStock}
              >
                <i className="bi bi-cart-plus me-2"></i>
                {isOutOfStock ? "Producto Agotado" : "Agregar al Carrito"}
              </button>
              <button
                type="button"
                className="btn btn-outline-info px-3"
                onClick={() => {
                  handleAdd();
                  navigate("/carrito");
                }}
                disabled={isOutOfStock}
                title="Comprar Ahora"
              >
                Comprar Ahora
              </button>
            </div>
          </div>

          {/* Especificaciones Técnicas */}
          <div className="mt-auto">
            <h6 className="fw-bold text-info text-uppercase small mb-2">Especificaciones Técnicas:</h6>
            <div className="card bg-dark border-secondary p-3 small text-muted">
              {especificaciones || "Consulte ficha del fabricante."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
