"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OtpFormData, otpSchema } from "@/lib/validations/auth-utils";
import { resendOtp, verifyOtp } from "@/lib/actions/actions";
import toast from "react-hot-toast";

interface OtpVerificationProps {
  onVerified: (redirect: string) => void;
  redirect: string;
  email: string;
}

export default function OtpVerification({
  onVerified,
  redirect,
  email,
}: OtpVerificationProps) {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ["", "", "", "", "", ""],
      email: email,
    },
  });

  const otpWatch = watch("otp");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data: OtpFormData) => {
    try {
      console.log(data);
      const result = await verifyOtp(data);

      if (result.success) {
        toast.success("Email verified successfully!");
        onVerified(redirect);
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred while verifying OTP");
    }
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    resendOtp(email);
    // console.log("Resending OTP");
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      setValue(`otp.${index}` as `otp.${0 | 1 | 2 | 3 | 4 | 5}`, value);
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otpWatch[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-between space-x-2">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-12 text-center text-2xl"
            {...register(`otp.${index}` as `otp.${0 | 1 | 2 | 3 | 4 | 5}`)}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
          />
        ))}
      </div>
      <div>
        <Input type="text" hidden {...register("email")} defaultValue={email} />
      </div>
      {errors.otp && (
        <p className="text-sm text-red-500">Please enter a valid 6-digit OTP</p>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Verifying..." : "Verify OTP"}
      </Button>
      <div className="text-center">
        {canResend ? (
          <Button type="button" variant="link" onClick={handleResend}>
            Resend OTP
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Resend OTP in {countdown} seconds
          </p>
        )}
      </div>
    </form>
  );
}
