import React, { useState, useEffect } from "react";
import { getProductos } from "../services/storageService";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export const OffersView = () => {
  const [offers, setOffers] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const list = getProductos();
    const soloOfertas = list.filter((p) => p.enOferta === true);
    setOffers(soloOfertas);
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-danger text-uppercase px-3 py-2 mb-2">Descuentos Exclusivos</span>
        <h2 className="fw-extrabold text-light mb-2">Zona de Ofertas Especiales</h2>
        <p className="text-muted">Aprovecha precios rebajados en procesadores y tarjetas gráficas seleccionadas por tiempo limitado.</p>
      </div>

      <div className="row g-4">
        {offers.length > 0 ? (
          offers.map((prod) => (
            <ProductCard key={prod.id} product={prod} onAddToCart={addToCart} />
          ))
        ) : (
          <div className="col-12 text-center py-5 text-muted">
            <h4>No hay ofertas disponibles en este momento.</h4>
          </div>
        )}
      </div>
    </div>
  );
};
