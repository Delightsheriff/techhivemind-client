import { OtpFormData, SignupFormData } from "../validations/auth-utils";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function signup(data: SignupFormData) {
  console.log(data);
  try {
    const response = await fetch(`${URL}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
      throw new Error(
        result.message || result.error || "An error occurred while signing up"
      );
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while signing up",
    };
  }
}

export async function verifyOtp(data: OtpFormData) {
  console.log(data);
  try {
    const response = await fetch(`${URL}auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
          result.error ||
          "An error occurred while verifying OTP"
      );
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while verifying OTP",
    };
  }
}

export async function resendOtp(email: string) {
  try {
    const response = await fetch(`${URL}auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
          result.error ||
          "An error occurred while resending OTP"
      );
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while resending OTP",
    };
  }
}
