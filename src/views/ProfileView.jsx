import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrdenes } from "../services/storageService";
import { formatPrice } from "../components/ProductCard";
import { REGIONES, getComunasPorRegion } from "../data/chileData";

export const ProfileView = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    nombre: currentUser?.nombre || "",
    apellidos: currentUser?.apellidos || "",
    direccion: currentUser?.direccion || "",
    region: currentUser?.region || "Región Metropolitana de Santiago",
    comuna: currentUser?.comuna || "Santiago"
  });
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  if (!currentUser) {
    return (
      <div className="container py-5 text-center">
        <div className="card bg-dark border-secondary p-5 shadow-lg mx-auto" style={{ maxWidth: "540px" }}>
          <i className="bi bi-shield-lock fs-1 text-warning mb-3"></i>
          <h3 className="fw-bold text-light mb-2">Acceso Restringido</h3>
          <p className="text-muted mb-4">
            Debes iniciar sesión con tu cuenta para acceder a tu perfil y revisar el historial de pedidos.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login" className="btn btn-nexus px-4">
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="btn btn-outline-light px-4">
              Crear Cuenta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Cargar órdenes del usuario actual
  const todasLasOrdenes = getOrdenes();
  const misOrdenes = todasLasOrdenes.filter(
    (o) => o.cliente?.correo?.toLowerCase() === currentUser.correo?.toLowerCase() || o.usuarioId === currentUser.id
  );

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "region") {
      const comunas = getComunasPorRegion(value);
      setEditData((prev) => ({
        ...prev,
        region: value,
        comuna: comunas[0] || ""
      }));
    } else {
      setEditData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" });

    if (!editData.nombre.trim() || !editData.apellidos.trim() || !editData.direccion.trim()) {
      setStatusMessage({ type: "danger", text: "Por favor, completa los campos obligatorios." });
      return;
    }

    const res = updateProfile(editData);
    if (res.success) {
      setStatusMessage({ type: "success", text: "¡Perfil actualizado con éxito!" });
      setIsEditing(false);
    } else {
      setStatusMessage({ type: "danger", text: res.message || "Error al actualizar." });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const comunasDisponibles = getComunasPorRegion(editData.region);

  return (
    <div className="container py-5" data-testid="profile-view-container">
      {/* Encabezado */}
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 pb-3 border-bottom border-secondary gap-3">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary bg-opacity-25 text-info p-3 d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px" }}>
            <i className="bi bi-person-fill fs-2"></i>
          </div>
          <div>
            <h2 className="fw-bold text-light mb-0">
              {currentUser.nombre} {currentUser.apellidos}
            </h2>
            <div className="d-flex align-items-center gap-2 mt-1">
              <span className="badge bg-secondary">{currentUser.correo}</span>
              <span className={`badge ${currentUser.rol === "Administrador" ? "bg-warning text-dark" : "bg-info text-dark"}`}>
                <i className={`bi ${currentUser.rol === "Administrador" ? "bi-shield-check" : "bi-person"} me-1`}></i>
                {currentUser.rol}
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2">
          {currentUser.rol === "Administrador" && (
            <Link to="/admin" className="btn btn-outline-warning">
              <i className="bi bi-speedometer2 me-1"></i> Panel Admin
            </Link>
          )}
          <button className="btn btn-outline-danger" onClick={handleLogout} data-testid="btn-profile-logout">
            <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
          </button>
        </div>
      </div>

      {statusMessage.text && (
        <div className={`alert alert-${statusMessage.type} alert-dismissible fade show mb-4`} role="alert">
          {statusMessage.text}
          <button type="button" className="btn-close" onClick={() => setStatusMessage({ type: "", text: "" })}></button>
        </div>
      )}

      <div className="row g-4">
        {/* Columna Izquierda: Datos del Usuario */}
        <div className="col-12 col-lg-5">
          <div className="card bg-dark border-secondary shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary">
              <h5 className="fw-bold text-light mb-0">
                <i className="bi bi-person-lines-fill text-info me-2"></i> Información de Cuenta
              </h5>
              {!isEditing && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-info"
                  onClick={() => setIsEditing(true)}
                  data-testid="btn-edit-profile"
                >
                  <i className="bi bi-pencil me-1"></i> Editar
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} data-testid="profile-edit-form">
                <div className="mb-3">
                  <label className="form-label text-light small fw-semibold">Nombre</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    name="nombre"
                    value={editData.nombre}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-light small fw-semibold">Apellidos</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    name="apellidos"
                    value={editData.apellidos}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-light small fw-semibold">Región</label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    name="region"
                    value={editData.region}
                    onChange={handleEditChange}
                  >
                    {REGIONES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-light small fw-semibold">Comuna</label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    name="comuna"
                    value={editData.comuna}
                    onChange={handleEditChange}
                  >
                    {comunasDisponibles.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-light small fw-semibold">Dirección</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    name="direccion"
                    value={editData.direccion}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-nexus btn-sm px-3">
                    Guardar Cambios
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm px-3"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="d-flex flex-column gap-3">
                <div>
                  <span className="text-muted small d-block">RUN / RUT</span>
                  <span className="text-light fw-semibold">{currentUser.run || "No especificado"}</span>
                </div>
                <div>
                  <span className="text-muted small d-block">Correo Electrónico</span>
                  <span className="text-light fw-semibold">{currentUser.correo}</span>
                </div>
                <div>
                  <span className="text-muted small d-block">Región y Comuna</span>
                  <span className="text-light fw-semibold">
                    {currentUser.comuna ? `${currentUser.comuna}, ` : ""}
                    {currentUser.region || "No especificada"}
                  </span>
                </div>
                <div>
                  <span className="text-muted small d-block">Dirección de Despacho</span>
                  <span className="text-light fw-semibold">{currentUser.direccion || "No registrada"}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha: Historial de Órdenes */}
        <div className="col-12 col-lg-7">
          <div className="card bg-dark border-secondary shadow-sm p-4">
            <h5 className="fw-bold text-light mb-3 pb-2 border-bottom border-secondary d-flex align-items-center justify-content-between">
              <span>
                <i className="bi bi-bag-check text-info me-2"></i> Mis Pedidos y Compras
              </span>
              <span className="badge bg-secondary">{misOrdenes.length} pedidos</span>
            </h5>

            {misOrdenes.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-receipt fs-1 text-muted mb-2 d-block"></i>
                <p className="text-muted small mb-3">Aún no has registrado compras en Hardware Nexus.</p>
                <Link to="/" className="btn btn-nexus btn-sm px-3">
                  Ir al Catálogo de Hardware
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {misOrdenes.map((orden) => (
                  <div key={orden.id} className="card bg-surface border-secondary p-3">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                      <div>
                        <span className="fw-bold text-info me-2">Orden #{orden.codigoOrden || orden.id}</span>
                        <span className="text-muted small">{orden.fecha || "Reciente"}</span>
                      </div>
                      <span className="badge bg-success">
                        <i className="bi bi-check2-circle me-1"></i> Pagado
                      </span>
                    </div>

                    <div className="small text-muted mb-2">
                      <strong>Despacho a:</strong> {orden.despacho?.direccion}, {orden.despacho?.comuna}
                    </div>

                    <div className="border-top border-secondary pt-2 mt-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted small">
                          {orden.items?.length || 0} producto(s) comprados
                        </span>
                        <span className="fw-bold text-light fs-6">
                          Total: <span className="text-info">{formatPrice(orden.total)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileView;
