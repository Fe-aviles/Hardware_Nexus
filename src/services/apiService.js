// Cliente HTTP y Servicios de Comunicación con Backend Spring Boot (v1)
const API_BASE_URL = "http://localhost:8080/v1";

// Helper para obtener token almacenado
export const getStoredToken = () => {
  return localStorage.getItem("token") || null;
};

// Helper genérico para peticiones con token JWT
export const apiFetch = async (endpoint, options = {}) => {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const errorMsg = data?.message || data?.error || `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return data;
};

// --- MÓDULO DE AUTENTICACIÓN Y USUARIOS ---
export const authApi = {
  login: async (email, password) => {
    return await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  },

  register: async (userData) => {
    return await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData)
    });
  },

  getPerfil: async () => {
    return await apiFetch("/usuarios/perfil");
  },

  getUsuarios: async () => {
    return await apiFetch("/usuarios");
  }
};

// --- MÓDULO DE PRODUCTOS Y CATEGORÍAS ---
export const productApi = {
  getProductos: async (categoriaId = null, busqueda = "") => {
    const params = new URLSearchParams();
    if (categoriaId) params.append("categoriaId", categoriaId);
    if (busqueda) params.append("buscar", busqueda);
    const queryString = params.toString() ? `?${params.toString()}` : "";
    return await apiFetch(`/productos${queryString}`);
  },

  getProductosAdmin: async () => {
    return await apiFetch("/productos/admin/todos");
  },

  getProductoById: async (id) => {
    return await apiFetch(`/productos/${id}`);
  },

  getCategorias: async () => {
    return await apiFetch("/productos/categorias");
  },

  createProducto: async (productoData) => {
    return await apiFetch("/productos", {
      method: "POST",
      body: JSON.stringify(productoData)
    });
  },

  updateProducto: async (id, productoData) => {
    return await apiFetch(`/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify(productoData)
    });
  },

  deleteProducto: async (id) => {
    return await apiFetch(`/productos/${id}`, {
      method: "DELETE"
    });
  }
};

// --- MÓDULO DE PEDIDOS Y BOLETAS ---
export const orderApi = {
  crearPedido: async (items) => {
    return await apiFetch("/pedidos", {
      method: "POST",
      body: JSON.stringify({ items })
    });
  },

  getMisPedidos: async () => {
    return await apiFetch("/pedidos/mis-pedidos");
  },

  getTodasLasOrdenes: async () => {
    return await apiFetch("/pedidos");
  },

  getOrdenById: async (id) => {
    return await apiFetch(`/pedidos/${id}`);
  }
};
