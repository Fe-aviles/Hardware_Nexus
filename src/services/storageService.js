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
  },
  {
    id: "PROD-011",
    nombre: "Memoria RAM Kingston Fury Beast RGB 8GB DDR4 3200MHz",
    descripcion: "Memoria RAM DDR4 de alto rendimiento con iluminación RGB dinámica personalizable y disipador negro.",
    precio: 34990,
    stock: 20,
    stock_critico: 4,
    categoria: "Memorias RAM",
    imagenUrl: "/assets/images/ram/Memoria RAM DDR4 8GB 3200MTs Kingston Fury Beast RGB, CL16, DIMM, 1.35V.jpg",
    especificaciones: "8GB DDR4, 3200MT/s, Latencia CL16, Disipador térmico con RGB, 1.35V",
    enOferta: false
  },
  {
    id: "PROD-012",
    nombre: "Memoria RAM Kingston Fury Beast 8GB DDR4 3600MHz",
    descripcion: "Rendimiento confiable y agresivo para setups de alta frecuencia sin RGB de perfil bajo.",
    precio: 38990,
    stock: 15,
    stock_critico: 3,
    categoria: "Memorias RAM",
    imagenUrl: "/assets/images/ram/Memoria RAM DDR4 8GB 3600MTs Kingston Fury Beast, CL17, DIMM, 1.35V.jpg",
    especificaciones: "8GB DDR4, 3600MT/s, Latencia CL17, Perfil bajo compatible con coolers grandes",
    enOferta: false
  },
  {
    id: "PROD-013",
    nombre: "Memoria RAM XPG Lancer Blade RGB 16GB DDR5 6000MHz",
    descripcion: "Memoria DDR5 de última generación optimizada para plataformas AM5 e Intel con soporte para perfiles EXPO y XMP.",
    precio: 72990,
    stock: 12,
    stock_critico: 3,
    categoria: "Memorias RAM",
    imagenUrl: "/assets/images/ram/Memoria RAM DDR5 16GB 6000MTs XPG Lancer Blade RGB, UDIMM Black.png",
    especificaciones: "16GB DDR5, 6000MT/s, Intel XMP 3.0 y AMD EXPO, Iluminación RGB",
    enOferta: true,
    precioOferta: 64990
  },
  {
    id: "PROD-014",
    nombre: "Unidad SSD Kingston NV3 1TB M.2 PCIe 4.0 NVMe",
    descripcion: "Almacenamiento NVMe ultrarrápido de 4ta generación con velocidades de lectura de hasta 6000MB/s.",
    precio: 69990,
    stock: 18,
    stock_critico: 5,
    categoria: "Almacenamiento",
    imagenUrl: "/assets/images/SSD/Unidad SSD Kingston NV3, 1TB, M.2 2280, NVMePCIe 4.0 x4, Lectura 6000MBs Escritura 4000MBs.jpg",
    especificaciones: "1TB M.2 2280 NVMe PCIe 4.0 x4, Lectura 6000MB/s, Escritura 4000MB/s",
    enOferta: true,
    precioOferta: 62990
  },
  {
    id: "PROD-015",
    nombre: "Unidad SSD XPG Gammix S70 BLADE 1TB M.2 PCIe 4.0",
    descripcion: "SSD de grado profesional y gaming extremo con disipador de aluminio compatible con PC y PlayStation 5.",
    precio: 89990,
    stock: 10,
    stock_critico: 3,
    categoria: "Almacenamiento",
    imagenUrl: "/assets/images/SSD/Unidad SSD XPG Gammix S70 BLADE, 1TB, M.2 2280, NVMe PCIe 4.0, Lec. 7400MBs Esc. 5500MBs.jpg",
    especificaciones: "1TB M.2 2280, Lectura 7400MB/s, Escritura 5500MB/s, PS5 Compatible",
    enOferta: false
  },
  {
    id: "PROD-016",
    nombre: "Unidad SSD ADATA Ultimate SU650 1TB 2.5 SATA 3",
    descripcion: "Solución de actualización sólida y confiable para almacenamiento secundario de juegos masivos.",
    precio: 54990,
    stock: 14,
    stock_critico: 4,
    categoria: "Almacenamiento",
    imagenUrl: "/assets/images/SSD/Unidad SSD ADATA Ultimate SU650, 1TB, 2.5 SATA 3, Lectura 520MBs Escritura 450MBs.jpg",
    especificaciones: "1TB SATA III 6Gb/s, Formato 2.5\", Lectura 520MB/s, Escritura 450MB/s",
    enOferta: false
  },
  {
    id: "PROD-017",
    nombre: "Disipador de CPU AMD Wraith Stealth AM4/AM5",
    descripcion: "Solución de enfriamiento por aire compacta y silenciosa con conector de 4 pines PWM.",
    precio: 15990,
    stock: 25,
    stock_critico: 6,
    categoria: "Refrigeración",
    imagenUrl: "/assets/images/cooling/DISIPADOR AMD WRAITH STEALTH, COMPATIBLE CON PROCESADORES AM4 & AM5.jpg",
    especificaciones: "Compatible con AM4 & AM5, Ventilador silencioso PWM 92mm, Base de aluminio",
    enOferta: false
  },
  {
    id: "PROD-018",
    nombre: "Disipador de CPU MSI MAG COREFROZR AA13 ARGB",
    descripcion: "Torre de refrigeración de alto rendimiento con 4 heatpipes de cobre y ventilador ARGB de 120mm.",
    precio: 44990,
    stock: 9,
    stock_critico: 2,
    categoria: "Refrigeración",
    imagenUrl: "/assets/images/cooling/Disipador de CPU MSI MAG COREFROZR AA13, 1 Ventilador ARGB, Intel LGA 1700 1851, AMD AM4 AM5.jpg",
    especificaciones: "Soporte Intel LGA 1700/1851 y AMD AM4/AM5, 4 Heatpipes, Ventilador ARGB 120mm",
    enOferta: false
  },
  {
    id: "PROD-019",
    nombre: "Refrigeración Líquida XYZ AQUAPULSE AIO 360 con Visor",
    descripcion: "Enfriamiento líquido AIO de 360mm con pantalla digital de monitoreo térmico en el bloque de bomba.",
    precio: 129990,
    stock: 7,
    stock_critico: 2,
    categoria: "Refrigeración",
    imagenUrl: "/assets/images/cooling/Refrigeración Líquida XYZ AQUAPULSE AIO 360, 360mm, Visor Temperatura, IntelAMD, Negro.jpg",
    especificaciones: "Radiador 360mm, 3x Ventiladores PWM ARGB, Visor LCD de temperatura, Intel & AMD",
    enOferta: true,
    precioOferta: 114990
  },
  {
    id: "PROD-020",
    nombre: "Gabinete Gamer MSI Pano 130R MLG Edition Mid-Tower",
    descripcion: "Gabinete con cristal templado envolvente estilo pecera panorámica y ventiladores de aspas invertidas.",
    precio: 99990,
    stock: 6,
    stock_critico: 2,
    categoria: "Gabinetes",
    imagenUrl: "/assets/images/Case/Gabinete Gamer MSI Pano 130R MLG Edition, Mid-Tower, Incluye 4 Ventiladores, Rojo.png",
    especificaciones: "Mid-Tower, Cristal 270°, Incluye 4x Ventiladores ARGB preinstalados, Acabado Rojo Gamer",
    enOferta: false
  },
  {
    id: "PROD-021",
    nombre: "Gabinete Gamer XYZ AIRONE 300-X MESH 6x ARGB",
    descripcion: "Máximo flujo de aire frontal mallado con 6 ventiladores ARGB preinstalados y hub controlador.",
    precio: 69990,
    stock: 11,
    stock_critico: 3,
    categoria: "Gabinetes",
    imagenUrl: "/assets/images/Case/Gabinete Gamer XYZ AIRONE 300-X MESH, ATX, Panel Malla, 6 Ventiladores ARGB, Negro.jpg",
    especificaciones: "Soporta ATX / Micro-ATX, Panel frontal Mesh, 6 Ventiladores ARGB, Filtros antipolvo",
    enOferta: false
  },
  {
    id: "PROD-022",
    nombre: "Gabinete Gamer XYZ NEUTRON X PRO con Pantalla 9.1\"",
    descripcion: "Innovador chasis de alta gama con pantalla secundaria LCD de 9.1 pulgadas integrada en el chasis.",
    precio: 149990,
    stock: 5,
    stock_critico: 2,
    categoria: "Gabinetes",
    imagenUrl: "/assets/images/Case/Gabinete XYZ NEUTRON X PRO, ATX, Pantalla 9.1, 5 Ventiladores ARGB, Negro.jpg",
    especificaciones: "ATX, Pantalla frontal 9.1\" LCD integrada, 5x Ventiladores ARGB, Vidrio templado",
    enOferta: true,
    precioOferta: 139990
  },
  {
    id: "PROD-023",
    nombre: "Placa Madre ASUS B650M-AYW WiFi Socket AM5",
    descripcion: "Placa base AM5 con Wi-Fi 6 integrado, soporte para memoria DDR5 y doble ranura M.2 PCIe 5.0/4.0.",
    precio: 139990,
    stock: 8,
    stock_critico: 2,
    categoria: "Placas Madre",
    imagenUrl: "/assets/images/mobo/Placa Madre ASUS B650M-AYW WiFi, Socket AM5, 2x DDR5, 2x NVMe, Wi-Fi 6, 2.5 GbE, Micro-ATX.png",
    especificaciones: "Socket AM5, DDR5 hasta 6400MHz, Wi-Fi 6 + Bluetooth, 2.5 Gb Ethernet, Micro-ATX",
    enOferta: false
  },
  {
    id: "PROD-024",
    nombre: "Placa Madre GIGABYTE B650M GAMING WIFI AM5",
    descripcion: "VRM digital reforzado y disipación térmica extendida para procesadores Ryzen 7000/8000/9000.",
    precio: 145000,
    stock: 9,
    stock_critico: 2,
    categoria: "Placas Madre",
    imagenUrl: "/assets/images/mobo/Placa Madre GIGABYTE B650M GAMING WIFI, Socket AM5, 2x DDR5, Wi-Fi, Micro-ATX.png",
    especificaciones: "Socket AM5, 2x Slots DDR5, Wi-Fi & BT, DisplayPort + HDMI, Micro-ATX",
    enOferta: false
  },
  {
    id: "PROD-025",
    nombre: "Placa Madre MSI A520M-A PRO Socket AM4",
    descripcion: "Placa compacta y económica ideal para procesadores AMD Ryzen serie 3000, 4000 y 5000.",
    precio: 62990,
    stock: 14,
    stock_critico: 4,
    categoria: "Placas Madre",
    imagenUrl: "/assets/images/mobo/Placa Madre MSI A520M-A PRO, Socket AM4, 2x DDR4, 1x M.2, Micro-ATX.png",
    especificaciones: "Socket AM4, 2x Slots DDR4 hasta 4600MHz, Turbo M.2 Gen3 x4, Audio Boost, Micro-ATX",
    enOferta: false
  }
];

export const SEED_CATEGORIAS = [
  "Procesadores",
  "Tarjetas Gráficas",
  "Memorias RAM",
  "Placas Madre",
  "Almacenamiento",
  "Fuentes de Poder",
  "Gabinetes",
  "Refrigeración"
];

export const SEED_ORDENES = [
  {
    numeroBoleta: 20261017,
    codigoOrden: "ORD-94821",
    fecha: "17 de octubre de 2026, 18:30",
    cliente: {
      nombre: "Pedro",
      apellidos: "Hacker",
      correo: "pedro.hacker20@example.com"
    },
    despacho: {
      calle: "Los crisantemos, Edificio Norte",
      depto: "Depto 603",
      region: "Región Metropolitana",
      comuna: "Cerrillos",
      indicaciones: "Dejar en conserjería."
    },
    items: [
      { id: "PROD-001", nombre: "Procesador AMD Ryzen 5 5500", precio: 110000, cantidad: 1, imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 5500.jpg" },
      { id: "PROD-007", nombre: "Tarjeta Gráfica ASUS TUF Gaming GeForce RTX 4070 SUPER", precio: 720000, cantidad: 1, imagenUrl: "/assets/images/gpu/Tarjeta Grafica ASUS TUF Gaming GeForce RTX 4070 SUPER 12GB.jpg" }
    ],
    total: 830000,
    metodoPago: "webpay",
    estado: "Pagado",
    usuarioId: "usr-002"
  },
  {
    numeroBoleta: 20261016,
    codigoOrden: "ORD-73190",
    fecha: "16 de octubre de 2026, 14:15",
    cliente: {
      nombre: "María",
      apellidos: "González",
      correo: "maria.gonzalez@example.com"
    },
    despacho: {
      calle: "Av. Providencia 1240",
      depto: "Oficina 402",
      region: "Región Metropolitana",
      comuna: "Providencia",
      indicaciones: "Horario de oficina 9 a 18 hrs."
    },
    items: [
      { id: "PROD-008", nombre: "Tarjeta Gráfica Gigabyte GeForce RTX 4060 EAGLE OC", precio: 360000, cantidad: 1, imagenUrl: "/assets/images/gpu/Tarjeta Grafica Gigabyte GeForce RTX 4060 EAGLE OC 8G.jpg" }
    ],
    total: 360000,
    metodoPago: "transferencia",
    estado: "En Preparación",
    usuarioId: "usr-003"
  }
];

const KEYS = {
  PRODUCTOS: "nexus_productos",
  USUARIOS: "nexus_usuarios",
  CARRITO: "nexus_carrito",
  SESION: "nexus_sesion",
  ORDENES: "nexus_ordenes",
  CATEGORIAS: "nexus_categorias"
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

  const currentCategories = getStorageItem(KEYS.CATEGORIAS, null);
  if (!currentCategories || currentCategories.length === 0) {
    setStorageItem(KEYS.CATEGORIAS, SEED_CATEGORIAS);
  }

  const currentOrders = getStorageItem(KEYS.ORDENES, null);
  if (!currentOrders || currentOrders.length === 0) {
    setStorageItem(KEYS.ORDENES, SEED_ORDENES);
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

// ================= CRUD DE CATEGORÍAS =================
export const getCategorias = () => {
  initStorage();
  const custom = getStorageItem(KEYS.CATEGORIAS, SEED_CATEGORIAS);
  const prods = getProductos();
  const fromProds = prods.map((p) => p.categoria).filter(Boolean);
  return Array.from(new Set([...custom, ...fromProds]));
};

export const createCategoria = (nombre) => {
  if (!nombre || !nombre.trim()) return null;
  const nombreLimpio = nombre.trim();
  const current = getCategorias();
  if (!current.includes(nombreLimpio)) {
    current.push(nombreLimpio);
    setStorageItem(KEYS.CATEGORIAS, current);
  }
  return current;
};

export const deleteCategoria = (nombre) => {
  const current = getCategorias().filter((c) => c !== nombre);
  setStorageItem(KEYS.CATEGORIAS, current);
  return current;
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
  const storage = getLocalStorageInstance();
  if (storage) {
    storage.removeItem(KEYS.SESION);
  }
};

// ================= ÓRDENES / CHECKOUT =================
export const getOrdenes = () => {
  initStorage();
  return getStorageItem(KEYS.ORDENES, SEED_ORDENES);
};

export const saveOrden = (orden) => {
  const ordenes = getOrdenes();
  const ordenConEstado = {
    estado: "Pagado",
    ...orden
  };
  ordenes.unshift(ordenConEstado);
  setStorageItem(KEYS.ORDENES, ordenes);
  return ordenConEstado;
};

export const updateOrden = (codigoOrden, datosActualizados) => {
  const ordenes = getOrdenes();
  const index = ordenes.findIndex(
    (o) => String(o.codigoOrden) === String(codigoOrden) || String(o.numeroBoleta) === String(codigoOrden)
  );
  if (index === -1) return null;

  ordenes[index] = {
    ...ordenes[index],
    ...datosActualizados
  };
  setStorageItem(KEYS.ORDENES, ordenes);
  return ordenes[index];
};

export const deleteOrden = (codigoOrden) => {
  const ordenes = getOrdenes();
  const filtradas = ordenes.filter(
    (o) => String(o.codigoOrden) !== String(codigoOrden) && String(o.numeroBoleta) !== String(codigoOrden)
  );
  setStorageItem(KEYS.ORDENES, filtradas);
  return filtradas;
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


