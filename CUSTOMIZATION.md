# Customization Guide

Complete guide to personalizing this portfolio for your own use.

## Table of Contents
1. [Personal Information](#personal-information)
2. [Media Files](#media-files)
3. [Content & Text](#content--text)
4. [Design & Theme](#design--theme)
5. [Features Toggle](#features-toggle)

## Personal Information

### Update Portfolio Data

Edit `/public/data/portfolio.json`:

```json
{
  "candidate": {
    "name": "Your Full Name",
    "role": {
      "de": "Your German Title",
      "en": "Your English Title"
    },
    "photo": "/images/your-photo.jpg",
    "youtube_about": "https://youtu.be/YOUR_VIDEO_ID",
    "skills": [
      "HTML", "CSS", "JavaScript", "React", 
      "Add your skills here..."
    ],
    "contact": {
      "linkedin": "https://linkedin.com/in/yourprofile",
      "email": "your@email.com",
      "phone": "+1234567890",
      "whatsapp": "https://wa.me/1234567890?text=Hello",
      "github": "https://github.com/yourusername"
    },
    "downloadables": {
      "lebenslauf_pdf": "/pdfs/Your_CV.pdf"
    }
  }
}
```

### Update Certificates

Replace certificate data with your actual certifications:

```json
{
  "certificate_groups": [
    {
      "id": "your-cert-group",
      "title_de": "German Title",
      "title_en": "English Title",
      "modules": [
        {
          "id": "unique-id",
          "title_de": "Certificate Name (German)",
          "title_en": "Certificate Name (English)",
          "issuer": "Issuing Organization",
          "date": "2024-01",
          "pdf": "/pdfs/your-certificate.pdf",
          "thumbnail": "/images/your-cert-thumb.jpg",
          "short_de": "Short German description",
          "short_en": "Short English description"
        }
      ]
    }
  ]
}
```

### Update Projects

Add your actual projects:

```json
{
  "projects": [
    {
      "id": "project-slug",
      "title": "Project Name",
      "short_description": {
        "de": "German description",
        "en": "English description"
      },
      "tech_tags": ["React", "Node.js", "MongoDB"],
      "github_url": "https://github.com/yourusername/project",
      "live_url": "https://project-demo.com",
      "screenshot": "/images/project-screenshot.jpg"
    }
  ]
}
```

### Update Experience Timeline

Customize your career journey:

```json
{
  "experiences": [
    {
      "id": "exp-1",
      "role_de": "German Job Title",
      "role_en": "English Job Title",
      "company": "Company Name",
      "start": "2023-01",
      "end": "Present",
      "bullets_de": [
        "Achievement 1 in German",
        "Achievement 2 in German"
      ],
      "bullets_en": [
        "Achievement 1 in English",
        "Achievement 2 in English"
      ],
      "awarded_cert_ids": ["cert-id-1", "cert-id-2"]
    }
  ]
}
```

## Media Files

### Profile Photo

**Location**: `/public/images/photo-soulaimane.jpg`

**Requirements**:
- Format: JPG/PNG/WebP
- Size: 512x512px (square)
- Quality: High resolution, professional
- Background: Clean, professional

**Optimization**:
```bash
# Resize and optimize
convert your-photo.jpg -resize 512x512^ -gravity center -extent 512x512 -quality 85 photo-soulaimane.jpg

# Or use online tools:
# - TinyPNG (tinypng.com)
# - Squoosh (squoosh.app)
```

### Project Screenshots

**Location**: `/public/images/project-*.jpg`

**Requirements**:
- Format: JPG/PNG/WebP
- Size: 1024x768px (4:3 aspect ratio)
- Show actual UI, not placeholders

**Naming Convention**:
```
project-ecommerce.jpg
project-taskmanager.jpg
project-yourproject.jpg
```

### Certificate Thumbnails

**Location**: `/public/images/*.jpg`

**Requirements**:
- Format: JPG/PNG
- Size: 512x512px (square)
- Can be badge/logo or document preview

**Examples**:
```
meta-intro-frontend.jpg
ibm-nodejs.jpg
your-certification.jpg
```

### PDF Certificates

**Location**: `/public/pdfs/*.pdf`

**Requirements**:
- Format: PDF
- Size: Reasonable (<5MB each)
- Ensure PDFs are readable and professional

**Important**: Filenames in `/public/pdfs/` must match paths in `portfolio.json`

### YouTube Video

1. Upload your introduction video to YouTube
2. Get the video URL (e.g., `https://youtu.be/YOUR_VIDEO_ID`)
3. Update in `portfolio.json`:
   ```json
   "youtube_about": "https://youtu.be/YOUR_VIDEO_ID"
   ```

**Video Tips**:
- Length: 1-3 minutes ideal
- Content: Who you are, skills, what you're seeking
- Quality: Good lighting, clear audio
- Thumbnail: Professional, engaging

### OG Preview Image

**Location**: `/public/og-preview-soulaimane.png`

**Requirements**:
- Format: PNG/JPG
- Size: 1200x630px (Facebook/LinkedIn OG standard)
- Include: Your photo, name, title, key info

**Tools**:
- Canva (canva.com)
- Figma (figma.com)
- Adobe Express

## Content & Text

### Update Translations

**English** (`/src/i18n/locales/en/common.json`):
```json
{
  "hero": {
    "greeting": "Hi, I'm",
    "cta": "View My Work"
  }
}
```

**German** (`/src/i18n/locales/de/common.json`):
```json
{
  "hero": {
    "greeting": "Hallo, ich bin",
    "cta": "Meine Arbeit ansehen"
  }
}
```

### Update Page Meta

Edit `/index.html`:

```html
<title>Your Name - Your Title</title>
<meta name="description" content="Your professional summary in 150-160 characters" />
<meta name="keywords" content="Your, Key, Skills, Technologies" />
<meta property="og:title" content="Your Name - Your Title" />
<meta property="og:description" content="Brief description for social media" />
```

## Design & Theme

### Change Brand Colors

Edit `/src/index.css`:

```css
:root {
  /* Primary brand color (blue by default) */
  --primary: 220 90% 56%;  /* HSL: Hue Saturation Lightness */
  
  /* Accent/CTA color (purple by default) */
  --accent: 260 80% 60%;
  
  /* Generate complementary colors */
  --primary-glow: 220 90% 70%;
  --accent-glow: 260 80% 75%;
}
```

**Color Picker Tools**:
- Use [HSL Color Picker](https://hslpicker.com/)
- Or convert RGB: `rgb(59, 130, 246)` → `hsl(220, 90%, 56%)`

### Customize Gradients

```css
:root {
  --gradient-hero: linear-gradient(135deg, hsl(220 90% 56% / 0.1), hsl(260 80% 60% / 0.1));
  --gradient-card: linear-gradient(145deg, hsl(0 0% 100%), hsl(220 25% 98%));
}
```

### Change Typography

Edit `index.html` to change fonts:

```html
<!-- Current: Inter + JetBrains Mono -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

<!-- Example: Poppins + Fira Code -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
```

Update `/tailwind.config.ts`:
```typescript
fontFamily: {
  sans: ["Poppins", "system-ui", "sans-serif"],
  mono: ["Fira Code", "monospace"],
}
```

### Modify Animations

Edit animation speeds in `/tailwind.config.ts`:

```typescript
animation: {
  "fade-in": "fade-in 0.5s ease-out",  // Change duration
  "float": "float 3s ease-in-out infinite",
}
```

Disable animations for specific elements:
```tsx
// In component
<div className="hover:scale-105">  // Remove this class
```

## Features Toggle

### Disable 3D Hero

To completely remove Three.js and use static background:

1. Edit `/src/components/Hero3D.tsx`:
```tsx
// Set show3D to always false
const [show3D, setShow3D] = useState(false);
```

2. Or replace entire Hero3D with simpler version

**Benefits**: Faster load, better compatibility, smaller bundle

### Disable Dark Mode

1. Remove theme toggle from Navbar:
```tsx
// Comment out or remove in Navbar.tsx
<Button variant="ghost" size="icon" onClick={toggleTheme}>
  {/* ... */}
</Button>
```

2. Set default theme in ThemeContext:
```tsx
// Always return 'light'
const [theme, setTheme] = useState<Theme>('light');
```

### Remove Language Switcher

If you only need one language:

1. Remove toggle from Navbar
2. Set default language in `/src/i18n/config.ts`:
```typescript
lng: 'en',  // or 'de'
```
3. Simplify data structure (use only one language field)

### Modify Sections

**Remove a Section**:
```tsx
// In src/pages/Index.tsx, comment out:
<SkillsGrid skills={data.candidate.skills} />
```

**Reorder Sections**:
```tsx
// Change order in Index.tsx
<Hero3D />
<ProjectsGrid />  // Moved up
<AboutWithYouTube />
<SkillsGrid />
```

**Add New Section**:
1. Create component in `/src/components/YourSection.tsx`
2. Import and add to Index.tsx:
```tsx
import YourSection from '@/components/YourSection';
<YourSection data={data.your_data} />
```

## Testing Your Changes

### Local Testing
```bash
npm run dev
```

### Build Test
```bash
npm run build
npm run preview
```

### Checklist
- [ ] All personal info updated
- [ ] All images replaced and optimized
- [ ] PDFs uploaded and paths correct
- [ ] YouTube video embedded and working
- [ ] All external links tested
- [ ] Translations updated (if bilingual)
- [ ] OG image and meta tags updated
- [ ] Design/colors match your brand
- [ ] Mobile responsive checked
- [ ] Console has no errors

---

**Questions?** Contact: soulaimane.dev@gmail.com
