"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/domain/schemas";
import type { ResetPasswordInput } from "@/domain/schemas";
import { Button, Input } from "@/components/ui";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    // Mock network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#111827] mb-2">Set New Password</h1>
        <p className="text-sm text-[#6B7280]">
          Please enter your new password below.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
        {isSuccess ? (
          <div className="text-center py-6">
            <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-[#111827] mb-2">
              Password reset successful
            </h2>
            <p className="text-sm text-[#6B7280] mb-6">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <Link href="/login">
              <Button className="w-full">Sign In</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              autoComplete="new-password"
            />

            <Input
              label="Confirm New Password"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
            />

            <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
