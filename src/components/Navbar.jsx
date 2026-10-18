import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "./ProductCard";

export const Navbar = ({ onSearchChange }) => {
  const { totalCount, totalPrice } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchInput);
    }
    navigate(`/?search=${encodeURIComponent(searchInput)}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-nexus sticky-top">
      <div className="container-fluid px-3 px-lg-4">
        {/* Marca / Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="brand-badge">HN</span>
          <span className="fw-bold fs-4 tracking-wide text-light">Hardware<span className="text-info">Nexus</span></span>
        </Link>

        {/* Botón Toggler para Móviles */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHardwareNexus"
          aria-controls="navbarHardwareNexus"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido Navbar */}
        <div className="collapse navbar-collapse" id="navbarHardwareNexus">
          {/* Enlaces de Navegación */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/" end>
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/categorias">
                <i className="bi bi-grid me-1"></i> Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/ofertas">
                <i className="bi bi-tag-fill text-danger me-1"></i> Ofertas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/contacto">
                <i className="bi bi-envelope me-1"></i> Contacto
              </NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link px-3 text-warning fw-semibold" to="/admin">
                  <i className="bi bi-speedometer2 me-1"></i> Panel Admin
                </NavLink>
              </li>
            )}
          </ul>

          {/* Formulario de Búsqueda */}
          <form className="d-flex my-2 my-lg-0 me-lg-3" onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Buscar componentes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Buscar"
              />
              <button className="btn btn-outline-info" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* Acciones de Usuario y Carrito */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            {/* Botón Carrito */}
            <Link
              to="/carrito"
              className="btn btn-success d-flex align-items-center gap-2 position-relative shadow-sm"
              data-testid="navbar-cart-btn"
            >
              <i className="bi bi-cart3 fs-5"></i>
              <span className="fw-bold">{formatPrice(totalPrice)}</span>
              {totalCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                  {totalCount}
                  <span className="visually-hidden">items en carrito</span>
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="dropdown">
                <button
                  className="btn btn-nexus-outline dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                  <span>{currentUser.nombre}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <span className="dropdown-item-text text-muted small">
                      {currentUser.correo} ({currentUser.rol})
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" to="/perfil">
                      <i className="bi bi-person me-2"></i> Mi Perfil
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item text-warning" to="/admin">
                        <i className="bi bi-shield-lock me-2"></i> Dashboard Admin
                      </Link>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={logout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light btn-sm px-3">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn btn-nexus btn-sm px-3">
                  Crear Cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
