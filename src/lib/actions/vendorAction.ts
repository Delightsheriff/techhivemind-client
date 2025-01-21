"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function becomeVendor() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        message: "Please log in to continue",
      };
    }

    const response = await fetch(`${URL}user/become-vendor`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ termsAccepted: true }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to become a vendor",
      };
    }

    return {
      success: true,
      message: result.message || "Successfully became a vendor",
      data: {
        user: result.data.user, // Make sure we return the complete user object
      },
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function getVendorProducts(page: number = 1, limit: number = 12) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        message: "Please log in to continue",
      };
    }

    const response = await fetch(
      `${URL}product/my-products?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
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
      products: result.products,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
