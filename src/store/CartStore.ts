import { CartItem } from "@/types/product";
import { create } from "zustand";

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (item: CartItem) => Promise<void>;
  updateQuantity: (item: CartItem) => Promise<void>;
  clearCart: () => void;
  refetchCart: () => void;
}

export const useCartStore = create<CartStore>;
