import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All images are local — no remote patterns needed
  images: {
    formats: ["image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
