import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TechHiveMind",
    template: "%s | TechHiveMind",
  },
  description:
    "A central place for all tech products, representing a hub where customers can find various tech gadgets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased bg-secondary-bg`}>
        <main className="min-h-dvh">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
