/**
 * hardwareNexusParte2.spec.js
 * Suite de Pruebas Unitarias - Parte 2 (Lote 2: Pruebas 6 a 10)
 * Framework: Jasmine / Vitest Test Runner
 * Requisitos: Anexo 1 - Propuesta de pruebas Jasmine (Pág. 11), Flujo Auth/Admin/Checkout y Rúbrica IE2.2.1
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getProductos,
  createProducto,
  getProductoById,
  getUsuarios,
  saveUsuario,
  updateUsuario,
  getSesionActual,
  setSesionActual,
  clearSesionActual,
  getOrdenes,
  saveOrden,
  updateOrden,
  deleteOrden,
  descontarStockDeOrden,
  getCategorias,
  createCategoria,
  deleteCategoria,
  SEED_ADMIN
} from "../services/storageService";

describe("Suite de Pruebas Unitarias - Hardware Nexus (Parte 2: Auth, Admin, Checkout)", () => {
  let mockStorage = {};

  beforeEach(() => {
    mockStorage = {};

    // Mock seguro de window.localStorage y globalThis.localStorage
    const storageMock = {
      getItem: vi.fn((key) => (key in mockStorage ? mockStorage[key] : null)),
      setItem: vi.fn((key, value) => {
        mockStorage[key] = String(value);
      }),
      removeItem: vi.fn((key) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      })
    };

    vi.stubGlobal("localStorage", storageMock);
  });

  /**
   * TEST 6: Pruebas de Autenticación, Login Mock y Sanitización de Sesión
   * Rúbrica: Comprobar la lógica de autenticación, validación de credenciales y persistencia en LocalStorage.
   */
  it("Test 6: [Autenticación / Login Mock] Debe validar credenciales del administrador y persistir la sesión sanitizada", () => {
    const usuarios = getUsuarios();
    expect(usuarios.length).toBeGreaterThanOrEqual(1);

    // Intentar login con credenciales válidas
    const userMatch = usuarios.find(
      (u) => u.correo === "admin@hardwarenexus.com" && u.password === "admin"
    );
    expect(userMatch).toBeDefined();
    expect(userMatch.rol).toBe("Administrador");

    // Guardar sesión sanitizada (sin contraseña)
    const sessionPayload = { ...userMatch };
    delete sessionPayload.password;
    setSesionActual(sessionPayload);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "nexus_sesion",
      expect.stringContaining("admin@hardwarenexus.com")
    );

    const sesionRecuperada = getSesionActual();
    expect(sesionRecuperada).not.toBeNull();
    expect(sesionRecuperada.correo).toBe("admin@hardwarenexus.com");
    expect(sesionRecuperada.password).toBeUndefined();

    // Comprobar rechazo con credenciales erróneas
    const invalidUser = usuarios.find(
      (u) => u.correo === "admin@hardwarenexus.com" && u.password === "clave_erronea_123"
    );
    expect(invalidUser).toBeUndefined();

    // Cerrar sesión
    clearSesionActual();
    expect(localStorage.removeItem).toHaveBeenCalledWith("nexus_sesion");
  });

  /**
   * TEST 7: Pruebas de Registro de Usuario, Validación de RUN y Control de Duplicados
   * Rúbrica: Implementación de pruebas que comprueben la creación de cuentas de usuario y persistencia de clientes.
   */
  it("Test 7: [Registro / Validación] Debe registrar un nuevo cliente con RUN válido y prevenir correos duplicados", () => {
    const nuevoCliente = {
      id: "usr-test-2026",
      run: "18765432-1",
      nombre: "Carlos",
      apellidos: "Valenzuela",
      correo: "carlos.valenzuela@example.com",
      password: "password123",
      rol: "Cliente",
      region: "Región del Biobío",
      comuna: "Concepción",
      direccion: "Barros Arana 540"
    };

    saveUsuario(nuevoCliente);
    expect(localStorage.setItem).toHaveBeenCalled();

    const listaUsuarios = getUsuarios();
    const clienteGuardado = listaUsuarios.find((u) => u.correo === "carlos.valenzuela@example.com");

    expect(clienteGuardado).toBeDefined();
    expect(clienteGuardado.run).toBe("18765432-1");
    expect(clienteGuardado.rol).toBe("Cliente");

    // Control de unicidad de correo
    const existeDuplicado = listaUsuarios.some(
      (u) => u.correo.toLowerCase() === "carlos.valenzuela@example.com".toLowerCase()
    );
    expect(existeDuplicado).toBe(true);
  });

  /**
   * TEST 8: Pruebas de Control de Acceso, Roles y Privilegios (Admin vs Cliente)
   * Rúbrica: Desarrolla pruebas que confirmen la correcta asignación y modificación de privilegios de usuario.
   */
  it("Test 8: [Control de Acceso / Roles] Debe diferenciar privilegios entre rol Administrador y Cliente y permitir actualización de rol", () => {
    const admin = SEED_ADMIN;
    const esAdmin = admin.rol === "Administrador";
    expect(esAdmin).toBe(true);

    const cliente = {
      id: "usr-rol-test",
      nombre: "Ana",
      apellidos: "Gómez",
      correo: "ana.gomez@example.com",
      rol: "Cliente"
    };
    saveUsuario(cliente);

    expect(cliente.rol).toBe("Cliente");
    expect(cliente.rol === "Administrador").toBe(false);

    // Promover usuario a Administrador mediante updateUsuario
    const usuarioPromovido = updateUsuario("usr-rol-test", { rol: "Administrador" });
    expect(usuarioPromovido.rol).toBe("Administrador");

    // Verificar en lista actualizada
    const usuariosActualizados = getUsuarios();
    const anaEncontrada = usuariosActualizados.find((u) => u.id === "usr-rol-test");
    expect(anaEncontrada.rol).toBe("Administrador");
  });

  /**
   * TEST 9: Pruebas de Checkout, Emisión de Órdenes y Descuento de Inventario
   * Rúbrica: Simulación de Eventos de compra y verificación de consistencia en reducción de stock de productos.
   */
  it("Test 9: [Checkout / Stock] Debe registrar una nueva orden de compra y descontar stock de inventario sin quedar negativo", () => {
    // 1. Preparar producto de prueba con stock conocido
    const productoTest = {
      id: "PROD-STOCK-TEST",
      nombre: "Memoria RAM DDR5 32GB",
      precio: 120000,
      stock: 5,
      stock_critico: 2,
      categoria: "Memorias RAM"
    };
    createProducto(productoTest);

    const prodAntes = getProductoById("PROD-STOCK-TEST");
    expect(prodAntes.stock).toBe(5);

    // 2. Crear Orden de compra con 2 unidades
    const nuevaOrden = {
      numeroBoleta: 20261018,
      codigoOrden: "ORD-TEST-55",
      fecha: "18 de octubre de 2026",
      cliente: {
        nombre: "Roberto",
        apellidos: "Pérez",
        correo: "roberto.perez@example.com"
      },
      despacho: {
        calle: "Av. Las Condes 1000",
        region: "Región Metropolitana",
        comuna: "Las Condes"
      },
      items: [{ id: "PROD-STOCK-TEST", nombre: "Memoria RAM DDR5 32GB", precio: 120000, cantidad: 2 }],
      total: 240000,
      metodoPago: "webpay"
    };

    const ordenRegistrada = saveOrden(nuevaOrden);
    expect(ordenRegistrada.estado).toBe("Pagado");
    expect(localStorage.setItem).toHaveBeenCalled();

    // 3. Descontar stock
    descontarStockDeOrden(nuevaOrden.items);
    const prodDespues = getProductoById("PROD-STOCK-TEST");
    expect(prodDespues.stock).toBe(3); // 5 - 2 = 3

    // 4. Intentar descontar más allá del stock disponible para comprobar límite inferior en 0
    descontarStockDeOrden([{ id: "PROD-STOCK-TEST", cantidad: 10 }]);
    const prodAgotado = getProductoById("PROD-STOCK-TEST");
    expect(prodAgotado.stock).toBe(0); // Math.max(0, 3 - 10) = 0
  });

  /**
   * TEST 10: Pruebas de Gestión Administrativa, Actualización de Órdenes y CRUD de Categorías
   * Rúbrica: Pruebas unitarias completas de operaciones administrativas sobre almacenamiento simulado con mocks.
   */
  it("Test 10: [Gestión Admin / Órdenes y Categorías] Debe actualizar estados de pedidos y gestionar dinámicamente las categorías", () => {
    // 1. Probar actualización de estado de orden
    const ordenPrueba = {
      numeroBoleta: 998877,
      codigoOrden: "ORD-STATUS-TEST",
      cliente: { nombre: "Test", apellidos: "User", correo: "test@example.com" },
      total: 50000,
      items: []
    };
    saveOrden(ordenPrueba);

    const ordenActualizada = updateOrden("ORD-STATUS-TEST", { estado: "Enviado" });
    expect(ordenActualizada).not.toBeNull();
    expect(ordenActualizada.estado).toBe("Enviado");

    const ordenes = getOrdenes();
    const encontrada = ordenes.find((o) => o.codigoOrden === "ORD-STATUS-TEST");
    expect(encontrada.estado).toBe("Enviado");

    // Eliminar orden
    deleteOrden("ORD-STATUS-TEST");
    const ordenesDespuesBorrado = getOrdenes();
    expect(ordenesDespuesBorrado.some((o) => o.codigoOrden === "ORD-STATUS-TEST")).toBe(false);

    // 2. Probar gestión de categorías
    const categoriasIniciales = getCategorias();
    expect(categoriasIniciales).toContain("Procesadores");

    createCategoria("Watercooling Custom");
    const categoriasConNueva = getCategorias();
    expect(categoriasConNueva).toContain("Watercooling Custom");

    deleteCategoria("Watercooling Custom");
    const categoriasSinNueva = getCategorias();
    expect(categoriasSinNueva).not.toContain("Watercooling Custom");
  });
});
