import { Product } from "./product";

export type SortOption = "price_asc" | "price_desc" | "name_asc" | "name_desc";

export interface FilterState {
  sort?: SortOption;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  category?: string;
}

export interface FilterProps {
  showCategoryFilter?: boolean;
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

export function applySorting(products: Product[], sort?: string) {
  if (!sort) return products;

  return [...products].sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return (
          (a.onSale ? a.salePrice : a.price) -
          (b.onSale ? b.salePrice : b.price)
        );
      case "price_desc":
        return (
          (b.onSale ? b.salePrice : b.price) -
          (a.onSale ? a.salePrice : a.price)
        );
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
}

export function applyPriceFilter(
  products: Product[],
  minPrice?: number,
  maxPrice?: number
) {
  if (!minPrice && !maxPrice) return products;

  return products.filter((product) => {
    const price = product.onSale ? product.salePrice : product.price;
    if (minPrice && maxPrice) {
      return price >= minPrice && price <= maxPrice;
    }
    if (minPrice) {
      return price >= minPrice;
    }
    if (maxPrice) {
      return price <= maxPrice;
    }
    return true;
  });
}
