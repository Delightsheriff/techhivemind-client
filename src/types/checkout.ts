// types/checkout.ts
export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CreateOrderInput {
  shippingAddress: ShippingAddress;
  cartId: string | null;
}
