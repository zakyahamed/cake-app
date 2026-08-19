import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Marketplace — Discover Local Sri Lankan Businesses",
    template: "%s | Marketplace",
  },
  description:
    "Discover and shop from the best local businesses in Sri Lanka. Browse products, book services, and connect with your community — all in one place.",
  keywords: ["Sri Lanka", "local businesses", "marketplace", "shop", "services", "Colombo"],
  openGraph: {
    type: "website",
    locale: "en_LK",
    title: "Marketplace — Discover Local Sri Lankan Businesses",
    description:
      "Discover and shop from the best local businesses in Sri Lanka.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
