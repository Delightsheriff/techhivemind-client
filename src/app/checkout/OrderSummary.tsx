"use client";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/CartStore";

export default function OrderSummary() {
  const { items, total } = useCartStore();

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.product._id} className="flex justify-between">
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>
              {item.product.onSale
                ? formatPrice(item.product.salePrice * item.quantity)
                : formatPrice(item.product.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-300">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
