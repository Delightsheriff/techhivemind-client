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
}
