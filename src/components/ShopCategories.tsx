import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";

export default function ShopCategories() {
  const categories = [
    {
      name: "Computers",
      image: "/computers.jpg",
      href: "/computers",
    },
    {
      name: "Smartphones",
      image: "/mobile.jpg",
      href: "/smartphones",
    },
    {
      name: "Drones & Cameras",
      image: "/drones2.jpg",
      href: "/drones_cameras",
    },
    {
      name: "Sale",
      icon: <Tag className="w-12 h-12 text-white" />,
      href: "/onsale",
      customBg: "bg-purple-600",
    },
    {
      name: "Tablets",
      image: "/tablets.jpg",
      href: "/tablets",
    },
    {
      name: "Best Sellers",
      icon: <span className="text-white text-4xl">★</span>,
      href: "/best_sellers",
      customBg: "bg-black",
    },
    {
      name: "T.V & Home Cinema",
      image: "/t.v&home.jpg",
      href: "/tv_home_cinema",
    },
    {
      name: "Wearable Tech",
      image: "/wearabletech.jpg",
      href: "/wearable_tech",
    },
    {
      name: "Speakers",
      image: "/portablespeaker.jpg",
      href: "/speakers",
    },
    {
      name: "Headphones",
      image: "/headphones.jpg",
      href: "/headphones",
    },
  ];

  return (
    <section>
      <div className="container mx-auto bg-white p-12 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center group"
            >
              <div
                className={`relative w-40 h-40 rounded-full border border-secondary-bg overflow-hidden mb-4 ${
                  category.customBg || "bg-gray-100"
                } flex items-center justify-center`}
              >
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  category.icon
                )}
              </div>
              <h3 className="text-sm font-medium text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
