import Image from "next/image";
import help from "../../public/needhelp.jpg";
import Link from "next/link";

export default function HelpCenter() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-6">
      {/* Content Box */}
      <div className="bg-black flex items-center justify-center p-6 lg:p-12">
        <div className="max-w-xl py-6">
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 leading-tight">
            Need Help? Check <br /> Out Our Help Center
          </h2>
          <p className="text-gray-300 text-base mb-6">
            Get instant answers to your questions with our comprehensive help
            resources. We&apos;re here to ensure you have the best experience
            possible.
          </p>
          <Link
            className="bg-primary-bg hover:bg-[#6D28D9] mb-3 text-white px-6 py-4 rounded-full text-base font-normal transition-colors duration-200"
            href="#"
          >
            Go to Help Center
          </Link>
        </div>
      </div>

      {/* Image Box */}
      <div className="relative h-[300px] lg:h-full bg-white">
        <Image
          src={help}
          alt="Headphones and smartwatch on a desk"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
