import { Card } from "@/components/ui/card";
import { getOneProduct } from "@/lib/actions/productActions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Wrapper from "./wrapper";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: productId } = await params;
  const result = await getOneProduct(productId);

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-500">{result.message}</p>
      </div>
    );
  }

  const { product } = result;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
            {product.onSale && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                Sale
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              {product.onSale ? (
                <>
                  <span className="text-2xl font-bold text-red-500">
                    {formatPrice(product.salePrice!)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Availability:</span>
                <span
                  className={`${
                    product.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex gap-4">
                <Wrapper product={product} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
