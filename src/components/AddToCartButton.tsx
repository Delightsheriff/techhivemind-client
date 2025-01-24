"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/CartStore";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart({
        product,
        quantity: 1,
      });
      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="flex-1"
      onClick={handleAddToCart}
      disabled={isLoading || product.stock === 0}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
