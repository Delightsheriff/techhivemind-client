/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { audioProducts, categories } from "@/lib/links";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FilterProps, FilterState } from "@/types/filters";
import { Separator } from "@/components/ui/separator";

export function ProductFilters({
  showCategoryFilter = false,
  products,
  onFilterChange,
}: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    sort: undefined,
    minPrice: 0,
    maxPrice: 5000,
    onSale: false,
    category: "all",
  });

  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Get all categories for the filter
  const allCategories = [
    ...categories.filter(
      (cat) => cat.name !== "Shop All" && cat.name !== "Sale"
    ),
    ...audioProducts,
  ];

  // Calculate price range from products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => (p.onSale ? p.salePrice : p.price));
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange([minPrice, maxPrice]);
      setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
    }
  }, [products]);

  const applyFilters = () => {
    let filteredProducts = [...products];

    // Apply category filter
    if (filters.category && filters.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.onSale ? product.salePrice : product.price;
      return price >= filters.minPrice! && price <= filters.maxPrice!;
    });

    // Apply sale filter
    if (filters.onSale) {
      filteredProducts = filteredProducts.filter((product) => product.onSale);
    }

    // Apply sorting
    if (filters.sort) {
      filteredProducts.sort((a, b) => {
        const priceA = a.onSale ? a.salePrice : a.price;
        const priceB = b.onSale ? b.salePrice : b.price;

        switch (filters.sort) {
          case "price_asc":
            return priceA - priceB;
          case "price_desc":
            return priceB - priceA;
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    onFilterChange(filteredProducts);
  };

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      sort: undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      onSale: false,
      category: "all",
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Sort Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select
              onValueChange={(value) => handleFilterChange("sort", value)}
              value={filters.sort || "default"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="name_asc">Name: A to Z</SelectItem>
                <SelectItem value="name_desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Category Filter - Only shown on specific pages */}
          {showCategoryFilter && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                onValueChange={(value) => handleFilterChange("category", value)}
                value={filters.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map((category) => (
                    <SelectItem
                      key={category.href}
                      value={category.href.replace("/", "")}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showCategoryFilter && <Separator />}

          {/* Price Range Filter
          <div className="space-y-4">
            <label className="text-sm font-medium">Price Range</label>
            <Slider
              min={priceRange[0]}
              max={priceRange[1]}
              step={1}
              value={[filters.minPrice!, filters.maxPrice!]}
              onValueChange={([min, max]) => {
                handleFilterChange("minPrice", min);
                handleFilterChange("maxPrice", max);
              }}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.minPrice}</span>
              <span>{filters.maxPrice}</span>
            </div>
          </div> */}

          <Separator />

          {/* On Sale Switch */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">On Sale Only</label>
            <Switch
              checked={filters.onSale}
              onCheckedChange={(checked) =>
                handleFilterChange("onSale", checked)
              }
            />
          </div>

          <Separator />

          {/* Reset Filters Button */}
          <Button variant="outline" onClick={resetFilters} className="w-full">
            Reset All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
