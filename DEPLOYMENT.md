# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

### Step 2: Connect to Vercel
1. Visit [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite configuration
6. Click "Deploy"

**Build Settings** (auto-configured):
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Step 3: Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your domain (e.g., `soulaimane-portfolio.com`)
3. Configure DNS records at your domain registrar:

**Option A - Using Vercel Nameservers (Easiest)**:
```
Update your domain's nameservers to Vercel's nameservers
(Provided in Vercel dashboard)
```

**Option B - Using CNAME/A Records**:
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

4. Wait for DNS propagation (5 minutes to 48 hours)
5. SSL certificate is automatically provisioned by Vercel

## Deploy to Netlify

### Via Netlify Dashboard

1. Build locally:
```bash
npm run build
```

2. Visit [netlify.com](https://netlify.com)
3. Drag and drop the `/dist` folder
4. Done!

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

**Configuration** (netlify.toml):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/your-repo"
}
```

3. Configure vite.config.ts:
```typescript
export default defineConfig({
  base: '/your-repo/',  // Add this for GitHub Pages
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

## Deploy to Custom VPS

### Prerequisites
- Node.js 18+ installed on server
- nginx or Apache
- PM2 for process management (optional but recommended)

### Build Application
```bash
# On your local machine
npm run build

# Transfer dist folder to server
scp -r dist/* user@yourserver:/var/www/portfolio/
```

### Nginx Configuration

Create `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/portfolio;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

Enable site and restart nginx:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Environment Variables

If you add any environment variables, create `.env.production`:

```bash
# .env.production
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

**Important**: Never commit `.env` files to git. Use your deployment platform's environment variable management.

## Post-Deployment Checklist

- [ ] Test all navigation links
- [ ] Verify PDF downloads work
- [ ] Check YouTube video embed
- [ ] Test dark/light mode toggle
- [ ] Verify language switching (DE/EN)
- [ ] Test on mobile devices
- [ ] Check 3D animations (and reduced motion fallback)
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Verify OG image preview (Facebook Debugger)
- [ ] Test all external links (GitHub, LinkedIn, WhatsApp)
- [ ] Confirm Google Fonts loading
- [ ] Check console for errors
- [ ] Test WhatsApp floating button

## Performance Monitoring

### Google Lighthouse
```bash
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

### Web Vitals Target
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s

### Analytics Integration (Optional)

Add Google Analytics to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Issue: 404 on Page Refresh
**Solution**: Configure your hosting to redirect all requests to `index.html` (SPA routing)

### Issue: Images Not Loading
**Solution**: Check file paths are relative to `/public` folder and case-sensitive

### Issue: OG Image Not Updating
**Solution**: 
1. Clear OG cache at Facebook Debugger
2. Wait 24-48 hours for Telegram cache
3. Add `?v=2` parameter to URL to force refresh

### Issue: Slow Initial Load
**Solution**:
1. Enable gzip compression on server
2. Use WebP image format
3. Check bundle size: `npx vite-bundle-visualizer`
4. Ensure Three.js is lazy-loaded

## Continuous Deployment (CI/CD)

### Vercel + GitHub
- Automatic: Push to `main` branch triggers deployment
- Preview: Push to any branch creates preview deployment

### Netlify + GitHub
- Configure in Netlify dashboard
- Auto-deploys on push to `main`

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

**Need Help?** Contact: soulaimane.dev@gmail.com
