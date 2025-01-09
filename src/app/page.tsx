import Newsletter from "../components/newsletter";
import Brands from "../components/Brands";
import TodaySpecial from "@/components/TodaySpecial";
import Hero from "@/components/Hero";
import Deals from "@/components/Deals";

export default function Home() {
  return (
    <section className="min-h-[80dvh]  px-4 ">
      <Hero />
      <Deals />
      <TodaySpecial />
      <Brands />
      <Newsletter />
    </section>
  );
}
