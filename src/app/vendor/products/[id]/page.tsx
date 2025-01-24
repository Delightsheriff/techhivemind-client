"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOneProduct, updateProduct } from "@/lib/actions/productActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  params: Promise<{ id: string }>;
};

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  onSale: boolean;
  salePrice: number;
  images: string[];
}

const categories = [
  { value: "computers", label: "Computers" },
  { value: "tablets", label: "Tablets" },
  { value: "drones_cameras", label: "Drones & Cameras" },
  { value: "smartphones", label: "Smartphones" },
  { value: "headphones", label: "Headphones" },
  { value: "speakers", label: "Speakers" },
  { value: "wearable_tech", label: "Wearable Tech" },
  { value: "tv_home_cinema", label: "TV & Home Cinema" },
];

export default function EditProductPage({ params }: Props) {
  const router = useRouter();
  const { status } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [onSale, setOnSale] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin?redirect=/orders");
      return;
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    async function fetchProduct() {
      const { id: productId } = await params;
      const result = await getOneProduct(productId);
      if (result.success) {
        setProduct(result.product);
        setExistingImages(result.product.images);
        setImagesPreviews(result.product.images);
        setOnSale(result.product.onSale);
        setSelectedCategory(result.product.category);
      } else {
        toast.error(result.message);
      }
      setIsLoading(false);
    }
    fetchProduct();
  }, [params]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }
    setSelectedImages(files);

    // Create new previews for selected files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagesPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { id } = await params;

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      // Only handle images if new ones were selected
      formData.delete("images");
      if (selectedImages.length > 0) {
        selectedImages.forEach((image) => {
          formData.append("images", image);
        });
      } else {
        // If no new images selected, pass existing images
        existingImages.forEach((imageUrl) => {
          formData.append("existingImages", imageUrl);
        });
      }

      // Handle onSale and salePrice
      formData.set("onSale", onSale.toString());
      if (!onSale) {
        formData.delete("salePrice");
      }

      // Add category
      formData.set("category", selectedCategory);

      const result = await updateProduct(id, formData);
      if (result.success) {
        toast.success("Product updated successfully");
        router.push("/vendor");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newPreviews = [...imagesPreviews];
    newPreviews.splice(index, 1);
    setImagesPreviews(newPreviews);

    if (selectedImages.length > 0) {
      const newSelectedImages = [...selectedImages];
      newSelectedImages.splice(index, 1);
      setSelectedImages(newSelectedImages);
    } else {
      const newExistingImages = [...existingImages];
      newExistingImages.splice(index, 1);
      setExistingImages(newExistingImages);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center text-red-600">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Product</CardTitle>
          <CardDescription>
            Update the details below to edit the product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={product.name}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price:
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={product.price}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description:
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={product.description}
                required
                className="mt-1"
                rows={4}
              />
            </div>
            <div>
              <Label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category:
              </Label>
              <Select
                name="category"
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock:
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                defaultValue={product.stock}
                required
                min="0"
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="onSale"
                checked={onSale}
                onCheckedChange={(checked) => setOnSale(checked as boolean)}
              />
              <Label
                htmlFor="onSale"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                On Sale
              </Label>
            </div>
            {onSale && (
              <div>
                <Label
                  htmlFor="salePrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sale Price:
                </Label>
                <Input
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  step="0.01"
                  defaultValue={product.salePrice}
                  className="mt-1"
                  required
                />
              </div>
            )}
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Product Images:
              </Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <Label
                      htmlFor="images"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload new images</span>
                      <Input
                        id="images"
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>
              {imagesPreviews?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {imagesPreviews.map((preview, index) => (
                    <div key={index} className="relative h-24 w-24">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="w-full"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
