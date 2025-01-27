"use client";

import { Button } from "@/components/ui/button";
import { useWishListStore } from "@/store/WishListStore";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddToWishlistButton({
  product,
  isAuthenticated,
}: {
  product: Product;
  isAuthenticated: boolean;
}) {
  const { addToWishList, items } = useWishListStore();
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(items?.some((item) => item._id === product._id));
  }, [items, product._id]);

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart", {
        icon: "🔒",
        duration: 3000,
      });
      router.push(`/auth/signin?redirect=/product/${product._id}`);
      return;
    }
    const wishlistItem = product;
    try {
      await addToWishList(wishlistItem);
      // toast.success("Added to wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleAddToWishlist}
      disabled={isInWishlist}
    >
      <Heart
        className={`h-4 w-4 ${isInWishlist ? "fill-current text-red-500" : ""}`}
      />
    </Button>
  );
}
