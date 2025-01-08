import Image from "next/image";
import Link from "next/link";
import todays from "../../public/todays-special.png";

export default function TodaySpecial() {
  return (
    <div className="w-full container mx-auto grid grid-cols-1 lg:grid-cols-2">
      {/* Content Box */}
      <div className="bg-white p-4 lg:p-12">
        <div className="max-w-xl py-6">
          <div className="mb-12">
            <p className="text-white bg-tertiary-bg inline-block p-1 px-4 rounded-sm">
              Today&apos;s Special{" "}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold  mt-4 mb-4 leading-tight">
              Best Arial View in Town
            </h2>
            <p className="text-4xl md:text-8xl font-bold  mb-6">
              <span className="text-primary-bg">30% </span> OFF
            </p>
            <p className="text-2xl md:text-3xl font-semibold  mt-4 mb-4 leading-tight">
              on professional camera drones
            </p>
            <p className="font-light my-4 ">
              Limited quantities.
              <br /> See product detail pages for availability.
            </p>
          </div>
          <Link
            className="bg-primary-bg hover:bg-[#6D28D9] mb-3 text-white px-12 py-4 rounded-full text-base font-normal transition-colors duration-200"
            href="#"
          >
            Shop
          </Link>
        </div>
      </div>

      {/* Image Box */}
      <div className="relative h-[50dvh] max-w-full lg:h-full bg-white">
        <Image
          src={todays}
          alt="Headphones and smartwatch on a desk"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
