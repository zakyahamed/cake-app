"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/domain/schemas";
import type { ResetPasswordInput } from "@/domain/schemas";
import { Button, Input } from "@/components/ui";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { authRepository } from "@/repositories";
import { CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = searchParams.get("token");
      if (!token) throw new Error("Reset link is missing a token.");
      await authRepository.resetPassword(token, data.password);
      setIsSuccess(true);
    } catch (resetError) {
      setError(
        resetError instanceof Error
          ? resetError.message
          : "Unable to reset password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#111827] mb-2">
          Set New Password
        </h1>
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
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>
            <Link href="/login">
              <Button className="w-full">Sign In</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <p
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}
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
