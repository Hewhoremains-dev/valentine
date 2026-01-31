import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    // Désactive ESLint pendant le build
    ignoreDuringBuilds: true,
    
  },
  typescript: {
    ignoreBuildErrors: true, // À utiliser en dernier recours !
  },
  reactStrictMode: false, // Désactive les vérifications React
};

export default nextConfig;
