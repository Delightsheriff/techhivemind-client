"use client";

import { Button } from "@/components/ui/button";
import { useWishListStore } from "@/store/WishListStore";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddToWishlistButton({ product }: { product: Product }) {
  const { addToWishList, items } = useWishListStore();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(items.some((item) => item._id === product._id));
  }, [items, product._id]);

  const handleAddToWishlist = async () => {
    try {
      await addToWishList(product);
      toast.success("Added to wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleAddToWishlist}
      disabled={isInWishlist}
    >
      <Heart
        className={`h-5 w-5 ${isInWishlist ? "fill-current text-red-500" : ""}`}
      />
    </Button>
  );
}
