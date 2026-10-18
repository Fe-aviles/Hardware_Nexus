# Especificación de Requerimientos de Software (ERS) - Versión 2.0

## Proyecto: Hardware Nexus - Plataforma E-Commerce de Hardware y Computación de Alto Rendimiento

---

### Control de Versiones

| Versión | Fecha | Autor(es) | Descripción del Cambio |
| :--- | :--- | :--- | :--- |
| **1.0** | 17/10/2026 | Equipo de Desarrollo Hardware Nexus | Versión Inicial: Catálogo de productos, filtrado por categorías, ofertas, carrito de compras, persistencia en LocalStorage y suite de pruebas unitarias 1 a 5. |
| **2.0** | 18/10/2026 | Equipo de Desarrollo Hardware Nexus | Versión Mayor: Módulos de autenticación (Login, Registro con validación de RUN chileno, Perfil), flujo completo de Checkout y pasarela de pago (Boleta electrónica, Pago Exitoso y Pago Fallido con reintento), Portal Administrativo completo (Dashboard con KPIs, CRUD de productos, categorías, órdenes y usuarios) y suite de pruebas unitarias 6 a 10. |

---

## 1. Introducción

### 1.1 Propósito
El propósito del presente documento es definir de forma exhaustiva los requerimientos funcionales y no funcionales de la plataforma web **Hardware Nexus (Versión 2.0)**. Este documento sirve como contrato técnico y guía arquitectónica para desarrolladores, evaluadores de calidad y docentes en el marco de la asignatura de **Desarrollo Fullstack II** (Evaluación 2).

### 1.2 Alcance del Sistema
**Hardware Nexus** es una Single Page Application (SPA) orientada a la comercialización de componentes de hardware informático y periféricos gamer de alto rendimiento. La plataforma permite la exploración interactiva de productos, cálculo automático de cotizaciones y despachos a lo largo de las regiones y comunas de Chile, autenticación de usuarios con gestión de perfiles, un flujo integral de pago con boleta electrónica descargable/imprimible, y un panel de administración centralizado que otorga control absoluto sobre el inventario, productos, categorías, órdenes de compra y usuarios.

### 1.3 Personal Involucrado y Destinatarios
* **Clientes Gamer / Compradores:** Usuarios finales que buscan adquirir componentes y armar computadores.
* **Administradores de Tienda:** Personal encargado del control de stock, reposición de inventario crítico, despacho de pedidos y auditoría de usuarios.
* **Equipo de Desarrollo e Integración:** Desarrolladores front-end responsables de la interfaz, contextos de estado y pruebas unitarias.
* **Docente Evaluador:** Revisor del cumplimiento de los estándares de desarrollo, pruebas unitarias y requerimientos del proyecto.

### 1.4 Definiciones, Acrónimos y Abreviaturas
* **SPA:** Single Page Application (Aplicación de Página Única).
* **CLP:** Peso Chileno (moneda oficial del sistema).
* **RUN:** Rol Único Nacional (identificador tributario de la República de Chile).
* **CRUD:** Create, Read, Update, Delete (Operaciones de persistencia básica).
* **KPI:** Key Performance Indicator (Indicador clave de rendimiento comercial).
* **TDD / BDD:** Test-Driven Development / Behavior-Driven Development.

---

## 2. Descripción General del Sistema

### 2.1 Perspectiva del Producto
Hardware Nexus opera como un ecosistema cliente-servidor desacoplado. En esta fase de desarrollo (V2.0), la capa de presentación y lógica de negocio reside en una aplicación SPA construida con **React 19**, **Vite** y **Bootstrap 5**, utilizando una capa de almacenamiento local persistente y resiliente simulada en **LocalStorage** a través del servicio centralizado `storageService.js`.

### 2.2 Arquitectura y Componentes del Sistema
```
                        +---------------------------------------+
                        |           HARDWARE NEXUS              |
                        |      (React 19 + Bootstrap 5)         |
                        +---------------------------------------+
                                           |
                   +-----------------------+-----------------------+
                   |                                               |
        [ Contextos de Estado ]                         [ Vistas de la App ]
     - AuthContext (Sesión / Roles)              - HomeView (Catálogo / Búsqueda)
     - CartContext (Carrito / Toast)             - CategoriesView / OffersView
                   |                             - ProductDetailView
                   |                             - CartView / CheckoutView
                   |                             - PaymentSuccess / Failed
                   |                             - LoginView / RegisterView
                   |                             - ProfileView (Mi Cuenta)
                   |                             - AdminPortalView (Dashboard & CRUDs)
                   |                                               |
                   +-----------------------+-----------------------+
                                           |
                                [ storageService.js ]
                     (Capa de Persistencia Unificada y Mocks)
                                           |
                                 [ window.localStorage ]
```

### 2.3 Características de los Usuarios
1. **Visitante / Invitado:** Puede explorar el catálogo, buscar componentes, filtrar por categorías u ofertas, ver fichas técnicas y simular compras en el carrito.
2. **Cliente Registrado:** Posee una cuenta con datos personales validados (RUN, dirección, comuna y región de Chile). Al iniciar sesión, el sistema autorrellena de manera instantánea sus datos en el proceso de Checkout y le permite editar su perfil.
3. **Administrador:** Dispone de credenciales maestras (`admin@hardwarenexus.com` / `admin`). Tiene acceso exclusivo a la ruta `/admin` para supervisar el dashboard ejecutivo, recibir alertas de stock crítico, modificar precios y stock, gestionar categorías, actualizar el estado de los despachos y administrar los roles de los usuarios.

---

## 3. Requerimientos Específicos

### 3.1 Requerimientos Funcionales (RF)

#### Módulo 1: Catálogo y Experiencia de Usuario (Parte 1)
* **RF-01: Visualización del Catálogo de Productos**
  * **Descripción:** El sistema debe mostrar el listado completo de productos informáticos con su nombre, imagen ilustrativa, precio en CLP, stock disponible y categoría.
  * **Prioridad:** Alta.
* **RF-02: Búsqueda y Filtrado Dinámico**
  * **Descripción:** Los usuarios deben poder buscar componentes en tiempo real por término de texto y filtrar la vista según la categoría seleccionada.
  * **Prioridad:** Alta.
* **RF-03: Módulo de Ofertas Especiales**
  * **Descripción:** El sistema debe proveer una vista dedicada (`/ofertas`) que filtre automáticamente los productos con bandera `enOferta === true`, exhibiendo el precio normal tachado y el precio de oferta destacado.
  * **Prioridad:** Media.
* **RF-04: Ficha Detallada de Producto**
  * **Descripción:** Al seleccionar un producto, el sistema debe desplegar su vista de detalle (`/producto/:id`) con especificaciones técnicas completas, indicador de stock y selector de cantidad para añadir al carrito.
  * **Prioridad:** Alta.
* **RF-05: Gestión de Carrito de Compras**
  * **Descripción:** El usuario debe poder agregar productos, incrementar/decrementar cantidades, eliminar ítems y vaciar el carrito. El estado debe sincronizarse en LocalStorage y notificar mediante toasts flotantes.
  * **Prioridad:** Alta.
* **RF-06: Formulario de Contacto y Soporte**
  * **Descripción:** Vista accesible (`/contacto`) que permita enviar mensajes de consulta técnica con validación de campos obligatorios.
  * **Prioridad:** Baja.

#### Módulo 2: Autenticación, Registro y Perfil (Parte 2)
* **RF-07: Inicio de Sesión (Login)**
  * **Descripción:** Permite a clientes y administradores autenticarse ingresando su correo electrónico y contraseña. Al validar las credenciales, el sistema guarda la sesión sanitizada (sin contraseña expuesta) en LocalStorage.
  * **Prioridad:** Alta.
* **RF-08: Registro de Nuevos Usuarios**
  * **Descripción:** Formulario de alta de cuentas de usuario con validación estricta de RUN chileno (módulo 11), nombres, apellidos, correo único, contraseña segura y selección geográfica de Región y Comuna según la división política de Chile.
  * **Prioridad:** Alta.
* **RF-09: Gestión de Perfil de Usuario**
  * **Descripción:** El usuario con sesión iniciada puede acceder a `/perfil` para consultar sus datos personales, modificar su dirección, región y comuna, y actualizar su información de despacho.
  * **Prioridad:** Media.

#### Módulo 3: Checkout, Pasarela y Facturación (Parte 2)
* **RF-10: Proceso de Checkout con Autorrelleno**
  * **Descripción:** Al ingresar a `/checkout` con artículos en el carrito, si el usuario está autenticado, sus datos (nombre, apellidos, correo, dirección, región y comuna) deben autorrellenarse automáticamente, permitiendo modificarlos o completarlos si es invitado.
  * **Prioridad:** Alta.
* **RF-11: Simulación de Transacción y Emisión de Boleta**
  * **Descripción:** El sistema simula la pasarela de pagos (Webpay, Transferencia o Crédito Directo). En caso de éxito, emite un número de boleta y código de orden único, descuenta el stock del inventario, vacía el carrito y permite imprimir la boleta en PDF o enviarla por correo electrónico. Incluye interruptor para simular pago fallido con opción de reintento.
  * **Prioridad:** Alta.

#### Módulo 4: Portal y Gestión Administrativa (Parte 2 - Hito 2)
* **RF-12: Dashboard Ejecutivo y Métricas Centrales**
  * **Descripción:** El panel administrativo (`/admin`) debe desplegar tarjetas KPI con ventas totales en CLP, número de pedidos procesados, total de productos en catálogo, alertas de inventario crítico y usuarios registrados.
  * **Prioridad:** Alta.
* **RF-13: CRUD Completo de Productos e Inventario Crítico**
  * **Descripción:** El administrador puede listar, buscar, crear, editar y eliminar componentes. La interfaz debe alertar visualmente cuando un producto tiene un stock menor o igual a su `stock_critico` y proveer botones de reposición rápida (+5, +10 unidades).
  * **Prioridad:** Alta.
* **RF-14: CRUD de Categorías de Catálogo**
  * **Descripción:** Permite crear nuevas categorías dinámicas, visualizar la cantidad de productos asociados a cada una y eliminarlas cuando sea pertinente.
  * **Prioridad:** Media.
* **RF-15: Gestión de Órdenes de Compra y Roles de Usuario**
  * **Descripción:** El administrador puede revisar el listado cronológico de órdenes, inspeccionar la boleta detallada con datos de despacho, y cambiar en tiempo real el estado del pedido ("Pagado", "En Preparación", "Enviado", "Entregado", "Cancelado"). Además, puede gestionar las cuentas de usuario y alternar sus roles (Cliente / Administrador).
  * **Prioridad:** Alta.

---

### 3.2 Requerimientos No Funcionales (RNF)

* **RNF-01: Rendimiento y Velocidad de Carga**
  * La aplicación debe inicializar en menos de 1.5 segundos en conexiones de banda ancha estándar gracias a la optimización de módulos provista por Vite.
* **RNF-02: Usabilidad y Estética Visual (Dark Theme Gamer)**
  * La interfaz debe aplicar una paleta de colores coherente y moderna (tema oscuro `#0f172a`, acentos violeta `#7c3aed` y azul cian `#38bdf8`), con tipografía moderna *Plus Jakarta Sans*, micro-animaciones en tarjetas y botones, y diseño adaptativo (*Mobile First*) mediante Bootstrap 5.
* **RNF-03: Persistencia y Resiliencia en LocalStorage**
  * Todas las operaciones CRUD deben persistirse en `window.localStorage` bajo claves namespaceadas (`nexus_*`). El sistema debe inicializarse de forma autónoma con datos semilla (*seeds*) si el almacenamiento está vacío.
* **RNF-04: Compatibilidad Multiplataforma**
  * El sistema debe ejecutarse de forma impecable en los navegadores Chrome, Firefox, Safari y Edge, así como en entornos de prueba automatizados headless (ChromeHeadless y Vitest/jsdom).
* **RNF-05: Seguridad y Sanitización de Credenciales**
  * La contraseña del usuario nunca debe persistirse en los objetos de sesión activa (`nexus_sesion`). El acceso a `/admin` debe ser restringido estrictamente para usuarios con rol `Administrador`.
* **RNF-06: Mantenibilidad y Calidad de Código**
  * El código base debe cumplir con las directrices de limpieza del linter Oxlint, estructurándose en componentes desacoplados, servicios de almacenamiento aislados y contextos de React.
* **RNF-07: Cobertura de Pruebas Unitarias**
  * El sistema debe contar con un mínimo de 10 pruebas unitarias automatizadas con Jasmine y Vitest que validen renderizado, formato de divisa, cálculo de estado, persistencia CRUD, autenticación, control de stock y gestión administrativa.

---

## 4. Matriz de Trazabilidad de Requerimientos

| Requerimiento | Vista / Componente React | Servicio / Contexto | Caso de Prueba Asociado |
| :--- | :--- | :--- | :--- |
| **RF-01** | `HomeView.jsx`, `ProductCard.jsx` | `storageService.getProductos` | **Test 1:** Renderizado Catálogo |
| **RF-02** | `CategoriesView.jsx`, `Navbar.jsx` | `storageService.getCategorias` | **Test 1 & Test 10** |
| **RF-03** | `OffersView.jsx` | `storageService.getProductos` | **Test 1** |
| **RF-04** | `ProductDetailView.jsx` | `storageService.getProductoById` | **Test 1 & Test 5** |
| **RF-05** | `CartView.jsx`, `Navbar.jsx` | `CartContext.jsx`, `storageService` | **Test 3 & Test 4:** Carrito |
| **RF-06** | `ContactView.jsx` | `useState` local | Verificación Funcional |
| **RF-07** | `LoginView.jsx` | `AuthContext.jsx`, `storageService` | **Test 6:** Autenticación / Mock |
| **RF-08** | `RegisterView.jsx` | `AuthContext.jsx`, `chileData.js` | **Test 7:** Registro y RUN |
| **RF-09** | `ProfileView.jsx` | `AuthContext.jsx`, `storageService` | **Test 8:** Modificación Usuario |
| **RF-10** | `CheckoutView.jsx` | `CartContext.jsx`, `AuthContext.jsx`| **Test 9:** Descuento de Stock |
| **RF-11** | `PaymentSuccessView.jsx`, `PaymentFailedView.jsx` | `storageService.saveOrden` | **Test 9:** Emisión de Órdenes |
| **RF-12** | `AdminPortalView.jsx` (Dashboard) | `storageService.getOrdenes` | **Test 9 & Test 10** |
| **RF-13** | `AdminPortalView.jsx` (Productos) | `storageService` (CRUD Productos) | **Test 5:** CRUD de Productos |
| **RF-14** | `AdminPortalView.jsx` (Categorías) | `storageService` (CRUD Categorías) | **Test 10:** Gestión Categorías |
| **RF-15** | `AdminPortalView.jsx` (Órdenes/Usuarios) | `storageService` (CRUD Órdenes/Users)| **Test 8 & Test 10:** Admin CRUD |

---

## 5. Conclusiones
La Especificación de Requerimientos de Software Versión 2.0 consolida el desarrollo integral de la plataforma **Hardware Nexus**, cubriendo la totalidad de los objetivos fijados para la Evaluación 2 de Desarrollo Fullstack II, integrando comercio electrónico moderno, diseño de alta fidelidad, robustez en la gestión de estado y verificación exhaustiva mediante testing automatizado.
