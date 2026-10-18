import React from "react";
import { Link } from "react-router-dom";

export const PlaceholderView = ({ title, description, badge = "Módulo en Construcción (Parte 2)" }) => {
  return (
    <div className="container py-5">
      <div className="card bg-dark border-secondary p-5 text-center rounded-4 shadow-sm">
        <span className="badge bg-warning text-dark text-uppercase px-3 py-2 mx-auto mb-3">
          {badge}
        </span>
        <h2 className="fw-bold text-light mb-2">{title}</h2>
        <p className="text-muted lead fs-6 mx-auto mb-4" style={{ maxWidth: "600px" }}>
          {description}
        </p>
        <div>
          <Link to="/" className="btn btn-nexus-outline">
            <i className="bi bi-arrow-left me-2"></i> Volver a la Tienda
          </Link>
        </div>
      </div>
    </div>
  );
};
