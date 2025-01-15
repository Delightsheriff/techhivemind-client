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
  product: Product;
  quantity: number;
}
