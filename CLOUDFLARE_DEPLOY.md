# Cloudflare Pages Deployment Guide

This guide will help you deploy the Hero's Journey app to Cloudflare Pages for testing and sharing.

## Prerequisites

1. A Cloudflare account (free tier works)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard

1. **Log in to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to "Pages" in the sidebar

2. **Create a New Project**
   - Click "Create a project"
   - Connect your Git repository
   - Select the repository containing this project

3. **Configure Build Settings**
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (or the directory containing your project)
   - **Node.js version**: 18 or higher

4. **Environment Variables** (Optional but recommended)
   - Add `JWT_SECRET`: Set a secure random string for JWT token signing
   - Example: Generate with `openssl rand -base64 32`

5. **Deploy**
   - Click "Save and Deploy"
   - Wait for the build to complete
   - Your site will be available at `your-project.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Create a Pages Project**
   ```bash
   wrangler pages project create hero-journey-app
   ```

4. **Deploy**
   ```bash
   npm run build
   wrangler pages deploy .next
   ```

## Important Notes for Cloudflare Deployment

### Database Considerations

⚠️ **SQLite Limitation**: The current setup uses SQLite which stores data locally. For Cloudflare Pages:

1. **For Testing**: SQLite will work but data won't persist between deployments
2. **For Production**: Consider migrating to:
   - Cloudflare D1 (SQLite-compatible, serverless)
   - Supabase
   - PlanetScale
   - Other cloud databases

### Migration to Cloudflare D1 (Recommended)

If you want persistent data on Cloudflare:

1. **Create a D1 Database**
   ```bash
   wrangler d1 create hero-journey-db
   ```

2. **Update wrangler.toml** (create if doesn't exist)
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "hero-journey-db"
   database_id = "your-database-id"
   ```

3. **Update lib/db.ts** to use D1 instead of better-sqlite3

### Environment Variables

Set these in Cloudflare Pages dashboard:
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_VERSION`: 18 (or higher)

### Custom Domain (Optional)

1. In Cloudflare Pages, go to your project
2. Click "Custom domains"
3. Add your domain
4. Follow DNS setup instructions

## Testing the Deployment

After deployment:

1. Visit your Cloudflare Pages URL
2. Test signup/login
3. Test stage navigation
4. Test progress saving
5. Test community features
6. Share the URL with test users

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Cloudflare dashboard

### Database Errors

- SQLite won't work in serverless environment
- Migrate to D1 or external database
- Check database initialization code

### Authentication Issues

- Verify `JWT_SECRET` is set
- Check token expiration settings
- Review API route handlers

## Preview URLs

Cloudflare Pages automatically creates preview URLs for:
- Production deployments
- Pull request previews
- Branch deployments

Share these URLs with test users for feedback!

## Support

For Cloudflare-specific issues:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)







