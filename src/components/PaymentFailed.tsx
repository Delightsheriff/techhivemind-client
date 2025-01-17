import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PaymentFailed() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="mb-4">
        We&apos;re sorry, but there was an issue processing your payment. Please
        try again or contact support.
      </p>
      <Link href="/orders">
        <Button variant="outline">View Orders</Button>
      </Link>
    </div>
  );
}
