import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — required for Cloudflare Pages
  output: "export",

  // next/image optimisation requires a server; disable for static export
  images: {
    unoptimized: true,
  },

  // Custom security headers (applied via Cloudflare Pages _headers file instead)
  // headers() is not supported in static export mode
};

export default nextConfig;
