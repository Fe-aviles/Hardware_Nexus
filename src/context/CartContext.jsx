import React, { createContext, useContext, useState, useEffect } from "react";
import { getCarrito, saveCarrito, clearCarritoStorage } from "../services/storageService";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser utilizado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  // Carga inicial del carrito desde localStorage
  useEffect(() => {
    const saved = getCarrito();
    if (saved && Array.isArray(saved)) {
      setCartItems(saved);
    }
  }, []);

  // Guardar en localStorage cada vez que cambien los items
  const updateCartState = (newItems) => {
    setCartItems(newItems);
    saveCarrito(newItems);
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  const addToCart = (product, quantity = 1) => {
    const existingIndex = cartItems.findIndex((item) => String(item.id) === String(product.id));
    let newItems = [];

    const effectivePrice = product.enOferta && product.precioOferta ? product.precioOferta : product.precio;

    if (existingIndex > -1) {
      const currentQty = cartItems[existingIndex].cantidad;
      const nextQty = Math.min(currentQty + quantity, product.stock || 999);
      newItems = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, cantidad: nextQty, precio: effectivePrice } : item
      );
    } else {
      const initialQty = Math.min(quantity, product.stock || 999);
      newItems = [
        ...cartItems,
        {
          id: product.id,
          nombre: product.nombre,
          precio: effectivePrice,
          imagenUrl: product.imagenUrl,
          categoria: product.categoria,
          stock: product.stock,
          cantidad: initialQty
        }
      ];
    }

    updateCartState(newItems);
    showNotification(`¡${product.nombre} agregado al carrito!`, "success");
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newItems = cartItems.map((item) => {
      if (String(item.id) === String(productId)) {
        const cappedQty = Math.min(newQuantity, item.stock || 999);
        return { ...item, cantidad: cappedQty };
      }
      return item;
    });
    updateCartState(newItems);
  };

  const removeFromCart = (productId) => {
    const newItems = cartItems.filter((item) => String(item.id) !== String(productId));
    updateCartState(newItems);
    showNotification("Producto eliminado del carrito", "info");
  };

  const clearCart = () => {
    updateCartState([]);
    clearCarritoStorage();
  };

  const totalCount = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
    notification
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
