# Project Preferences

## User Profile
- Language: Arabic (عربي)
- Project type: Luxury romantic websites

## Default Tech Stack (triggered by saying "مرحبا")
When the user says "مرحبا" (hello), always build using these requirements as the foundation:

### Technologies
- Next.js (App Router)
- TypeScript
- TailwindCSS v4
- Framer Motion
- GSAP (with ScrollTrigger)
- shadcn/ui components
- Lucide React icons

### Design Requirements
- Cinematic animations
- Premium dark UI (luxury aesthetic)
- Smooth scrolling (GSAP-based)
- Advanced GSAP effects (scroll-triggered, staggered)
- Floating glowing particles (canvas-based)
- Elegant typography (Playfair Display + Inter)
- Immersive page transitions
- Responsive mobile-first layout
- Apple + Stripe style aesthetics (glassmorphism, minimal, premium)
- Gold (#FFD700) and pink/rose accent colors
- Dark backgrounds (#0a0a0f)
- Gradient text effects
- Glass morphism cards
- Radial gradient ambient lighting

### Project Structure (always scaffold this way)
```
src/
├── app/
│   ├── layout.tsx         (fonts, metadata, globals)
│   ├── page.tsx           (dynamic imports, sections)
│   └── globals.css        (tailwind v4, theme, utilities, animations)
├── components/
│   ├── ui/                (shadcn/ui components)
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── particles.tsx      (floating glowing particles)
│   ├── hero-section.tsx   (cinematic GSAP entrance)
│   ├── story-section.tsx  (scroll-triggered cards)
│   ├── gallery-section.tsx
│   ├── message-section.tsx
│   ├── transition-provider.tsx
│   ├── smooth-scroll.tsx
│   └── footer.tsx
├── hooks/
│   └── use-gsap-animation.ts
└── lib/
    └── utils.ts           (cn utility)
```

### Color Palette
- Background: oklch(0.021 0.004 300) — ultra dark
- Primary (gold): oklch(0.85 0.15 85)
- Secondary (pink/rose): oklch(0.7 0.2 330)
- Text: oklch(0.97 0.01 300)
- Muted: oklch(0.6 0.02 300)
- Card bg: oklch(0.05 0.005 300)

### Key Patterns
- Use `cn()` utility from `@/lib/utils` for class merging
- Use `glass` utility for frosted glass effects
- Use `text-gradient` utility for gradient text
- Use dynamic imports with `ssr: false` for client-heavy components
- Always register GSAP ScrollTrigger plugin
- Use `useGsapAnimation` hook for scroll-triggered GSAP animations
- Use `useRef` + `gsap.context()` for cleanup
- All color values should use oklch for better consistency
