import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Temporarily disabled PPR to fix compatibility issue
  // experimental: {
  //   ppr: 'incremental'
  // }  
};

export default nextConfig;
