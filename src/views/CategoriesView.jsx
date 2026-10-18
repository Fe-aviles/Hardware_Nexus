import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductos } from "../services/storageService";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export const CategoriesView = () => {
  const [productos, setProductos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const selectedCategory = searchParams.get("cat") || "Todas";

  useEffect(() => {
    setProductos(getProductos());
  }, []);

  const categories = ["Todas", ...new Set(productos.map((p) => p.categoria))];

  const handleSelectCat = (cat) => {
    if (cat === "Todas") {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  const filtered = selectedCategory === "Todas"
    ? productos
    : productos.filter((p) => p.categoria === selectedCategory);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-extrabold text-light mb-2">Explora por Categorías</h2>
        <p className="text-muted">Encuentra los componentes ideales para armar o actualizar tu PC gamer.</p>
      </div>

      {/* Grid de Tarjetas de Categoría según Anexo 1 (Figura 4) */}
      <div className="row g-4 mb-5">
        {categories.filter((c) => c !== "Todas").map((cat) => {
          const count = productos.filter((p) => p.categoria === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <div key={cat} className="col-12 col-md-6 col-lg-4">
              <div
                className={`card bg-dark border p-4 text-center cursor-pointer transition-all ${
                  isActive ? "border-primary shadow-glow" : "border-secondary"
                }`}
                style={{ cursor: "pointer", borderRadius: "14px" }}
                onClick={() => handleSelectCat(cat)}
              >
                <div className="mb-3">
                  <i className={`bi ${cat.includes("Procesador") ? "bi-cpu" : "bi-gpu-card"} fs-1 text-info`}></i>
                </div>
                <h4 className="fw-bold text-light mb-1">{cat}</h4>
                <p className="text-muted small mb-3">{count} productos disponibles</p>
                <div>
                  <button className={`btn btn-sm ${isActive ? "btn-primary" : "btn-outline-light"}`}>
                    {isActive ? "Viendo ahora" : "Ver productos"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Título de Sección y Listado de Productos */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <h4 className="text-light fw-bold mb-0">
          {selectedCategory === "Todas" ? "Todos los Productos" : `Categoría: ${selectedCategory}`}
        </h4>
        <span className="badge bg-secondary">{filtered.length} productos</span>
      </div>

      <div className="row g-4">
        {filtered.map((prod) => (
          <ProductCard key={prod.id} product={prod} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};
