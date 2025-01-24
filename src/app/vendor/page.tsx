"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { becomeVendor, getVendorProducts } from "@/lib/actions/vendorAction";
import type { Product } from "@/types/product";
import MyProducts from "@/components/myProducts";
import { useRouter } from "next/navigation";

export default function VendorPage() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isVendor = session?.user?.accountType === "vendor";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/auth/signin?redirect=/vendor");
      return;
    }

    // Only fetch products if user is authenticated and is a vendor
    if (isAuthenticated && isVendor) {
      fetchProducts(1);
    } else {
      setIsInitialLoading(false);
    }
  }, [isAuthenticated, isVendor, status, router]);

  const fetchProducts = async (page: number) => {
    try {
      const productsResult = await getVendorProducts(page);
      if (productsResult.success) {
        setProducts((prevProducts) =>
          page === 1
            ? productsResult.products
            : [...prevProducts, ...productsResult.products]
        );
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
      setIsInitialLoading(false);
    }
  };

  const handleBecomeVendor = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await becomeVendor();
      if (result.success) {
        // Update the session with the new user data
        await update({
          ...session,
          user: {
            ...session?.user,
            ...(result?.data?.user ?? {}),
          },
        });

        // Force a page reload to ensure all components update
        window.location.reload();

        toast.success(result.message);
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

  const loadMoreProducts = () => {
    if (currentPage < totalPages && !isLoading) {
      setIsLoading(true);
      fetchProducts(currentPage + 1);
    }
  };

  // Show loading only during initial authentication check
  if (status === "loading" || isInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  // Show error if any
  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Show vendor application form if not a vendor
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

  // Show vendor products if user is a vendor
  return (
    <div className="container mx-auto py-10 px-4">
      {products.length === 0 && !isLoading ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No products found. Add your first product to get started!
          </p>
        </div>
      ) : (
        <MyProducts products={products} />
      )}

      {currentPage < totalPages && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMoreProducts} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more products...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
