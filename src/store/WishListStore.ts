import { create } from "zustand";
import * as wishlistActions from "@/lib/actions/wishlistAction";
import { WishList } from "@/types/product";

interface WishListStore {
  items: WishList[];
  isLoading: boolean;
  error: string | null;
  fetchWishList: () => Promise<void>;
  addToWishList: (item: WishList) => Promise<void>;
  removeFromWishList: (productId: string) => Promise<void>;
}

export const useWishListStore = create<WishListStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchWishList: async () => {
    set({ isLoading: true, error: null });
    try {
      const wishlist = await wishlistActions.fetchWishlist();
      set({ items: wishlist.products, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error loading cart",
        isLoading: false,
      });
    }
  },

  addToWishList: async (item: WishList) => {
    const currentItems = get().items ?? [];
    set({
      items: [...currentItems, item],
      isLoading: true,
    });
    try {
      await wishlistActions.addToWishlist(item);
      const wishlist = await wishlistActions.fetchWishlist();
      set({ isLoading: false, items: wishlist.products });
    } catch (error) {
      set({
        items: currentItems,
        error: error instanceof Error ? error.message : "Error adding item",
        isLoading: false,
      });
    }
  },

  removeFromWishList: async (productId: string) => {
    const currentItems = get().items ?? [];
    set({
      items: currentItems.filter((item) => item._id !== productId),
      isLoading: true,
    });
    try {
      await wishlistActions.removeFromWishlist(productId);
      const wishlist = await wishlistActions.fetchWishlist();
      set({ isLoading: false, items: wishlist.products });
    } catch (error) {
      set({
        items: currentItems,
        error: error instanceof Error ? error.message : "Error removing item",
        isLoading: false,
      });
    }
  },
}));
