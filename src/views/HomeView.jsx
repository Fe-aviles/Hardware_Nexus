import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductos } from "../services/storageService";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export const HomeView = () => {
  const [productos, setProductos] = useState([]);
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const list = getProductos();
    setProductos(list);
  }, []);

  const categories = ["Todas", ...new Set(productos.map((p) => p.categoria))];

  // Filtrado
  const filteredProducts = productos
    .filter((p) => {
      const matchSearch =
        searchQuery === "" ||
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "Todas" || p.categoria === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      const priceA = a.enOferta && a.precioOferta ? a.precioOferta : a.precio;
      const priceB = b.enOferta && b.precioOferta ? b.precioOferta : b.precio;
      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "name-asc") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  return (
    <div className="container py-4">
      {/* Hero Banner */}
      <div className="hero-banner text-center text-md-start d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="mb-3 mb-md-0">
          <span className="badge bg-primary text-uppercase px-3 py-2 mb-2">Nueva Colección 2026</span>
          <h1 className="display-5 fw-extrabold text-light mb-2">Potencia tu setup al siguiente nivel</h1>
          <p className="lead text-muted mb-0">
            Encuentra procesadores de última generación y tarjetas gráficas con stock inmediato y envíos a todo Chile.
          </p>
        </div>
        <div className="d-flex gap-2">
          <a href="#catalogo" className="btn btn-nexus btn-lg">
            <i className="bi bi-lightning-charge me-2"></i> Ver Catálogo
          </a>
        </div>
      </div>

      {/* Barra de Filtros y Categorías */}
      <div id="catalogo" className="card bg-dark border-secondary p-3 mb-4 rounded-3 shadow-sm">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6 col-lg-5">
            <label className="form-label text-muted small mb-1">Filtrar por Categoría:</label>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`btn btn-sm ${
                    selectedCategory === cat ? "btn-primary" : "btn-outline-secondary text-light"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 ms-auto">
            <label className="form-label text-muted small mb-1">Ordenar por:</label>
            <select
              className="form-select form-select-sm bg-dark text-light border-secondary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Relevancia / Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A - Z</option>
            </select>
          </div>
        </div>

        {searchQuery && (
          <div className="mt-3 pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
            <span className="text-muted small">
              Resultados para la búsqueda: <strong className="text-info">"{searchQuery}"</strong>
            </span>
            <span className="badge bg-secondary">{filteredProducts.length} encontrados</span>
          </div>
        )}
      </div>

      {/* Grid de Productos */}
      <div className="row g-4" data-testid="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} onAddToCart={addToCart} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
            <h4 className="text-light">No encontramos productos que coincidan con tu criterio</h4>
            <p className="text-muted">Intenta cambiar la categoría o limpiar el término de búsqueda.</p>
            <button
              className="btn btn-nexus-outline mt-2"
              onClick={() => {
                setSelectedCategory("Todas");
              }}
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
