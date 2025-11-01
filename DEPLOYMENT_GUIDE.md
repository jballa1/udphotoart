# UDPhotoArt - Deployment Guide

## Quick Start

Your UDPhotoArt website is ready to deploy! Here's how to get it online.

## Recommended: Vercel Deployment (Easiest)

Vercel is created by the Next.js team and provides the best deployment experience.

### Step 1: Prepare Your Repository

```bash
cd /Users/balla/Projects/rigo/udphotoart

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial UDPhotoArt website"

# Create a repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/udphotoart.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/in with your GitHub account
3. Click "Add New Project"
4. Import your `udphotoart` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

**That's it!** Your site will be live at `your-project.vercel.app` in ~2 minutes.

### Step 3: Custom Domain (Optional)

1. Purchase domain (e.g., `udphotoart.com`)
2. In Vercel dashboard → Settings → Domains
3. Add your custom domain
4. Update DNS settings as instructed

## Alternative: Netlify Deployment

### Via Git

1. Push code to GitHub/GitLab
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build your site
npm run build

# Deploy
netlify deploy --prod
```

## Self-Hosting Options

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t udphotoart .
docker run -p 3000:3000 udphotoart
```

### Using PM2 (Node.js Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Build your site
npm run build

# Start with PM2
pm2 start npm --name "udphotoart" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## Environment Variables (If Needed)

Create `.env.local` file:

```env
# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Contact Form (if using backend)
EMAIL_SERVICE_API_KEY=your-api-key
EMAIL_FROM=noreply@udphotoart.com
EMAIL_TO=info@udphotoart.com

# Stripe (for e-commerce)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_SECRET_KEY=sk_xxx
```

## Pre-Deployment Checklist

### Content Updates

- [ ] Replace placeholder images with actual photography
- [ ] Update contact email and phone number
- [ ] Customize "About the Artist" text
- [ ] Add real blog posts
- [ ] Set actual product prices
- [ ] Update social media links

### Configuration

- [ ] Add Google Analytics ID
- [ ] Configure email service for contact form
- [ ] Set up payment gateway (if selling)
- [ ] Test all forms
- [ ] Add proper meta descriptions for SEO

### Testing

- [ ] Test all navigation links
- [ ] Test mobile responsiveness
- [ ] Test gallery lightbox
- [ ] Test contact form
- [ ] Test shop functionality
- [ ] Validate all images load
- [ ] Check performance with Lighthouse

### SEO & Analytics

- [ ] Create `robots.txt`
- [ ] Create sitemap
- [ ] Set up Google Search Console
- [ ] Configure Open Graph images
- [ ] Test social media sharing

## Post-Deployment Tasks

### 1. Set Up Analytics

Add to `app/layout.tsx`:

```tsx
import Script from 'next/script';

// Inside <body> tag:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

### 2. Configure Contact Form Backend

Options:
- **Formspree:** Simple form backend service
- **SendGrid:** Email API service
- **Custom API:** Build with Next.js API routes

Example using Formspree:

```tsx
// In contact/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (response.ok) {
    alert('Message sent successfully!');
  }
};
```

### 3. Set Up E-commerce (Stripe)

Install Stripe:

```bash
npm install @stripe/stripe-js stripe
```

Create checkout session:

```tsx
// app/api/checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items } = await req.json();

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/success`,
    cancel_url: `${req.headers.get('origin')}/shop`,
  });

  return Response.json({ url: session.url });
}
```

### 4. Add Sitemap

Create `app/sitemap.ts`:

```tsx
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://udphotoart.com', lastModified: new Date() },
    { url: 'https://udphotoart.com/gallery', lastModified: new Date() },
    { url: 'https://udphotoart.com/revelations', lastModified: new Date() },
    { url: 'https://udphotoart.com/unspoken', lastModified: new Date() },
    { url: 'https://udphotoart.com/perspectives', lastModified: new Date() },
    { url: 'https://udphotoart.com/blog', lastModified: new Date() },
    { url: 'https://udphotoart.com/shop', lastModified: new Date() },
    { url: 'https://udphotoart.com/contact', lastModified: new Date() },
  ];
}
```

## Performance Optimization

### Image Optimization

Use Next.js Image component (already implemented):
- Automatic lazy loading
- Responsive images
- WebP format conversion
- Blur placeholder

### Caching Strategy

Add to `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [/* ... */],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
};
```

### CDN Integration

For static assets, consider:
- Cloudinary (images)
- Cloudflare (CDN)
- AWS S3 + CloudFront

## Monitoring & Maintenance

### Error Tracking

Options:
- **Sentry:** Real-time error tracking
- **LogRocket:** Session replay
- **Vercel Analytics:** Built-in analytics

### Uptime Monitoring

- **UptimeRobot:** Free uptime monitoring
- **Pingdom:** Advanced monitoring
- **StatusCake:** SSL monitoring

### Regular Updates

```bash
# Update dependencies
npm outdated
npm update

# Check for security issues
npm audit
npm audit fix
```

## Backup Strategy

### Database Backup (if using)
- Set up automated backups
- Store in multiple locations
- Test restore process

### Code Backup
- GitHub/GitLab repository
- Regular commits
- Tag releases

## Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/next.js/discussions

## Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Image Issues

- Ensure image URLs are accessible
- Check `next.config.ts` remotePatterns
- Verify image file sizes (< 10MB recommended)

### Performance Issues

- Run Lighthouse audit
- Check bundle size: `npm run build`
- Optimize images
- Enable CDN

---

**Ready to Deploy?** Start with Vercel for the easiest experience!

**Need Help?** Check the README.md and PROJECT_SUMMARY.md files.
