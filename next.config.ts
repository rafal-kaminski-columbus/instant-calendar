import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  partialPrefetching: true,
  cacheComponents: true,
  async redirects() {
    return [{ source: "/", destination: "/inbox", permanent: false }];
  },
};

export default nextConfig;
