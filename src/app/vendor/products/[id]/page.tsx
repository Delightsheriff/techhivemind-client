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
  { value: "drones_&_cameras", label: "Drones & Cameras" },
  { value: "smartphones", label: "Smartphones" },
  { value: "headphones", label: "Headphones" },
  { value: "speakers", label: "Speakers" },
  { value: "wearable_tech", label: "Wearable Tech" },
  { value: "tv_&home_cinema", label: "TV & Home Cinema" },
];

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [onSale, setOnSale] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const result = await getOneProduct(params.id);
      if (result.success) {
        setProduct(result.product);
        setImagesPreviews(result.product.images);
        setOnSale(result.product.onSale);
      } else {
        toast.error(result.message);
      }
      setIsLoading(false);
    }

    fetchProduct();
  }, [params.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    setSelectedImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagesPreviews(previews);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.delete("images");
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      // Handle onSale and salePrice
      formData.set("onSale", onSale.toString());
      if (!onSale) {
        formData.delete("salePrice");
      }

      const result = await updateProduct(params.id, formData);

      if (result.success) {
        toast.success("Product updated successfully");
        router.push("/vendors");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update product");
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

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
          <Select name="category" defaultValue={product.category} required>
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
          {imagesPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {imagesPreviews.map((preview, index) => (
                <div key={index} className="relative h-24 w-24">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
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
    </div>
  );
}
