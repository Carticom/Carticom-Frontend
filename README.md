# 🚀 Carticom - The Commerce Operating System for Africa

<div align="center">

![Carticom Logo](public/image/carticom_logo.png)

**Build, sell, and scale your business across Africa — all from one powerful platform.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion)

</div>

## 📋 Overview

Carticom is a next-generation e-commerce platform designed specifically for the African market. It provides merchants with everything they need to create online stores, accept payments (global & local), manage orders, automate support with AI, and scale their business across borders.

### ✨ Key Features

- **🛒 Online Store** — Go live instantly with a beautiful, customizable storefront
- **💳 Smart Payments** — 100+ payment methods including local African options
- **🛡️ Buyer Protection** — Secure escrow system for trusted transactions
- **🤖 AI Assistant** — 24/7 intelligent customer support automation
- **📊 Analytics** — Real-time insights into your business performance
- **🌍 Global Sales** — Cross-border commerce tools built for African merchants

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion 12** | Animation & gesture library |
| **Lucide React** | Icon library |
| **ShadCN UI** | Accessible component primitives |
| **React Query** | Server state management |
| **Zustand** | Client state management |
| **React Hook Form + Zod** | Form validation |
| **Radix UI** | Headless UI primitives |

## 🚦 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Carticom/Carticom-Frontend.git
cd Carticom-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result (local dev).
The live app runs at [https://carticom.vercel.app](https://carticom.vercel.app).

### Available Scripts

```bash
npm run dev        # Start development server (Turbopack)
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## 📁 Project Structure

```
carticom-frontend/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page (Landing Page)
├── components/
│   ├── common/             # Shared components (Navbar, Container)
│   ├── marketing/          # Landing page sections
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Features.tsx    # Features grid
│   │   ├── Escrow.tsx      # Escrow section
│   │   ├── AI.tsx          # AI automation section
│   │   ├── Analytics.tsx   # Analytics section
│   │   ├── Pricing.tsx     # Pricing plans
│   │   ├── Testimonials.tsx# Customer testimonials
│   │   ├── FAQ.tsx         # Frequently asked questions
│   │   ├── CTA.tsx         # Call to action
│   │   └── Footer.tsx      # Site footer
│   └── ui/                 # ShadCN UI primitives
├── lib/
│   └── utils.ts            # Utility functions
├── public/
│   ├── image/              # Static images
│   └── ...                 # Other public assets
└── ...config files
```

## 🎨 Landing Page Sections

The landing page is composed of the following sections:

1. **Navbar** — Fixed navigation with logo, links, login, and CTA
2. **Hero** — Main headline with stats, feature cards, and dual CTAs
3. **Features** — Product feature highlights
4. **Escrow** — Secure payment escrow details
5. **AI** — AI-powered automation showcase
6. **Analytics** — Business intelligence tools
7. **Pricing** — Tiered pricing plans
8. **Testimonials** — Customer success stories
9. **FAQ** — Frequently asked questions
10. **CTA** — Final call-to-action banner
11. **Footer** — Site footer with links and contact

## 🧭 Routes

The application uses the following route structure:

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/features` | Features page |
| `/pricing` | Pricing page |
| `/about` | About Carticom |
| `/contact` | Contact page |
| `/login` | User login |
| `/register` | User registration |
| `/demo` | Book a demo |
| `/solutions/ecommerce` | E-commerce solution |
| `/solutions/global` | Global sales solution |
| `/solutions/payments` | Payments solution |

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or deploy to any Node.js hosting platform:

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Contact

- **Email**: hello@carticom.com
- **Website**: [carticom.com](https://carticom.com)
- **Location**: Lagos, Nigeria

---

<div align="center">
  <strong>🇳🇬 Built for Africa. Built for the World. 🌍</strong>
</div>