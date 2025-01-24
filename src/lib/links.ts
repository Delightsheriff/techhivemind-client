import { Headphones, Speaker } from "lucide-react";

export const categories = [
  { name: "Shop All", href: "/all" },
  {
    name: "Sale",
    href: "/onsale",
    className: "hover:text-red-500 font-medium",
  },
  { name: "Computers", href: "/computers" },
  { name: "Tablets", href: "/tablets" },
  { name: "Drones & Cameras", href: "/drones_cameras" },
  { name: "Smartphones", href: "/smartphones" },
  { name: "TV & Home Cinema", href: "/tv_home_cinema" },
  { name: "Wearable Tech", href: "/wearable_tech" },
];

export const audioProducts = [
  { name: "Headphones", href: "/headphones", icon: Headphones },
  { name: "Speakers", href: "/speakers", icon: Speaker },
];
