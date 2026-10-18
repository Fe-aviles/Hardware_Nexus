import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-dark text-light border-top border-secondary py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <span className="brand-badge">HN</span>
              <span>Hardware<span className="text-info">Nexus</span></span>
            </h5>
            <p className="text-light-emphasis small" style={{ color: "#cbd5e1" }}>
              Tu tienda especializada en hardware de alto rendimiento, tarjetas gráficas, procesadores y periféricos de última generación.
            </p>
            <div className="d-flex gap-3 fs-5">
              <a href="#github" className="footer-link"><i className="bi bi-github"></i></a>
              <a href="#discord" className="footer-link"><i className="bi bi-discord"></i></a>
              <a href="#instagram" className="footer-link"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Navegación</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="footer-link">Inicio</Link></li>
              <li className="mb-2"><Link to="/categorias" className="footer-link">Categorías</Link></li>
              <li className="mb-2"><Link to="/ofertas" className="footer-link">Ofertas</Link></li>
              <li className="mb-2"><Link to="/contacto" className="footer-link">Contacto</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Categorías</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/categorias?cat=Procesadores" className="footer-link">Procesadores AMD / Intel</Link></li>
              <li className="mb-2"><Link to="/categorias?cat=Tarjetas Gráficas" className="footer-link">Tarjetas Gráficas NVIDIA</Link></li>
              <li className="mb-2"><span style={{ color: "#94a3b8" }}>Placas Madre (Próximamente)</span></li>
              <li className="mb-2"><span style={{ color: "#94a3b8" }}>Memorias RAM & SSDs</span></li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Atención al Cliente</h6>
            <p className="small mb-1" style={{ color: "#cbd5e1" }}><i className="bi bi-geo-alt me-2 text-info"></i> Santiago, Chile</p>
            <p className="small mb-1" style={{ color: "#cbd5e1" }}><i className="bi bi-envelope me-2 text-info"></i> contacto@hardwarenexus.cl</p>
            <p className="small" style={{ color: "#cbd5e1" }}><i className="bi bi-clock me-2 text-info"></i> Lun - Vie: 09:00 a 18:30 hrs</p>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center small" style={{ color: "#94a3b8" }}>
          <p className="mb-0">© 2026 Hardware Nexus SpA - DSY1104 Evaluación 2 Fullstack II.</p>
          <p className="mb-0">Desarrollado con React & Bootstrap</p>
        </div>
      </div>
    </footer>
  );
};
