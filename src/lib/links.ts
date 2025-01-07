import { Headphones, Speaker } from "lucide-react";

export const categories = [
  { name: "Shop All", href: "/shop" },
  { name: "Sale", href: "/sale", className: "hover:text-red-500 font-medium" },
  { name: "Computers", href: "/computers" },
  { name: "Tablets", href: "/tablets" },
  { name: "Drones & Cameras", href: "/drones-cameras" },
  { name: "Mobile", href: "/mobile" },
  { name: "TV & Home Cinema", href: "/tv-cinema" },
  { name: "Wearable Tech", href: "/wearables" },
];

export const audioProducts = [
  { name: "Headphones", href: "/audio/headphones", icon: Headphones },
  { name: "Speakers", href: "/audio/speakers", icon: Speaker },
];
