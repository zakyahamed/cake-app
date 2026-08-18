"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/domain/schemas";
import type { RegisterInput } from "@/domain/schemas";
import { useRegister } from "@/features/auth/hooks";
import { Button, Input } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { mutateAsync: registerUser, isPending } = useRegister();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setGlobalError(null);
      await registerUser(data);
      router.push("/");
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
        <h1 className="text-2xl font-bold text-[#111827] mb-2">Create Account</h1>
        <p className="text-sm text-[#6B7280]">
          Join the Marketplace to start discovering local businesses.
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
            label="Full Name"
            placeholder="John Doe"
            {...register("name")}
            error={errors.name?.message}
            autoComplete="name"
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
            autoComplete="email"
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="0771234567"
            {...register("phone")}
            error={errors.phone?.message}
            autoComplete="tel"
            hint="Sri Lankan format, e.g., 0771234567"
          />

          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
          />

          <Button type="submit" className="w-full mt-2" isLoading={isPending}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#0D6E6E] hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
