import { Headphones, Speaker } from "lucide-react";

export const categories = [
  { name: "Shop All", href: "/shop" },
  { name: "Sale", href: "/sale", className: "hover:text-red-500 font-medium" },
  { name: "Computers", href: "/computers" },
  { name: "Tablets", href: "/tablets" },
  { name: "Drones & Cameras", href: "/drones_&_cameras" },
  { name: "Smartphones", href: "/smartphones" },
  { name: "TV & Home Cinema", href: "/tv_&home_cinema" },
  { name: "Wearable Tech", href: "/wearable_tech" },
];

export const audioProducts = [
  { name: "Headphones", href: "/audio/headphones", icon: Headphones },
  { name: "Speakers", href: "/audio/speakers", icon: Speaker },
];
