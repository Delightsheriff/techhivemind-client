"use client";
import { Product } from "@/types/product";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card } from "./ui/card";
import { Package, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

const MyProducts = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Products</h1>
        <Button onClick={() => router.push("/vendor/products/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
          <p className="mt-1 text-gray-500">
            Start by adding your first product.
          </p>
          <Button
            onClick={() => router.push("/vendors/products/new")}
            className="mt-6"
          >
            Add Your First Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() =>
                    router.push(`/vendors/products/${product._id}`)
                  }
                >
                  Edit Product
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
