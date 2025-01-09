import Newsletter from "../components/newsletter";
import Brands from "../components/Brands";
import TodaySpecial from "@/components/TodaySpecial";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <section className="min-h-[80dvh]  px-4 ">
      <Hero />
      <TodaySpecial />
      <Brands />
      <Newsletter />
    </section>
  );
}
