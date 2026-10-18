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
            <p className="text-muted small">
              Tu tienda especializada en hardware de alto rendimiento, tarjetas gráficas, procesadores y periféricos de última generación.
            </p>
            <div className="d-flex gap-3 fs-5 text-muted">
              <a href="#github" className="text-muted hover-info"><i className="bi bi-github"></i></a>
              <a href="#discord" className="text-muted hover-info"><i className="bi bi-discord"></i></a>
              <a href="#instagram" className="text-muted hover-info"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Navegación</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-muted text-decoration-none">Inicio</Link></li>
              <li className="mb-2"><Link to="/categorias" className="text-muted text-decoration-none">Categorías</Link></li>
              <li className="mb-2"><Link to="/ofertas" className="text-muted text-decoration-none">Ofertas</Link></li>
              <li className="mb-2"><Link to="/contacto" className="text-muted text-decoration-none">Contacto</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Categorías</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/categorias?cat=Procesadores" className="text-muted text-decoration-none">Procesadores AMD / Intel</Link></li>
              <li className="mb-2"><Link to="/categorias?cat=Tarjetas Gráficas" className="text-muted text-decoration-none">Tarjetas Gráficas NVIDIA</Link></li>
              <li className="mb-2"><span className="text-muted">Placas Madre (Próximamente)</span></li>
              <li className="mb-2"><span className="text-muted">Memorias RAM & SSDs</span></li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h6 className="text-uppercase fw-bold text-info mb-3 small">Atención al Cliente</h6>
            <p className="text-muted small mb-1"><i className="bi bi-geo-alt me-2 text-primary"></i> Santiago, Chile</p>
            <p className="text-muted small mb-1"><i className="bi bi-envelope me-2 text-primary"></i> contacto@hardwarenexus.cl</p>
            <p className="text-muted small"><i className="bi bi-clock me-2 text-primary"></i> Lun - Vie: 09:00 a 18:30 hrs</p>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center small text-muted">
          <p className="mb-0">© 2026 Hardware Nexus SpA - DSY1104 Evaluación 2 Fullstack II.</p>
          <p className="mb-0">Desarrollado con React & Bootstrap</p>
        </div>
      </div>
    </footer>
  );
};
