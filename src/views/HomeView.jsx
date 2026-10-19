import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductos, getCategorias } from "../services/storageService";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { getCategoryIconData } from "../data/categoryIcons";

export const HomeView = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState(["Todas"]);
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const list = getProductos();
    setProductos(list);
    const registered = getCategorias();
    const fromProds = list.map((p) => p.categoria).filter(Boolean);
    const combined = Array.from(new Set([...registered, ...fromProds]));
    setCategorias(["Todas", ...combined]);
  }, []);

  // Filtrado
  const filteredProducts = productos
    .filter((p) => {
      const matchSearch =
        searchQuery === "" ||
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCategory =
        selectedCategory === "Todas" ||
        p.categoria.toLowerCase() === selectedCategory.toLowerCase();
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
          <span className="badge bg-primary text-uppercase px-3 py-2 mb-2 fw-bold">Nueva Colección 2026</span>
          <h1 className="display-5 fw-extrabold text-light mb-2">Potencia tu setup al siguiente nivel</h1>
          <p className="lead mb-0" style={{ color: "#cbd5e1" }}>
            Encuentra procesadores, tarjetas gráficas, memorias RAM, SSDs y refrigeración con stock inmediato y envíos a todo Chile.
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
          <div className="col-12 col-md-7 col-lg-8">
            <label className="form-label small mb-2 fw-semibold" style={{ color: "#cbd5e1" }}>
              <i className="bi bi-funnel-fill text-info me-1"></i> Filtrar por Categoría:
            </label>
            <div className="d-flex flex-wrap gap-2">
              {categorias.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                const meta = getCategoryIconData(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`btn btn-sm d-inline-flex align-items-center gap-1 transition-all ${
                      isActive ? "btn-nexus fw-bold text-white shadow-glow" : "btn-outline-secondary text-light bg-dark"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat !== "Todas" && (
                      <i className={`bi ${meta.icon}`} style={{ color: isActive ? "#ffffff" : meta.color }}></i>
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="col-12 col-md-5 col-lg-4 ms-auto">
            <label className="form-label small mb-1 fw-semibold" style={{ color: "#cbd5e1" }}>
              <i className="bi bi-sort-down text-info me-1"></i> Ordenar por:
            </label>
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
            <span className="small" style={{ color: "#cbd5e1" }}>
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
            <i className="bi bi-search fs-1 mb-3 d-block" style={{ color: "#9ca3af" }}></i>
            <h4 className="text-light">No encontramos productos que coincidan con tu criterio</h4>
            <p style={{ color: "#cbd5e1" }}>Intenta cambiar la categoría o limpiar el término de búsqueda.</p>
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

export default HomeView;
