"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { CartItem } from "@/types/product";

const URL = process.env.NEXT_PUBLIC_API_URL;

// Get the access token from the session
async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    throw new Error("Unauthorized: Please log in.");
  }
  return session.accessToken;
}

// Fetch the cart items
export async function fetchCart() {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}cart/get`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  const data = await response.json();
  return data.cart;
}

// Add an item to the cart
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
  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }
  return { success: true };
}

// Remove an item from the cart
export async function removeFromCart(item: CartItem) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}cart/remove`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: item.product._id }),
  });
  if (!response.ok) {
    throw new Error("Failed to remove item from cart");
  }
  return { success: true };
}

// Update the quantity of an item in the cart
export async function updateQuantity(item: CartItem) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}cart/update`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: item.product._id,
      quantity: item.quantity,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to update item quantity");
  }
  return { success: true };
}

// Clear the cart
export async function clearCart() {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}cart/clear`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }
  return { success: true };
}
