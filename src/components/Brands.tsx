import Image from "next/image";

export default function Brand() {
  const brands = [
    { name: "ZODIAC", alt: "Zodiac brand logo" },
    { name: "ZORO", alt: "Zoro brand logo" },
    { name: "PJK", alt: "PJK brand logo" },
    { name: "GXL", alt: "GXL brand logo" },
    { name: "HORIZON", alt: "Horizon brand logo" },
  ];

  return (
    <section className="py-12 px-4  bg-white container mx-auto mb-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center p-4 rounded-sm border hover:shadow-lg transition-shadow"
            >
              <Image
                src={`/${brand.name.toLowerCase()}.png`}
                alt={brand.alt}
                width={200}
                height={70}
                className="h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
