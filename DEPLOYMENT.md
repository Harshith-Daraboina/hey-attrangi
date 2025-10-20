# Vercel Deployment Guide for Attrangi Web

## Pre-deployment Setup ✅

Your project is now configured to ignore TypeScript and ESLint errors during Vercel deployment.

### Changes Made:
1. **next.config.ts** - Added `ignoreBuildErrors: true` for TypeScript and `ignoreDuringBuilds: true` for ESLint
2. **.vercelignore** - Created to exclude unnecessary files from deployment

## Deployment Steps:

### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to your project directory
cd hey-attrangi-copy

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set up project settings
# - Deploy
```

### Option 2: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

## Environment Variables (if needed):
If you have any environment variables, add them in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add your variables (DATABASE_URL, NEXTAUTH_SECRET, etc.)

## Build Configuration:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (includes Prisma generate)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

## Notes:
- TypeScript and ESLint errors will be ignored during build
- Prisma will generate client before build
- Images in `/public/images/` will be served correctly
- All static assets will be optimized

## Post-deployment:
- Check your domain is working
- Test all pages and functionality
- Monitor build logs for any issues

Your project is ready for Vercel deployment! 🚀
