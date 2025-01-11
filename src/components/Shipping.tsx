import Image from "next/image";

export default function Shipping() {
  const features = [
    {
      icon: "/img1.png",
      title: "Curb-side pickup",
    },
    {
      icon: "/img2.png",
      title: "Free shipping on orders over $50",
    },
    {
      icon: "/img3.png",
      title: "Low prices guaranteed",
    },
    {
      icon: "/img4.png",
      title: "Available to you 24/7",
    },
  ];

  return (
    <section className="w-full bg-white py-8 px-4 mb-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row items-center lg:items-start  rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4 lg:mb-0 lg:mr-4">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-base font-semibold text-center lg:text-left">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
