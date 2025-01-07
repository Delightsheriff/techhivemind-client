import { audioProducts, categories } from "@/lib/links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Nav = () => {
  return (
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
              <DropdownMenuContent className="w-60 bg-secondary-bg">
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
  );
};

export default Nav;
