'use client';

import { useState, useMemo, useCallback } from 'react';
import { Product, CartItem } from '../types';

export function useCart(initialItems: CartItem[] = []) {
  const [cart, setCart] = useState<CartItem[]>(initialItems);

  // Add to cart with safe integer arithmetic (prevents "1" + 1 = "11")
  const addToCart = useCallback((product: Product, quantityToAdd = 1) => {
    const qty = Math.max(1, Math.floor(Number(quantityToAdd) || 1));
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => String(item.id) === String(product.id));
      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: (Number(item.quantity) || 1) + qty }
            : item
        );
      }
      return [...prev, { ...product, price: Number(product.price) || 0, quantity: qty }];
    });
  }, []);

  // Safe quantity update (handles direct typing and multiples update)
  const updateQuantity = useCallback((productId: number | string, newQuantity: number | string) => {
    const rawVal = String(newQuantity).trim();
    if (rawVal === '') {
      // Allow empty while typing, fallback handled on blur or calculation
      setCart((prev) =>
        prev.map((item) =>
          String(item.id) === String(productId) ? { ...item, quantity: 1 } : item
        )
      );
      return;
    }

    const parsed = parseInt(rawVal, 10);
    const sanitized = isNaN(parsed) || parsed < 1 ? 1 : parsed;

    setCart((prev) =>
      prev.map((item) =>
        String(item.id) === String(productId) ? { ...item, quantity: sanitized } : item
      )
    );
  }, []);

  // Adjust quantity by delta (+1, -1, or any multiple like +5)
  const adjustQuantity = useCallback((productId: number | string, delta: number) => {
    const numDelta = Number(delta) || 0;
    setCart((prev) =>
      prev.map((item) => {
        if (String(item.id) === String(productId)) {
          const currentQty = Number(item.quantity) || 1;
          const nextQty = Math.max(1, currentQty + numDelta);
          return { ...item, quantity: nextQty };
        }
        return item;
      })
    );
  }, []);

  // Remove single item
  const removeFromCart = useCallback((productId: number | string) => {
    setCart((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  }, []);

  // Clear all items (after checkout)
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Total quantity calculation: sum of all item quantities (Requirement #3)
  const totalQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
  }, [cart]);

  // Total price calculation: real-time sum of price * quantity
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      return total + price * qty;
    }, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    updateQuantity,
    adjustQuantity,
    removeFromCart,
    clearCart,
    totalQuantity,
    totalPrice,
  };
}
