<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## ATLAS_EO - Luxury Fashion E-Commerce Platform

### Project Overview
This is a production-ready, scalable luxury e-commerce platform for ATLAS_EO, a global top-tier luxury fashion brand. Built with Next.js, React, TypeScript, and Tailwind CSS.

### Key Features Implemented

#### 1. Design System
- **Strict Color Palette**: Dark Navy (#0B1F3A), Muted Gold (#C6A85B), Off-White (#F4F1EA), Deep Charcoal (#111111)
- **Typography**: Luxury serif for headings (ALL CAPS), clean sans-serif for body
- **No gradients, no neon, minimal animations**
- **Luxury white space and elegant design principles**

#### 2. Pages & Sections
- **Homepage**: Hero section, featured collections, limited drops, editorial storytelling
- **Collections**: Grid layout with filtering by category, size, price, availability
- **Products**: Full shop with advanced search and filtering
- **Product Detail**: Multiple images, zoom, sizes, colors, cart integration
- **Limited Drops**: Countdown timers, exclusive presentation
- **Shopping Cart**: Editable quantities, persistent state
- **Checkout**: 4-step process (Customer > Shipping > Payment > Confirmation)
- **User Authentication**: Login & Register pages
- **User Account**: Profile, orders, wishlist, addresses
- **Drops Detail**: Exclusive drop pages with countdown

#### 3. E-Commerce Features
- **Cart Management**: Add, remove, update quantities with persistent storage
- **Wishlist**: Save favorite items
- **Product Filtering**: By category, size, price range, availability
- **Search**: Search functionality with sorting
- **Product Gallery**: Multiple images, zoom capability
- **Responsive Design**: Mobile-first, fully responsive
- **Order Tracking**: View orders and status
- **Reviews & Ratings**: Product reviews system structure

#### 4. State Management
- **Zustand** for cart, auth, and UI state
- Persistent storage for cart items
- Auth token management
- Notification system

#### 5. Backend Ready
- **API Integration**: Axios client with interceptors
- **API Routes**: Structure ready for backend integration
- **Payment Methods**: Online and Cash on Delivery
- **Shipping Configuration**: Egypt with expansion capability
- **Multi-currency support**: EGP ready, expandable

### Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Axios (API Client)
- React Icons
- React Hot Toast (Notifications)

### File Structure
```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable components
│   ├── layout/            # Header, Footer, Notifications
│   ├── ui/                # Button, Input, Modal, ProductCard
│   └── product/           # Product-specific components
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   ├── constants.ts      # App constants and config
│   └── utils.ts          # Helper functions
├── store/                # Zustand stores
│   ├── cart.ts           # Cart state
│   ├── auth.ts           # Auth state
│   └── ui.ts             # UI state
├── types/                # TypeScript types
└── styles/               # Global CSS
```

### Environment Variables
Required variables (see .env.example):
- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_CURRENCY
- NEXT_PUBLIC_DEFAULT_REGION

### Installation & Setup

1. **Install Node.js** (v18+) from nodejs.org

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Customization Points

1. **Add Real Products**: Replace MOCK_PRODUCTS with API calls
2. **API Integration**: Update endpoints in lib/api.ts
3. **Payment Gateway**: Implement payment processing
4. **Image Upload**: Set up image CDN
5. **Email Service**: Configure email notifications
6. **Database**: Connect to backend database

### Key Components Structure

**Button.tsx**: Primary, secondary, gold, outline variants with sizes
**Input.tsx**: Accessible form inputs with validation
**Modal.tsx**: Generic modal dialog
**ProductCard.tsx**: Reusable product display component
**Header.tsx**: Navigation with mobile menu
**Footer.tsx**: Footer with links and newsletter

### Design Principles
- **Luxury First**: Minimal, elegant, premium spacing
- **Performance**: Optimized images, lazy loading, code splitting
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Scalability**: Modular structure, ready for expansion
- **Global**: Currency, language, shipping structure ready

### API Integration Pattern
All API calls go through `lib/api.ts` with:
- Automatic error handling
- Token management
- Request/response interceptors
- Retry logic with exponential backoff

### Next Steps for Development

1. **Connect Backend**
   - Implement actual API endpoints
   - Set up authentication system
   - Configure payment gateway

2. **Add Database**
   - User management
   - Product catalog
   - Orders
   - Inventory

3. **Setup Deployment**
   - Deploy to Vercel (recommended)
   - Configure CDN
   - Set environment variables

4. **Enhance Features**
   - Add advanced recommendation engine
   - Implement analytics
   - Set up email campaigns
   - Add social integration

### Support & Resources
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- Zustand Docs: https://github.com/pmndrs/zustand
- React Docs: https://react.dev

### Code Style
- TypeScript strict mode enabled
- Functional components only
- Custom hooks for logic
- Descriptive variable names
- Comments for complex logic

### Performance Checklist
- [x] Image optimization with Next.js Image
- [x] Code splitting by route
- [x] Lazy loading for modals
- [x] CSS purging with Tailwind
- [x] Minification in production
- [x] SEO meta tags
- [x] Responsive design
- [x] Accessibility features

---
**Last Updated**: March 5, 2026
**Version**: 1.0.0 (Production Ready)
**Status**: Ready for Backend Integration
