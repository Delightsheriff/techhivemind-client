"use client";

import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/CartStore";
import { useWishListStore } from "@/store/WishListStore";
import toast from "react-hot-toast";

export function ProductGrid({ products }: { products: Product[] }) {
  const { addToCart } = useCartStore();
  const { addToWishList, items: wishlistItems } = useWishListStore();
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAddToCart = async (product: Product) => {
    setLoadingStates((prev) => ({ ...prev, [product._id]: true }));
    try {
      await addToCart({
        product,
        quantity: 1,
      });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [product._id]: false }));
    }
  };

  const handleAddToWishlist = async (product: Product) => {
    try {
      await addToWishList(product);
      toast.success("Added to wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to wishlist");
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems?.some((item) => item._id === productId) ?? false;
  };

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            No products available
          </h3>
          <p className="text-muted-foreground">
            Check back later for new products in this category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product._id} className="group overflow-hidden">
          <Link href={`/product/${product._id}`}>
            <div className="relative aspect-square">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {product.onSale && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                  Sale
                </div>
              )}
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/product/${product._id}`}>
              <h3 className="font-medium text-lg truncate">{product.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                {product.onSale ? (
                  <>
                    <span className="text-lg font-bold text-red-500">
                      {formatPrice(product.salePrice!)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </Link>
            <div className="flex gap-2 mt-4">
              <Button
                className="flex-1"
                onClick={() => handleAddToCart(product)}
                disabled={loadingStates[product._id] || product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAddToWishlist(product)}
                disabled={isInWishlist(product._id)}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isInWishlist(product._id) ? "fill-current text-red-500" : ""
                  }`}
                />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
