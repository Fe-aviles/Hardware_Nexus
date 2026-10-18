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
  // PROCESADORES (CPU)
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
    descripcion: "Procesador de 6 núcleos de alto rendimiento en AM4, optimizado para exprimir al máximo tu GPU.",
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
    descripcion: "Increíble potencia de procesamiento y gráficos integrados Radeon 760M para gaming a 1080p sin tarjeta gráfica.",
    precio: 235000,
    stock: 7,
    stock_critico: 2,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 8600G.jpg",
    especificaciones: "Socket AM5, Gráficos Radeon 760M, NPU de IA integrada, Frecuencia 5.0GHz",
    enOferta: true,
    precioOferta: 219990
  },
  {
    id: "PROD-007",
    nombre: "Procesador AMD Ryzen 7 5700",
    descripcion: "Procesador de 8 núcleos y 16 hilos ideal para creadores de contenido y streaming.",
    precio: 210000,
    stock: 14,
    stock_critico: 4,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 7 5700.jpg",
    especificaciones: "Socket AM4, 8 Núcleos / 16 Hilos, Frecuencia Boost 4.6GHz",
    enOferta: false
  },
  {
    id: "PROD-008",
    nombre: "Procesador Intel Core i3-12100",
    descripcion: "Procesador de 12ª generación de 4 núcleos y 8 hilos con gráficos integrados Intel UHD 730.",
    precio: 105000,
    stock: 11,
    stock_critico: 3,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador Intel Core i3-12100.png",
    especificaciones: "Socket LGA1700, Gráficos Intel UHD 730, Frecuencia Boost 4.3GHz",
    enOferta: false
  },
  {
    id: "PROD-009",
    nombre: "Procesador Intel Core i3-12100F",
    descripcion: "El rey del presupuesto gaming, 4 núcleos de alto rendimiento sin gráficos integrados.",
    precio: 95000,
    stock: 16,
    stock_critico: 5,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador Intel Core i3-12100F.jpg",
    especificaciones: "Socket LGA1700, 4 Núcleos / 8 Hilos, Requiere GPU dedicada",
    enOferta: true,
    precioOferta: 87990
  },
  {
    id: "PROD-010",
    nombre: "Procesador Intel Core i3-14100",
    descripcion: "Procesador de 14ª generación con frecuencias mejoradas y arquitectura refinada.",
    precio: 130000,
    stock: 6,
    stock_critico: 2,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador Intel Core i3-14100.jpg",
    especificaciones: "Socket LGA1700, Gráficos Intel UHD 730, Frecuencia Boost 4.7GHz",
    enOferta: false
  },
  {
    id: "PROD-011",
    nombre: "Procesador Intel Core i3-14100F",
    descripcion: "Procesador de 14ª Gen optimizado para gaming competitivo de alto refresco a bajo costo.",
    precio: 118000,
    stock: 9,
    stock_critico: 3,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador Intel Core i3-14100F.jpg",
    especificaciones: "Socket LGA1700, Frecuencia Boost 4.7GHz, PCIe 5.0",
    enOferta: false
  },
  {
    id: "PROD-012",
    nombre: "Procesador Intel Core i5-12400F",
    descripcion: "6 núcleos de rendimiento y 12 hilos, una de las opciones más populares del mercado.",
    precio: 145000,
    stock: 13,
    stock_critico: 4,
    categoria: "Procesadores",
    imagenUrl: "/assets/images/cpu/Procesador Intel Core i5-12400F.jpg",
    especificaciones: "Socket LGA1700, Frecuencia Turbo 4.4GHz, 18MB Cache",
    enOferta: true,
    precioOferta: 134990
  },

  // TARJETAS DE VIDEO (GPU)
  {
    id: "PROD-013",
    nombre: "ASUS Dual NVIDIA GeForce RTX 5050 8GB GDDR6",
    descripcion: "Tarjeta de entrada con 8GB GDDR6 y arquitectura de última generación en bus PCIe 5.0.",
    precio: 290000,
    stock: 8,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video ASUS Dual NVIDIA GeForce RTX 5050 8GB GDDR6, 128 Bit, 20 Gbits, PCI Express 5.0.jpg",
    especificaciones: "8GB GDDR6, 128-bit, PCI Express 5.0, 20 Gbits/s",
    enOferta: false
  },
  {
    id: "PROD-014",
    nombre: "ASUS Dual NVIDIA GeForce RTX 3060 V2 OC 12GB",
    descripcion: "La gráfica más popular con 12GB GDDR6 y Ray Tracing en arquitectura Ampere.",
    precio: 350000,
    stock: 10,
    stock_critico: 3,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video ASUS Dual Nvidia GeForce RTX 3060 V2 OC Edition - 12GB GDDR6, Ray Tracing.png",
    especificaciones: "12GB GDDR6, PCIe 4.0, Edición OC, Ventiladores Axial-tech",
    enOferta: true,
    precioOferta: 319990
  },
  {
    id: "PROD-015",
    nombre: "ASUS DUAL NVIDIA GeForce RTX 5060 OC Advanced 8GB GDDR7",
    descripcion: "Gráfica de alta eficiencia con memoria ultra rápida GDDR7 y diseño compacto de doble ventilador.",
    precio: 440000,
    stock: 5,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video ASUS Nvidia GeForce DUAL RTX 5060 OC Advanced, 8GB GDDR7, 128-bit, PCI-e 5.0.jpg",
    especificaciones: "8GB GDDR7, 128-bit, PCI-e 5.0, Edición OC Advanced",
    enOferta: false
  },
  {
    id: "PROD-016",
    nombre: "ASUS RTX 5060 Ti OC T1 Edition 8GB GDDR7",
    descripcion: "Rendimiento entusiasta con tecnología GDDR7 y triple puerto DisplayPort para multitrabajo.",
    precio: 520000,
    stock: 4,
    stock_critico: 1,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de video ASUS RTX 5060TI OC T1 Edition, 8GB GDDR7, 128-bits, PCI-e 5.0, 1x HDMI, 3x DP.jpg",
    especificaciones: "8GB GDDR7, PCI-e 5.0, 1x HDMI 2.1, 3x DisplayPort",
    enOferta: false
  },
  {
    id: "PROD-017",
    nombre: "Gigabyte NVIDIA GeForce RTX 5070 EAGLE OC ICE 12GB GDDR7",
    descripcion: "Potencia bruta para 1440p y 4K en un diseño blanco ICE exclusivo con triple ventilador.",
    precio: 680000,
    stock: 3,
    stock_critico: 1,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video Gigabyte NVIDIA GeForce RTX 5070 EAGLE OC ICE 12G, GDDR7 192 Bit, 3 Ventiladores.jpg",
    especificaciones: "12GB GDDR7, 192-bit, Triple Ventilador WINDFORCE, Edición ICE White",
    enOferta: true,
    precioOferta: 649990
  },
  {
    id: "PROD-018",
    nombre: "Gigabyte Radeon RX 9050 Gaming OC 8GB GDDR6",
    descripcion: "Gráfica de arquitectura RDNA con excelente relación precio-rendimiento y overclock de fábrica.",
    precio: 280000,
    stock: 7,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video Gigabyte Radeon RX 9050 Gaming OC, 8GB GDDR6, 128-bits, PCI-e 5.0, 2x DP, 1x HDMI.jpg",
    especificaciones: "8GB GDDR6, 128-bits, PCI-e 5.0, 2x DP, 1x HDMI",
    enOferta: false
  },
  {
    id: "PROD-019",
    nombre: "MSI GeForce RTX 5060 8G SHADOW 2X OC GDDR7",
    descripcion: "Diseño sobrio en tono oscuro con sistema de refrigeración Shadow 2X y memoria GDDR7.",
    precio: 420000,
    stock: 6,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video MSI GeForce RTX 5060 8G SHADOW 2X OC, 8GB GDDR7, 1x HDMI, 3x DisplayPort.jpg",
    especificaciones: "8GB GDDR7, PCI-e 5.0, 1x HDMI, 3x DisplayPort",
    enOferta: false
  },
  {
    id: "PROD-020",
    nombre: "MSI NVIDIA GeForce RTX 3050 LP 6G OC (Low Profile)",
    descripcion: "Formato de perfil bajo ideal para gabinetes reducidos y setups de oficina / HTPC.",
    precio: 190000,
    stock: 9,
    stock_critico: 3,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video MSI NVIDIA GeForce RTX 3050 LP 6G OC, 14 Gbps, 6GB GDDR6, 96-bit, Low Profile.png",
    especificaciones: "6GB GDDR6, 96-bit, Low Profile, Consumo ultra eficiente",
    enOferta: true,
    precioOferta: 179990
  },
  {
    id: "PROD-021",
    nombre: "MSI NVIDIA GeForce RTX 3050 VENTUS 2X 6G OC",
    descripcion: "Formato estándar de doble ventilador Ventus con durabilidad mejorada y backplate protector.",
    precio: 205000,
    stock: 11,
    stock_critico: 3,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video MSI NVIDIA GeForce RTX 3050 VENTUS 2X 6G OC GDDR6 14Gbps 96 bits.jpg",
    especificaciones: "6GB GDDR6, 14Gbps, 96-bit, Ventiladores TORX Fan 3.0",
    enOferta: false
  },
  {
    id: "PROD-022",
    nombre: "MSI NVIDIA GeForce RTX 5060 SHADOW 2X OC 8GB",
    descripcion: "Excelente rendimiento térmico y frecuencias OC para los títulos competitivos más exigentes.",
    precio: 430000,
    stock: 5,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video MSI NVIDIA GeForce RTX 5060 SHADOW 2X OC, 8GB GDDR7, 128-bit, PCI-e 5.0.png",
    especificaciones: "8GB GDDR7, 128-bit, PCI-e 5.0",
    enOferta: false
  },
  {
    id: "PROD-023",
    nombre: "MSI NVIDIA GeForce RTX 5070 VENTUS 2X OC 12GB",
    descripcion: "Poderosa GPU de 12GB GDDR7 y bus de 192-bit para jugar a tasa de refresco ultra alta.",
    precio: 650000,
    stock: 4,
    stock_critico: 1,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video MSI NVIDIA GeForce RTX 5070 VENTUS 2X OC, 12GB GDDR7, 192-bit, PCI-e 5.0.png",
    especificaciones: "12GB GDDR7, 192-bit, PCI-e 5.0, Ventus Dual Fan",
    enOferta: true,
    precioOferta: 619990
  },
  {
    id: "PROD-024",
    nombre: "MSI NVIDIA GeForce RTX 5060 Ventus 2X OC White 8GB",
    descripcion: "Estética impoluta en color blanco para setups temáticos y rendimiento de última generación.",
    precio: 445000,
    stock: 6,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video MSI Nvidia GeForce RTX 5060 Ventus 2X OC White 8GB GDDR7 PCIe 5.0.jpg",
    especificaciones: "8GB GDDR7, PCIe 5.0, Edición Ventus White",
    enOferta: false
  },
  {
    id: "PROD-025",
    nombre: "ZOTAC GAMING NVIDIA GeForce RTX 5060 Twin Edge OC 8GB",
    descripcion: "Diseño aerodinámico compacto Twin Edge OC con iluminación discreta y memoria GDDR7.",
    precio: 425000,
    stock: 7,
    stock_critico: 2,
    categoria: "Tarjetas Gráficas",
    imagenUrl: "/assets/images/gpu/Tarjeta de Video ZOTAC GAMING NVIDIA GeForce RTX 5060 Twin Edge OC 8GB GDDR7, 128-bit, 28 Gbps.png",
    especificaciones: "8GB GDDR7, 128-bit, 28 Gbps, IceStorm 2.0 Cooling",
    enOferta: false
  },

  // PLACAS MADRE (MOTHERBOARDS)
  {
    id: "PROD-026",
    nombre: "Placa Madre ASUS B650M-AYW WiFi",
    descripcion: "Placa madre Micro-ATX Socket AM5 con Wi-Fi 6 integrado, conectividad PCIe 5.0 y soporte DDR5.",
    precio: 145000,
    stock: 8,
    stock_critico: 2,
    categoria: "Placas Madre",
    imagenUrl: "/assets/images/mobo/Placa Madre ASUS B650M-AYW WiFi, Socket AM5, 2x DDR5, 2x NVMe, Wi-Fi 6, 2.5 GbE, Micro-ATX.png",
    especificaciones: "Socket AM5, 2x DDR5, 2x M.2 NVMe, Wi-Fi 6, 2.5 GbE, Formato Micro-ATX",
    enOferta: true,
    precioOferta: 134990
  },
  {
    id: "PROD-027",
    nombre: "Placa Madre GIGABYTE B650M GAMING WIFI",
    descripcion: "Excelente placa de entrada AM5 con conectividad inalámbrica y soporte para memorias DDR5 de alta velocidad.",
    precio: 135000,
    stock: 10,
    stock_critico: 3,
    categoria: "Placas Madre",
    imagenUrl: "/assets/images/mobo/Placa Madre GIGABYTE B650M GAMING WIFI, Socket AM5, 2x DDR5, Wi-Fi, Micro-ATX.png",
    especificaciones: "Socket AM5, 2x DDR5, Wi-Fi Integrado, Formato Micro-ATX",
    enOferta: false
  },
  {
    id: "PROD-028",
    nombre: "Placa Madre MSI A520M-A PRO",
    descripcion: "Placa madre accesible Socket AM4, ideal para armados de presupuesto optimizado con procesadores Ryzen.",
    precio: 68000,
    stock: 15,
    stock_critico: 4,
    categoria: "Placas Madre",
    imagenUrl: "/assets/images/mobo/Placa Madre MSI A520M-A PRO, Socket AM4, 2x DDR4, 1x M.2, Micro-ATX.png",
    especificaciones: "Socket AM4, 2x DDR4, 1x M.2 NVMe, Formato Micro-ATX",
    enOferta: true,
    precioOferta: 59990
  },

  // MEMORIAS RAM
  {
    id: "PROD-029",
    nombre: "Memoria RAM DDR4 8GB 3200MHz Kingston Fury Beast RGB",
    descripcion: "Módulo de memoria DDR4 de 8GB con disipador térmico e iluminación RGB personalizable.",
    precio: 28000,
    stock: 25,
    stock_critico: 5,
    categoria: "Memorias RAM",
    imagenUrl: "/assets/images/ram/Memoria RAM DDR4 8GB 3200MTs Kingston Fury Beast RGB, CL16, DIMM, 1.35V.jpg",
    especificaciones: "DDR4 8GB, 3200MHz, CL16, 1.35V, Iluminación RGB",
    enOferta: false
  },
  {
    id: "PROD-030",
    nombre: "Memoria RAM DDR4 8GB 3600MHz Kingston Fury Beast",
    descripcion: "Memoria de alta velocidad 3600MHz para exprimir el máximo rendimiento en procesadores Ryzen y Core.",
    precio: 31000,
    stock: 20,
    stock_critico: 5,
    categoria: "Memorias RAM",
    imagenUrl: "/assets/images/ram/Memoria RAM DDR4 8GB 3600MTs Kingston Fury Beast, CL17, DIMM, 1.35V.jpg",
    especificaciones: "DDR4 8GB, 3600MHz, CL17, DIMM, Disipador Negro",
    enOferta: false
  },
  {
    id: "PROD-031",
    nombre: "Memoria RAM DDR5 16GB 6000MHz XPG Lancer Blade RGB",
    descripcion: "La nueva generación DDR5 con velocidad ultra rápida de 6000MHz y perfil discreto con iluminación RGB.",
    precio: 65000,
    stock: 14,
    stock_critico: 3,
    categoria: "Memorias RAM",
    imagenUrl: "/assets/images/ram/Memoria RAM DDR5 16GB 6000MTs XPG Lancer Blade RGB, UDIMM Black.png",
    especificaciones: "DDR5 16GB, 6000MHz, UDIMM Black, Iluminación RGB",
    enOferta: true,
    precioOferta: 58990
  },

  // ALMACENAMIENTO (SSD)
  {
    id: "PROD-032",
    nombre: "Unidad SSD ADATA Ultimate SU650 1TB 2.5\" SATA 3",
    descripcion: "Almacenamiento SSD SATA de 1TB para acelerar la carga de tu sistema operativo y juegos.",
    precio: 58000,
    stock: 18,
    stock_critico: 4,
    categoria: "Almacenamiento SSD",
    imagenUrl: "/assets/images/SSD/Unidad SSD ADATA Ultimate SU650, 1TB, 2.5 SATA 3, Lectura 520MBs Escritura 450MBs.jpg",
    especificaciones: "1TB, Formato 2.5\", SATA III 6Gb/s, Lectura 520MB/s, Escritura 450MB/s",
    enOferta: false
  },
  {
    id: "PROD-033",
    nombre: "Unidad SSD Kingston NV3 1TB M.2 NVMe PCIe 4.0",
    descripcion: "SSD M.2 NVMe PCIe 4.0 ultrarrápido con velocidades de lectura de hasta 6000MB/s.",
    precio: 72000,
    stock: 22,
    stock_critico: 5,
    categoria: "Almacenamiento SSD",
    imagenUrl: "/assets/images/SSD/Unidad SSD Kingston NV3, 1TB, M.2 2280, NVMePCIe 4.0 x4, Lectura 6000MBs Escritura 4000MBs.jpg",
    especificaciones: "1TB M.2 2280, NVMe PCIe 4.0 x4, Lectura 6000MB/s, Escritura 4000MB/s",
    enOferta: true,
    precioOferta: 66990
  },
  {
    id: "PROD-034",
    nombre: "Unidad SSD XPG Gammix S70 BLADE 1TB M.2 NVMe PCIe 4.0",
    descripcion: "SSD de máximo rendimiento con disipador de calor integrado, compatible con PC y PlayStation 5.",
    precio: 89000,
    stock: 12,
    stock_critico: 3,
    categoria: "Almacenamiento SSD",
    imagenUrl: "/assets/images/SSD/Unidad SSD XPG Gammix S70 BLADE, 1TB, M.2 2280, NVMe PCIe 4.0, Lec. 7400MBs Esc. 5500MBs.jpg",
    especificaciones: "1TB M.2 2280, NVMe PCIe 4.0, Lectura 7400MB/s, Escritura 5500MB/s",
    enOferta: false
  },

  // REFRIGERACIÓN (COOLING)
  {
    id: "PROD-035",
    nombre: "Disipador AMD Wraith Stealth AM4 / AM5",
    descripcion: "Disipador de aire original AMD eficiente y silencioso para procesadores Ryzen.",
    precio: 12000,
    stock: 30,
    stock_critico: 6,
    categoria: "Refrigeración",
    imagenUrl: "/assets/images/cooling/DISIPADOR AMD WRAITH STEALTH, COMPATIBLE CON PROCESADORES AM4 & AM5.jpg",
    especificaciones: "Socket AM4 y AM5, Ventilador silencioso, Compuesto térmico preaplicado",
    enOferta: false
  },
  {
    id: "PROD-036",
    nombre: "Disipador CPU MSI MAG COREFROZR AA13 ARGB",
    descripcion: "Torre de refrigeración de alto flujo de aire con ventilador ARGB y tubos de calor directos.",
    precio: 35000,
    stock: 9,
    stock_critico: 2,
    categoria: "Refrigeración",
    imagenUrl: "/assets/images/cooling/Disipador de CPU MSI MAG COREFROZR AA13, 1 Ventilador ARGB, Intel LGA 1700 1851, AMD AM4 AM5.jpg",
    especificaciones: "Compatibilidad Intel LGA 1700/1851 & AMD AM4/AM5, 1x ARGB Fan",
    enOferta: false
  },
  {
    id: "PROD-037",
    nombre: "Refrigeración Líquida XYZ AQUAPULSE AIO 360",
    descripcion: "Sistema AIO de 360mm con pantalla para visor de temperatura y 3 ventiladores ARGB.",
    precio: 115000,
    stock: 6,
    stock_critico: 2,
    categoria: "Refrigeración",
    imagenUrl: "/assets/images/cooling/Refrigeración Líquida XYZ AQUAPULSE AIO 360, 360mm, Visor Temperatura, IntelAMD, Negro.jpg",
    especificaciones: "Radiador 360mm, Visor Digital de Temperatura, Intel / AMD Multi-socket",
    enOferta: true,
    precioOferta: 104990
  },

  // GABINETES (CASES)
  {
    id: "PROD-038",
    nombre: "Gabinete Gamer MSI Pano 130R MLG Edition Mid-Tower Red",
    descripcion: "Diseño vista panorámica con cristal templado doble, acabado especial MLG Edition y 4 ventiladores.",
    precio: 98000,
    stock: 5,
    stock_critico: 2,
    categoria: "Gabinetes",
    imagenUrl: "/assets/images/Case/Gabinete Gamer MSI Pano 130R MLG Edition, Mid-Tower, Incluye 4 Ventiladores, Rojo.png",
    especificaciones: "Formato Mid-Tower, Incluye 4 Ventiladores, Edición Rojo Panorámico",
    enOferta: false
  },
  {
    id: "PROD-039",
    nombre: "Gabinete Gamer XYZ AIRONE 300-X MESH ARGB Negro",
    descripcion: "Panel frontal tipo malla de alto flujo de aire con 6 ventiladores ARGB preinstalados.",
    precio: 62000,
    stock: 11,
    stock_critico: 3,
    categoria: "Gabinetes",
    imagenUrl: "/assets/images/Case/Gabinete Gamer XYZ AIRONE 300-X MESH, ATX, Panel Malla, 6 Ventiladores ARGB, Negro.jpg",
    especificaciones: "Formato ATX, Panel Mesh, 6 Ventiladores ARGB incluidos, Color Negro",
    enOferta: true,
    precioOferta: 55990
  },
  {
    id: "PROD-040",
    nombre: "Gabinete XYZ NEUTRON X PRO ATX con Pantalla 9.1\"",
    descripcion: "Gabinete premium con pantalla LCD de 9.1 pulgadas integrada para monitoreo y personalización.",
    precio: 140000,
    stock: 4,
    stock_critico: 1,
    categoria: "Gabinetes",
    imagenUrl: "/assets/images/Case/Gabinete XYZ NEUTRON X PRO, ATX, Panel Malla, 5 Ventiladores ARGB, Negro.jpg",
    especificaciones: "Formato ATX, Pantalla LCD 9.1\" Integrada, 5 Ventiladores ARGB, Color Negro",
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
  // Si no existen productos o tiene la versión anterior reducida (< 40), cargamos el catálogo completo de la Evaluación 1
  if (!currentProducts || !Array.isArray(currentProducts) || currentProducts.length < 40) {
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


