"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";
import { verifyPayment } from "@/lib/actions/paymentInit";

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
          setVerificationData(result.data);
          setError(false);
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
    return <Loading />;
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
