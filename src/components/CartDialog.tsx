// "use client";
// import React from "react";
// import { usePathname } from "next/navigation";
// import { ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import Link from "next/link";

// interface CartDialogProps {
//   isAuthenticated: boolean;
// }

// export default function CartDialog({ isAuthenticated }: CartDialogProps) {
//   const pathname = usePathname();

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="ghost" size="icon" className="shrink-0">
//           <ShoppingCart className="h-5 w-5" />
//           <span className="sr-only">Open cart</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Your Cart</DialogTitle>
//           <DialogDescription>Review your items</DialogDescription>
//         </DialogHeader>
//         <div className="mt-4">
//           {isAuthenticated ? (
//             <div className="text-center text-sm text-muted-foreground">
//               Your cart is empty
//             </div>
//           ) : (
//             <div className="text-center">
//               <p className="text-sm text-muted-foreground">
//                 Please Signin to view your cart
//               </p>
//               <Button className="mt-2" asChild>
//                 <Link href={`/auth/signin?redirect=${pathname}`}>Sign In</Link>
//               </Button>
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
import Link from "next/link";

interface CartDialogProps {
  isAuthenticated: boolean;
}

export default function CartDialog({ isAuthenticated }: CartDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // const router = useRouter();

  // Effect to handle navigation changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                Please Signin to view your cart
              </p>
              <Button className="mt-2" asChild onClick={() => setIsOpen(false)}>
                <Link href={`/auth/signin?redirect=${pathname}`}>Sign In</Link>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
