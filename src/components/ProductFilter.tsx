"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { audioProducts, categories } from "@/lib/links";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Get all categories for the filter
  const allCategories = [
    ...categories.filter(
      (cat) => cat.name !== "Shop All" && cat.name !== "Sale"
    ),
    ...audioProducts,
  ];

  const handleCategory = (value: string) => {
    router.push(`?${createQueryString("category", value)}`);
  };

  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4">
      <Select onValueChange={handleCategory} defaultValue="all">
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {allCategories.map((category) => (
            <SelectItem
              key={category.href}
              value={category.href.replace("/", "").replace("audio/", "")}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        className="w-full sm:w-auto"
        onClick={() => router.push(window.location.pathname)}
      >
        Reset Filter
      </Button>
    </div>
  );
}
