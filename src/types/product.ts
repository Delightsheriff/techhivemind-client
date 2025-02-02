export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  onSale: boolean;
  salePrice: number;
  images: string[];
  vendor: string;
}

export interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    onSale: boolean;
    salePrice: number;
    images: string[];
    vendor: string;
  };
  quantity: number;
}

export interface WishList {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  onSale: boolean;
  salePrice: number;
  images: string[];
  vendor: string;
}

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    onSale: boolean;
    salePrice: number;
    images: string[];
    vendor: string;
  };
  quantity: number;
}

export type ProductResponse = {
  success: boolean;
  products?: Product[];
  totalPages?: number;
  currentPage?: number;
  message?: string;
};
