"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, Trash, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useWishListStore } from "@/store/WishListStore";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface WishlistDialogProps {
  isAuthenticated: boolean;
}

export default function WishlistDialog({
  isAuthenticated,
}: WishlistDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { items, isLoading, error, removeFromWishList } = useWishListStore();
  const router = useRouter();

  // Effect to handle navigation changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleNavigate = (id: string) => {
    setIsOpen(false); // Close dialog before navigating
    router.push(`/product/${id}`);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Heart
            className={`h-5 w-5 ${
              items?.length > 0 ? "fill-red-500 text-red-500" : ""
            }`}
          />
          <span className="sr-only">Open wishlist</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Wishlist</DialogTitle>
          <DialogDescription>
            Items you&apos;ve saved for later
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!isAuthenticated ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Please log in to view your wishlist
              </p>
              <Button className="mt-4" asChild>
                <Link href={`/auth/signin?redirect=${pathname}`}>Sign In</Link>
              </Button>
            </div>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : items?.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
              Your wishlist is empty
            </p>
          ) : (
            <>
              {items?.map((item) => (
                <div
                  key={item?._id}
                  onClick={() => handleNavigate(item._id)} // Navigate when clicked
                  className="flex items-center py-4 border-b"
                >
                  {/* Product Image */}
                  <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-4 relative">
                    <Image
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      quality={100}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.onSale
                        ? formatPrice(item.salePrice)
                        : formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isLoading}
                    onClick={() => removeFromWishList(item._id)}
                    className="ml-2"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
