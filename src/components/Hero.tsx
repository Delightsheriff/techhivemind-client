"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const backgroundImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative h-[100dvh] overflow-hidden ">
      {backgroundImages.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`Hero background ${index + 1}`}
          fill
          quality={100}
          className={`object-cover object-center transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      <div className="container mx-auto h-full flex items-center">
        <div className="relative z-10 max-w-3xl py-12 px-8 md:px-12 text-left text-black">
          <div>
            <p className="text-xl font-semibold mb-2 text-white bg-tertiary-bg inline-block p-1 px-4 rounded-sm">
              Best Prices
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Incredible Prices on All Your Favorite Items
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl">
            Get more for less on selected brands
          </p>
          <Button
            asChild
            className="w-fit bg-primary-bg hover:bg-[#6D28D9] rounded-full transition-colors duration-200"
          >
            <Link href="best_sellers" className="px-8 py-6 text-lg">
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
