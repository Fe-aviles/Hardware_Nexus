import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/apiService";

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

  // Inicializar sesión desde el token almacenado y validar contra el backend
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("hardware_nexus_session");

      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setCurrentUser(parsedUser);
          const perfil = await authApi.getPerfil();
          if (perfil) {
            const updatedUser = {
              ...parsedUser,
              nombre: perfil.nombre,
              apellidos: perfil.apellido,
              correo: perfil.email,
              rol: perfil.rol
            };
            setCurrentUser(updatedUser);
            localStorage.setItem("hardware_nexus_session", JSON.stringify(updatedUser));
          }
        } catch (error) {
          console.warn("Sesión expirada o token inválido:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (correo, password) => {
    try {
      const data = await authApi.login(correo.trim(), password);
      // Data contiene: { token, tipoToken, id, nombre, apellido, email, rol }
      localStorage.setItem("token", data.token);

      const userSession = {
        id: data.id,
        nombre: data.nombre,
        apellidos: data.apellido,
        correo: data.email,
        rol: data.rol // ADMIN, VENDEDOR, CLIENTE
      };

      setCurrentUser(userSession);
      localStorage.setItem("hardware_nexus_session", JSON.stringify(userSession));
      return { success: true, user: userSession };
    } catch (error) {
      return { success: false, message: error.message || "Credenciales incorrectas" };
    }
  };

  const register = async (datosUsuario) => {
    try {
      const payload = {
        nombre: datosUsuario.nombre,
        apellido: datosUsuario.apellidos || datosUsuario.apellido || "Nexus",
        email: datosUsuario.correo || datosUsuario.email,
        password: datosUsuario.password,
        telefono: datosUsuario.telefono || datosUsuario.telefono_contacto || "",
        direccion: datosUsuario.direccion || "",
        rol: datosUsuario.rol || "CLIENTE"
      };

      const data = await authApi.register(payload);
      localStorage.setItem("token", data.token);

      const userSession = {
        id: data.id,
        nombre: data.nombre,
        apellidos: data.apellido,
        correo: data.email,
        rol: data.rol
      };

      setCurrentUser(userSession);
      localStorage.setItem("hardware_nexus_session", JSON.stringify(userSession));
      return { success: true, user: userSession };
    } catch (error) {
      return { success: false, message: error.message || "Error al registrar usuario" };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("hardware_nexus_session");
  };

  // Comprobaciones de roles según rúbrica
  const isAdmin = currentUser?.rol === "ADMIN" || currentUser?.rol === "Administrador";
  const isVendedor = currentUser?.rol === "VENDEDOR" || currentUser?.rol === "Vendedor";
  const isStaff = isAdmin || isVendedor; // Puede acceder a vistas administrativas restringidas

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        isAdmin,
        isVendedor,
        isStaff,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
