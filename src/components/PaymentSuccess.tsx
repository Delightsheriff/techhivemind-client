import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Receipt } from "./Receipt";
import { ReceiptResponse } from "@/types/payment";

interface PaymentSuccessProps {
  paymentData: ReceiptResponse;
}

export function PaymentSuccess({ paymentData }: PaymentSuccessProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="mb-4">
        Thank you for your purchase. Your order has been processed successfully.
      </p>
      <Receipt receipt={paymentData} />

      <Link href="/orders" className="mt-4 inline-block">
        <Button>View Orders</Button>
      </Link>
    </div>
  );
}
