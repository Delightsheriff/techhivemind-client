"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

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
      product: result.data,
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
