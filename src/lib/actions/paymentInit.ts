"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const URL = process.env.NEXT_PUBLIC_API_URL;

async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    throw new Error("Please log in to continue");
  }
  if (session?.user?.email) {
    throw new Error("Please verify your email to continue");
  }
  if (!session.user) {
    throw new Error("User information is missing");
  }
  return { accessToken: session.accessToken, email: session.user.email };
}

export async function initPayment(orderId: string) {
  try {
    const { accessToken, email } = await getAccessToken();
    const response = await fetch(`${URL}payment/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, email }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to initialize payment",
      };
    }

    return {
      success: true,
      message: "Payment initialized successfully",
      authorization_url: result.authorization_url,
      reference: result.reference,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function verifyPayment(reference: string) {
  const { accessToken } = await getAccessToken();
  const response = await fetch(`${URL}payment/verify?reference=${reference}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: result.message || "Failed to initialize payment",
    };
  }
}
