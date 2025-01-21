// components/CartDialog.tsx
"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useCartStore } from "@/store/CartStore";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface CartDialogProps {
  isAuthenticated: boolean;
}

export default function CartDialog({ isAuthenticated }: CartDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { items, isLoading, error, updateQuantity, removeFromCart, total } =
    useCartStore();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const tempTotal =
    items?.reduce((sum, item) => {
      if (!item?.product) return sum; // Skip items with missing product data
      const price = item.product.onSale
        ? item.product.salePrice ?? 0
        : item.product.price ?? 0;
      return sum + price * (item.quantity ?? 0);
    }, 0) ?? 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items?.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {!isAuthenticated ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Please sign in to view your cart
              </p>
              <Button className="mt-4" asChild>
                <Link href={`/auth/signin?redirect=${pathname}`}>Sign In</Link>
              </Button>
            </div>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : items?.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
              Your cart is empty
            </p>
          ) : (
            <>
              {items?.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center py-4 border-b"
                >
                  {/* Product Image */}
                  <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-4 relative">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      quality={100}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.product.onSale
                        ? formatPrice(item.product.salePrice)
                        : formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={isLoading || item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      disabled={
                        isLoading || item.quantity >= item.product.stock
                      }
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isLoading}
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="mt-4 flex items-center justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold">
                  {formatPrice(tempTotal ?? total)}
                </span>
              </div>

              <Button className="w-full mt-4" asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
