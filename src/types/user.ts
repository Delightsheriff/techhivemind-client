import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export interface User {
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

export interface Token extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  user: User;
  error?: string;
}

export interface CustomSession extends Session {
  user?: User;
  accessToken?: string;
  error?: string;
  accessTokenExpires?: number;
}
