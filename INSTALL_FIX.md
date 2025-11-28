# Installation Fix Guide

If `npm install` keeps failing, try these solutions in order:

## Solution 1: Use QUICK_INSTALL.cmd (Recommended)

I've created a comprehensive installer:

1. **Double-click** `QUICK_INSTALL.cmd` in Windows Explorer
2. **Wait 3-5 minutes** - don't close the window
3. When it says "SUCCESS!", you're done!

## Solution 2: Install Core Packages First

If bulk install fails, install in stages:

```cmd
REM Step 1: Install Next.js and React
npm install next@^14.0.4 react@^18.2.0 react-dom@^18.2.0 --legacy-peer-deps

REM Step 2: Install TypeScript and config
npm install typescript@^5.3.3 @types/node@^20.10.5 @types/react@^18.2.45 @types/react-dom@^18.2.18 --legacy-peer-deps

REM Step 3: Install styling
npm install tailwindcss@^3.3.6 postcss@^8.4.32 autoprefixer@^10.4.16 --legacy-peer-deps

REM Step 4: Install remaining dependencies
npm install --legacy-peer-deps
```

## Solution 3: Minimal Installation

Install only what's needed to run:

```cmd
npm install next react react-dom typescript --legacy-peer-deps
npm install tailwindcss postcss autoprefixer --legacy-peer-deps
npm install better-sqlite3 bcryptjs jsonwebtoken --legacy-peer-deps
npm install lucide-react framer-motion react-hot-toast --legacy-peer-deps
```

Then install dev dependencies:
```cmd
npm install --save-dev @types/node @types/react @types/react-dom @types/better-sqlite3@^7.6.13 --legacy-peer-deps
```

## Solution 4: Use Yarn Instead

If npm keeps failing, try Yarn:

```cmd
npm install -g yarn
yarn install
```

## Solution 5: Check for Specific Errors

Run with verbose output to see exact error:

```cmd
npm install --legacy-peer-deps --verbose > install-log.txt 2>&1
```

Then check `install-log.txt` for the specific error.

## Common Issues & Fixes

### Issue: "EPERM" or "EBUSY" errors
**Fix:** Close all programs, restart computer, try again

### Issue: "ETIMEDOUT" errors  
**Fix:** Check internet connection, try different network

### Issue: "ENOENT" errors
**Fix:** Run as Administrator, check file permissions

### Issue: Out of memory
**Fix:** Close other programs, increase Node memory:
```cmd
set NODE_OPTIONS=--max-old-space-size=4096
npm install --legacy-peer-deps
```

## Verify Installation

After installation, check:

```cmd
dir node_modules\next
dir node_modules\react
```

Both should exist. If they do, installation succeeded!

## Start Server

Once installed:

```cmd
npm run dev
```

Then open: **http://localhost:3004**

---

**Current Status:** Installation running in background  
**Recommended:** Use `QUICK_INSTALL.cmd` for easiest installation


