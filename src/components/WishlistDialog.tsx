"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WishlistDialogProps {
  isAuthenticated: boolean;
}

export default function WishlistDialog({
  isAuthenticated,
}: WishlistDialogProps) {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Open wishlist</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Wishlist</DialogTitle>
          <DialogDescription>
            Items you&apos;ve saved for later
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {isAuthenticated ? (
            <div className="text-center text-sm text-muted-foreground">
              Your wishlist is empty
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Please log in to view your wishlist
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
