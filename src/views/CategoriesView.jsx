import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductos, getCategorias } from "../services/storageService";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { getCategoryIconData } from "../data/categoryIcons";

export const CategoriesView = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const selectedCategory = searchParams.get("cat") || "Todas";

  useEffect(() => {
    const prods = getProductos();
    setProductos(prods);
    const registeredCats = getCategorias();
    const fromProds = prods.map((p) => p.categoria).filter(Boolean);
    const combined = Array.from(new Set([...registeredCats, ...fromProds]));
    setCategorias(["Todas", ...combined]);
  }, []);

  const handleSelectCat = (cat) => {
    if (cat === "Todas") {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  const filtered = selectedCategory === "Todas"
    ? productos
    : productos.filter((p) => p.categoria.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="container py-5" data-testid="categories-view">
      {/* Encabezado Principal */}
      <div className="text-center mb-5">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-primary bg-opacity-25 border border-primary text-info small fw-bold mb-3">
          <i className="bi bi-grid-3x3-gap-fill"></i>
          <span>EXPLORADOR DE COMPONENTES</span>
        </div>
        <h1 className="display-5 fw-extrabold text-light mb-3">Explora por Categorías</h1>
        <p className="lead mx-auto mb-4" style={{ maxWidth: "680px", color: "#cbd5e1" }}>
          Encuentra los componentes de hardware ideales con stock garantizado para armar, potenciar o actualizar tu setup gamer.
        </p>

        {/* Barra de Filtros Rápidos en Píldoras */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
          {categorias.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            const meta = getCategoryIconData(cat);
            return (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 transition-all ${
                  isActive
                    ? "btn-nexus shadow-glow fw-bold text-white"
                    : "btn-outline-secondary text-light bg-dark"
                }`}
                onClick={() => handleSelectCat(cat)}
              >
                {cat !== "Todas" && <i className={`bi ${meta.icon}`} style={{ color: isActive ? "#ffffff" : meta.color }}></i>}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Tarjetas de Categoría Gamer Dark Mode */}
      <div className="row g-4 mb-5" data-testid="categories-grid">
        {categorias.filter((c) => c !== "Todas").map((cat) => {
          const count = productos.filter((p) => p.categoria.toLowerCase() === cat.toLowerCase()).length;
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          const meta = getCategoryIconData(cat);

          return (
            <div key={cat} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div
                className="category-card h-100 p-4 text-center cursor-pointer position-relative d-flex flex-column align-items-center"
                style={{
                  background: isActive
                    ? "linear-gradient(145deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))"
                    : "linear-gradient(145deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.85))",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  border: isActive ? `2px solid ${meta.color}` : "1px solid #334155",
                  boxShadow: isActive
                    ? `0 0 22px ${meta.borderColor}, 0 8px 24px rgba(0,0,0,0.4)`
                    : "0 4px 14px rgba(0,0,0,0.3)",
                  transition: "all 0.28s ease",
                  cursor: "pointer"
                }}
                onClick={() => handleSelectCat(cat)}
              >
                {/* Badge Activo Flotante */}
                {isActive && (
                  <span
                    className="position-absolute top-0 end-0 m-3 badge rounded-pill"
                    style={{ backgroundColor: meta.color, color: "#0f172a", fontWeight: "800", fontSize: "0.7rem" }}
                  >
                    ACTIVA
                  </span>
                )}

                {/* Avatar Icono con Glow Temático */}
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mb-3 transition-all"
                  style={{
                    width: "72px",
                    height: "72px",
                    background: meta.bgGradient,
                    border: `1.5px solid ${meta.borderColor}`,
                    boxShadow: `0 0 16px ${meta.borderColor}`,
                    color: meta.color
                  }}
                >
                  <i className={`bi ${meta.icon} fs-2`}></i>
                </div>

                {/* Nombre de la Categoría */}
                <h4 className="fw-bold text-light mb-1">{cat}</h4>

                {/* Descripción Corta */}
                <p className="small mb-3" style={{ color: "#9ca3af", minHeight: "2.4rem" }}>
                  {meta.desc}
                </p>

                {/* Contador de Stock / Productos */}
                <div className="mt-auto w-100">
                  <div className="d-flex justify-content-center mb-3">
                    <span
                      className="badge px-3 py-1 rounded-pill"
                      style={{
                        backgroundColor: "rgba(51, 65, 85, 0.7)",
                        border: "1px solid #475569",
                        color: "#e2e8f0",
                        fontSize: "0.78rem"
                      }}
                    >
                      <i className="bi bi-box-seam me-1 text-info"></i>
                      {count} {count === 1 ? "producto" : "productos"}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`btn w-100 py-2 btn-sm fw-semibold d-inline-flex align-items-center justify-content-center gap-2 ${
                      isActive ? "btn-nexus text-white shadow-glow" : "btn-outline-light"
                    }`}
                  >
                    {isActive ? (
                      <>
                        <i className="bi bi-check2-circle"></i> Viendo Categoría
                      </>
                    ) : (
                      <>
                        Ver Catálogo <i className="bi bi-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Título de Sección y Listado de Productos Filtrados */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom border-secondary gap-2">
        <div>
          <h3 className="text-light fw-bold mb-0 d-flex align-items-center gap-2">
            <i className="bi bi-cpu text-info"></i>
            {selectedCategory === "Todas" ? "Todos los Componentes en Catálogo" : `Componentes: ${selectedCategory}`}
          </h3>
          <p className="small mb-0 mt-1" style={{ color: "#cbd5e1" }}>
            Mostrando resultados con disponibilidad inmediata para envío
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          {selectedCategory !== "Todas" && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm text-light"
              onClick={() => handleSelectCat("Todas")}
            >
              <i className="bi bi-x-circle me-1"></i> Ver Todas
            </button>
          )}
          <span className="badge bg-secondary px-3 py-2 fs-6">
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </span>
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="row g-4" data-testid="category-products-grid">
        {filtered.length > 0 ? (
          filtered.map((prod) => (
            <ProductCard key={prod.id} product={prod} onAddToCart={addToCart} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="card bg-dark border-secondary p-5 mx-auto" style={{ maxWidth: "600px" }}>
              <i className="bi bi-inbox fs-1 mb-3 text-info"></i>
              <h4 className="text-light fw-bold mb-2">Próximamente más componentes</h4>
              <p style={{ color: "#cbd5e1" }}>
                Actualmente estamos reabasteciendo la categoría <strong className="text-info">{selectedCategory}</strong>.
                Revisa otras categorías o consulta con nuestro soporte técnico.
              </p>
              <div>
                <button className="btn btn-nexus" onClick={() => handleSelectCat("Todas")}>
                  Explorar todo el Catálogo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesView;
