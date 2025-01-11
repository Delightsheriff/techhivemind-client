import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  otp: z.tuple([
    z.string().length(1).regex(/^\d$/),
    z.string().length(1).regex(/^\d$/),
    z.string().length(1).regex(/^\d$/),
    z.string().length(1).regex(/^\d$/),
    z.string().length(1).regex(/^\d$/),
    z.string().length(1).regex(/^\d$/),
  ]),
  email: z.string().email("Invalid email address"),
});

export type OtpFormData = z.infer<typeof otpSchema>;
