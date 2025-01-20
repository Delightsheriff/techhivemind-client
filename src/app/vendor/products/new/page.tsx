"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/actions/productActions";
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

export default function NewProductPage() {
  const router = useRouter();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [onSale, setOnSale] = useState(false);

  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin?redirect=/vendor/products/new");
      return;
    }
  }, [isAuthenticated, router]);

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
    setIsLoading(true);

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

      const result = await createProduct(formData);

      if (result.success) {
        toast.success("Product created successfully");
        router.push("/vendor");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to create product");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </Label>
          <Input id="name" name="name" required className="mt-1" />
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
          <Select name="category" required>
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
                  <span>Upload images</span>
                  <Input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                    required
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
                <Image
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-24 w-24 object-cover rounded-md"
                />
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
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
