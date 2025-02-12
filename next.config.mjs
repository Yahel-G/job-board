import path from 'path';
import { fileURLToPath } from 'url';

/** Create __dirname in an ESM context */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yahel-job-board.s3.amazonaws.com',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config, { isServer }) {
    // Alias any require for "punycode" to our shim file.
    config.resolve.alias['punycode'] = path.join(__dirname, 'shim', 'punycode.js');
    return config;
  },
};

export default nextConfig;
