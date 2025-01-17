"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { CreateOrderInput } from "@/types/checkout";

const URL = process.env.NEXT_PUBLIC_API_URL;

async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    throw new Error("Please log in to continue");
  }
  return session.accessToken;
}

export async function createOrder(data: CreateOrderInput) {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${URL}orders/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create order",
      };
    }

    return {
      success: true,
      message: "Order created successfully",
      orderId: result.order.orderId,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
