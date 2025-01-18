"use client";

import { useState } from "react";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/CartStore";
import { Input } from "@/components/ui/input";
import { ShippingAddress } from "@/types/checkout";
import { createOrder } from "@/lib/actions/checkoutActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter();
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
      // First, validate the shipping address
      if (!validateShippingAddress(shippingAddress)) {
        toast.error("Please fill in all shipping address fields correctly");
        return;
      }

      // Store shipping address in session storage for recovery
      sessionStorage.setItem(
        "shippingAddress",
        JSON.stringify(shippingAddress)
      );

      // Create order and initialize payment in one request
      const orderResult = await createOrder({
        shippingAddress,
        cartId,
      });

      if (!orderResult.success) {
        toast.error(orderResult.message || "Failed to create order");
        return;
      }

      // Redirect to payment page with order ID
      router.push(`/checkout/payment/${orderResult.orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateShippingAddress = (address: ShippingAddress): boolean => {
    return Object.values(address).every((value) => value.trim().length > 0);
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
        {isLoading ? "Processing..." : "Continue to Payment"}
      </Button>
    </form>
  );
}
