import OrderSummary from "@/app/checkout/OrderSummary";
import CheckoutForm from "./CheckoutForm";

export default function Checkout() {
  return (
    <section className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CheckoutForm />
        <OrderSummary />
      </div>
    </section>
  );
}
