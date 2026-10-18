/**
 * storageService.js
 * Capa de persistencia en LocalStorage y operaciones CRUD
 * para Hardware Nexus (Evaluación 2 Fullstack II)
 */

export const SEED_ADMIN = {
  id: "admin-001",
  run: "123456789",
  nombre: "Admin",
  apellidos: "Principal",
  correo: "admin@hardwarenexus.com",
  password: "admin",
  rol: "Administrador",
  region: "Región Metropolitana",
  comuna: "Santiago",
  direccion: "Casa Matriz"
};

export const SEED_PRODUCTOS = [
  {
    id: "PROD-001",
    nombre: "Procesador AMD Ryzen 5 5500",
    descripcion: "Procesador de 6 núcleos y 12 hilos, excelente opción de entrada para gaming y multitarea.",
    precio: 110000,
    stock: 15,
    stock_critico: 4,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 5500.jpg",
    especificaciones: "Socket AM4, Frecuencia base 3.6GHz / Turbo 4.2GHz, 19MB Cache",
    enOferta: true,
    precioOferta: 99990
  },
  {
    id: "PROD-002",
    nombre: "Procesador AMD Ryzen 5 5600GT",
    descripcion: "Procesador de 6 núcleos con gráficos Radeon integrados, ideal para PCs sin GPU dedicada.",
    precio: 140000,
    stock: 10,
    stock_critico: 3,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 5600GT.jpg",
    especificaciones: "Socket AM4, Gráficos Radeon Vega 7, Frecuencia base 3.6GHz / Turbo 4.6GHz",
    enOferta: false
  },
  {
    id: "PROD-003",
    nombre: "Procesador AMD Ryzen 5 5600XT",
    descripcion: "Procesador de 6 núcleos de alto rendimiento en AM4, optimizado para gaming.",
    precio: 180000,
    stock: 12,
    stock_critico: 5,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 5600XT.jpg",
    especificaciones: "Socket AM4, 6 Núcleos / 12 Hilos, Frecuencia Boost 4.6GHz, 35MB Cache",
    enOferta: true,
    precioOferta: 164990
  },
  {
    id: "PROD-004",
    nombre: "Procesador AMD Ryzen 5 8400F",
    descripcion: "Procesador de arquitectura Zen 4 para socket AM5, eficiencia y potencia en la nueva plataforma.",
    precio: 165000,
    stock: 8,
    stock_critico: 2,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 8400F.jpg",
    especificaciones: "Socket AM5, PCIe 5.0, Frecuencia Boost 4.7GHz, DDR5 únicamente",
    enOferta: false
  },
  {
    id: "PROD-005",
    nombre: "Procesador AMD Ryzen 5 8500G",
    descripcion: "Procesador AM5 con potentes gráficos integrados Radeon 740M y aceleración por IA.",
    precio: 195000,
    stock: 9,
    stock_critico: 3,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 8500G.jpg",
    especificaciones: "Socket AM5, Gráficos Radeon 740M, 6 Núcleos / 12 Hilos, DDR5",
    enOferta: false
  },
  {
    id: "PROD-006",
    nombre: "Procesador AMD Ryzen 5 8600G",
    descripcion: "Increíble potencia de procesamiento y gráficos integrados Radeon 760M para gaming a 1080p.",
    precio: 235000,
    stock: 14,
    stock_critico: 4,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 8600G.jpg",
    especificaciones: "Socket AM5, Radeon 760M, 6 Núcleos / 12 Hilos, NPU Ryzen AI integrada",
    enOferta: true,
    precioOferta: 219990
  },
  {
    id: "PROD-007",
    nombre: "Tarjeta Gráfica ASUS TUF Gaming GeForce RTX 4070 SUPER",
    descripcion: "Potencia gráfica brutal para 1440p y 4K con DLSS 3, ray tracing avanzado y refrigeración TUF.",
    precio: 720000,
    stock: 7,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta Grafica ASUS TUF Gaming GeForce RTX 4070 SUPER 12GB.jpg",
    especificaciones: "12GB GDDR6X, PCIe 4.0, Ventiladores Axial-tech, Triple Slot",
    enOferta: true,
    precioOferta: 679990
  },
  {
    id: "PROD-008",
    nombre: "Tarjeta Gráfica Gigabyte GeForce RTX 4060 EAGLE OC",
    descripcion: "Excelente relación precio/rendimiento con arquitectura Ada Lovelace y bajo consumo.",
    precio: 360000,
    stock: 12,
    stock_critico: 4,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta Grafica Gigabyte GeForce RTX 4060 EAGLE OC 8G.jpg",
    especificaciones: "8GB GDDR6, 128-bit, Sistema de refrigeración WINDFORCE 3X",
    enOferta: false
  },
  {
    id: "PROD-009",
    nombre: "Tarjeta Gráfica MSI GeForce RTX 3050 Ventus 2X",
    descripcion: "Tarjeta de entrada accesible con soporte para DLSS y ray tracing a 1080p.",
    precio: 240000,
    stock: 5,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta Grafica MSI GeForce RTX 3050 Ventus 2X 6G OC.jpg",
    especificaciones: "6GB GDDR6, Doble ventilador TORX 3.0, Bajo consumo sin conector extra",
    enOferta: false
  },
  {
    id: "PROD-010",
    nombre: "Tarjeta Gráfica PNY GeForce RTX 4060 XLR8 Gaming",
    descripcion: "Diseño compacto de doble ventilador con iluminación RGB e ingeniería robusta.",
    precio: 350000,
    stock: 8,
    stock_critico: 3,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta Grafica PNY GeForce RTX 4060 8GB XLR8 Gaming VERTO Edition DLSS 3.jpg",
    especificaciones: "8GB GDDR6, DLSS 3, Reloj acelerado hasta 2460MHz",
    enOferta: true,
    precioOferta: 329990
  }
];

const KEYS = {
  PRODUCTOS: "nexus_productos",
  USUARIOS: "nexus_usuarios",
  CARRITO: "nexus_carrito",
  SESION: "nexus_sesion",
  ORDENES: "nexus_ordenes"
};

// Safe LocalStorage helpers (Soporta navegadores y entornos de test unitario como Node/Vitest/Jasmine)
const getLocalStorageInstance = () => {
  if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  if (typeof globalThis !== "undefined" && globalThis.localStorage) return globalThis.localStorage;
  return null;
};

const getStorageItem = (key, fallback) => {
  const storage = getLocalStorageInstance();
  if (!storage) return fallback;
  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  const storage = getLocalStorageInstance();
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// Inicialización de Semilla
export const initStorage = () => {
  const currentProducts = getStorageItem(KEYS.PRODUCTOS, null);
  if (!currentProducts || currentProducts.length === 0) {
    setStorageItem(KEYS.PRODUCTOS, SEED_PRODUCTOS);
  }

  const currentUsers = getStorageItem(KEYS.USUARIOS, null);
  if (!currentUsers || currentUsers.length === 0) {
    setStorageItem(KEYS.USUARIOS, [SEED_ADMIN]);
  }
};

// ================= CRUD DE PRODUCTOS =================
export const getProductos = () => {
  initStorage();
  return getStorageItem(KEYS.PRODUCTOS, SEED_PRODUCTOS);
};

export const getProductoById = (id) => {
  const productos = getProductos();
  return productos.find((p) => String(p.id) === String(id)) || null;
};

export const createProducto = (nuevoProducto) => {
  const productos = getProductos();
  const productoConId = {
    ...nuevoProducto,
    id: nuevoProducto.id || `PROD-${Date.now()}`,
    precio: Number(nuevoProducto.precio) || 0,
    stock: Number(nuevoProducto.stock) || 0,
    stock_critico: Number(nuevoProducto.stock_critico) || 2
  };
  productos.push(productoConId);
  setStorageItem(KEYS.PRODUCTOS, productos);
  return productoConId;
};

export const updateProducto = (id, datosActualizados) => {
  const productos = getProductos();
  const index = productos.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;

  productos[index] = {
    ...productos[index],
    ...datosActualizados,
    precio: Number(datosActualizados.precio ?? productos[index].precio),
    stock: Number(datosActualizados.stock ?? productos[index].stock)
  };
  setStorageItem(KEYS.PRODUCTOS, productos);
  return productos[index];
};

export const deleteProducto = (id) => {
  const productos = getProductos();
  const filtrados = productos.filter((p) => String(p.id) !== String(id));
  setStorageItem(KEYS.PRODUCTOS, filtrados);
  return filtrados;
};

// ================= CARRITO =================
export const getCarrito = () => {
  return getStorageItem(KEYS.CARRITO, []);
};

export const saveCarrito = (items) => {
  setStorageItem(KEYS.CARRITO, items);
};

export const clearCarritoStorage = () => {
  setStorageItem(KEYS.CARRITO, []);
};

// ================= SESIÓN Y USUARIOS =================
export const getUsuarios = () => {
  initStorage();
  return getStorageItem(KEYS.USUARIOS, [SEED_ADMIN]);
};

export const saveUsuario = (usuario) => {
  const usuarios = getUsuarios();
  usuarios.push(usuario);
  setStorageItem(KEYS.USUARIOS, usuarios);
  return usuario;
};

export const updateUsuario = (id, datosActualizados) => {
  const usuarios = getUsuarios();
  const index = usuarios.findIndex((u) => String(u.id) === String(id));
  if (index === -1) return null;

  usuarios[index] = {
    ...usuarios[index],
    ...datosActualizados
  };
  setStorageItem(KEYS.USUARIOS, usuarios);
  return usuarios[index];
};

export const deleteUsuario = (id) => {
  const usuarios = getUsuarios();
  const filtrados = usuarios.filter((u) => String(u.id) !== String(id));
  setStorageItem(KEYS.USUARIOS, filtrados);
  return filtrados;
};


export const getSesionActual = () => {
  return getStorageItem(KEYS.SESION, null);
};

export const setSesionActual = (usuario) => {
  setStorageItem(KEYS.SESION, usuario);
};

export const clearSesionActual = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(KEYS.SESION);
  }
};

// ================= ÓRDENES / CHECKOUT =================
export const getOrdenes = () => {
  return getStorageItem(KEYS.ORDENES, []);
};

export const saveOrden = (orden) => {
  const ordenes = getOrdenes();
  ordenes.unshift(orden);
  setStorageItem(KEYS.ORDENES, ordenes);
  return orden;
};

export const descontarStockDeOrden = (items) => {
  const productos = getProductos();
  items.forEach((item) => {
    const prod = productos.find((p) => String(p.id) === String(item.id));
    if (prod) {
      prod.stock = Math.max(0, (Number(prod.stock) || 0) - (Number(item.cantidad) || 1));
    }
  });
  setStorageItem(KEYS.PRODUCTOS, productos);
  return productos;
};

