"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const backgroundImages = ["/hero1.png", "/hero2.png", "/hero3.webp"];

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
    <main className="relative h-[100dvh] overflow-hidden sm:mt-12 md:mt-0">
      {backgroundImages.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`Hero background ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 max-w-3xl py-12  px-8 md:px-12 h-full text-left text-black flex flex-col justify-center">
        <p className="text-xl font-semibold mb-2">Best Prices</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          Incredible Prices on All Your Favorite Items
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl">
          Get more for less on selected brands
        </p>
        <Button asChild className="w-fit">
          <a href="#" className="px-8 py-3 text-lg">
            Shop Now
          </a>
        </Button>
      </div>
    </main>
  );
}
