"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/CartStore";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddToCartButton({
  product,
  isAuthenticated,
}: {
  product: Product;
  isAuthenticated: boolean;
}) {
  const { addToCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart", {
        icon: "🔒",
        duration: 3000,
      });
      router.push(`/auth/signin?redirect=/product/${product._id}`);
      return;
    }
    // Optimistic update
    const cartItem = { product, quantity: 1 };

    try {
      setIsLoading(true);
      // Trigger optimistic update in cart store
      await addToCart(cartItem);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="flex-1"
      onClick={handleAddToCart}
      disabled={isLoading || product.stock === 0}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
