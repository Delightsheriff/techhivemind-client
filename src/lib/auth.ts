import CredentialsProvider from "next-auth/providers/credentials";
import { CustomSession, Token } from "@/types/user";
import { NextAuthOptions, User } from "next-auth";

const URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_EXPIRATION_TIME =
  process.env.TOKEN_EXPIRATION_TIME || 15 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${URL}auth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const result = await response.json();
          console.log(result);

          if (!response.ok) {
            throw new Error(
              result.error || result.message || "Invalid login credentials"
            );
          }
          // Extract necessary data from the response
          const { accessToken, refreshToken, user } = result;
          // Return the data to be stored in the session and token
          return { ...user, accessToken, refreshToken } as User;
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: Token;
      user?: User;
      trigger?: "signUp" | "signIn" | "update";
      session?: CustomSession;
    }) {
      if (user) {
        // Initial sign-in
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
          accessTokenExpires: Date.now() + Number(TOKEN_EXPIRATION_TIME),
        } as Token;
      }

      //sesion update
      // Handle session update
      if (trigger === "update" && session) {
        const updatedToken = {
          ...token,
          user: { ...(token.user as User), ...session.user },
        } as Token;
        return updatedToken;
      }

      //Handle token refresh
      const tokenWithType = token as Token;
      // Token has not expired yet, return it
      if (Date.now() < tokenWithType.accessTokenExpires) {
        return tokenWithType;
      }

      // Token has expired, refresh it
      const refreshedToken = await refreshAccessToken(tokenWithType);
      if (refreshedToken) {
        return refreshedToken;
      }

      // Refresh failed, redirect to login
      return {
        ...tokenWithType,
        error: "RefreshAccessTokenError",
      };
    },
    // Session
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: Token;
    }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export async function refreshAccessToken(token: Token): Promise<Token | null> {
  try {
    const response = await fetch(`${URL}auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to refresh token");
    }

    return {
      ...token,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken || token.refreshToken,
      accessTokenExpires: Date.now() + Number(TOKEN_EXPIRATION_TIME),
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
