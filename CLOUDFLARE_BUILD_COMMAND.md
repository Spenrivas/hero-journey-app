# Cloudflare Build Command Fix

## ⚠️ The Problem

`better-sqlite3` is a native module that requires compilation. Cloudflare Pages build environment can't compile it.

## ✅ The Solution

I've made `better-sqlite3` an **optional dependency**. This means:
- ✅ Build won't fail if it can't install
- ✅ Code handles missing database gracefully
- ✅ App will work (database features will be limited)

## 🔧 Cloudflare Build Settings

### Update Your Cloudflare Pages Build Configuration:

**Build command:**
```bash
npm install --legacy-peer-deps --ignore-scripts && npm run build
```

**OR:**
```bash
npm ci --legacy-peer-deps --ignore-scripts && npm run build
```

**Build output directory:** `.next`

**Root directory:** `/` (leave blank)

**Node.js version:** 18 or higher

## 📝 What Changed

1. ✅ Moved `better-sqlite3` to `optionalDependencies` in `package.json`
2. ✅ Updated `lib/db.ts` to handle missing database gracefully
3. ✅ Updated `next.config.js` to exclude better-sqlite3 from build
4. ✅ Code now works even if database isn't available

## 🚀 Next Steps

1. **Update Cloudflare build command** to the one above
2. **Redeploy** - Cloudflare will automatically rebuild
3. **Test** - The build should succeed now!

## ⚠️ Database Limitation

**Note:** Without `better-sqlite3`, database features won't work. For production, consider:

1. **Cloudflare D1** (recommended)
   - SQLite-compatible
   - Works with Cloudflare
   - Free tier available

2. **Supabase** (alternative)
   - PostgreSQL database
   - Easy to integrate
   - Free tier available

3. **Keep better-sqlite3 for local dev only**
   - Works locally
   - Use D1 or Supabase for production

## ✅ Build Should Work Now!

The changes have been pushed to GitHub. Update your Cloudflare build command and redeploy!

---

**Build Command to Use:**
```bash
npm install --legacy-peer-deps --ignore-scripts && npm run build
```

