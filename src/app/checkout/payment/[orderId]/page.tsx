"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { initPayment } from "@/lib/actions/paymentInit";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const paymentResult = await initPayment(params.orderId as string);

      if (!paymentResult.success) {
        setError(paymentResult.message || "Payment initialization failed");
        return;
      }

      // Redirect to payment provider
      window.location.href = paymentResult.authorization_url;
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <p className="text-gray-600">
            Click the button below to proceed with your payment securely through
            our payment provider.
          </p>

          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full"
            disabled={isLoading}
          >
            Back to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
