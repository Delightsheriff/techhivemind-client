import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function SearchDialog() {
  return (
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
          <DialogDescription>Search our catalog of products</DialogDescription>
        </DialogHeader>
        <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
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
            {["Laptops", "Smartphones", "Headphones", "Gaming"].map((term) => (
              <Button key={term} variant="secondary" size="sm">
                {term}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
