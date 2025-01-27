"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { ProductResponse } from "@/types/product";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function createProduct(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        message: "Please log in to continue",
      };
    }
    const response = await fetch(`${URL}product/create-product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create product",
      };
    }

    return {
      success: true,
      message: result.message || "Product created successfully",
      product: result.product,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function getOneProduct(productId: string) {
  try {
    const response = await fetch(`${URL}product/one-product/${productId}`);

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch product",
      };
    }

    return {
      success: true,
      product: result.data.product,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        message: "Please log in to continue",
      };
    }

    const response = await fetch(`${URL}product/update-product/${productId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update product",
      };
    }

    return {
      success: true,
      message: result.message || "Product updated successfully",
      product: result.product,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function getProducts(
  category?: string,
  page: number = 1,
  limit: number = 12
): Promise<ProductResponse> {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (category && category !== "all") {
      queryParams.append("category", category);
    }

    const response = await fetch(`${URL}product/products?${queryParams}`);
    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch products",
      };
    }

    return {
      success: true,
      products: result.products || result.cachedProducts?.products,
      totalPages: result.totalPages || result.cachedProducts?.totalPages,
      currentPage: result.currentPage || result.cachedProducts?.currentPage,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function searchProducts(query: string, page = 1, limit = 12) {
  try {
    console.log("query", query);
    const response = await fetch(
      `${URL}product/search?query=${query}&page=${page}&limit=${limit}`
    );
    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch products",
      };
    }

    return {
      success: true,
      products: result.products || result.cachedProducts?.products,
      totalPages: result.totalPages || result.cachedProducts?.totalPages,
      currentPage: result.currentPage || result.cachedProducts?.currentPage,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
