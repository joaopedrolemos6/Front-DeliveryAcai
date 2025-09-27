import { useState, useCallback } from 'react';
import { CartItem, AcaiBase, AcaiSize, Topping, Drink } from '@/types';

interface UseCartReturn {
  items: CartItem[];
  addAcaiToCart: (size: AcaiSize, base: AcaiBase, toppings: Topping[]) => void;
  addDrinkToCart: (drink: Drink, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addAcaiToCart = useCallback((size: AcaiSize, base: AcaiBase, toppings: Topping[]) => {
    const toppingsPrice = toppings.reduce((sum, topping) => sum + topping.price, 0);
    const basePrice = base.price * size.multiplier;
    const totalPrice = basePrice + toppingsPrice;

    const newItem: CartItem = {
      id: generateId(),
      type: 'acai',
      acai: {
        size,
        base,
        toppings
      },
      quantity: 1,
      totalPrice
    };

    setItems(prev => [...prev, newItem]);
  }, []);

  const addDrinkToCart = useCallback((drink: Drink, quantity = 1) => {
    const newItem: CartItem = {
      id: generateId(),
      type: 'drink',
      drink,
      quantity,
      totalPrice: drink.price * quantity
    };

    setItems(prev => [...prev, newItem]);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const unitPrice = item.type === 'acai' 
          ? (item.acai!.base.price * item.acai!.size.multiplier) + 
            item.acai!.toppings.reduce((sum, t) => sum + t.price, 0)
          : item.drink!.price;
        
        return {
          ...item,
          quantity,
          totalPrice: unitPrice * quantity
        };
      }
      return item;
    }));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return {
    items,
    addAcaiToCart,
    addDrinkToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal
  };
};