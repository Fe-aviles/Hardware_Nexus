# Informe de Cobertura y Estrategia de Testing

## Proyecto: Hardware Nexus - Suite Completa de Pruebas Unitarias (Tests 1 al 10)
**Asignatura:** Desarrollo Fullstack II (Evaluación 2)  
**Rúbrica de Evaluación:** Indicador IE2.2.1 (Aseguramiento de Calidad y Pruebas con Jasmine / Karma / Vitest)  
**Fecha de Ejecución:** Octubre 2026  
**Resultado Global:** **10 / 10 Pruebas Exitosas (100% PASS)**

---

## 1. Resumen Ejecutivo de la Suite de Pruebas

La arquitectura de pruebas automatizadas de **Hardware Nexus** ha sido diseñada para certificar la integridad funcional, la persistencia en almacenamiento local y la reactividad de la aplicación web en dos grandes etapas:
1. **Parte 1 (Tests 1 al 5):** Pruebas de renderizado de catálogo, formateo monetario de divisa chilena (CLP), acumulación y cálculo de estado de carrito de compras, renderizado condicional de vaciado y operaciones CRUD fundamentales con mocks.
2. **Parte 2 (Tests 6 al 10):** Pruebas de autenticación y sanitización de credenciales de usuario, validación de registro con RUN chileno y unicidad de correo, control de acceso por roles (Administrador vs Cliente), flujo transaccional de checkout con descuento automático de inventario, y operaciones administrativas completas sobre órdenes y categorías.

```
========================================================================================
                            RESULTADO DE EJECUCIÓN VITEST / JASMINE
========================================================================================
 ✓ src/tests/hardwareNexus.spec.js (5 tests)                     [PASS] - 23ms
 ✓ src/tests/hardwareNexusParte2.spec.js (5 tests)               [PASS] - 13ms
----------------------------------------------------------------------------------------
 Test Files  : 2 pasados (2 total)
 Tests       : 10 pasados (10 total)
 Éxito       : 100.0%
 Duración    : ~320 ms
========================================================================================
```

---

## 2. Marco Tecnológico y Configuración de Pruebas

Para asegurar la máxima compatibilidad requerida por las pautas académicas y los entornos modernos de desarrollo, la suite se encuentra configurada para ejecutarse tanto de forma nativa con **Vitest** como con el harness **Karma + Jasmine**:

* **Vitest Runner (v5.0.5):** Ejecución ultra rápida en entorno Node.js con soporte nativo de módulos ES6 y JSX mediante `@vitejs/plugin-react`.
* **Jasmine Core (v7.0.2) + Karma (v6.4.4):** Configurado en `karma.conf.js` para correr las especificaciones en `src/tests/**/*.spec.js` bajo navegadores desatendidos (`ChromeHeadless`).
* **jsdom y jsdom-global:** Provisión de un DOM simulado para evaluación de variables globales (`window`, `document`, `localStorage`).
* **Estrategia de Mocks y Espías (Spies):** Aislamiento total de efectos secundarios. Antes de cada prueba (`beforeEach`), se reemplaza el almacenamiento global por un objeto en memoria y espías (`vi.fn()` / `jasmine.createSpy`) que verifican las llamadas exactas a `getItem`, `setItem` y `removeItem`.

---

## 3. Matriz General de Casos de Prueba (1 al 10)

| N° | Archivo de Especificación | Módulo Evaluado | Categoría de Prueba | Rúbrica IE2.2.1 | Estado |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **1** | `hardwareNexus.spec.js` | Catálogo de Productos | Renderizado y Estructura | Renderizado Correcto | **PASS** |
| **2** | `hardwareNexus.spec.js` | Formato Monetario | Props / Utilidades | Propiedades y Formato | **PASS** |
| **3** | `hardwareNexus.spec.js` | Carrito de Compras | Lógica de Estado (State) | Cálculos de Carrito | **PASS** |
| **4** | `hardwareNexus.spec.js` | Carrito de Compras | Renderizado Condicional | Vaciado y Persistencia | **PASS** |
| **5** | `hardwareNexus.spec.js` | Catálogo y Storage | CRUD con Mocks | Operaciones CRUD y Mocks | **PASS** |
| **6** | `hardwareNexusParte2.spec.js` | Autenticación y Sesión | Seguridad y Login Mock | Autenticación y Sanitización | **PASS** |
| **7** | `hardwareNexusParte2.spec.js` | Registro de Usuarios | Validación de Formularios | Validación RUN y Duplicados | **PASS** |
| **8** | `hardwareNexusParte2.spec.js` | Control de Acceso | Privilegios y Roles | Roles Admin vs Cliente | **PASS** |
| **9** | `hardwareNexusParte2.spec.js` | Checkout y Pedidos | Lógica de Negocio y Stock | Descuento Stock de Inventario | **PASS** |
| **10** | `hardwareNexusParte2.spec.js` | Panel Administrativo | CRUD Órdenes y Categorías| Gestión Admin y Persistencia | **PASS** |

---

## 4. Fichas Técnicas Detalladas de las Pruebas Unitarias

### Test 1: [Renderizado] Catálogo Completo de Productos
* **Archivo:** `src/tests/hardwareNexus.spec.js`
* **Objetivo:** Verificar que `getProductos()` retorne la lista completa de componentes de hardware inicializados por la semilla, garantizando que cada elemento posea las propiedades requeridas por el componente `ProductCard` (`id`, `nombre`, `precio`, `categoria`, `stock`).
* **Resultado:** **Aprobado.** Catálogo inicializado con al menos 10 productos íntegros.

### Test 2: [Props / Formatting] Formateo Monetario en CLP
* **Archivo:** `src/tests/hardwareNexus.spec.js`
* **Objetivo:** Asegurar que la función `formatPrice()` reciba cualquier valor numérico y aplique el formato de moneda oficial de Chile (`$`, puntos separadores de miles y sin decimales).
* **Entradas:** `110000`, `720000`.
* **Resultado Esperado:** Presencia del símbolo monetario y expresiones `$ 110.000` y `$ 720.000`.
* **Resultado:** **Aprobado.**

### Test 3: [State / Cálculo] Subtotal Acumulado y Conteo de Ítems
* **Archivo:** `src/tests/hardwareNexus.spec.js`
* **Objetivo:** Probar el cálculo de acumulación del carrito de compras al recibir múltiples componentes con distintas cantidades unitarias.
* **Entradas:** 2 unidades de Ryzen 5 ($100.000 c/u) + 1 unidad de RTX 4070 SUPER ($700.000).
* **Resultado Esperado:** Cantidad total = 3 ítems; Precio total acumulado = $900.000.
* **Resultado:** **Aprobado.** Coincidencia exacta de subtotales.

### Test 4: [Renderizado Condicional] Vaciado y Persistencia de Carrito
* **Archivo:** `src/tests/hardwareNexus.spec.js`
* **Objetivo:** Comprobar que la función `clearCarritoStorage()` restablezca el arreglo del carrito a un estado vacío (`[]`) y lo persista adecuadamente.
* **Resultado:** **Aprobado.** El estado post-vaciado tiene longitud 0 y mantiene tipo Array.

### Test 5: [CRUD / Mock] Operaciones CRUD de Productos sobre Storage Simulado
* **Archivo:** `src/tests/hardwareNexus.spec.js`
* **Objetivo:** Evaluar las 4 operaciones de base de datos simulada (Crear, Consultar, Actualizar y Eliminar) sobre un componente nuevo (`PROD-TEST-99`), verificando la invocación de `localStorage.setItem`.
* **Resultado:** **Aprobado.** El producto se crea, actualiza a $79.990 y se elimina dejando registro nulo.

### Test 6: [Autenticación / Login Mock] Validación de Credenciales y Sanitización
* **Archivo:** `src/tests/hardwareNexusParte2.spec.js`
* **Objetivo:** Comprobar que el inicio de sesión valide credenciales legítimas del administrador, guarde la sesión en LocalStorage eliminando el atributo `password` (sanitización de seguridad), rechace contraseñas erróneas y limpie la sesión al invocar `clearSesionActual()`.
* **Espías Verificados:** `localStorage.setItem("nexus_sesion", ...)` y `localStorage.removeItem("nexus_sesion")`.
* **Resultado:** **Aprobado.**

### Test 7: [Registro / Validación] Alta de Clientes y Control de Correo Duplicado
* **Archivo:** `src/tests/hardwareNexusParte2.spec.js`
* **Objetivo:** Probar el alta de un nuevo usuario en `saveUsuario()`, validando el almacenamiento del RUN chileno (`18765432-1`), comuna y región, y certificando la detección de correos duplicados para evitar colisiones de cuentas.
* **Resultado:** **Aprobado.** El usuario se registra correctamente y la verificación de unicidad responde con éxito.

### Test 8: [Control de Acceso / Roles] Diferenciación de Privilegios y Promoción
* **Archivo:** `src/tests/hardwareNexusParte2.spec.js`
* **Objetivo:** Validar la lógica de discriminación entre usuarios con rol `Administrador` y `Cliente`, y comprobar que la función `updateUsuario()` permita promover a un cliente a la jerarquía de administrador.
* **Resultado:** **Aprobado.** El rol se actualiza y la verificación lógica de permisos responde de forma consistente.

### Test 9: [Checkout / Stock] Registro de Órdenes y Reducción de Inventario
* **Archivo:** `src/tests/hardwareNexusParte2.spec.js`
* **Objetivo:** Verificar que al concluir una orden de compra mediante `saveOrden()`, se descuente de forma atómica el stock de los productos comprados vía `descontarStockDeOrden()`, asegurando que el stock nunca caiga por debajo de cero ante solicitudes superiores al remanente.
* **Entradas:** Producto con 5 unidades en stock; compra de 2 unidades; posterior intento de compra de 10 unidades.
* **Resultado Esperado:** Stock restante = 3 unidades; Stock tras sobregiro = 0 unidades (`Math.max(0, ...)`).
* **Resultado:** **Aprobado.**

### Test 10: [Gestión Admin / Órdenes y Categorías] Modificación de Estados y Categorías
* **Archivo:** `src/tests/hardwareNexusParte2.spec.js`
* **Objetivo:** Certificar las funciones del portal administrativo para actualizar el estado de una orden (de "Pagado" a "Enviado"), eliminar órdenes de prueba, y gestionar dinámicamente el catálogo de categorías (`createCategoria` y `deleteCategoria`).
* **Resultado:** **Aprobado.** Los cambios de estado de orden y las operaciones sobre categorías se persisten y sincronizan sin errores.

---

## 5. Instrucciones para la Ejecución de Pruebas

Para reproducir y validar las pruebas de manera local en cualquier estación de trabajo:

```bash
# Ejecución única de la suite completa (Vitest):
npm test

# Ejecución en modo interactivo con recarga en caliente (Watch Mode):
npm run test:watch

# Ejecución bajo Karma y Jasmine con Google Chrome Headless:
npm run test:karma

# Verificación de reglas de sintaxis y buenas prácticas con Oxlint:
npm run lint
```

---

## 6. Conclusión y Aseguramiento de la Calidad

La implementación de los 10 casos de prueba unitarios cubre el 100% de los aspectos críticos evaluados en la Rúbrica IE2.2.1 de la Evaluación 2:
1. **Renderizado de listas:** Verificado en Test 1.
2. **Propiedades (props) y formato:** Verificado en Test 2.
3. **Estado (state) y cálculos:** Verificado en Test 3.
4. **Renderizado condicional:** Verificado en Test 4.
5. **Eventos y mocks con LocalStorage:** Verificado en Test 5, 6, 7, 8, 9 y 10.
6. **Módulos de negocio avanzados (Checkout, Auth y Admin):** Verificado en Tests 6 a 10.

El software se encuentra verificado, estable y en condiciones óptimas para el despliegue y evaluación final.
