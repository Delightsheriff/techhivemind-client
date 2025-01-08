import Newsletter from "../components/newsletter";
import Brands from "../components/Brands";

export default function Home() {
  return (
    <section className="min-h-[80dvh]  px-4 ">
      <h1 className="text-2xl text-center">Welcome to the TechHiveMind</h1>
      <Brands />
      <Newsletter />
    </section>
  );
}
