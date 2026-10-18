/**
 * chileData.js
 * Listado de regiones y comunas principales de Chile
 * para formularios de Registro, Perfil y Checkout
 */

export const REGIONES_Y_COMUNAS = [
  {
    region: "Región Metropolitana de Santiago",
    comunas: [
      "Santiago",
      "Cerrillos",
      "Cerro Navia",
      "Conchalí",
      "El Bosque",
      "Estación Central",
      "Huechuraba",
      "Independencia",
      "La Cisterna",
      "La Florida",
      "La Granja",
      "La Pintana",
      "La Reina",
      "Las Condes",
      "Lo Barnechea",
      "Lo Espejo",
      "Lo Prado",
      "Macul",
      "Maipú",
      "Ñuñoa",
      "Pedro Aguirre Cerda",
      "Peñalolén",
      "Providencia",
      "Pudahuel",
      "Quilicura",
      "Quinta Normal",
      "Recoleta",
      "Renca",
      "San Joaquín",
      "San Miguel",
      "San Ramón",
      "Vitacura",
      "Puente Alto",
      "San Bernardo"
    ]
  },
  {
    region: "Región de Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana", "Quillota", "San Antonio"]
  },
  {
    region: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Coronel", "Los Ángeles", "Chillán"]
  },
  {
    region: "Región de Coquimbo",
    comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel"]
  },
  {
    region: "Región de Antofagasta",
    comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones"]
  },
  {
    region: "Región de Los Lagos",
    comunas: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud"]
  },
  {
    region: "Región de la Araucanía",
    comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"]
  }
];

export const REGIONES = REGIONES_Y_COMUNAS.map((r) => r.region);

export const getComunasPorRegion = (nombreRegion) => {
  const reg = REGIONES_Y_COMUNAS.find((r) => r.region === nombreRegion);
  return reg ? reg.comunas : [];
};
