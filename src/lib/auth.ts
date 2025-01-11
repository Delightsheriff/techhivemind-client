import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${URL}auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.message || "Invalid login credentials");
          }

          // Extract necessary data from the response
          const { accessToken, refreshToken, user } = result;

          // Return the data to be stored in the session and token
          return { ...user, accessToken, refreshToken };
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {},
};

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${URL}auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Invalid refresh token");
    }

    return result.accessToken;
  } catch (error) {
    console.error("Error during token refresh:", error);
    return null;
  }
}

export default NextAuth(authOptions);
