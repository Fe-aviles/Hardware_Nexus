import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { REGIONES, getComunasPorRegion } from "../data/chileData";

export const RegisterView = () => {
  const { register, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirección si venía de Checkout o ruta protegida
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get("redirect") || "/perfil";

  useEffect(() => {
    if (currentUser) {
      navigate(redirectTo);
    }
  }, [currentUser, navigate, redirectTo]);

  const [formData, setFormData] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    password: "",
    confirmPassword: "",
    region: "Región Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const comunasDisponibles = getComunasPorRegion(formData.region);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "region") {
      const nuevasComunas = getComunasPorRegion(value);
      setFormData((prev) => ({
        ...prev,
        region: value,
        comuna: nuevasComunas[0] || ""
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const { run, nombre, apellidos, correo, password, confirmPassword, direccion } = formData;

    // Validación de campos vacíos
    if (
      !run.trim() ||
      !nombre.trim() ||
      !apellidos.trim() ||
      !correo.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !direccion.trim()
    ) {
      setErrorMessage("Por favor, completa todos los campos del formulario de registro.");
      return;
    }

    // Validación y formateo de RUN chileno
    const cleanRun = run.trim().replace(/\./g, "").toUpperCase();
    let formattedRun = cleanRun;
    if (!cleanRun.includes("-") && /^\d{7,8}[\dK]$/.test(cleanRun)) {
      formattedRun = `${cleanRun.slice(0, -1)}-${cleanRun.slice(-1)}`;
    }
    const runRegex = /^\d{7,8}-[\dK]$/;
    if (!runRegex.test(formattedRun)) {
      setErrorMessage("El RUN ingresado debe tener un formato chileno válido (ej: 12345678-9 o 12.345.678-K).");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.trim())) {
      setErrorMessage("Ingresa un correo electrónico con formato válido.");
      return;
    }

    // Validación de contraseña
    if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas ingresadas no coinciden.");
      return;
    }

    setLoading(true);
    const result = register({
      run: formattedRun,
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      correo: correo.trim(),
      password,
      region: formData.region,
      comuna: formData.comuna,
      direccion: direccion.trim()
    });
    setLoading(false);

    if (result.success) {
      setSuccessMessage("¡Cuenta creada exitosamente! Redirigiendo a tu perfil...");
      setTimeout(() => {
        navigate(redirectTo);
      }, 1000);
    } else {
      setErrorMessage(result.message || "Error al crear la cuenta de usuario.");
    }
  };

  return (
    <div className="container py-5" data-testid="register-view-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card bg-dark border-secondary shadow-lg p-4 p-md-5">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-25 text-info mb-3">
                <i className="bi bi-person-plus-fill fs-1"></i>
              </div>
              <h2 className="fw-bold text-light mb-1">Crear Nueva Cuenta</h2>
              <p className="text-muted small">
                Únete a la comunidad de Hardware Nexus y accede a seguimiento de compras y ofertas
              </p>
            </div>

            {/* Alertas */}
            {errorMessage && (
              <div
                className="alert alert-danger d-flex align-items-center gap-2 py-2"
                role="alert"
                data-testid="register-error-alert"
              >
                <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
                <div className="small fw-semibold">{errorMessage}</div>
              </div>
            )}

            {successMessage && (
              <div
                className="alert alert-success d-flex align-items-center gap-2 py-2"
                role="alert"
                data-testid="register-success-alert"
              >
                <i className="bi bi-check-circle-fill flex-shrink-0"></i>
                <div className="small fw-semibold">{successMessage}</div>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} data-testid="register-form" noValidate>
              <h6 className="text-info text-uppercase fw-bold small mb-3 border-bottom border-secondary pb-2">
                1. Datos Personales
              </h6>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-4">
                  <label htmlFor="reg-run" className="form-label text-light small fw-semibold">
                    RUN / RUT <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    id="reg-run"
                    name="run"
                    placeholder="12345678-9"
                    value={formData.run}
                    onChange={handleChange}
                    data-testid="register-run"
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label htmlFor="reg-nombre" className="form-label text-light small fw-semibold">
                    Nombre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    id="reg-nombre"
                    name="nombre"
                    placeholder="Nicolás"
                    value={formData.nombre}
                    onChange={handleChange}
                    data-testid="register-nombre"
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label htmlFor="reg-apellidos" className="form-label text-light small fw-semibold">
                    Apellidos <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    id="reg-apellidos"
                    name="apellidos"
                    placeholder="González"
                    value={formData.apellidos}
                    onChange={handleChange}
                    data-testid="register-apellidos"
                    required
                  />
                </div>
              </div>

              <h6 className="text-info text-uppercase fw-bold small mb-3 mt-4 border-bottom border-secondary pb-2">
                2. Credenciales de Acceso
              </h6>

              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="reg-correo" className="form-label text-light small fw-semibold">
                    Correo Electrónico <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    id="reg-correo"
                    name="correo"
                    placeholder="usuario@ejemplo.cl"
                    value={formData.correo}
                    onChange={handleChange}
                    data-testid="register-email"
                    required
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label htmlFor="reg-password" className="form-label text-light small fw-semibold">
                    Contraseña <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-light border-secondary"
                    id="reg-password"
                    name="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    data-testid="register-password"
                    required
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label htmlFor="reg-confirm-password" className="form-label text-light small fw-semibold">
                    Confirmar Contraseña <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-light border-secondary"
                    id="reg-confirm-password"
                    name="confirmPassword"
                    placeholder="Repite la clave"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    data-testid="register-confirm-password"
                    required
                  />
                </div>
              </div>

              <h6 className="text-info text-uppercase fw-bold small mb-3 mt-4 border-bottom border-secondary pb-2">
                3. Dirección Predeterminada de Despacho
              </h6>

              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="reg-region" className="form-label text-light small fw-semibold">
                    Región <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    id="reg-region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    data-testid="register-region"
                  >
                    {REGIONES.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="reg-comuna" className="form-label text-light small fw-semibold">
                    Comuna <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    id="reg-comuna"
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                    data-testid="register-comuna"
                  >
                    {comunasDisponibles.map((com) => (
                      <option key={com} value={com}>
                        {com}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label htmlFor="reg-direccion" className="form-label text-light small fw-semibold">
                    Calle, Número y Depto/Casa <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    id="reg-direccion"
                    name="direccion"
                    placeholder="Av. Los Leones 1234, Depto 402"
                    value={formData.direccion}
                    onChange={handleChange}
                    data-testid="register-direccion"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-nexus w-100 py-3 fw-bold mb-3"
                disabled={loading}
                data-testid="register-submit"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Creando Cuenta...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-check-fill me-2"></i> Registrarse en Hardware Nexus
                  </>
                )}
              </button>
            </form>

            {/* Enlace a Login */}
            <div className="text-center pt-3 border-top border-secondary">
              <span className="small" style={{ color: "#cbd5e1" }}>¿Ya tienes una cuenta registrada? </span>
              <Link
                to={redirectTo !== "/perfil" ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login"}
                className="text-info small fw-bold text-decoration-none hover-info"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterView;
