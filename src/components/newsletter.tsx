"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Subscribing email:", email);
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="bg-primary-bg py-16 px-4">
      <div className="max-w-[720px] mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Newsletter</h2>
        <p className="text-white/90 text-base mb-8">
          Sign up to receive updates on new arrivals and special offers
        </p>

        <form onSubmit={handleSubmit} className="group relative">
          <div className="relative flex items-center max-w-[600px] mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Here"
              required
              className={cn(
                "w-full h-[56px] pl-6 pr-36 text-base rounded-full border-0",
                "placeholder:text-gray-500 focus:ring-0 focus:outline-none",
                "transition-shadow duration-200",
                "group-hover:shadow-lg focus:shadow-lg bg-white"
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "absolute right-2 h-[44px] px-8",
                "bg-black hover:bg-black/90 active:bg-black/80",
                "text-white font-medium rounded-full",
                "transition-all duration-200",
                "disabled:opacity-50"
              )}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
