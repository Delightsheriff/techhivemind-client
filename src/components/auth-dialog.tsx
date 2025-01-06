// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { sendOTP, verifyOTP, login } from "@/actions/auth";

// interface AuthDialogProps {
//   onSuccess: () => void;
// }

// type AuthStep = "login" | "register" | "otp";

// export function AuthDialog({ onSuccess }: AuthDialogProps) {
//   const [step, setStep] = useState<AuthStep>("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const returnUrl = searchParams.get("returnUrl");

//   const handleSuccess = () => {
//     onSuccess();
//     if (returnUrl) {
//       router.push(returnUrl);
//     }
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const result = await login(email, password);
//       if (result.success) {
//         handleSuccess();
//       } else {
//         setError("Invalid credentials");
//       }
//     } catch (error) {
//       setError("An error occurred");
//     }
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const result = await sendOTP(email);
//       if (result.success) {
//         setStep("otp");
//       } else {
//         setError(result.message);
//       }
//     } catch (error) {
//       setError("An error occurred");
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const result = await verifyOTP(email, otp);
//       if (result.success) {
//         handleSuccess();
//       } else {
//         setError(result.message);
//       }
//     } catch (error) {
//       setError("An error occurred");
//     }
//   };

//   return (
//     <DialogContent className="sm:max-w-md">
//       {step === "login" && (
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//           <p className="text-center text-sm">
//             Don't have an account?{" "}
//             <Button variant="link" onClick={() => setStep("register")}>
//               Register
//             </Button>
//           </p>
//         </form>
//       )}

//       {step === "register" && (
//         <form onSubmit={handleRegister} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <Button type="submit" className="w-full">
//             Send OTP
//           </Button>
//           <p className="text-center text-sm">
//             Already have an account?{" "}
//             <Button variant="link" onClick={() => setStep("login")}>
//               Login
//             </Button>
//           </p>
//         </form>
//       )}

//       {step === "otp" && (
//         <form onSubmit={handleVerifyOTP} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="otp">Enter OTP</Label>
//             <Input
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <Button type="submit" className="w-full">
//             Verify OTP
//           </Button>
//         </form>
//       )}
//     </DialogContent>
//   );
// }
