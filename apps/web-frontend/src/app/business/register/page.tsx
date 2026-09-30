"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { businessRepository } from "@/repositories";
import { useAuthStore } from "@/stores/authStore";

export default function BusinessRegistrationPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    phone: user?.phone || "",
    email: user?.email || "",
    location: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await businessRepository.createBusiness(form);
      setSuccess(true);
    } catch (registrationError) {
      setError(
        registrationError instanceof Error
          ? registrationError.message
          : "Unable to register the business.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!user)
    return (
      <main className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#111827]">
          Sign in to register a business
        </h1>
        <Link
          href="/login"
          className="mt-6 inline-block text-[#0D6E6E] hover:underline"
        >
          Go to sign in
        </Link>
      </main>
    );
  if (success)
    return (
      <main className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#111827]">
          Business submitted
        </h1>
        <p className="mt-3 text-[#6B7280]">
          Your shop is pending admin approval.
        </p>
        <Button className="mt-6" onClick={() => router.push("/")}>
          Return home
        </Button>
      </main>
    );
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-[#111827]">
        Register your business
      </h1>
      <p className="mt-2 text-[#6B7280]">Submit your shop for admin review.</p>
      <form
        onSubmit={submit}
        className="mt-8 space-y-4 rounded-xl border border-[#E5E7EB] bg-white p-6"
      >
        <Input
          label="Business name"
          required
          value={form.name}
          onChange={update("name")}
        />
        <Input
          label="URL slug"
          required
          value={form.slug}
          onChange={update("slug")}
          placeholder="my-sweet-shop"
        />
        <label className="block text-sm font-medium text-[#374151]">
          Description
          <textarea
            required
            value={form.description}
            onChange={update("description")}
            className="mt-1 min-h-28 w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5"
          />
        </label>
        <Input
          label="Phone"
          required
          value={form.phone}
          onChange={update("phone")}
        />
        <Input
          label="Business email"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
        />
        <Input
          label="Location"
          required
          value={form.location}
          onChange={update("location")}
        />
        {error && (
          <p
            className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit for review"}
        </Button>
      </form>
    </main>
  );
}
