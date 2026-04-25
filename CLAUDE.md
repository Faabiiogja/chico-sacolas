# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build locally
```

## Project context

This is a high-conversion landing page for **Chico Sacolas**, a custom bags company targeting small and medium businesses (shops, boutiques, restaurants, events, etc.) in Brazil via paid regional traffic.

**Primary conversion goal**: WhatsApp quote request button.  
**Secondary conversions**: quote form, call-to-action, gallery, service area.

All content is in **Brazilian Portuguese**.

## Stack

- **Astro 6** (static site, no framework integration yet)
- TypeScript strict mode
- Plain CSS (no Tailwind or CSS framework)
- Node >=22.12.0

## Architecture

```
src/
  pages/index.astro       # Single-page landing page
  layouts/Layout.astro    # Base HTML shell with <slot />
  components/             # Astro components (currently boilerplate)
  assets/                 # Static SVGs/images bundled by Astro
public/                   # Files served as-is (favicon, etc.)
```

The project is a single-page landing page — `src/pages/index.astro` is the only page.

## Design system

Defined in `DESIGN.md`. Use these CSS custom properties for all colors:

```css
--color-kraft: #B9824A
--color-kraft-dark: #7A4E2A
--color-cream: #FFF7EC
--color-paper: #F8EFE3
--color-charcoal: #2B2520
--color-brown: #5B3924
--color-orange: #E58A3A
--color-green-whatsapp: #25D366
--color-green-dark: #128C4A
```

Visual direction: kraft paper / artisanal feel, modern and clean, professional but approachable — not luxury. The WhatsApp CTA button must always be highly visible.
