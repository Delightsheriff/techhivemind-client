"use client";

import { ProductFilters } from "@/components/ProductFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface ProductsWrapperProps {
  initialProducts: Product[];
  showCategoryFilter?: boolean;
}

export function ProductsWrapper({
  initialProducts,
  showCategoryFilter,
}: ProductsWrapperProps) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <ProductFilters
          showCategoryFilter={showCategoryFilter}
          products={initialProducts}
          onFilterChange={setFilteredProducts}
        />
      </div>
      <div className="lg:col-span-3">
        <ProductGrid
          products={filteredProducts}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
}
