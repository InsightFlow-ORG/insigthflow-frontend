import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true
  },
  distDir: 'out',
  // Importante para App Router
  trailingSlash: true
};

export default nextConfig;
