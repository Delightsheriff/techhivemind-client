"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { audioProducts, categories } from "@/lib/links";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isAuthenticated] = React.useState(false); // Replace with your auth logic
  const [isMounted, setIsMounted] = React.useState(false);

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
            <Sidebar />
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight">
                TechHiveMind
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search products</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Search Products</DialogTitle>
                  <DialogDescription>
                    Search our catalog of products
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="mt-4 flex gap-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    placeholder="Search for products..."
                    className="flex-1"
                    autoComplete="off"
                  />
                  <Button type="submit">Search</Button>
                </form>
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium">Popular Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Laptops", "Smartphones", "Headphones", "Gaming"].map(
                      (term) => (
                        <Button key={term} variant="secondary" size="sm">
                          {term}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

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
                  <div className="text-center text-sm text-muted-foreground">
                    Your wishlist is empty
                  </div>
                </div>
              </DialogContent>
            </Dialog>

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
                  <div className="text-center text-sm text-muted-foreground">
                    Your cart is empty
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="rounded-full bg-muted p-1">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          John Doe
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="w-full">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <nav className="border-t border-b bg-secondary-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden h-12 items-center justify-between lg:flex">
            <div className="flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-bg",
                    category.className
                  )}
                >
                  {category.name}
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium">
                  Audio
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {audioProducts.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 hover:text-primary-bg"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
