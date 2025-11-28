#!/bin/bash
# Cloudflare Build Script
# This script handles the build process for Cloudflare Pages

echo "Starting Cloudflare build..."

# Skip better-sqlite3 installation during build
export SKIP_BETTER_SQLITE3=true

# Install dependencies (better-sqlite3 will be skipped)
npm install --legacy-peer-deps --ignore-scripts

# Build the project
npm run build

echo "Build complete!"

