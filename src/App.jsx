import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Vistas Desarrolladas (Parte 1)
import { HomeView } from "./views/HomeView";
import { CategoriesView } from "./views/CategoriesView";
import { OffersView } from "./views/OffersView";
import { ProductDetailView } from "./views/ProductDetailView";
import { CartView } from "./views/CartView";
import { ContactView } from "./views/ContactView";
import { PlaceholderView } from "./views/PlaceholderView";

// Vistas Desarrolladas (Parte 2 - Autenticación y Perfil)
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import { ProfileView } from "./views/ProfileView";

// Vistas Desarrolladas (Parte 2 - Flujo Checkout y Pagos)
import { CheckoutView } from "./views/CheckoutView";
import { PaymentSuccessView } from "./views/PaymentSuccessView";
import { PaymentFailedView } from "./views/PaymentFailedView";

// Vista de Panel Administrativo (Hito 2)
import { AdminPortalView } from "./views/AdminPortalView";

const ToastContainer = () => {
  const { notification } = useCart();
  if (!notification) return null;

  return (
    <div className="nexus-toast" role="alert">
      <i className="bi bi-check-circle-fill text-success fs-5"></i>
      <span className="small fw-semibold">{notification.message}</span>
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="d-flex flex-column min-vh-100 bg-main">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                {/* Vistas Core de Parte 1 */}
                <Route path="/" element={<HomeView />} />
                <Route path="/categorias" element={<CategoriesView />} />
                <Route path="/ofertas" element={<OffersView />} />
                <Route path="/producto/:id" element={<ProductDetailView />} />
                <Route path="/carrito" element={<CartView />} />
                <Route path="/contacto" element={<ContactView />} />

                {/* Rutas Desarrolladas - Parte 2 */}
                <Route path="/login" element={<LoginView />} />
                <Route path="/registro" element={<RegisterView />} />
                <Route path="/perfil" element={<ProfileView />} />

                {/* Rutas de Checkout y Pagos - Parte 2 */}
                <Route path="/checkout" element={<CheckoutView />} />
                <Route path="/pago-exitoso" element={<PaymentSuccessView />} />
                <Route path="/pago-fallido" element={<PaymentFailedView />} />

                {/* Ruta de Administración - Hito 2 */}
                <Route path="/admin" element={<AdminPortalView />} />
                <Route
                  path="*"
                  element={
                    <PlaceholderView
                      title="Página no encontrada"
                      description="La ruta especificada no existe en la tienda virtual."
                      badge="Error 404"
                    />
                  }
                />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
