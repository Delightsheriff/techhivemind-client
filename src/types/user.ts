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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  message: string;
}
