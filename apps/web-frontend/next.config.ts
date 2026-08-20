import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['cakeapp-web-front.loca.lt'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
