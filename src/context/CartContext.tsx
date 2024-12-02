import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem } from '../types';
import { useOrders } from './OrderContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  checkout: () => void;
  buyNow: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { addOrder } = useOrders();

  const addToCart = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.ProductID === product.ProductID
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.ProductID === product.ProductID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.ProductID !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.ProductID === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.Price * item.quantity,
    0
  );

  const checkout = () => {
    addOrder(items, total);
    alert('Order placed successfully! Thank you for your purchase.');
    clearCart();
  };

  const buyNow = (product: Product) => {
    const singleItem: CartItem = { product, quantity: 1 };
    addOrder([singleItem], product.Price);
    alert(`${product.ProductName} purchased successfully! Thank you for your order.`);
  };

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        total,
        checkout,
        buyNow
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}