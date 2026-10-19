import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getSesionActual,
  setSesionActual,
  clearSesionActual,
  getUsuarios,
  saveUsuario,
  updateUsuario
} from "../services/storageService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sesion = getSesionActual();
    if (sesion) {
      setCurrentUser(sesion);
    }
    setLoading(false);
  }, []);

  const login = (correo, password) => {
    const usuarios = getUsuarios();
    const user = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password
    );

    if (user) {
      const sanitized = { ...user };
      delete sanitized.password;
      setCurrentUser(sanitized);
      setSesionActual(sanitized);
      return { success: true, user: sanitized };
    }
    return { success: false, message: "Correo o contraseña incorrectos" };
  };

  const register = (datosUsuario) => {
    const usuarios = getUsuarios();
    const cleanEmail = (datosUsuario.correo || "").trim().toLowerCase();
    const existe = usuarios.some((u) => u.correo.toLowerCase() === cleanEmail);
    if (existe) {
      return { success: false, message: "El correo electrónico ya está registrado." };
    }

    const nuevoUsuario = {
      id: `usr-${Date.now()}`,
      rol: "Cliente",
      ...datosUsuario,
      correo: cleanEmail
    };

    saveUsuario(nuevoUsuario);
    const sanitized = { ...nuevoUsuario };
    delete sanitized.password;
    setCurrentUser(sanitized);
    setSesionActual(sanitized);
    return { success: true, user: sanitized };
  };

  const logout = () => {
    setCurrentUser(null);
    clearSesionActual();
  };

  const updateProfile = (nuevosDatos) => {
    if (!currentUser) return { success: false, message: "No hay sesión activa" };
    const actualizado = updateUsuario(currentUser.id, nuevosDatos);
    if (actualizado) {
      const sanitized = { ...actualizado };
      delete sanitized.password;
      setCurrentUser(sanitized);
      setSesionActual(sanitized);
      return { success: true, user: sanitized };
    }
    return { success: false, message: "Error al actualizar perfil" };
  };

  const isAdmin = currentUser?.rol === "Administrador";

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateProfile, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
