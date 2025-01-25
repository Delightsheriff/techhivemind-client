"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyPayment } from "@/lib/actions/paymentInit";
import { PaymentFailed } from "@/components/PaymentFailed";
import { PaymentSuccess } from "@/components/PaymentSuccess";
import { Loader2 } from "lucide-react";

export default function VerifyOrderPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationData, setVerificationData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyOrder = async () => {
      const reference = searchParams.get("reference");
      if (reference) {
        try {
          const result = await verifyPayment(reference);
          if (!result.success) {
            setError(true);
            setVerificationData(null);
          } else {
            setVerificationData(result.data);
            setError(false);
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          setError(true);
          setVerificationData(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setError(true);
      }
    };

    verifyOrder();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {!error && verificationData ? (
          <PaymentSuccess paymentData={verificationData} />
        ) : (
          <PaymentFailed />
        )}
      </div>
    </div>
  );
}
