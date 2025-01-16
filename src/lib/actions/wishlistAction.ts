"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const URL = process.env.NEXT_PUBLIC_API_URL;

async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    throw new Error("Please log in to continue");
  }
  return session.accessToken;
}

// function to fetch the wishlist
export async function fetchWishlist() {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}wishlist/get`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error("Failed to fetch wishlist");
  const data = await response.json();
  return data.wishlist;
}

// function to add a product to the wishlist
export async function addToWishlist(productId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}wishlist/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) throw new Error("Failed to add item");
  return response.json();
}

// function to remove a product from the wishlist
export async function removeFromWishlist(productId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${URL}wishlist/remove`, {
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
