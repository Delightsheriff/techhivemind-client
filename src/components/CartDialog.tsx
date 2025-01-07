"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CartDialogProps {
  isAuthenticated: boolean;
}

export default function CartDialog({ isAuthenticated }: CartDialogProps) {
  const router = useRouter(); // Initialize useRouter

  const handleLoginRedirect = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>Review your items</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {isAuthenticated ? (
            <div className="text-center text-sm text-muted-foreground">
              Your cart is empty
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Please log in to view your cart
              </p>
              <Button className="mt-2" onClick={handleLoginRedirect}>
                Log In
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
