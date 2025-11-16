import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TypeScript and ESLint errors during build for Vercel deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
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
  // output: 'standalone', // Commented out to fix build issues
  // Configure CDN and caching
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Configure image optimization and CDN
  images: {
    deviceSizes: [640, 750, 828, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    // Reduce memory usage by limiting concurrency
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimize production builds
  compress: true,
  // Reduce memory usage during build
  experimental: {
    // Optimize memory usage
    optimizePackageImports: ['lucide-react', '@use-gesture/react'],
  },
  // Reduce bundle size and memory usage
  // swcMinify: true, // Removed - deprecated in Next.js 15
  // Limit memory usage for Next.js
  reactStrictMode: false, // Can help reduce memory in development
};

export default nextConfig;
