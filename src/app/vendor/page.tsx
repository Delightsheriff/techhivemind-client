"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { becomeVendor, getVendorProducts } from "@/lib/actions/vendorAction";
import { Product } from "@/types/product";
import MyProducts from "@/components/myProducts";

export default function VendorPage() {
  const { data: session, update } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isVendor = session?.user?.accountType === "vendor";

  // Fetch products with pagination
  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const productsResult = await getVendorProducts(page);
      if (productsResult.success) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...productsResult.products,
        ]);
        setTotalPages(productsResult.totalPages);
        setCurrentPage(productsResult.currentPage);
      } else {
        setError(productsResult.message);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVendor) {
      fetchProducts(1); // Fetch the first page on load
    }
  }, [isVendor]);

  // Handle becoming a vendor
  const handleBecomeVendor = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await becomeVendor();
      if (result.success) {
        await update(result.data);
        toast.success("Successfully became a vendor!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load more products for pagination
  const loadMoreProducts = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!isVendor) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-2xl">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Become a Vendor</h1>
          <div className="prose prose-sm">
            <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
            <div className="space-y-4 text-gray-600 mb-6">
              <p>By becoming a vendor, you agree to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Provide accurate and truthful information about your products
                </li>
                <li>Maintain high quality standards for all products</li>
                <li>Process and ship orders in a timely manner</li>
                <li>Respond to customer inquiries promptly</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain accurate inventory levels</li>
                <li>Accept our commission structure and payment terms</li>
              </ul>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  setTermsAccepted(checked as boolean)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the terms and conditions
              </label>
            </div>

            <Button
              onClick={handleBecomeVendor}
              disabled={isSubmitting || !termsAccepted}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Become a Vendor"
              )}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <MyProducts products={products} />
      {currentPage < totalPages && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMoreProducts} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
