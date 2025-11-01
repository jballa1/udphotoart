# UDPhotoArt - Fine Art Photography Website

A stunning, modern website for UDPhotoArt featuring fine art photography by Rigo Gonzalez-Nossa. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Philosophy

**"Seizing the Moment"** - Where ideas meet the lens, transforming moments into art.

## Features

- **Homepage**: Immersive hero section with parallax effects and featured collections
- **Recent Revelations**: Latest photography discoveries in a beautiful grid layout
- **The World Through My Lense**: Interactive gallery with category filtering and lightbox viewing
- **Unspoken**: Emotional storytelling through photography with parallax scrolling
- **Captured Perspectives**: Unique viewpoints and philosophical approach to photography
- **Blog**: Photography insights, techniques, and travel stories
- **Shop**: E-commerce integration for prints, photobooks, and digital downloads
- **Contact**: Professional contact form with service offerings

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom components with shadcn/ui patterns
- **Fonts**: Inter (sans-serif) + Cormorant Garamond (serif)
- **Icons**: Lucide React

## Design Principles

1. **Minimalist Elegance**: Clean typography and balanced white space
2. **Image-First**: Photography takes center stage
3. **Smooth Animations**: Subtle, professional motion design
4. **Responsive**: Mobile-first approach with perfect scaling
5. **Performance**: Optimized images and lazy loading
6. **Accessibility**: Semantic HTML and ARIA labels

## Color Palette

- **Background**: Neutral base (white/near-white)
- **Accent**: Warm orange (#FF7F00) - from brand guidelines
- **Text**: Professional blacks and grays
- **Dark Mode**: Supported with automatic theme switching

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The development server will run at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
udphotoart/
├── app/
│   ├── blog/           # Blog listing page
│   ├── contact/        # Contact form and information
│   ├── gallery/        # Main gallery with filtering
│   ├── perspectives/   # Captured Perspectives section
│   ├── revelations/    # Recent Revelations
│   ├── shop/           # E-commerce shop
│   ├── unspoken/       # Emotional storytelling section
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout with fonts
│   └── page.tsx        # Homepage
├── components/
│   ├── ui/             # Reusable UI components
│   ├── navigation.tsx  # Main navigation
│   └── footer.tsx      # Footer component
├── lib/
│   └── utils.ts        # Utility functions
└── public/
    └── images/         # Static images and assets
```

## Key Features Explained

### Navigation
- Fixed header with scroll effect
- Mobile-responsive hamburger menu
- Smooth transitions and animations
- Logo integration with brand colors

### Homepage
- Full-screen hero with parallax scrolling
- Featured collections cards
- About the artist section
- Call-to-action for shop

### Gallery
- Category filtering
- Masonry grid layout
- Lightbox with keyboard navigation
- Smooth animations between states

### Shop
- Product filtering by category
- Size selection for prints
- Modal product details
- Add to cart functionality (ready for integration)

### Contact
- Professional contact form
- Service offerings display
- Social media integration
- Contact information cards

## Customization

### Adding Images

Replace placeholder Unsplash images with actual photography:
1. Add images to `/public/images/`
2. Update image paths in page components
3. Ensure proper optimization and sizing

### Modifying Colors

Edit the accent color in `tailwind.config.ts`:
```typescript
accent: {
  DEFAULT: "hsl(28 100% 50%)", // Current orange
  foreground: "hsl(var(--accent-foreground))",
},
```

### Adding Pages

1. Create new directory in `/app/`
2. Add `page.tsx` file
3. Include Navigation and Footer components
4. Update navigation menu items

## Performance Optimization

- Next.js Image component for automatic optimization
- Lazy loading for images
- Code splitting by route
- Minimal JavaScript bundle
- CSS optimization with Tailwind

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 UDPhotoArt. All rights reserved.

## Contact

For inquiries: info@udphotoart.com

---

**Built with ❤️ for UDPhotoArt**
