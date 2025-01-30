"use client";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";

interface ProductGridProps {
  products: Product[];
  isAuthenticated: boolean;
}

export function ProductGrid({ products, isAuthenticated }: ProductGridProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
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
              <div className="flex items-center flex-wrap gap-2 mt-2">
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
              <AddToCartButton
                product={product}
                isAuthenticated={isAuthenticated}
              />
              <AddToWishlistButton
                product={product}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
