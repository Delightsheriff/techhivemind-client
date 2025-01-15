// lib/actions/cartActions.ts
"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { CartItem } from "@/types/product";

const URL = process.env.NEXT_PUBLIC_API_URL;

async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    throw new Error("Please log in to continue");
  }
  return session.accessToken;
}

export async function fetchCart() {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}cart/get`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error("Failed to fetch cart");
  const data = await response.json();
  return data.cart;
}

export async function addToCart(item: CartItem) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}cart/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: item.product._id,
      quantity: item.quantity,
    }),
  });
  if (!response.ok) throw new Error("Failed to add item");
  return response.json();
}

export async function removeFromCart(productId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}cart/remove`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) throw new Error("Failed to remove item");
  return response.json();
}

export async function updateQuantity(productId: string, quantity: number) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}cart/update`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) throw new Error("Failed to update quantity");
  return response.json();
}
