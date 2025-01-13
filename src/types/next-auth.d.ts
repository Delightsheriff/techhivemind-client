import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: boolean;
    termsAccepted: boolean;
    accountType: string;
    profilePicture?: string;
    refreshToken?: string;
    accessToken: string;
  }

  interface Session {
    user?: User;
    accessToken?: string;
    error?: string;
    accessTokenExpires?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    user: CustomUser;
    error?: string;
  }
}
