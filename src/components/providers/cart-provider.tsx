"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "electronics-store-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const addItem = (item: Omit<CartItem, "quantity">) => {
      const exists = items.some((entry) => entry._id === item._id);

      setItems((current) => {
        const existing = current.find((entry) => entry._id === item._id);
        if (existing) {
          return current.map((entry) =>
            entry._id === item._id ? { ...entry, quantity: entry.quantity + 1 } : entry
          );
        }
        return [...current, { ...item, quantity: 1 }];
      });

      return exists;
    };

    const removeItem = (id: string) => {
      setItems((current) => current.filter((entry) => entry._id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
      setItems((current) =>
        current
          .map((entry) => (entry._id === id ? { ...entry, quantity: Math.max(1, quantity) } : entry))
          .filter((entry) => entry.quantity > 0)
      );
    };

    const clearCart = () => setItems([]);

    return {
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
