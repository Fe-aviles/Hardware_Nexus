import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="text-light border-top border-secondary py-5 mt-auto" style={{ backgroundColor: "#0b1120" }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <span className="brand-badge">HN</span>
              <span>Hardware<span className="text-info">Nexus</span></span>
            </h5>
            <p className="small" style={{ color: "#cbd5e1" }}>
              Tu tienda especializada en hardware gamer de alto rendimiento, tarjetas gráficas, procesadores, almacenamiento NVMe y componentes de última generación en Chile.
            </p>
            <div className="d-flex gap-3 fs-5" style={{ color: "#9ca3af" }}>
              <a href="#github" className="hover-info" style={{ color: "#9ca3af" }} title="GitHub"><i className="bi bi-github"></i></a>
              <a href="#discord" className="hover-info" style={{ color: "#9ca3af" }} title="Discord"><i className="bi bi-discord"></i></a>
              <a href="#instagram" className="hover-info" style={{ color: "#9ca3af" }} title="Instagram"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Navegación</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-decoration-none" style={{ color: "#cbd5e1" }}>Inicio</Link></li>
              <li className="mb-2"><Link to="/categorias" className="text-decoration-none" style={{ color: "#cbd5e1" }}>Categorías</Link></li>
              <li className="mb-2"><Link to="/ofertas" className="text-decoration-none" style={{ color: "#cbd5e1" }}>Ofertas Especiales</Link></li>
              <li className="mb-2"><Link to="/contacto" className="text-decoration-none" style={{ color: "#cbd5e1" }}>Contacto y Ayuda</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Categorías Principales</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/categorias?cat=Procesadores" className="text-decoration-none" style={{ color: "#cbd5e1" }}>Procesadores AMD / Intel</Link></li>
              <li className="mb-2"><Link to="/categorias?cat=Tarjetas Gráficas" className="text-decoration-none" style={{ color: "#cbd5e1" }}>Tarjetas Gráficas RTX / Radeon</Link></li>
              <li className="mb-2"><Link to="/categorias?cat=Memorias RAM" className="text-decoration-none" style={{ color: "#cbd5e1" }}>Memorias RAM DDR4 & DDR5</Link></li>
              <li className="mb-2"><Link to="/categorias?cat=Almacenamiento" className="text-decoration-none" style={{ color: "#cbd5e1" }}>Unidades SSD & NVMe</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Atención al Cliente</h6>
            <p className="small mb-2" style={{ color: "#cbd5e1" }}>
              <i className="bi bi-geo-alt me-2 text-info"></i> Santiago, Chile (Envíos nacionales)
            </p>
            <p className="small mb-2" style={{ color: "#cbd5e1" }}>
              <i className="bi bi-envelope me-2 text-info"></i> contacto@hardwarenexus.cl
            </p>
            <p className="small mb-0" style={{ color: "#cbd5e1" }}>
              <i className="bi bi-clock me-2 text-info"></i> Lun - Vie: 09:00 a 18:30 hrs
            </p>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center small" style={{ color: "#9ca3af" }}>
          <p className="mb-1 mb-md-0">© 2026 Hardware Nexus SpA - DSY1104 Evaluación 2 Fullstack II.</p>
          <p className="mb-0">Desarrollado con React 19, Vite & Bootstrap 5 (WCAG Compliant)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
