# Soulaimane El Idrissi - Professional Portfolio

**Production-grade Full-Stack Developer portfolio built with modern technologies.**

🔗 **Live Demo**: [Your Vercel URL]

## 🎯 Overview

This is a senior-level, production-ready portfolio showcasing:
- ✅ **3D Interactive Hero** with Three.js (performance-optimized, respects reduced motion)
- ✅ **Multi-language Support** (German/English) with i18next
- ✅ **Dark/Light Mode** with system preference detection
- ✅ **Hierarchical Certificate System** with PDF viewer modals
- ✅ **Animated Project Gallery** with Framer Motion
- ✅ **Responsive Timeline** for experience
- ✅ **SEO-Optimized** with meta tags and OG images
- ✅ **Fully Accessible** with ARIA attributes and keyboard navigation
- ✅ **Performance-Focused** with code splitting and lazy loading

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS Variables (design system)
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: Framer Motion
- **i18n**: react-i18next
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **PDF Viewing**: Native iframe (production-ready)
- **Focus Management**: focus-trap-react

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code with ESLint
```

## 📝 Customization Guide

### 1. Replace Candidate Data

Edit `/public/data/portfolio.json` to update:

**Personal Information**:
```json
{
  "candidate": {
    "name": "Your Name",
    "role": {
      "de": "German title",
      "en": "English title"
    },
    "photo": "/images/your-photo.jpg",
    "youtube_about": "https://youtu.be/YOUR_VIDEO_ID",
    "skills": ["Skill1", "Skill2", ...],
    "contact": {
      "email": "your@email.com",
      "linkedin": "https://linkedin.com/in/yourprofile",
      ...
    }
  }
}
```

**Certificates**: Update certificate groups and standalone certificates with your actual data
**Projects**: Replace with your GitHub repositories and live URLs
**Experience**: Modify timeline entries with your career journey

### 2. Replace Media Files

**Profile Photo**: Replace `/public/images/photo-soulaimane.jpg` with your professional headshot (512x512px recommended)

**Project Screenshots**: Replace files in `/public/images/project-*.jpg` (1024x768px recommended):
- project-ecommerce.jpg
- project-taskmanager.jpg
- project-finance.jpg
- project-portfolio.jpg
- project-quiz.jpg
- project-weather.jpg

**Certificate Thumbnails**: Replace certificate images (512x512px):
- meta-*.jpg
- ibm-*.jpg
- bac.jpg
- telc-b1.jpg
- etc.

**PDF Files**: Add your actual certificate PDFs to `/public/pdfs/`:
- Lebenslauf_Soulaimane.pdf (your CV)
- All certificate PDFs matching the names in portfolio.json

**OG Preview**: Replace `/public/og-preview-soulaimane.png` (1200x630px for social media)

### 3. Update Meta Tags & SEO

Edit `/index.html`:
```html
<title>Your Name - Your Title</title>
<meta name="description" content="Your description" />
<meta property="og:title" content="Your title" />
<meta property="og:description" content="Your description" />
```

### 4. Update Translations

Edit localization files:
- `/src/i18n/locales/en/common.json` - English translations
- `/src/i18n/locales/de/common.json` - German translations

### 5. Customize Design Theme

Edit `/src/index.css` to modify design tokens:
```css
:root {
  --primary: 220 90% 56%;      /* Your brand color */
  --accent: 260 80% 60%;        /* Accent/CTA color */
  --gradient-hero: ...;         /* Custom gradients */
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `/dist` folder to Netlify
3. Configure build command: `npm run build`
4. Configure publish directory: `dist`

### Custom Domain Setup

**Vercel**:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

**DNS Configuration Example**:
```
A     @     76.76.21.21
CNAME www   your-project.vercel.app
```

## 🔒 Security & Performance

### Content Security Policy (CSP)

Consider adding these headers in your deployment platform:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-src https://www.youtube-nocookie.com;
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### Performance Optimizations

- ✅ Three.js dynamically imported (code splitting)
- ✅ Images lazy-loaded with proper dimensions
- ✅ Respects `prefers-reduced-motion` for animations
- ✅ Framer Motion for GPU-accelerated animations
- ✅ Google Fonts preconnected for faster loading

**Target Performance**:
- Lighthouse Score: ≥90 (desktop)
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

### Optimization Tips

1. **Image Optimization**: Use WebP format for smaller file sizes
   ```bash
   # Convert images to WebP
   cwebp input.jpg -o output.webp -q 80
   ```

2. **Disable 3D on Low-End Devices**: Automatically handled via `prefers-reduced-motion`

3. **Bundle Analysis**:
   ```bash
   npm run build
   npx vite-bundle-visualizer
   ```

## 🔄 SEO & Social Media

### Refresh OG Cache

After updating OG image or meta tags:

**Facebook/LinkedIn**:
1. Visit [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter your URL
3. Click "Scrape Again"

**Telegram**:
- Telegram caches previews for 24 hours. Wait or use a URL parameter (e.g., `?v=2`)

**Twitter**:
1. Visit [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter your URL

### Generate New OG Image

Create a 1200x630px image showcasing:
- Your photo
- Name and title
- Key skills or achievements
- Professional background

Save as `/public/og-preview-soulaimane.png`

## 🎨 Design System

The portfolio uses a comprehensive design system defined in:
- **Color Tokens**: `/src/index.css` (HSL format for theme compatibility)
- **Tailwind Config**: `/tailwind.config.ts` (extends design tokens)

**Key Design Principles**:
- Semantic color tokens (never hardcode colors)
- Consistent spacing scale (Tailwind defaults)
- Typography hierarchy (Inter for UI, JetBrains Mono for code)
- Smooth transitions (cubic-bezier easing)
- Accessible contrast ratios (WCAG AA)

## ♿ Accessibility

- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus trap in modals
- ✅ Screen reader friendly
- ✅ High contrast mode support
- ✅ Reduced motion support

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## 📄 License

© 2024 Soulaimane El Idrissi. All rights reserved.

## 🤝 Support

For issues or questions:
- Email: soulaimane.dev@gmail.com
- LinkedIn: [Soulaimane El Idrissi](https://www.linkedin.com/in/soulaimane-idboufker-92aab92aa)
- GitHub: [SOULAIMANEIDBOUFKER](https://github.com/SOULAIMANEIDBOUFKER)

---

**Built with ❤️ using React, TypeScript, Three.js, and Tailwind CSS**
