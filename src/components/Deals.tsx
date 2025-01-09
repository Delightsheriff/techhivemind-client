import Image from "next/image";
import Link from "next/link";
import img1 from "../../public/rediphone.jpg";
import img2 from "../../public/take-sounds headphone.jpg";

export default function Deals() {
  return (
    <section className="container mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Holiday Deals Banner */}
        <div className="relative overflow-hidden  min-h-[450px] flex flex-col justify-center">
          <Image
            src={img1}
            alt="Red background with iPhone"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 p-8">
            <p className="text-lg text-white mb-2">Holiday Deals</p>
            <h2 className="text-5xl font-bold text-white mb-2">
              Up to
              <br />
              30% off
            </h2>
            <p className="text-xl text-white mb-6">
              Selected Smartphone Brands
            </p>
            <Link
              href="#"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors hover:bg-transparent border border-white hover:text-white"
            >
              Shop
            </Link>
          </div>
        </div>

        {/* Headphones Banner */}
        <div className="relative overflow-hidden  min-h-[450px] flex flex-col justify-center">
          <Image
            src={img2}
            alt="Purple background with headphones"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 p-8">
            <p className="text-lg text-white mb-2">Just In</p>
            <h2 className="text-5xl font-bold text-white mb-2">
              Take Your
              <br />
              Sound
              <br />
              Anywhere
            </h2>
            <p className="text-xl text-white mb-6">Top Headphone Brands</p>
            <Link
              href="#"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-transparent border border-white transition-colors hover:text-white"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
