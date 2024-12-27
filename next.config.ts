import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "zj16zhtfqwne7vv9.public.blob.vercel-storage.com",
      }
    ]
  },
  typescript:{
    ignoreBuildErrors: true
  },
  eslint:{
    ignoreDuringBuilds: true
  },
};

export default nextConfig;
