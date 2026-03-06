import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/fiftyk-offer',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
