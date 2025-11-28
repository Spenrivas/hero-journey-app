# Cloudflare Deployment - Git Repository Setup

## Current Status

Your project needs to be in a Git repository before Cloudflare can deploy it.

## Step-by-Step Setup

### Step 1: Initialize Git Repository (If Not Done)

If you haven't initialized Git yet, run:

```cmd
git init
git add .
git commit -m "Initial commit - Hero's Journey App"
```

### Step 2: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click the "+" icon** (top right) → "New repository"
3. **Repository name:** `hero-journey-app` or `find-your-spark`
4. **Description:** "Hero's Journey App - Find Your Spark"
5. **Visibility:** 
   - **Public** (if you want to share)
   - **Private** (if you want it private)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. **Click "Create repository"**

### Step 3: Connect Local Project to GitHub

After creating the repository, GitHub will show you commands. Use these:

```cmd
git remote add origin https://github.com/YOUR_USERNAME/hero-journey-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 4: Repository Name for Cloudflare

When Cloudflare asks for the **Git repository name**, use:

**Format:** `YOUR_USERNAME/hero-journey-app`

**Example:**
- If your GitHub username is `johndoe`, use: `johndoe/hero-journey-app`
- If your GitHub username is `rivas`, use: `rivas/hero-journey-app`

## Alternative Repository Names

You can use any of these names:
- `hero-journey-app`
- `find-your-spark`
- `heros-journey-app`
- `find-your-spark-app`

Just make sure it matches what you created on GitHub!

## Quick Setup Commands

If you haven't set up Git yet, run these in order:

```cmd
# 1. Initialize Git
git init

# 2. Add all files
git add .

# 3. Create first commit
git commit -m "Initial commit - Hero's Journey App"

# 4. Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## For Cloudflare Pages

When connecting to Cloudflare:

1. **Repository:** Select your GitHub account
2. **Repository name:** `YOUR_USERNAME/hero-journey-app` (or whatever you named it)
3. **Branch:** `main` (or `master` if you used that)
4. **Build command:** `npm run build`
5. **Build output directory:** `.next`
6. **Root directory:** `/` (leave blank or use `/`)

## Important Notes

⚠️ **Production Build Issue:** The build currently fails due to Three.js compatibility. For now:

**Option 1:** Deploy development build (for testing)
- Build command: `npm run dev` (won't work for static hosting)

**Option 2:** Temporarily disable 3D page
- Comment out the 3D route for production

**Option 3:** Use Vercel instead (better Next.js support)
- Vercel has better Next.js integration

## Next Steps

1. ✅ Initialize Git (if not done)
2. ✅ Create GitHub repository
3. ✅ Push code to GitHub
4. ✅ Connect to Cloudflare with repository name
5. ⚠️ Fix production build issue (or use workaround)

---

**Repository Name Format:** `username/repository-name`

Example: `rivas/hero-journey-app`

