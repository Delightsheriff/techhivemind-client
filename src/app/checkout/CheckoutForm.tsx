"use client";

import { useState } from "react";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/CartStore";
import { Input } from "@/components/ui/input";
import { ShippingAddress } from "@/types/checkout";
import { createOrder } from "@/lib/actions/checkoutActions";
import { initPayment } from "@/lib/actions/paymentInit";
import toast from "react-hot-toast";

export default function CheckoutForm() {
  const { cartId } = useCartStore();
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderResult = await createOrder({
        shippingAddress,
        cartId,
      });
      if (!orderResult.success) {
        console.error("Order creation failed:", orderResult);
        toast.error("Something went wrong. Please try again later.");
      }

      const paymentResult = await initPayment(orderResult.orderId);
      console.log(paymentResult);
      if (!paymentResult.success) {
        toast.error("Payment initialization failed. Please try again.");
        console.error("Payment initialization failed");
        return;
      }

      window.location.href = paymentResult.authorization_url;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

      <FormInput
        id="street"
        name="street"
        label="Street"
        value={shippingAddress.street}
        onChange={handleInputChange}
        required
      />

      <FormInput
        id="city"
        name="city"
        label="City"
        value={shippingAddress.city}
        onChange={handleInputChange}
        required
      />

      <FormInput
        id="state"
        name="state"
        label="State"
        value={shippingAddress.state}
        onChange={handleInputChange}
        required
      />

      <FormInput
        id="postalCode"
        name="postalCode"
        label="Postal Code"
        value={shippingAddress.postalCode}
        onChange={handleInputChange}
        required
      />

      <FormInput
        id="country"
        name="country"
        label="Country"
        value={shippingAddress.country}
        onChange={handleInputChange}
        required
      />

      <div>
        <Input type="hidden" name="cartId" value={cartId || ""} />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : "Proceed to Payment"}
      </Button>
    </form>
  );
}
