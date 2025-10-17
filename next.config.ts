import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for development in OneDrive folders
  webpack: (config, { isServer }) => {
    // Reduce file system overhead
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay before rebuilding
    };
    return config;
  },
  // Disable output file tracing for OneDrive compatibility
  output: 'standalone',
};

export default nextConfig;
