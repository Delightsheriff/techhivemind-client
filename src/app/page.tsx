import Newsletter from "../components/newsletter";
import Brands from "../components/Brands";
import TodaySpecial from "@/components/TodaySpecial";

export default function Home() {
  return (
    <section className="min-h-[80dvh]  px-4 ">
      <div className="h-20">bnhjk</div>
      <TodaySpecial />
      <Brands />
      <Newsletter />
    </section>
  );
}
