/**
 * categoryIcons.js
 * Mapeo visual de iconos y estilos temáticos por categoría de hardware
 * Diseño Gamer Dark Mode para Hardware Nexus
 */

export const getCategoryIconData = (catName = "") => {
  const normalized = String(catName || "").toLowerCase().trim();

  if (normalized.includes("procesador") || normalized.includes("cpu")) {
    return {
      icon: "bi-cpu-fill",
      color: "#38bdf8", // Sky blue
      accent: "info",
      bgGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(14, 165, 233, 0.05))",
      borderColor: "rgba(56, 189, 248, 0.4)",
      badgeBg: "rgba(56, 189, 248, 0.2)",
      desc: "Rendimiento y velocidad de cálculo multinúcleo"
    };
  }

  if (
    normalized.includes("gr\u00e1fic") ||
    normalized.includes("grafic") ||
    normalized.includes("video") ||
    normalized.includes("gpu")
  ) {
    return {
      icon: "bi-gpu-card",
      color: "#c084fc", // Neon purple
      accent: "primary",
      bgGradient: "linear-gradient(135deg, rgba(192, 132, 252, 0.2), rgba(147, 51, 234, 0.05))",
      borderColor: "rgba(192, 132, 252, 0.4)",
      badgeBg: "rgba(192, 132, 252, 0.2)",
      desc: "Potencia gráfica, Ray Tracing y DLSS 3"
    };
  }

  if (normalized.includes("ram") || normalized.includes("memoria")) {
    return {
      icon: "bi-memory",
      color: "#f472b6", // Pink/Magenta
      accent: "danger",
      bgGradient: "linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(219, 39, 119, 0.05))",
      borderColor: "rgba(244, 114, 182, 0.4)",
      badgeBg: "rgba(244, 114, 182, 0.2)",
      desc: "Multitarea fluida DDR4 / DDR5 de alta frecuencia"
    };
  }

  if (
    normalized.includes("almacenamiento") ||
    normalized.includes("ssd") ||
    normalized.includes("disco") ||
    normalized.includes("nvme") ||
    normalized.includes("m.2")
  ) {
    return {
      icon: "bi-device-hdd-fill",
      color: "#2dd4bf", // Teal
      accent: "success",
      bgGradient: "linear-gradient(135deg, rgba(45, 212, 191, 0.2), rgba(13, 148, 136, 0.05))",
      borderColor: "rgba(45, 212, 191, 0.4)",
      badgeBg: "rgba(45, 212, 191, 0.2)",
      desc: "Unidades NVMe PCIe 4.0 y SSD ultrarrápidos"
    };
  }

  if (
    normalized.includes("refrigeraci") ||
    normalized.includes("cooling") ||
    normalized.includes("ventilador") ||
    normalized.includes("water") ||
    normalized.includes("disipador") ||
    normalized.includes("aio")
  ) {
    return {
      icon: "bi-fan",
      color: "#67e8f9", // Ice cyan
      accent: "info",
      bgGradient: "linear-gradient(135deg, rgba(103, 232, 249, 0.2), rgba(6, 182, 212, 0.05))",
      borderColor: "rgba(103, 232, 249, 0.4)",
      badgeBg: "rgba(103, 232, 249, 0.2)",
      desc: "Refrigeración líquida y por aire de alto rendimiento"
    };
  }

  if (
    normalized.includes("gabinete") ||
    normalized.includes("case") ||
    normalized.includes("torre") ||
    normalized.includes("chasis")
  ) {
    return {
      icon: "bi-pc-display",
      color: "#fb923c", // Orange
      accent: "warning",
      bgGradient: "linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(234, 88, 12, 0.05))",
      borderColor: "rgba(251, 146, 60, 0.4)",
      badgeBg: "rgba(251, 146, 60, 0.2)",
      desc: "Chasis ATX con flujo de aire optimizado y ARGB"
    };
  }

  if (
    normalized.includes("placa") ||
    normalized.includes("motherboard") ||
    normalized.includes("mobo")
  ) {
    return {
      icon: "bi-motherboard",
      color: "#34d399", // Emerald
      accent: "success",
      bgGradient: "linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.05))",
      borderColor: "rgba(52, 211, 153, 0.4)",
      badgeBg: "rgba(52, 211, 153, 0.2)",
      desc: "Sockets AM4, AM5 e Intel con máxima conectividad"
    };
  }

  if (
    normalized.includes("fuente") ||
    normalized.includes("power") ||
    normalized.includes("psu")
  ) {
    return {
      icon: "bi-lightning-charge-fill",
      color: "#facc15", // Electric yellow
      accent: "warning",
      bgGradient: "linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(202, 138, 4, 0.05))",
      borderColor: "rgba(250, 204, 21, 0.4)",
      badgeBg: "rgba(250, 204, 21, 0.2)",
      desc: "Fuentes 80 Plus con potencia garantizada"
    };
  }

  return {
    icon: "bi-grid-fill",
    color: "#a78bfa",
    accent: "secondary",
    bgGradient: "linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(124, 58, 237, 0.05))",
    borderColor: "rgba(167, 139, 250, 0.4)",
    badgeBg: "rgba(167, 139, 250, 0.2)",
    desc: "Componentes y accesorios gamers"
  };
};
