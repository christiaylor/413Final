import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/Cartitem';
// import { createCookieSessionStorage } from 'react-router-dom';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (projectId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.projectID === item.projectID);
      const updatedCart = prevCart.map((c) =>
        c.projectID === item.projectID
          ? { ...c, donationAmount: c.donationAmount + item.donationAmount }
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (projectId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.projectID !== projectId));
  };
  const clearCart = () => {
    setCart(() => []);
  };
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
