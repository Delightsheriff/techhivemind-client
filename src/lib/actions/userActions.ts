"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateProfilePicture(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        message: "Please log in to continue",
      };
    }

    const response = await fetch(`${URL}user/upload/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      return {
        success: false,
        message: "Failed to update profile picture",
      };
    }

    return {
      success: true,
      message: result.message || "Profile picture updated successfully",
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function updateProfile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return {
        success: false,
        message: "Please log in to continue",
      };
    }

    const response = await fetch(`${URL}user/update-user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }
    console.log(result);

    return {
      success: true,
      message: result.message || "Profile updated successfully",
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
