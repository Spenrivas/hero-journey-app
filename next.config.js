/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Exclude better-sqlite3 from build (Cloudflare compatibility)
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('better-sqlite3');
    }
    
    // Fix for Three.js - exclude problematic modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    // Ignore Three.js binary files during build
    config.module.rules.push({
      test: /\.(glb|gltf|bin|wasm)$/,
      type: 'asset/resource',
    });
    
    // Ignore Three.js module parsing issues
    config.ignoreWarnings = [
      { module: /node_modules\/three/ },
      { module: /node_modules\/@react-three/ },
    ];
    
    return config;
  },
  // Skip building better-sqlite3 during build
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
}

module.exports = nextConfig






