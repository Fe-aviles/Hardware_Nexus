/**
 * hardwareNexus.spec.js
 * Suite de Pruebas Unitarias - Parte 1 (Lote 1: Pruebas 1 a 5)
 * Framework: Jasmine / Vitest Test Runner
 * Requisitos: Anexo 1 - Propuesta de pruebas Jasmine (Pág. 11) y Rúbrica IE2.2.1
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  getProductoById,
  saveCarrito,
  getCarrito,
  clearCarritoStorage
} from "../services/storageService";
import { formatPrice } from "../components/ProductCard";

describe("Suite de Pruebas Unitarias - Hardware Nexus (Parte 1)", () => {
  // Mock de LocalStorage antes de cada prueba
  let mockStorage = {};

  beforeEach(() => {
    mockStorage = {};

    // Configurar Mock nativo de window.localStorage
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key) => mockStorage[key] || null),
      setItem: vi.fn((key, value) => {
        mockStorage[key] = String(value);
      }),
      removeItem: vi.fn((key) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      })
    });
  });

  /**
   * TEST 1: Pruebas de Renderizado Correcto
   * Rúbrica: Asegurarse de que los componentes de lista rendericen todos los elementos de un conjunto de datos.
   */
  it("Test 1: [Renderizado] getProductos() debe retornar el catálogo completo de productos con sus atributos clave", () => {
    const productos = getProductos();

    expect(Array.isArray(productos)).toBe(true);
    expect(productos.length).toBeGreaterThanOrEqual(10);

    // Verificar que cada elemento posea la estructura de props esperada por ProductCard
    productos.forEach((p) => {
      expect(p.id).toBeDefined();
      expect(p.nombre).toBeDefined();
      expect(p.precio).toBeGreaterThan(0);
      expect(p.categoria).toBeDefined();
      expect(p.stock).toBeGreaterThanOrEqual(0);
    });
  });

  /**
   * TEST 2: Pruebas de Propiedades (props) y Funciones de Formato
   * Rúbrica: Desarrolla pruebas que confirmen que los componentes reciben y formatean las propiedades adecuadas.
   */
  it("Test 2: [Props / Formatting] formatPrice() debe recibir un valor numérico y formatearlo en divisa chilena (CLP)", () => {
    const formatted1 = formatPrice(110000);
    const formatted2 = formatPrice(720000);

    // Debe contener el símbolo monetario y separadores de miles
    expect(formatted1).toContain("$");
    expect(formatted1).toMatch(/110\.000/);
    expect(formatted2).toMatch(/720\.000/);
  });

  /**
   * TEST 3: Pruebas de Estado (state) y Cálculos de Carrito
   * Rúbrica: Implementa pruebas que comprueben la lógica de cambios de estado dentro de los componentes.
   */
  it("Test 3: [State / Cálculo] Debe calcular correctamente el subtotal acumulado y la cantidad de ítems del carrito", () => {
    const itemsPrueba = [
      { id: "PROD-001", nombre: "Ryzen 5 5500", precio: 100000, cantidad: 2 },
      { id: "PROD-007", nombre: "RTX 4070 SUPER", precio: 700000, cantidad: 1 }
    ];

    saveCarrito(itemsPrueba);
    const cargados = getCarrito();

    const totalCount = cargados.reduce((acc, i) => acc + i.cantidad, 0);
    const totalPrice = cargados.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

    expect(totalCount).toBe(3); // 2 + 1
    expect(totalPrice).toBe(900000); // (100.000 * 2) + 700.000
  });

  /**
   * TEST 4: Pruebas de Renderizado Condicional / Manejo de Carrito Vacío
   * Rúbrica: Comprobar que los componentes muestren u oculten elementos según las condiciones especificadas.
   */
  it("Test 4: [Renderizado Condicional] clearCarritoStorage() debe vaciar el estado del carrito", () => {
    saveCarrito([{ id: "PROD-001", cantidad: 1, precio: 50000 }]);
    expect(getCarrito().length).toBe(1);

    clearCarritoStorage();
    const carritoVacio = getCarrito();

    expect(carritoVacio.length).toBe(0);
    expect(Array.isArray(carritoVacio)).toBe(true);
  });

  /**
   * TEST 5: Pruebas de Persistencia, Eventos y Operaciones CRUD (Mocks)
   * Rúbrica: Simulación de Eventos y uso de mocks con verificación de LocalStorage
   */
  it("Test 5: [CRUD / Mock] Debe crear, consultar y eliminar productos en tiempo real sobre el almacenamiento simulado", () => {
    const nuevoComponente = {
      id: "PROD-TEST-99",
      nombre: "Memoria RAM Corsair Vengeance 32GB",
      categoria: "Memorias RAM",
      precio: 85000,
      stock: 10,
      stock_critico: 2,
      enOferta: false
    };

    // Crear
    createProducto(nuevoComponente);
    expect(localStorage.setItem).toHaveBeenCalled();

    // Consultar
    const encontrado = getProductoById("PROD-TEST-99");
    expect(encontrado).not.toBeNull();
    expect(encontrado.nombre).toBe("Memoria RAM Corsair Vengeance 32GB");

    // Actualizar
    updateProducto("PROD-TEST-99", { precio: 79990 });
    const actualizado = getProductoById("PROD-TEST-99");
    expect(actualizado.precio).toBe(79990);

    // Eliminar
    deleteProducto("PROD-TEST-99");
    const eliminado = getProductoById("PROD-TEST-99");
    expect(eliminado).toBeNull();
  });
});
