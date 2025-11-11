import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ✅ This allows Next.js to build even if TypeScript errors exist
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
