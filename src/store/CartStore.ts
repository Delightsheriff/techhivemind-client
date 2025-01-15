// lib/stores/cartStore.ts
import { create } from "zustand";
import * as cartActions from "@/lib/actions/cartAction";
import debounce from "lodash/debounce";
import { CartItem } from "@/types/product";

interface CartStore {
  total: number;
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

// Debounce the update quantity API call
const debouncedUpdateQuantity = debounce(cartActions.updateQuantity, 500);

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartActions.fetchCart();
      set({ items: cart.cartItems, total: cart.total, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error loading cart",
        isLoading: false,
      });
    }
  },

  addToCart: async (item: CartItem) => {
    // Optimistic update
    const currentItems = get().items;
    set({
      items: [...currentItems, item],
      isLoading: true,
    });

    try {
      await cartActions.addToCart(item);
      const cart = await cartActions.fetchCart();
      set({ items: cart.cartItems, total: cart.total, isLoading: false });
    } catch (error) {
      console.log(error);
      // Revert on error
      set({
        items: currentItems,
        error: "Failed to add item",
        isLoading: false,
      });
    }
  },

  removeFromCart: async (productId: string) => {
    // Optimistic update
    const currentItems = get().items;
    set({
      items: currentItems.filter((item) => item.product._id !== productId),
      isLoading: true,
    });

    try {
      await cartActions.removeFromCart(productId);
      const cart = await cartActions.fetchCart();
      set({ items: cart.cartItems, total: cart.total, isLoading: false });
    } catch (error) {
      console.log(error);
      // Revert on error
      set({
        items: currentItems,
        error: "Failed to remove item",
        isLoading: false,
      });
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    // Optimistic update
    const currentItems = get().items;
    const updatedItems = currentItems.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );

    set({ items: updatedItems, isLoading: true });

    try {
      await debouncedUpdateQuantity(productId, quantity);
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      // Revert on error
      set({
        items: currentItems,
        error: "Failed to update quantity",
        isLoading: false,
      });
    }
  },
}));
