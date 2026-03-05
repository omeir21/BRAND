# 🚀 ATLAS_EO - GitHub & Deployment Guide

## Step 1: Prepare for GitHub

### 1.1 Verify everything is working
```bash
npm run dev
```
Visit `http://localhost:3000` - Should see full website with images ✓

### 1.2 Build for production
```bash
npm run build
npm start
```
Should show "ready on http://localhost:3000" with NO errors ✓

### 1.3 Clean up (optional)
Remove any local test files:
```bash
rmdir /s /q .next
del .env.local
```

---

## Step 2: Initial Git Setup

### 2.1 Initialize Git repository
```bash
cd C:\Users\pc\Desktop\atlas
git init
git add .
git commit -m "Initial commit: ATLAS_EO v1.0.0"
```

### 2.2 Create GitHub repository
1. Go to https://github.com/new
2. Repository name: `atlas-eo`
3. Description: `Global Top-Tier Luxury Fashion E-Commerce Platform`
4. Choose: Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 2.3 Connect local repo to GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/atlas-eo.git
git push -u origin main
```

---

## Step 3: GitHub Repository Setup

### 3.1 Add repository details
1. **Settings** → **General**
   - Add description: "Production-ready luxury fashion e-commerce"
   - Add URL: (your website URL when deployed)

2. **Settings** → **About**
   - Add topics: `nextjs`, `ecommerce`, `luxury`, `typescript`, `tailwindcss`

### 3.2 Enable GitHub Pages (optional)
1. **Settings** → **Pages**
2. Source: Deploy from a branch
3. Branch: `main`, folder: `/(root)`

---

## Step 4: Deploy to Vercel (Recommended)

### Option A: Vercel Dashboard

1. Visit https://vercel.com
2. Click **"New Project"**
3. **Import Git Repository**
   - Select your GitHub `atlas-eo` repo
   - Click "Import"

4. **Configure Project**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-domain.com/api
     NEXT_PUBLIC_CURRENCY=EGP
     NEXT_PUBLIC_DEFAULT_REGION=EG
     ```
   - Click **"Deploy"**

5. **Wait** for deployment (~3-5 minutes)
6. Visit your live site: `https://atlas-eo.vercel.app`

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

---

## Step 5: GitHub Actions (Auto-Deploy)

### Create `.github/workflows/deploy.yml`

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Lint
        run: npm run lint
      
      - name: Deploy
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Get Vercel Secrets
1. Login to Vercel
2. **Account Settings** → **Tokens**
3. Create token, copy to GitHub secrets
4. Get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from Vercel dashboard
5. Add to GitHub: **Settings** → **Secrets and variables** → **Actions**

---

## Step 6: Live Website Checklist

✅ **Functionality**
- [ ] Homepage loads with images
- [ ] Collections filter works
- [ ] Products display correctly
- [ ] Cart adds items
- [ ] Checkout process works
- [ ] All pages responsive on mobile

✅ **Performance**
- [ ] Images load fast
- [ ] No console errors
- [ ] Lighthouse score 90+
- [ ] Page loads under 2 seconds

✅ **SEO**
- [ ] Meta tags correct
- [ ] OG image set
- [ ] Sitemap available
- [ ] Robots.txt configured

---

## Step 7: Custom Domain (Optional)

### Add custom domain to Vercel
1. **Project Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `atlas-eo.com`
4. Follow DNS setup instructions
5. Usually takes 5-30 minutes to propagate

---

## Step 8: Ongoing Maintenance

### Push updates to GitHub
```bash
git add .
git commit -m "Update: [description]"
git push origin main
```

### Monitor deployment
- Vercel Dashboard shows deployment status
- GitHub shows deployment in Actions tab
- Site auto-deploys on every push to `main`

### Rollback if needed
```bash
# View deployment history
vercel logs

# Go back to previous version
# (manual rollback in Vercel dashboard)
```

---

## 📋 Final Checklist

Before going live:

- [ ] All images display correctly
- [ ] No broken links
- [ ] Mobile responsive
- [ ] Forms validated
- [ ] Error handling works
- [ ] Lighthouse score 90+
- [ ] SEO optimized
- [ ] Privacy policy added
- [ ] Terms of service added
- [ ] Contact info available

---

## 🎯 Post-Launch

### Monitor Performance
```bash
# Check Vercel analytics
vercel analytics

# Monitor errors
# Vercel dashboard → Error logs
```

### Update Content
1. Edit files locally
2. `git push origin main`
3. Vercel auto-deploys
4. Live within 1-2 minutes

### Add Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes
3. Test: `npm run dev`
4. Push: `git push origin feature/new-feature`
5. Create Pull Request on GitHub
6. Review and merge to `main`
7. Auto-deployed to Vercel

---

## 🆘 Troubleshooting

### Images not showing
- Check `/public/images/` folder exists
- Run: `node generate-all-images.js`
- Restart server: `npm run dev`

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Ensure `.env` variables are set
- Run `npm run build` locally to test

### Domain not working
- Wait 24-48 hours for DNS propagation
- Check DNS records in registrar
- Verify CNAME/A record points to Vercel

---

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Help](https://docs.github.com)
- [Custom Domain Setup](https://vercel.com/docs/concepts/projects/domains)

---

**Your ATLAS_EO is now production-ready and live on the internet!** 🚀🎉
