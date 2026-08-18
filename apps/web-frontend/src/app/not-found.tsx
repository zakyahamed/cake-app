import Link from "next/link";
import { Frown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F7F8FA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm p-8 sm:p-12 text-center border border-[#E5E7EB]">
        
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Frown className="h-12 w-12 text-gray-400" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-[#111827] mb-2">404</h1>
        <h2 className="text-xl font-bold text-[#374151] mb-4">Page not found</h2>
        
        <p className="text-[#6B7280] mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed or the link is broken.
        </p>

        <Link href="/">
          <Button size="lg" className="w-full h-14 text-base">
            Back to Home
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
