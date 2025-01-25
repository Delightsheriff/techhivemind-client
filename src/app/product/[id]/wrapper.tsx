"use client";

import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";

export default function Wrapper({ product }: { product: Product }) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  return (
    <>
      <AddToCartButton product={product} isAuthenticated={isAuthenticated} />
      <AddToWishlistButton
        product={product}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}
