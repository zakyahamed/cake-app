"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/domain/schemas";
import type { LoginInput } from "@/domain/schemas";
import { useLogin } from "@/features/auth/hooks";
import { Button, Input } from "@/components/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const { mutateAsync: login, isPending } = useLogin();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setGlobalError(null);
      await login(data);
      router.push(callbackUrl);
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message);
      } else {
        setGlobalError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[#111827] mb-2">Welcome Back</h1>
        <p className="text-sm text-[#6B7280]">
          Sign in to your Marketplace account to start shopping.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
        {globalError && (
          <div
            className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-[#DC2626] border border-red-100"
            role="alert"
          >
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
            autoComplete="email"
          />

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#374151]"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#0D6E6E] hover:underline"
                tabIndex={-1}
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full mt-2" isLoading={isPending}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#6B7280]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[#0D6E6E] hover:underline"
          >
            Create an account
          </Link>
        </div>

        {/* Development Helper */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 bg-[#F7F8FA] rounded-lg text-xs text-[#6B7280] border border-[#E5E7EB]">
            <p className="font-semibold text-[#374151] mb-1">Dev Account Shortcut:</p>
            <p>Email: customer@example.com</p>
            <p>Password: password</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
