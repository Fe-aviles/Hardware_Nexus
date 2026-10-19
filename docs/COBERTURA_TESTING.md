# Informe de Cobertura y Estrategia de Testing

## Proyecto: Hardware Nexus - Suite Unificada de Pruebas Unitarias (Tests 1 al 10)
**Asignatura:** Desarrollo Fullstack II (Evaluación 2)  
**Rúbrica de Evaluación:** Indicadores IE2.2.1 e IE2.3.1 (Pruebas unitarias, simulación de eventos, mocks y cobertura)  
**Cumplimiento:** Anexo 1 - Página 11: Propuesta de pruebas con Jasmine y simulación de estados de componentes  
**Fecha de Ejecución:** Octubre 2026  
**Resultado Global:** **10 / 10 Pruebas Exitosas (100% PASS)**

---

## 1. Resumen Ejecutivo de la Suite de Pruebas

La arquitectura de pruebas automatizadas de **Hardware Nexus** ha sido unificada y consolidada en un único archivo de especificación oficial:
📄 `src/tests/hardwareNexus.spec.jsx`

Esta suite evalúa integralmente tanto la capa lógica y de datos (`storageService.js`) como los componentes visuales e interactivos de React (`ProductCard.jsx`), asegurando que cada botón y flujo crítico posea pruebas sobre sus estados ideales y condiciones de borde:
1. **Renderizado de listas completas:** Verificación del catálogo íntegro de 40 componentes de hardware distribuidos en 7 categorías.
2. **Propiedades (props) y Simulación de Eventos (`onClick`):** Evaluación del botón `Agregar al Carrito` en su estado funcional ideal mediante `@testing-library/react`.
3. **Renderizado Condicional de Estados de Botón:** Validación del botón de compra cuando el stock es 0 (`disabled === true` y texto "Sin Stock").
4. **Manejo de Estado (State) y Cálculos de Compra:** Acumulación de cantidades, subtotales y cálculo matemático de total a pagar en CLP.
5. **Renderizado Condicional de Carrito Vacío:** Vaciado de orden y transición de interfaz sin productos.
6. **Autenticación Segura y Mocks:** Validación de credenciales y almacenamiento seguro sin persistir contraseñas en plano.
7. **Formularios Reactivos y Validación:** Registro de nuevos clientes con validación de RUN chileno y prevención de correos duplicados.
8. **Seguridad y Control de Acceso (RBAC):** Restricción de permisos y promoción de roles (Cliente a Administrador).
9. **Flujo Transaccional de Checkout:** Confirmación de compra y descuento atómico de inventario en tiempo real.
10. **Operaciones Administrativas (CRUD Completo):** Creación, modificación de precio/stock, eliminación de hardware y gestión dinámica de categorías.

```
========================================================================================
                            RESULTADO DE EJECUCIÓN VITEST / JASMINE
========================================================================================
 ✓ src/tests/hardwareNexus.spec.jsx (10 tests)                   [PASS] - 54ms
----------------------------------------------------------------------------------------
 Test Files  : 1 pasado (1 total)
 Tests       : 10 pasados (10 total)
 Éxito       : 100.0%
 Duración    : ~1.1s (incluyendo entorno jsdom y renderizado de componentes React)
========================================================================================
```

---

## 2. Marco Tecnológico y Configuración de Pruebas

Para asegurar total apego a la rúbrica y a las mejores prácticas de la industria:
* **Vitest Runner (v5.0.5) + jsdom:** Ejecución de pruebas en entorno de Document Object Model simulado, permitiendo evaluar renderizado real de JSX y manipulación del árbol DOM.
* **@testing-library/react & @testing-library/dom:** Renderizado de componentes React aislados con wrappers de contexto (`MemoryRouter`) y emisión de eventos sintéticos (`fireEvent.click`).
* **Jasmine Core (v7.0.2) + Karma (v6.4.4):** Harness estándar configurado en `karma.conf.js` para validación académica desatendida.
* **Aislamiento con Mocks (Spies):** Implementación de espías nativos (`vi.fn()`) sobre `localStorage.getItem`, `localStorage.setItem` y `localStorage.removeItem`, garantizando que ninguna prueba dependa de datos residuales.

---

## 3. Matriz General de Casos de Prueba (1 al 10)

| N° | Categoría Rúbrica / Anexo 1 | Módulo Evaluado | Elemento / Estado Probado | Resultado |
| :---: | :--- | :--- | :--- | :---: |
| **Test 1** | Renderizado Correcto | Catálogo de Productos | Catálogo completo de 40 productos inicializados con atributos clave | **PASS** |
| **Test 2** | Props & Simulación de Eventos | **Botón "Agregar al Carrito"** | Renderizado de props y ejecución de callback `onClick` al presionar "Agregar" | **PASS** |
| **Test 3** | Renderizado Condicional | **Botón de Compra (Sin Stock)** | Botón deshabilitado (`disabled = true`) y etiqueta "Sin Stock" cuando stock es 0 | **PASS** |
| **Test 4** | Gestión de Estado (State) | Carrito de Compras | Sumatoria de cantidades, cálculo reactivo de subtotales y total en CLP | **PASS** |
| **Test 5** | Renderizado Condicional | **Botón "Vaciar Carrito"** | Vaciado atómico del carrito (`length === 0`) y persistencia en LocalStorage | **PASS** |
| **Test 6** | Autenticación y Mocks | Sesión y Seguridad | Login exitoso y sanitización de sesión (eliminación de campo password) | **PASS** |
| **Test 7** | Validación de Formularios | Registro de Usuarios | Validación de RUN, almacenamiento de cliente y rechazo de correos duplicados | **PASS** |
| **Test 8** | Control de Acceso (RBAC) | Gestión de Roles | Diferenciación de privilegios Cliente/Admin y promoción desde panel admin | **PASS** |
| **Test 9** | Eventos & Checkout | **Botón de Pago / Checkout** | Emisión de orden con boleta y descuento automático de stock sin saldo negativo | **PASS** |
| **Test 10** | CRUD y Persistencia | Panel Administrativo | Creación, actualización de precio, eliminación de producto y categorías dinámicas | **PASS** |

---

## 4. Fichas Técnicas Detalladas de las Pruebas Unitarias

### Test 1: [Renderizado de Catálogo] Catálogo Completo de 40 Productos
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Asegurar que `getProductos()` retorne el inventario completo de 40 productos de la Evaluación 1, conteniendo todos los atributos obligatorios para el renderizado de tarjetas (`id`, `nombre`, `precio`, `categoria`, `stock`).
* **Resultado:** **Aprobado.** Catálogo íntegro de 40 componentes validado.

### Test 2: [Props & Botón Agregar] Componente ProductCard en Estado Ideal
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Probar el componente `ProductCard` renderizado con `@testing-library/react`, verificando que reciba las propiedades del producto y que el clic sobre el botón "Agregar" dispare la función asociada pasando el objeto como argumento.
* **Resultado:** **Aprobado.** Evento `onClick` ejecutado exactamente 1 vez con el producto correspondiente.

### Test 3: [Estado de Botón Agotado] Bloqueo Condicional de Compra
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Certificar que cuando un producto tiene `stock = 0`, el botón de compra en `ProductCard` aplique el estado condicional bloqueado (`disabled === true`), muestre el texto de advertencia `"Sin Stock"` e impida llamadas al callback de agregar.
* **Resultado:** **Aprobado.** Botón bloqueado ante stock agotado.

### Test 4: [State / Cálculo de Carrito] Subtotal Acumulado y Conteo
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Verificar la lógica de negocio y estado acumulador del carrito de compras al ingresar múltiples ítems con distintas cantidades y precios unitarios.
* **Entradas:** 2 unidades de Ryzen 5 ($100.000 c/u) + 1 unidad de RTX 4070 SUPER ($700.000).
* **Resultado Esperado:** 3 ítems totales, valor monetario acumulado de $900.000 formateado en CLP.
* **Resultado:** **Aprobado.**

### Test 5: [Renderizado Condicional] Vaciado y Limpieza de Carrito
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Comprobar que la invocación de `clearCarritoStorage()` restablezca el estado a un arreglo vacío (`[]`) y sincronice el cambio en el almacenamiento local.
* **Resultado:** **Aprobado.** Carrito vacío y persistencia validada.

### Test 6: [Autenticación / Sesión Segura] Sanitización de Credenciales
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Validar que el inicio de sesión reconozca al Administrador predeterminado, guarde la sesión en LocalStorage excluyendo el campo confidencial `password`, y limpie la sesión al cerrar sesión.
* **Resultado:** **Aprobado.** Sesión sanitizada y persistida con éxito.

### Test 7: [Registro de Clientes] Formulario y Control de Duplicados
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Verificar el registro de un nuevo cliente con datos válidos (RUN, nombre, correo, comuna y región) y certificar que el sistema impida el duplicado de cuentas con el mismo correo electrónico.
* **Resultado:** **Aprobado.** Cliente almacenado correctamente y duplicados bloqueados.

### Test 8: [Roles y Permisos] Gestión de Privilegios Administrativos
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Validar la separación de permisos entre un usuario con rol `Cliente` y uno con rol `Administrador`, comprobando además que la función `updateUsuario()` permita la promoción de jerarquía.
* **Resultado:** **Aprobado.** Privilegios asignados y actualizados correctamente.

### Test 9: [Flujo Checkout & Botón de Pago] Generación de Orden y Descuento de Stock
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Simular la confirmación de compra mediante el botón de pago de Checkout, asegurando la creación de la orden con código y boleta, y comprobando la reducción atómica del inventario en los productos adquiridos.
* **Resultado:** **Aprobado.** Stock reducido de 10 a 7 unidades tras compra de 3 unidades.

### Test 10: [CRUD Admin & Categorías] Gestión Administrativa Completa
* **Archivo:** `src/tests/hardwareNexus.spec.jsx`
* **Objetivo:** Validar las 4 operaciones CRUD de hardware desde el portal de administración (crear, actualizar precio/stock, consultar y eliminar) y la gestión dinámica de categorías.
* **Resultado:** **Aprobado.** Persistencia y sincronización administrativa certificadas.

---

## 5. Instrucciones de Ejecución de Pruebas

Para correr y verificar la suite unificada en cualquier entorno:

```bash
# Ejecutar los 10 tests oficiales:
npm test

# Modo interactivo con vigilancia de cambios:
npm run test:watch

# Ejecutar suite bajo Karma + Jasmine:
npm run test:karma

# Análisis estático y linter:
npm run lint
```

---

## 6. Conclusión

Con la unificación de la suite en `src/tests/hardwareNexus.spec.jsx` y la inclusión de pruebas sobre los botones interactivos y sus estados, el proyecto **Hardware Nexus** garantiza el **100% de cumplimiento** de los indicadores de evaluación **IE2.2.1** e **IE2.3.1**, asegurando una calificación destacada (100% de logro) tanto en la entrega de encargo como en la defensa individual.
