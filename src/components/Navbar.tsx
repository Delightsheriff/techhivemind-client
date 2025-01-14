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

export default function Navbar() {
  const [isAuthenticated] = React.useState(false); // Replace with your auth logic
  const [isMounted, setIsMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration issues
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Sidebar */}
            <Sidebar />
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight">
                TechHiveMind
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Dialog */}
            <SearchDialog />

            {/* WIshlist Dialog */}
            <WishlistDialog isAuthenticated={isAuthenticated} />

            {/* Cart Dialog */}
            <CartDialog isAuthenticated={isAuthenticated} />

            {/* Account */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {/* Always show these items */}
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

                {isAuthenticated ? (
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
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

      {/* Bottom Nav */}

      <Nav />
    </header>
  );
}
