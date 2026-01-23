# Deployment Guide

## Quick Deploy to Render (Static Site)

### Step 1: Prepare for Deployment
```bash
# Test production build locally
npm run build
```

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 3: Deploy on Render
1. Go to https://render.com
2. Sign up/Login
3. Click "New +" → "Static Site"
4. Connect your GitHub repository
5. Configure:
   - **Name**: foodhub
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Click "Create Static Site"

### Step 4: Custom Domain (Optional)
- Add your domain in Render dashboard
- Update DNS records as instructed

## Environment Variables (if using Supabase)

In Render dashboard, add:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

## Alternative Hosting Options

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## Cost
- **Render Static Site**: FREE
- **Supabase**: FREE tier (500MB database, 2GB bandwidth)
- **Total**: $0/month for small projects

Your app will be live at: `https://foodhub.onrender.com`
