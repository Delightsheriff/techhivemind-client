"use client";

import * as React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Sidebar from "./Sidebar";
import Nav from "./bottomnav";
import WishlistDialog from "./WishlistDialog";
import CartDialog from "./CartDialog";
import SearchDialog from "./SearchDialog";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/CartStore";
import { useWishListStore } from "@/store/WishListStore";

export default function Navbar() {
  const { status } = useSession();
  const pathname = usePathname();

  const isAuthenticated = status === "authenticated";

  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchWishList = useWishListStore((state) => state.fetchWishList);

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
      fetchWishList();
    }
  }, [isAuthenticated, fetchCart, fetchWishList]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sidebar />
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight">
                TechHiveMind
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <SearchDialog />
            <WishlistDialog isAuthenticated={isAuthenticated} />
            <CartDialog isAuthenticated={isAuthenticated} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  disabled={status === "loading"}
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/vendor">Vendor</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/auth/signin?redirect=${pathname}`}
                      className="w-full"
                    >
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <Nav />
    </header>
  );
}
