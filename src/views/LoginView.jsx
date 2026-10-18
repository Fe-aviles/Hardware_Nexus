import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LoginView = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    correo: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Obtener URL de redirección si venía de una ruta protegida
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get("redirect") || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { correo, password } = formData;

    if (!correo.trim() || !password.trim()) {
      setErrorMessage("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Validación básica de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.trim())) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    setLoading(true);
    const result = login(correo, password);
    setLoading(false);

    if (result.success) {
      if (result.user.rol === "Administrador") {
        navigate(redirectTo === "/" ? "/admin" : redirectTo);
      } else {
        navigate(redirectTo);
      }
    } else {
      setErrorMessage(result.message || "Correo o contraseña incorrectos.");
    }
  };

  const handleFillDemoAdmin = () => {
    setFormData({
      correo: "admin@hardwarenexus.com",
      password: "admin"
    });
    setErrorMessage("");
  };

  return (
    <div className="container py-5" data-testid="login-view-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card bg-dark border-secondary shadow-lg p-4 p-md-5">
            {/* Header del Formulario */}
            <div className="text-center mb-4">
              <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-25 text-info mb-3">
                <i className="bi bi-person-lock fs-1"></i>
              </div>
              <h2 className="fw-bold text-light mb-1">Iniciar Sesión</h2>
              <p className="text-muted small">
                Accede a tu cuenta de cliente o administración en Hardware Nexus
              </p>
            </div>

            {/* Alerta de Error Condicional */}
            {errorMessage && (
              <div
                className="alert alert-danger d-flex align-items-center gap-2 py-2"
                role="alert"
                data-testid="login-error-alert"
              >
                <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
                <div className="small fw-semibold">{errorMessage}</div>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} data-testid="login-form" noValidate>
              <div className="mb-3">
                <label htmlFor="login-correo" className="form-label text-light small fw-semibold">
                  Correo Electrónico
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-secondary border-secondary text-light">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    id="login-correo"
                    name="correo"
                    placeholder="ejemplo@hardwarenexus.com"
                    value={formData.correo}
                    onChange={handleChange}
                    data-testid="login-email"
                    style={{ backgroundColor: "#0b1120", color: "#ffffff" }}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between">
                  <label htmlFor="login-password" className="form-label text-light small fw-semibold">
                    Contraseña
                  </label>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-secondary border-secondary text-light">
                    <i className="bi bi-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control bg-dark text-light border-secondary"
                    id="login-password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    data-testid="login-password"
                    style={{ backgroundColor: "#0b1120", color: "#ffffff" }}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-nexus w-100 py-2 fw-bold mb-3"
                disabled={loading}
                data-testid="login-submit"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Autenticando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i> Ingresar a mi Cuenta
                  </>
                )}
              </button>

              {/* Botón Demostración Admin */}
              <button
                type="button"
                className="btn btn-outline-warning w-100 btn-sm mb-4"
                onClick={handleFillDemoAdmin}
                data-testid="btn-demo-admin"
              >
                <i className="bi bi-shield-check me-1"></i> Rellenar con Credenciales Admin Demo
              </button>
            </form>

            {/* Enlace a Registro */}
            <div className="text-center pt-3 border-top border-secondary">
              <span className="text-muted small">¿Aún no tienes una cuenta? </span>
              <Link to="/registro" className="text-info small fw-bold text-decoration-none">
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginView;
