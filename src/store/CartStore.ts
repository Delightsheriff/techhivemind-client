import { CartItem } from "@/types/product";
import { create } from "zustand";
import * as cartActions from "@/lib/actions/cartAction";

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (item: CartItem) => Promise<void>;
  updateQuantity: (item: CartItem) => Promise<void>;
  clearCart: () => void;
  setError: (error: string | null) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  setError: (error) => set({ error }),

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cartItems = await cartActions.fetchCart();
      set({ items: cartItems, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch cart";
      set({ error: errorMessage, isLoading: false });
    }
  },

  addToCart: async (item: CartItem) => {
    set({ isLoading: true, error: null });
    try {
      await cartActions.addToCart(item);
      const cartItems = await cartActions.fetchCart();
      set({ items: cartItems, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add to cart";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  removeFromCart: async (item: CartItem) => {
    set({ isLoading: true, error: null });
    try {
      await cartActions.removeFromCart(item);
      const cartItems = await cartActions.fetchCart();
      set({ items: cartItems, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to remove from cart";
      set({ error: errorMessage, isLoading: false });
    }
  },

  updateQuantity: async (item: CartItem) => {
    set({ isLoading: true, error: null });
    try {
      await cartActions.updateQuantity(item);
      const cartItems = await cartActions.fetchCart();
      set({ items: cartItems, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update quantity";
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await cartActions.clearCart();
      set({ items: [], isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to clear cart";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));
