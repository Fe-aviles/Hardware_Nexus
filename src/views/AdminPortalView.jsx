import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../components/ProductCard";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  getCategorias,
  createCategoria,
  deleteCategoria,
  getOrdenes,
  updateOrden,
  deleteOrden,
  getUsuarios,
  saveUsuario,
  updateUsuario,
  deleteUsuario
} from "../services/storageService";
import { REGIONES, getComunasPorRegion } from "../data/chileData";
import { getCategoryIconData } from "../data/categoryIcons";

export const AdminPortalView = () => {
  const { currentUser, isAdmin, login } = useAuth();

  // Pestaña activa: "dashboard" | "productos" | "categorias" | "ordenes" | "usuarios"
  const [activeTab, setActiveTab] = useState("dashboard");

  // Estados de datos
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Notificación local
  const [toastMessage, setToastMessage] = useState(null);

  // Estados de filtros y búsqueda
  const [prodSearch, setProdSearch] = useState("");
  const [prodCatFilter, setProdCatFilter] = useState("Todas");
  const [onlyCriticalStock, setOnlyCriticalStock] = useState(false);

  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("Todos");

  const [userSearch, setUserSearch] = useState("");

  // Modal y formulario de Producto
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    nombre: "",
    categoria: "Procesadores",
    precio: "",
    stock: "",
    stock_critico: "3",
    descripcion: "",
    especificaciones: "",
    imagenUrl: "",
    enOferta: false,
    precioOferta: ""
  });
  const [productFormError, setProductFormError] = useState("");

  // Modal y formulario de Categoría
  const [newCatName, setNewCatName] = useState("");

  // Modal de Detalle de Orden
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Modal y formulario de Usuario
  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    run: "",
    password: "",
    rol: "Cliente",
    region: "Región Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: ""
  });
  const [userFormError, setUserFormError] = useState("");

  // Cargar todos los datos
  const reloadData = () => {
    setProductos(getProductos());
    setCategorias(getCategorias());
    setOrdenes(getOrdenes());
    setUsuarios(getUsuarios());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const showToast = (msg, type = "success") => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Login de demostración si no es admin
  const handleDemoAdminLogin = () => {
    const res = login("admin@hardwarenexus.com", "admin");
    if (res.success) {
      showToast("¡Autenticado como Administrador!");
      reloadData();
    } else {
      showToast(res.message, "danger");
    }
  };

  // ================= DASHBOARD METRICS =================
  const totalVentas = ordenes.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const productosCriticos = productos.filter((p) => Number(p.stock) <= Number(p.stock_critico));
  const totalStockUnidades = productos.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);

  // ================= PRODUCTOS ACTIONS =================
  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProductForm({
      nombre: "",
      categoria: categorias[0] || "Procesadores",
      precio: "",
      stock: "10",
      stock_critico: "3",
      descripcion: "",
      especificaciones: "",
      imagenUrl: "/assets/images/cpu/Procesador AMD Ryzen 5 5500.jpg",
      enOferta: false,
      precioOferta: ""
    });
    setProductFormError("");
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      nombre: prod.nombre,
      categoria: prod.categoria,
      precio: String(prod.precio),
      stock: String(prod.stock),
      stock_critico: String(prod.stock_critico || 2),
      descripcion: prod.descripcion || "",
      especificaciones: prod.especificaciones || "",
      imagenUrl: prod.imagenUrl || "",
      enOferta: !!prod.enOferta,
      precioOferta: prod.precioOferta ? String(prod.precioOferta) : ""
    });
    setProductFormError("");
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.nombre.trim()) {
      setProductFormError("El nombre del producto es obligatorio.");
      return;
    }
    if (Number(productForm.precio) <= 0) {
      setProductFormError("El precio debe ser un número positivo mayor a 0.");
      return;
    }
    if (Number(productForm.stock) < 0) {
      setProductFormError("El stock no puede ser negativo.");
      return;
    }

    const payload = {
      nombre: productForm.nombre.trim(),
      categoria: productForm.categoria,
      precio: Number(productForm.precio),
      stock: Number(productForm.stock),
      stock_critico: Number(productForm.stock_critico) || 2,
      descripcion: productForm.descripcion.trim(),
      especificaciones: productForm.especificaciones.trim(),
      imagenUrl: productForm.imagenUrl.trim() || "/assets/images/cpu/Procesador AMD Ryzen 5 5500.jpg",
      enOferta: Boolean(productForm.enOferta),
      precioOferta: productForm.enOferta && productForm.precioOferta ? Number(productForm.precioOferta) : null
    };

    if (editingProduct) {
      updateProducto(editingProduct.id, payload);
      showToast(`Producto "${payload.nombre}" actualizado con éxito.`);
    } else {
      createProducto(payload);
      showToast(`Producto "${payload.nombre}" agregado al catálogo.`);
    }

    setShowProductModal(false);
    reloadData();
  };

  const handleDeleteProduct = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${nombre}"?`)) {
      deleteProducto(id);
      showToast(`Producto "${nombre}" eliminado.`, "warning");
      reloadData();
    }
  };

  const handleQuickStockAdjustment = (prod, delta) => {
    const nuevoStock = Math.max(0, Number(prod.stock) + delta);
    updateProducto(prod.id, { stock: nuevoStock });
    showToast(`Stock de "${prod.nombre}" actualizado a ${nuevoStock}.`);
    reloadData();
  };

  // ================= CATEGORÍAS ACTIONS =================
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    createCategoria(newCatName.trim());
    showToast(`Categoría "${newCatName.trim()}" agregada.`);
    setNewCatName("");
    reloadData();
  };

  const handleDeleteCategory = (cat) => {
    const prodsInCat = productos.filter((p) => p.categoria === cat).length;
    if (prodsInCat > 0) {
      if (!window.confirm(`Hay ${prodsInCat} productos asociados a "${cat}". ¿Deseas eliminarla de todas formas?`)) {
        return;
      }
    }
    deleteCategoria(cat);
    showToast(`Categoría "${cat}" eliminada.`, "warning");
    reloadData();
  };

  // ================= ÓRDENES ACTIONS =================
  const handleUpdateOrderStatus = (codigoOrden, nuevoEstado) => {
    updateOrden(codigoOrden, { estado: nuevoEstado });
    showToast(`Estado de la orden ${codigoOrden} actualizado a "${nuevoEstado}".`);
    reloadData();
    if (selectedOrder && (selectedOrder.codigoOrden === codigoOrden || selectedOrder.numeroBoleta === codigoOrden)) {
      setSelectedOrder((prev) => ({ ...prev, estado: nuevoEstado }));
    }
  };

  const handleDeleteOrder = (codigoOrden) => {
    if (window.confirm(`¿Seguro que deseas eliminar la orden ${codigoOrden}?`)) {
      deleteOrden(codigoOrden);
      showToast(`Orden ${codigoOrden} eliminada.`, "warning");
      reloadData();
      if (selectedOrder && (selectedOrder.codigoOrden === codigoOrden || selectedOrder.numeroBoleta === codigoOrden)) {
        setSelectedOrder(null);
      }
    }
  };

  // ================= USUARIOS ACTIONS =================
  const handleOpenCreateUser = () => {
    setUserForm({
      nombre: "",
      apellidos: "",
      correo: "",
      run: "",
      password: "",
      rol: "Cliente",
      region: "Región Metropolitana de Santiago",
      comuna: "Santiago",
      direccion: ""
    });
    setUserFormError("");
    setShowUserModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!userForm.nombre.trim() || !userForm.apellidos.trim() || !userForm.correo.trim()) {
      setUserFormError("Nombre, apellidos y correo son campos obligatorios.");
      return;
    }
    const existe = usuarios.some((u) => u.correo.toLowerCase() === userForm.correo.trim().toLowerCase());
    if (existe) {
      setUserFormError("Ya existe un usuario con este correo electrónico.");
      return;
    }

    const nuevo = {
      id: `usr-${Date.now()}`,
      nombre: userForm.nombre.trim(),
      apellidos: userForm.apellidos.trim(),
      correo: userForm.correo.trim(),
      run: userForm.run.trim() || "111111119",
      password: userForm.password || "123456",
      rol: userForm.rol,
      region: userForm.region,
      comuna: userForm.comuna,
      direccion: userForm.direccion.trim()
    };

    saveUsuario(nuevo);
    showToast(`Usuario ${nuevo.nombre} (${nuevo.rol}) registrado con éxito.`);
    setShowUserModal(false);
    reloadData();
  };

  const handleToggleUserRole = (u) => {
    if (currentUser?.id === u.id) {
      showToast("No puedes cambiar tu propio rol de administrador en sesión.", "danger");
      return;
    }
    const nuevoRol = u.rol === "Administrador" ? "Cliente" : "Administrador";
    updateUsuario(u.id, { rol: nuevoRol });
    showToast(`Rol de ${u.nombre} modificado a ${nuevoRol}.`);
    reloadData();
  };

  const handleDeleteUser = (u) => {
    if (currentUser?.id === u.id || u.correo === "admin@hardwarenexus.com") {
      showToast("No se puede eliminar la cuenta del administrador actual.", "danger");
      return;
    }
    if (window.confirm(`¿Eliminar al usuario "${u.nombre} ${u.apellidos}" (${u.correo})?`)) {
      deleteUsuario(u.id);
      showToast(`Usuario ${u.correo} eliminado.`, "warning");
      reloadData();
    }
  };

  // Filtrado de Productos
  const filteredProducts = productos.filter((p) => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(prodSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(prodSearch.toLowerCase());
    const matchesCat = prodCatFilter === "Todas" || p.categoria === prodCatFilter;
    const matchesStock = onlyCriticalStock ? Number(p.stock) <= Number(p.stock_critico) : true;
    return matchesSearch && matchesCat && matchesStock;
  });

  // Filtrado de Órdenes
  const filteredOrders = ordenes.filter((o) => {
    const text = `${o.codigoOrden || ""} ${o.numeroBoleta || ""} ${o.cliente?.nombre || ""} ${o.cliente?.apellidos || ""} ${o.cliente?.correo || ""}`.toLowerCase();
    const matchesSearch = text.includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === "Todos" || (o.estado || "Pagado") === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtrado de Usuarios
  const filteredUsers = usuarios.filter((u) => {
    const text = `${u.nombre || ""} ${u.apellidos || ""} ${u.correo || ""} ${u.run || ""} ${u.rol || ""}`.toLowerCase();
    return text.includes(userSearch.toLowerCase());
  });

  // ================= PANTALLA DE ACCESO RESTRINGIDO =================
  if (!isAdmin) {
    return (
      <div className="container py-5" data-testid="admin-access-denied">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card bg-dark border-danger shadow-lg p-4 p-md-5 text-center">
              <div className="mb-3">
                <i className="bi bi-shield-x fs-1 text-danger"></i>
              </div>
              <h3 className="fw-bold text-light mb-2">Acceso Restringido al Panel Administrativo</h3>
              <p className="text-muted mb-4">
                Esta sección está reservada exclusivamente para usuarios con rol de{" "}
                <span className="badge bg-warning text-dark">Administrador</span>.
                {currentUser ? ` Tu rol actual es: ${currentUser.rol}.` : " No has iniciado sesión."}
              </p>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-warning fw-bold text-dark py-2"
                  onClick={handleDemoAdminLogin}
                  data-testid="btn-demo-admin-login"
                >
                  <i className="bi bi-key-fill me-2"></i> Iniciar con Cuenta Administrador Demo
                </button>
                <Link to="/login" className="btn btn-outline-light py-2">
                  <i className="bi bi-box-arrow-in-right me-2"></i> Ir al Formulario de Login
                </Link>
                <Link to="/" className="btn btn-link text-info text-decoration-none">
                  ← Volver a la Tienda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= INTERFAZ PRINCIPAL DEL PANEL =================
  return (
    <div className="container-fluid px-3 px-lg-5 py-4" data-testid="admin-portal-view">
      {/* Toast Notification flotante */}
      {toastMessage && (
        <div
          className={`nexus-toast border-${toastMessage.type === "danger" ? "danger" : "info"}`}
          style={{ zIndex: 9999 }}
        >
          <i
            className={`bi ${
              toastMessage.type === "danger"
                ? "bi-exclamation-triangle-fill text-danger"
                : "bi-check-circle-fill text-success"
            } fs-5`}
          ></i>
          <span className="small fw-semibold">{toastMessage.msg}</span>
        </div>
      )}

      {/* Top Banner de Administración */}
      <div className="card bg-dark border-secondary p-4 mb-4 shadow-sm">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-warning text-dark fw-bold px-2 py-1">
                <i className="bi bi-shield-lock-fill me-1"></i> MODO ADMINISTRADOR
              </span>
              <span className="text-muted small">Hardware Nexus v2.0</span>
            </div>
            <h2 className="fw-extrabold text-light mb-0">Panel de Control y Gestión Central</h2>
            <p className="text-muted small mb-0 mt-1">
              Sesión activa: <strong className="text-info">{currentUser?.nombre} {currentUser?.apellidos}</strong> ({currentUser?.correo})
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={reloadData}
              title="Refrescar datos"
            >
              <i className="bi bi-arrow-clockwise me-1"></i> Refrescar
            </button>
            <Link to="/" className="btn btn-outline-info btn-sm">
              <i className="bi bi-shop me-1"></i> Ver Tienda Pública
            </Link>
          </div>
        </div>
      </div>

      {/* Navegación por Pestañas */}
      <ul className="nav nav-pills nav-fill bg-dark border border-secondary p-1 rounded-3 mb-4 gap-1">
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold py-2 ${activeTab === "dashboard" ? "active bg-primary" : "text-light"}`}
            onClick={() => setActiveTab("dashboard")}
            data-testid="tab-dashboard"
          >
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold py-2 ${activeTab === "productos" ? "active bg-primary" : "text-light"}`}
            onClick={() => setActiveTab("productos")}
            data-testid="tab-productos"
          >
            <i className="bi bi-box-seam me-2"></i> Productos ({productos.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold py-2 ${activeTab === "categorias" ? "active bg-primary" : "text-light"}`}
            onClick={() => setActiveTab("categorias")}
            data-testid="tab-categorias"
          >
            <i className="bi bi-tags me-2"></i> Categorías ({categorias.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold py-2 ${activeTab === "ordenes" ? "active bg-primary" : "text-light"}`}
            onClick={() => setActiveTab("ordenes")}
            data-testid="tab-ordenes"
          >
            <i className="bi bi-receipt me-2"></i> Órdenes de Compra ({ordenes.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-semibold py-2 ${activeTab === "usuarios" ? "active bg-primary" : "text-light"}`}
            onClick={() => setActiveTab("usuarios")}
            data-testid="tab-usuarios"
          >
            <i className="bi bi-people me-2"></i> Usuarios ({usuarios.length})
          </button>
        </li>
      </ul>

      {/* ================= CONTENIDO PESTAÑA 1: DASHBOARD ================= */}
      {activeTab === "dashboard" && (
        <div data-testid="admin-dashboard-content">
          {/* Tarjetas KPI */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card bg-dark border-secondary p-3 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small text-uppercase fw-bold">Ventas Totales</span>
                    <h3 className="fw-bold text-success mb-0 mt-1">{formatPrice(totalVentas)}</h3>
                    <small className="text-muted">{ordenes.length} pedidos procesados</small>
                  </div>
                  <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle">
                    <i className="bi bi-cash-stack fs-3"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card bg-dark border-secondary p-3 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small text-uppercase fw-bold">Catálogo Activo</span>
                    <h3 className="fw-bold text-info mb-0 mt-1">{productos.length} items</h3>
                    <small className="text-muted">{totalStockUnidades} unidades en stock</small>
                  </div>
                  <div className="bg-info bg-opacity-10 text-info p-3 rounded-circle">
                    <i className="bi bi-cpu fs-3"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card bg-dark border-secondary p-3 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small text-uppercase fw-bold">Stock Crítico</span>
                    <h3 className={`fw-bold mb-0 mt-1 ${productosCriticos.length > 0 ? "text-danger" : "text-muted"}`}>
                      {productosCriticos.length} alertas
                    </h3>
                    <small className="text-muted">Requieren reposición urgente</small>
                  </div>
                  <div className={`bg-opacity-10 p-3 rounded-circle ${productosCriticos.length > 0 ? "bg-danger text-danger" : "bg-secondary text-secondary"}`}>
                    <i className="bi bi-exclamation-octagon fs-3"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card bg-dark border-secondary p-3 shadow-sm h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small text-uppercase fw-bold">Usuarios Totales</span>
                    <h3 className="fw-bold text-warning mb-0 mt-1">{usuarios.length} cuentas</h3>
                    <small className="text-muted">
                      {usuarios.filter((u) => u.rol === "Administrador").length} admin, {usuarios.filter((u) => u.rol !== "Administrador").length} clientes
                    </small>
                  </div>
                  <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle">
                    <i className="bi bi-person-badge fs-3"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Alertas y Órdenes Recientes */}
          <div className="row g-4">
            {/* Alerta de Stock Crítico */}
            <div className="col-12 col-lg-6">
              <div className="card bg-dark border-secondary h-100 shadow-sm">
                <div className="card-header bg-surface border-secondary d-flex justify-content-between align-items-center">
                  <h5 className="text-light fw-bold mb-0">
                    <i className="bi bi-bell-fill text-danger me-2"></i> Monitoreo de Stock Crítico
                  </h5>
                  <span className="badge bg-danger">{productosCriticos.length} en riesgo</span>
                </div>
                <div className="card-body p-0">
                  {productosCriticos.length === 0 ? (
                    <div className="p-4 text-center text-muted">
                      <i className="bi bi-check-circle-fill text-success fs-2 mb-2 d-block"></i>
                      ¡Excelente! No hay componentes con nivel de stock por debajo del umbral crítico.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="table-secondary small text-uppercase">
                          <tr>
                            <th>Producto</th>
                            <th className="text-center">Stock Actual</th>
                            <th className="text-center">Mínimo</th>
                            <th className="text-end">Reposición</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productosCriticos.map((p) => (
                            <tr key={p.id}>
                              <td className="small fw-semibold text-light">{p.nombre}</td>
                              <td className="text-center">
                                <span className="badge bg-danger">{p.stock} un.</span>
                              </td>
                              <td className="text-center text-muted small">{p.stock_critico || 2} un.</td>
                              <td className="text-end">
                                <div className="btn-group btn-group-sm">
                                  <button
                                    className="btn btn-outline-success"
                                    onClick={() => handleQuickStockAdjustment(p, 5)}
                                    title="Añadir +5 unidades"
                                  >
                                    +5
                                  </button>
                                  <button
                                    className="btn btn-outline-success"
                                    onClick={() => handleQuickStockAdjustment(p, 10)}
                                    title="Añadir +10 unidades"
                                  >
                                    +10
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Órdenes Recientes */}
            <div className="col-12 col-lg-6">
              <div className="card bg-dark border-secondary h-100 shadow-sm">
                <div className="card-header bg-surface border-secondary d-flex justify-content-between align-items-center">
                  <h5 className="text-light fw-bold mb-0">
                    <i className="bi bi-clock-history text-info me-2"></i> Últimas Órdenes Recibidas
                  </h5>
                  <button
                    className="btn btn-link text-info text-decoration-none btn-sm p-0"
                    onClick={() => setActiveTab("ordenes")}
                  >
                    Ver todas →
                  </button>
                </div>
                <div className="card-body p-0">
                  {ordenes.length === 0 ? (
                    <div className="p-4 text-center text-muted">
                      Aún no se registran pedidos en la base de datos.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark table-hover mb-0 align-middle">
                        <thead className="table-secondary small text-uppercase">
                          <tr>
                            <th>Boleta</th>
                            <th>Cliente</th>
                            <th className="text-center">Estado</th>
                            <th className="text-end">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordenes.slice(0, 5).map((o, idx) => (
                            <tr key={o.codigoOrden || idx}>
                              <td className="small text-info fw-bold">#{o.numeroBoleta || o.codigoOrden}</td>
                              <td className="small text-light">
                                {o.cliente?.nombre} {o.cliente?.apellidos}
                              </td>
                              <td className="text-center">
                                <span className={`badge ${
                                  o.estado === "Entregado" ? "bg-success" :
                                  o.estado === "Cancelado" ? "bg-danger" :
                                  o.estado === "En Preparación" ? "bg-warning text-dark" : "bg-primary"
                                }`}>
                                  {o.estado || "Pagado"}
                                </span>
                              </td>
                              <td className="text-end small fw-bold text-light">
                                {formatPrice(o.total)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTENIDO PESTAÑA 2: CRUD DE PRODUCTOS ================= */}
      {activeTab === "productos" && (
        <div data-testid="admin-productos-content">
          <div className="card bg-dark border-secondary p-3 mb-4 shadow-sm">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-secondary border-secondary text-light">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Buscar producto por nombre o código..."
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    data-testid="input-search-products"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <select
                  className="form-select bg-dark text-light border-secondary"
                  value={prodCatFilter}
                  onChange={(e) => setProdCatFilter(e.target.value)}
                >
                  <option value="Todas">Todas las categorías</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <div className="form-check form-switch pt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="chkCritical"
                    checked={onlyCriticalStock}
                    onChange={(e) => setOnlyCriticalStock(e.target.checked)}
                  />
                  <label className="form-check-label text-warning small" htmlFor="chkCritical">
                    Solo stock crítico ({productosCriticos.length})
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-2 text-md-end">
                <button
                  className="btn btn-nexus w-100"
                  onClick={handleOpenCreateProduct}
                  data-testid="btn-create-product"
                >
                  <i className="bi bi-plus-circle me-1"></i> Nuevo Producto
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de Productos */}
          <div className="card bg-dark border-secondary shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0 align-middle">
                  <thead className="table-secondary small text-uppercase">
                    <tr>
                      <th style={{ width: "60px" }}>Img</th>
                      <th>Código</th>
                      <th>Nombre del Componente</th>
                      <th>Categoría</th>
                      <th className="text-end">Precio (CLP)</th>
                      <th className="text-center">Stock</th>
                      <th className="text-center">Oferta</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          No se encontraron productos con los criterios ingresados.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => {
                        const isLow = Number(p.stock) <= Number(p.stock_critico);
                        return (
                          <tr key={p.id} data-testid={`prod-row-${p.id}`}>
                            <td>
                              <img
                                src={p.imagenUrl}
                                alt={p.nombre}
                                className="rounded border border-secondary"
                                style={{ width: "42px", height: "42px", objectFit: "contain", backgroundColor: "#0f172a" }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://placehold.co/100x100/1e293b/a78bfa?text=HN";
                                }}
                              />
                            </td>
                            <td className="small text-muted font-monospace">{p.id}</td>
                            <td>
                              <div className="fw-semibold text-light small">{p.nombre}</div>
                              <small className="text-muted d-block text-truncate" style={{ maxWidth: "260px" }}>
                                {p.especificaciones || p.descripcion}
                              </small>
                            </td>
                            <td>
                              <span className="badge bg-secondary">{p.categoria}</span>
                            </td>
                            <td className="text-end small">
                              {p.enOferta && p.precioOferta ? (
                                <div>
                                  <span className="text-info fw-bold">{formatPrice(p.precioOferta)}</span>
                                  <small className="text-muted text-decoration-line-through d-block">
                                    {formatPrice(p.precio)}
                                  </small>
                                </div>
                              ) : (
                                <span className="text-light fw-bold">{formatPrice(p.precio)}</span>
                              )}
                            </td>
                            <td className="text-center">
                              <div className="d-flex align-items-center justify-content-center gap-1">
                                <button
                                  className="btn btn-sm btn-outline-secondary py-0 px-1"
                                  onClick={() => handleQuickStockAdjustment(p, -1)}
                                  disabled={p.stock <= 0}
                                  title="Restar 1"
                                >
                                  -
                                </button>
                                <span className={`badge ${isLow ? "bg-danger" : "bg-success"} px-2`}>
                                  {p.stock}
                                </span>
                                <button
                                  className="btn btn-sm btn-outline-secondary py-0 px-1"
                                  onClick={() => handleQuickStockAdjustment(p, 1)}
                                  title="Sumar 1"
                                >
                                  +
                                </button>
                              </div>
                              {isLow && <span className="text-danger extra-small d-block mt-1">Crítico!</span>}
                            </td>
                            <td className="text-center">
                              {p.enOferta ? (
                                <span className="badge bg-danger">OFERTA</span>
                              ) : (
                                <span className="text-muted small">—</span>
                              )}
                            </td>
                            <td className="text-end">
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-outline-info"
                                  onClick={() => handleOpenEditProduct(p)}
                                  data-testid={`btn-edit-prod-${p.id}`}
                                  title="Editar producto"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleDeleteProduct(p.id, p.nombre)}
                                  data-testid={`btn-delete-prod-${p.id}`}
                                  title="Eliminar producto"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTENIDO PESTAÑA 3: CRUD DE CATEGORÍAS ================= */}
      {activeTab === "categorias" && (
        <div data-testid="admin-categorias-content">
          <div className="row g-4">
            {/* Formulario Agregar Categoría */}
            <div className="col-12 col-md-5">
              <div className="card bg-dark border-secondary shadow-sm p-4">
                <h5 className="fw-bold text-light mb-3">
                  <i className="bi bi-folder-plus text-info me-2"></i> Crear Nueva Categoría
                </h5>
                <p className="text-muted small mb-3">
                  Las categorías permiten organizar el catálogo en la tienda y facilitan la navegación de los clientes.
                </p>
                <form onSubmit={handleAddCategory}>
                  <div className="mb-3">
                    <label className="form-label text-light small fw-semibold">Nombre de la Categoría *</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="Ej: Refrigeración Líquida"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      data-testid="input-new-category"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-nexus w-100" data-testid="btn-add-category">
                    <i className="bi bi-check-lg me-1"></i> Guardar Categoría
                  </button>
                </form>
              </div>
            </div>

            {/* Listado de Categorías */}
            <div className="col-12 col-md-7">
              <div className="card bg-dark border-secondary shadow-sm">
                <div className="card-header bg-surface border-secondary d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold text-light mb-0">Categorías Registradas</h5>
                  <span className="badge bg-secondary">{categorias.length} activas</span>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0 align-middle">
                      <thead className="table-secondary small text-uppercase">
                        <tr>
                          <th>Nombre</th>
                          <th className="text-center">Productos Asociados</th>
                          <th className="text-end">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categorias.map((cat) => {
                          const count = productos.filter((p) => p.categoria === cat).length;
                          const meta = getCategoryIconData(cat);
                          return (
                            <tr key={cat}>
                              <td className="fw-semibold text-light">
                                <i className={`bi ${meta.icon} me-2`} style={{ color: meta.color }}></i> {cat}
                              </td>
                              <td className="text-center">
                                <span className="badge bg-info text-dark">{count} items</span>
                              </td>
                              <td className="text-end">
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDeleteCategory(cat)}
                                  title="Eliminar categoría"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTENIDO PESTAÑA 4: GESTIÓN DE ÓRDENES ================= */}
      {activeTab === "ordenes" && (
        <div data-testid="admin-ordenes-content">
          <div className="card bg-dark border-secondary p-3 mb-4 shadow-sm">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-5">
                <div className="input-group">
                  <span className="input-group-text bg-secondary border-secondary text-light">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Buscar por boleta, código o cliente..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    data-testid="input-search-orders"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <select
                  className="form-select bg-dark text-light border-secondary"
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                >
                  <option value="Todos">Todos los Estados</option>
                  <option value="Pagado">Pagado</option>
                  <option value="En Preparación">En Preparación</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
              <div className="col-12 col-md-3 text-md-end text-muted small">
                Mostrando {filteredOrders.length} de {ordenes.length} órdenes
              </div>
            </div>
          </div>

          {/* Tabla de Órdenes */}
          <div className="card bg-dark border-secondary shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0 align-middle">
                  <thead className="table-secondary small text-uppercase">
                    <tr>
                      <th>Boleta</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Ubicación</th>
                      <th className="text-center">Items</th>
                      <th className="text-end">Total</th>
                      <th className="text-center">Estado del Pedido</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          No se encontraron órdenes registradas.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o, idx) => (
                        <tr key={o.codigoOrden || idx} data-testid={`order-row-${o.codigoOrden || o.numeroBoleta}`}>
                          <td className="small text-info fw-bold">#{o.numeroBoleta || o.codigoOrden}</td>
                          <td className="small text-muted">{o.fecha || "Reciente"}</td>
                          <td className="small">
                            <div className="fw-semibold text-light">{o.cliente?.nombre} {o.cliente?.apellidos}</div>
                            <small className="text-muted">{o.cliente?.correo}</small>
                          </td>
                          <td className="small text-muted">
                            {o.despacho?.comuna}, {o.despacho?.region}
                          </td>
                          <td className="text-center small">
                            <span className="badge bg-secondary">
                              {(o.items || []).reduce((acc, i) => acc + (i.cantidad || 1), 0)} items
                            </span>
                          </td>
                          <td className="text-end fw-bold text-success small">
                            {formatPrice(o.total)}
                          </td>
                          <td className="text-center">
                            <select
                              className="form-select form-select-sm bg-dark text-light border-secondary"
                              style={{ width: "150px", margin: "0 auto" }}
                              value={o.estado || "Pagado"}
                              onChange={(e) => handleUpdateOrderStatus(o.codigoOrden || o.numeroBoleta, e.target.value)}
                              data-testid={`select-status-${o.codigoOrden || o.numeroBoleta}`}
                            >
                              <option value="Pagado">Pagado</option>
                              <option value="En Preparación">En Preparación</option>
                              <option value="Enviado">Enviado</option>
                              <option value="Entregado">Entregado</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>
                          </td>
                          <td className="text-end">
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-info"
                                onClick={() => setSelectedOrder(o)}
                                data-testid={`btn-view-order-${o.codigoOrden || o.numeroBoleta}`}
                                title="Ver detalle de boleta"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteOrder(o.codigoOrden || o.numeroBoleta)}
                                title="Eliminar orden"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTENIDO PESTAÑA 5: CRUD DE USUARIOS ================= */}
      {activeTab === "usuarios" && (
        <div data-testid="admin-usuarios-content">
          <div className="card bg-dark border-secondary p-3 mb-4 shadow-sm">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-secondary border-secondary text-light">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Buscar usuario por nombre, correo, RUN o rol..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    data-testid="input-search-users"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 text-md-end">
                <button
                  className="btn btn-nexus"
                  onClick={handleOpenCreateUser}
                  data-testid="btn-create-user"
                >
                  <i className="bi bi-person-plus-fill me-1"></i> Registrar Nuevo Usuario
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de Usuarios */}
          <div className="card bg-dark border-secondary shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0 align-middle">
                  <thead className="table-secondary small text-uppercase">
                    <tr>
                      <th>RUN</th>
                      <th>Nombre y Apellidos</th>
                      <th>Correo Electrónico</th>
                      <th className="text-center">Rol Asignado</th>
                      <th>Ubicación</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => {
                      const isCurrent = currentUser?.id === u.id;
                      return (
                        <tr key={u.id || u.correo} data-testid={`user-row-${u.id}`}>
                          <td className="small text-muted font-monospace">{u.run || "N/A"}</td>
                          <td className="small fw-semibold text-light">
                            {u.nombre} {u.apellidos}
                            {isCurrent && <span className="badge bg-primary ms-2">Tú</span>}
                          </td>
                          <td className="small text-info">{u.correo}</td>
                          <td className="text-center">
                            <span
                              className={`badge ${
                                u.rol === "Administrador"
                                  ? "bg-warning text-dark fw-bold"
                                  : "bg-secondary text-light"
                              }`}
                            >
                              {u.rol}
                            </span>
                          </td>
                          <td className="small text-muted">
                            {u.comuna || "N/A"}, {u.region || "Chile"}
                          </td>
                          <td className="text-end">
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-warning"
                                onClick={() => handleToggleUserRole(u)}
                                disabled={isCurrent}
                                title={u.rol === "Administrador" ? "Cambiar a Cliente" : "Hacer Administrador"}
                                data-testid={`btn-toggle-role-${u.id}`}
                              >
                                <i className="bi bi-arrow-repeat me-1"></i> Rol
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteUser(u)}
                                disabled={isCurrent || u.correo === "admin@hardwarenexus.com"}
                                title="Eliminar usuario"
                                data-testid={`btn-delete-user-${u.id}`}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CREAR / EDITAR PRODUCTO ================= */}
      {showProductModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1050 }}
          tabIndex="-1"
          data-testid="modal-product"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark border-secondary text-light">
              <div className="modal-header border-secondary">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-box-seam text-info me-2"></i>
                  {editingProduct ? "Editar Producto" : "Nuevo Componente en Catálogo"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowProductModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveProduct}>
                <div className="modal-body">
                  {productFormError && (
                    <div className="alert alert-danger py-2 small mb-3">{productFormError}</div>
                  )}

                  <div className="row g-3">
                    <div className="col-12 col-md-8">
                      <label className="form-label small fw-semibold">Nombre del Componente *</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Ej: Procesador Intel Core i5-14400F"
                        value={productForm.nombre}
                        onChange={(e) => setProductForm({ ...productForm, nombre: e.target.value })}
                        data-testid="input-prod-nombre"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-semibold">Categoría *</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        value={productForm.categoria}
                        onChange={(e) => setProductForm({ ...productForm, categoria: e.target.value })}
                        data-testid="select-prod-categoria"
                      >
                        {categorias.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-semibold">Precio Normal (CLP) *</label>
                      <input
                        type="number"
                        min="1"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="199990"
                        value={productForm.precio}
                        onChange={(e) => setProductForm({ ...productForm, precio: e.target.value })}
                        data-testid="input-prod-precio"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-semibold">Stock Disponible *</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="10"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                        data-testid="input-prod-stock"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label small fw-semibold">Stock Crítico (Alerta) *</label>
                      <input
                        type="number"
                        min="1"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="3"
                        value={productForm.stock_critico}
                        onChange={(e) => setProductForm({ ...productForm, stock_critico: e.target.value })}
                        data-testid="input-prod-stock-critico"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="modalProdEnOferta"
                          checked={productForm.enOferta}
                          onChange={(e) => setProductForm({ ...productForm, enOferta: e.target.checked })}
                          data-testid="input-prod-enOferta"
                        />
                        <label className="form-check-label text-warning small fw-semibold" htmlFor="modalProdEnOferta">
                          Activar precio especial de oferta
                        </label>
                      </div>
                    </div>

                    {productForm.enOferta && (
                      <div className="col-12 col-md-6">
                        <label className="form-label small fw-semibold text-warning">Precio de Oferta (CLP) *</label>
                        <input
                          type="number"
                          min="1"
                          className="form-control bg-dark text-warning border-warning"
                          placeholder="179990"
                          value={productForm.precioOferta}
                          onChange={(e) => setProductForm({ ...productForm, precioOferta: e.target.value })}
                          data-testid="input-prod-precioOferta"
                          required={productForm.enOferta}
                        />
                      </div>
                    )}

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Ruta / URL de Imagen</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="/assets/images/cpu/Procesador AMD Ryzen 5 5500.jpg"
                        value={productForm.imagenUrl}
                        onChange={(e) => setProductForm({ ...productForm, imagenUrl: e.target.value })}
                        data-testid="input-prod-imagenUrl"
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Descripción Comercial</label>
                      <textarea
                        rows="2"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Breve reseña del componente, compatibilidad y ventajas."
                        value={productForm.descripcion}
                        onChange={(e) => setProductForm({ ...productForm, descripcion: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Especificaciones Técnicas</label>
                      <textarea
                        rows="2"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Socket, frecuencia, memoria, puertos, dimensiones."
                        value={productForm.especificaciones}
                        onChange={(e) => setProductForm({ ...productForm, especificaciones: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowProductModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" data-testid="btn-save-product">
                    <i className="bi bi-save me-1"></i> Guardar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: DETALLE DE BOLETA / ORDEN ================= */}
      {selectedOrder && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1050 }}
          tabIndex="-1"
          data-testid="modal-order-detail"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark border-secondary text-light">
              <div className="modal-header border-secondary">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-receipt-cutoff text-info me-2"></i>
                  Detalle de Orden #{selectedOrder.numeroBoleta || selectedOrder.codigoOrden}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <h6 className="text-info fw-bold mb-2">Datos del Cliente</h6>
                    <p className="small mb-1">
                      <strong>Nombre:</strong> {selectedOrder.cliente?.nombre} {selectedOrder.cliente?.apellidos}
                    </p>
                    <p className="small mb-1">
                      <strong>Correo:</strong> {selectedOrder.cliente?.correo}
                    </p>
                    <p className="small mb-1">
                      <strong>Fecha:</strong> {selectedOrder.fecha || "N/A"}
                    </p>
                    <p className="small mb-0">
                      <strong>Método de Pago:</strong> <span className="text-uppercase badge bg-secondary">{selectedOrder.metodoPago || "Webpay"}</span>
                    </p>
                  </div>
                  <div className="col-12 col-md-6">
                    <h6 className="text-info fw-bold mb-2">Dirección de Despacho</h6>
                    <p className="small mb-1">
                      <strong>Dirección:</strong> {selectedOrder.despacho?.calle} {selectedOrder.despacho?.depto || ""}
                    </p>
                    <p className="small mb-1">
                      <strong>Comuna/Región:</strong> {selectedOrder.despacho?.comuna}, {selectedOrder.despacho?.region}
                    </p>
                    <p className="small mb-0 fst-italic text-muted">
                      <strong>Indicaciones:</strong> {selectedOrder.despacho?.indicaciones || "Ninguna."}
                    </p>
                  </div>
                </div>

                <h6 className="text-info fw-bold mb-3">Productos Comprados</h6>
                <div className="table-responsive border border-secondary rounded">
                  <table className="table table-dark table-hover mb-0 align-middle">
                    <thead className="table-secondary small text-uppercase">
                      <tr>
                        <th>Producto</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedOrder.items || []).map((item, idx) => (
                        <tr key={item.id || idx}>
                          <td className="small fw-semibold">{item.nombre}</td>
                          <td className="text-center small text-info">{formatPrice(item.precio)}</td>
                          <td className="text-center small">{item.cantidad}</td>
                          <td className="text-end small fw-bold text-light">
                            {formatPrice((item.precio || 0) * (item.cantidad || 1))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
                  <div>
                    <span className="text-muted small">Estado actual: </span>
                    <span className="badge bg-primary fs-6">{selectedOrder.estado || "Pagado"}</span>
                  </div>
                  <div className="fs-5 fw-bold text-light">
                    Total: <span className="text-info">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() => setSelectedOrder(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: REGISTRAR NUEVO USUARIO ================= */}
      {showUserModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1050 }}
          tabIndex="-1"
          data-testid="modal-user"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark border-secondary text-light">
              <div className="modal-header border-secondary">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-person-plus-fill text-info me-2"></i> Registrar Usuario en el Sistema
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowUserModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveUser}>
                <div className="modal-body">
                  {userFormError && <div className="alert alert-danger py-2 small mb-3">{userFormError}</div>}

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Nombre *</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        value={userForm.nombre}
                        onChange={(e) => setUserForm({ ...userForm, nombre: e.target.value })}
                        data-testid="input-user-nombre"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Apellidos *</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        value={userForm.apellidos}
                        onChange={(e) => setUserForm({ ...userForm, apellidos: e.target.value })}
                        data-testid="input-user-apellidos"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Correo Electrónico *</label>
                      <input
                        type="email"
                        className="form-control bg-dark text-light border-secondary"
                        value={userForm.correo}
                        onChange={(e) => setUserForm({ ...userForm, correo: e.target.value })}
                        data-testid="input-user-correo"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">RUN / Cédula</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="19876543-2"
                        value={userForm.run}
                        onChange={(e) => setUserForm({ ...userForm, run: e.target.value })}
                        data-testid="input-user-run"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Contraseña Inicial</label>
                      <input
                        type="password"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Mínimo 6 caracteres"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        data-testid="input-user-password"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Rol Asignado *</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        value={userForm.rol}
                        onChange={(e) => setUserForm({ ...userForm, rol: e.target.value })}
                        data-testid="select-user-rol"
                      >
                        <option value="Cliente">Cliente</option>
                        <option value="Administrador">Administrador</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Región</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        value={userForm.region}
                        onChange={(e) => {
                          const reg = e.target.value;
                          const comunas = getComunasPorRegion(reg);
                          setUserForm({
                            ...userForm,
                            region: reg,
                            comuna: comunas[0] || "Santiago"
                          });
                        }}
                      >
                        {REGIONES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label small fw-semibold">Comuna</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        value={userForm.comuna}
                        onChange={(e) => setUserForm({ ...userForm, comuna: e.target.value })}
                      >
                        {getComunasPorRegion(userForm.region).map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowUserModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" data-testid="btn-save-user">
                    <i className="bi bi-person-check-fill me-1"></i> Guardar Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortalView;
