import React, { createContext, useContext, useState } from 'react';
import { Order, CartItem } from '../types';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], totalAmount: number) => void;
  getUserOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  const addOrder = (items: CartItem[], totalAmount: number) => {
    if (!user) return;

    const newOrder: Order = {
      orderId: `ORD-${Date.now()}`,
      userId: user.UserID,
      items: [...items],
      totalAmount,
      orderDate: new Date().toISOString(),
      status: 'completed'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  const getUserOrders = () => {
    if (!user) return [];
    return orders.filter(order => order.userId === user.UserID);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}