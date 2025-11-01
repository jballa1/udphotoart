# UDPhotoArt - Customization Guide

Quick reference for customizing your website to match your exact needs.

## Changing Colors

### Accent Color (Orange)

Edit `tailwind.config.ts`:

```typescript
accent: {
  DEFAULT: "hsl(28 100% 50%)", // Current: Orange
  foreground: "hsl(var(--accent-foreground))",
},
```

Examples:
- Blue: `"hsl(220 100% 50%)"`
- Purple: `"hsl(270 100% 50%)"`
- Green: `"hsl(140 100% 40%)"`

### Background & Text Colors

Edit `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;      /* White background */
  --foreground: 0 0% 3.9%;      /* Near-black text */
  --muted: 0 0% 96.1%;          /* Light gray */
  --muted-foreground: 0 0% 45.1%; /* Medium gray */
}
```

## Changing Fonts

### Replace Current Fonts

Edit `app/layout.tsx`:

```typescript
import { YourSansFont, YourSerifFont } from "next/font/google";

const sansFont = YourSansFont({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = YourSerifFont({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
```

Popular combinations:
- **Elegant:** Playfair Display + Lato
- **Modern:** Montserrat + Open Sans
- **Classic:** Merriweather + Roboto
- **Minimal:** Space Grotesk + Inter

## Updating Navigation Menu

Edit `components/navigation.tsx`:

```typescript
const navItems = [
  { href: "/", label: "Home" },
  { href: "/your-page", label: "Your Page Name" },
  // Add or remove items here
];
```

## Changing Homepage Content

### Hero Section

Edit `app/page.tsx`:

```typescript
<h1 className="...">
  Your Main {" "}
  <span className="text-accent italic">Headline</span>
</h1>

<p className="...">
  Your tagline or description
</p>
```

### Featured Collections

Find the `featuredCollections` array:

```typescript
{
  title: "Your Collection Name",
  description: "Your description",
  image: "/images/your-image.jpg", // or Unsplash URL
  href: "/your-page",
  icon: YourIcon, // From lucide-react
}
```

## Adding Real Images

### Method 1: Local Images

1. Add images to `/public/images/`
2. Reference them:

```typescript
<Image
  src="/images/your-photo.jpg"
  alt="Description"
  fill
  className="object-cover"
/>
```

### Method 2: External URLs

Update `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-cdn.com',
    },
  ],
},
```

Then use:

```typescript
<Image src="https://your-cdn.com/photo.jpg" ... />
```

## Customizing Gallery

### Change Categories

Edit `app/gallery/page.tsx`:

```typescript
const categories = [
  "All",
  "Your Category 1",
  "Your Category 2",
  "Your Category 3",
];
```

### Add Gallery Images

```typescript
const galleryImages = [
  {
    id: 1,
    category: "Your Category",
    title: "Image Title",
    image: "/images/photo.jpg",
  },
  // Add more...
];
```

## Customizing Blog

### Add Blog Posts

Edit `app/blog/page.tsx`:

```typescript
const blogPosts = [
  {
    id: 1,
    title: "Your Blog Post Title",
    excerpt: "Brief description...",
    image: "/images/blog-image.jpg",
    category: "Your Category",
    author: "Your Name",
    date: "2024-11-01",
    readTime: "5 min read",
    featured: true, // First post only
  },
  // Add more posts...
];
```

## Customizing Shop

### Add Products

Edit `app/shop/page.tsx`:

```typescript
const products = [
  {
    id: 1,
    title: "Product Name",
    category: "Prints", // or "Photobooks", "Digital Downloads"
    image: "/images/product.jpg",
    price: 149, // in dollars
    description: "Product description",
  },
  // Add more products...
];
```

### Change Product Categories

```typescript
const categories = [
  "All",
  "Your Category 1",
  "Your Category 2",
];
```

### Change Print Sizes

```typescript
const sizes = [
  "Small (8x10\")",
  "Your Custom Size",
  "Another Size",
];
```

## Customizing Contact Page

### Update Contact Information

Edit `app/contact/page.tsx`:

```typescript
<a href="mailto:your-email@domain.com">
  your-email@domain.com
</a>

<a href="tel:+1234567890">
  +1 (234) 567-890
</a>

<p>
  Your Location<br />
  Your City, State
</p>
```

### Update Social Media Links

Edit `components/footer.tsx`:

```typescript
<a href="https://instagram.com/your-handle">
  <Instagram />
</a>

<a href="https://facebook.com/your-page">
  <Facebook />
</a>
```

## Adding New Pages

### Step 1: Create Page File

```bash
mkdir app/your-page
touch app/your-page/page.tsx
```

### Step 2: Page Template

```typescript
"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function YourPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Your content here */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl font-bold">
            Your Page Title
          </h1>
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

### Step 3: Add to Navigation

Update `components/navigation.tsx`:

```typescript
const navItems = [
  // ... existing items
  { href: "/your-page", label: "Your Page" },
];
```

## Animation Customization

### Change Animation Speed

```typescript
// Slower
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }} // Increase value
/>

// Faster
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }} // Decrease value
/>
```

### Disable Animations

Remove `motion.` wrapper and use regular div:

```typescript
// From:
<motion.div initial={{ ... }} animate={{ ... }}>

// To:
<div>
```

## SEO Customization

### Update Page Metadata

Each page can have custom metadata:

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Page Title | UDPhotoArt",
  description: "Your page description for search engines",
  keywords: ["photography", "your", "keywords"],
};
```

### Add Open Graph Images

```typescript
export const metadata: Metadata = {
  openGraph: {
    images: ['/images/og-image.jpg'],
  },
};
```

## Mobile Responsiveness

### Tailwind Breakpoints

- `sm:` - Small devices (640px+)
- `md:` - Medium devices (768px+)
- `lg:` - Large devices (1024px+)
- `xl:` - Extra large (1280px+)

Example:

```typescript
<h1 className="text-3xl md:text-5xl lg:text-7xl">
  // Small: 3xl, Medium: 5xl, Large: 7xl
</h1>
```

## Performance Tips

### Lazy Load Images

```typescript
<Image
  src="/image.jpg"
  alt="..."
  loading="lazy" // Lazy load
  quality={85} // Adjust quality (1-100)
/>
```

### Optimize Image Sizes

Use appropriate sizes:
- Hero images: 2000px wide max
- Gallery thumbnails: 800px wide max
- Blog images: 1200px wide max

## Common Customizations

### Change Logo

1. Replace `/public/images/logo.png` with your logo
2. Adjust size in `components/navigation.tsx`:

```typescript
<div className="relative w-16 h-16"> // Change dimensions
```

### Change Footer Content

Edit `components/footer.tsx` - update:
- About text
- Quick links
- Contact information
- Social media links

### Add Loading States

```typescript
const [loading, setLoading] = useState(true);

{loading ? (
  <div>Loading...</div>
) : (
  <div>Content</div>
)}
```

### Add Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

{error && (
  <div className="text-red-500">{error}</div>
)}
```

## Typography Scale

Current scale in `tailwind.config.ts`:
- `text-xs` - 0.75rem
- `text-sm` - 0.875rem
- `text-base` - 1rem
- `text-lg` - 1.125rem
- `text-xl` - 1.25rem
- `text-2xl` - 1.5rem
- `text-3xl` - 1.875rem
- `text-4xl` - 2.25rem
- `text-5xl` - 3rem
- `text-6xl` - 3.75rem
- `text-7xl` - 4.5rem
- `text-8xl` - 6rem

## Need More Help?

- Check `README.md` for technical details
- See `PROJECT_SUMMARY.md` for overview
- Read `DEPLOYMENT_GUIDE.md` for deployment
- Visit Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs

---

**Pro Tip:** Make small changes and test frequently using `npm run dev`
