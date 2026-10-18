import React, { useState } from "react";

export const ContactView = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card bg-dark border-secondary p-4 p-md-5 rounded-4 shadow-sm">
            <h2 className="fw-extrabold text-light mb-2">Contacto & Soporte Técnico</h2>
            <p className="text-muted mb-4">
              ¿Tienes dudas con la compatibilidad de tus piezas o necesitas asesoría personalizada? Escríbenos.
            </p>

            {submitted ? (
              <div className="alert alert-success d-flex align-items-center gap-3">
                <i className="bi bi-check-circle-fill fs-3"></i>
                <div>
                  <h5 className="alert-heading mb-1">¡Mensaje Enviado con Éxito!</h5>
                  <p className="mb-0 small">
                    Nuestro equipo técnico revisará tu consulta y te responderá al correo indicado en menos de 24 horas hábiles.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small">Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-muted small">Correo Electrónico *</label>
                    <input
                      type="email"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted small">Asunto / Consulta</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      value={formData.asunto}
                      onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted small">Mensaje</label>
                    <textarea
                      rows="4"
                      className="form-control bg-dark text-light border-secondary"
                      required
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-nexus px-4 py-2">
                      <i className="bi bi-send me-2"></i> Enviar Mensaje
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
