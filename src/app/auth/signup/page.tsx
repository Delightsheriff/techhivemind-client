"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import OtpVerification from "./OtpVerification";
import { SignupFormData, signupSchema } from "@/lib/validations/auth-utils";
import { signup } from "@/lib/actions/actions";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const result = await signup(data);
    if (result.success) {
      setUserEmail(data.email);
      setShowOtp(true);
      toast.success("Signup successful! Please verify your email.");
    }
  };

  const handleVerified = async (redirect: string) => {
    toast.success("Account created successfully! Please log in.");
    router.push(`/auth/signin?redirect=${redirect}`);
  };

  return (
    <div className="container max-w-md mx-auto py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showOtp ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
                <FormInput
                  label="Last Name"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>
              <FormInput
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <div className="relative">
                <FormInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  error={errors.password?.message}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
            </form>
          ) : (
            <OtpVerification
              onVerified={handleVerified}
              email={userEmail}
              redirect={redirectTo}
            />
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Already have an account?{" "}
            <Link
              href={`/login?redirect=${redirectTo}`}
              className="text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
