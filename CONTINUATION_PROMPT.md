# Carticom Frontend Continuation — Nigeria Launch MVP

## Project Context

**Frontend:** Next.js 16.2.9 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + ShadCN UI (Radix Nova style)
**Backend:** Spring Boot 3.x at `https://backend-kqel.onrender.com` (API prefix `/api/v1`)
**Deployed Frontend:** `https://carticom.vercel.app`

### Existing Configuration
- `.env` already points to the deployed backend (`NEXT_PUBLIC_API_URL=https://backend-kqel.onrender.com`)
- CORS on backend allows: `https://carticom.vercel.app`, `http://localhost:3000`, `http://localhost:5173`
- Auth tokens stored in Zustand (`carticom-auth` localStorage), Axios auto-injects `Authorization: Bearer <token>`

### Color Palette & Theme
- **OKLCH color space** in `app/globals.css` — light (`:root`) and dark (`.dark`) themes
- **Primary gradient:** `from-blue-600 to-cyan-600` (used in badges, logo)
- **Sidebar active:** `bg-blue-50 text-blue-700` (light), `dark:bg-blue-900/30 dark:text-blue-400` (dark)
- **Hover:** `hover:bg-gray-50` / `dark:hover:bg-gray-800`
- **Border radius:** `0.625rem` base, with sm/md/lg/xl/2xl/3xl/4xl scale
- **ShadCN UI components** in `components/ui/` (button, input, avatar, dropdown-menu, label, textarea)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Font:** Geist Sans + Geist Mono

### Architecture
- **State (client):** Zustand (persisted auth store at `features/auth/store/auth.store.ts`)
- **State (server):** TanStack React Query v5 (provider at `components/providers/QueryProvider.tsx`)
- **HTTP:** Axios with auto token injection + 401 auto-refresh (`lib/axios.ts`)
- **DAL:** Generic `BaseRepository<T>` at `lib/dal/repository.ts` with hooks factory at `lib/dal/hooks.ts`
- **Dashboard repos:** 13 repositories at `features/dashboard/repositories/` extending `BaseRepository`
- **Auth service:** `features/auth/services/auth.service.ts` (login, register, logout, refresh, profile)
- **Feature flags in .env:** `NEXT_PUBLIC_ENABLE_ESCROW=false` (disabled for v1), `NEXT_PUBLIC_ENABLE_AI_FEATURES=true`

### Existing Pages
- **Public:** `/` (landing page with Hero, Features, Escrow, AI, Analytics, Pricing, Testimonials, FAQ, CTA, Footer)
- **Auth:** `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`
- **Business Owner Dashboard:** `/dashboard` and 20+ sub-routes (orders/, products/, customers/, payments/, wallet/, analytics/, team/, settings/, etc.)
- **All dashboard pages currently use mock data** from `constants/dashboard.ts` — need real API integration

### What Works
- Auth hooks (`useAuth`, `useInitializeAuth`, `useSessionMonitor`) with Zustand store
- `AuthGuard`, `RoleGuard` components
- Dynamic navbar (public vs authenticated)
- Dashboard shell with sidebar, topbar, theme toggle
- `BaseRepository` pattern with React Query hooks factory
- 13 domain repositories already defined

---

## What Needs to Be Built / Completed

### Phase 1: API Integration — Connect All Business Owner Dashboard Pages

Replace ALL mock data in dashboard pages with real API calls using the existing repositories and hooks.

**Pages to integrate (20+ pages):**
| Page | Backend Endpoint | Repository |
|------|-----------------|------------|
| `/dashboard` — KPI cards, recent orders, quick actions | `GET /api/v1/business-owner/dashboard`, `GET /api/v1/orders/store/{storeId}`, `GET /api/v1/wallet` | `useDashboardStats()`, `ordersRepository`, `walletRepository` |
| `/dashboard/analytics` — revenue, orders, customers, conversion charts | `GET /api/v1/business-owner/analytics/revenue?period=`, `GET /api/v1/business-owner/analytics/orders`, `GET /api/v1/business-owner/analytics/customers` | `analyticsRepository` |
| `/dashboard/products` — CRUD table | `GET/POST /api/v1/products/store/{storeId}`, `PUT/DELETE /api/v1/products/{id}` | `productsRepository` |
| `/dashboard/orders/*` — list, filter by status, view detail | `GET /api/v1/orders/store/{storeId}`, `GET /api/v1/orders/{orderId}`, `PUT /api/v1/orders/{orderId}/status` | `ordersRepository` |
| `/dashboard/customers` — list, search | `GET /api/v1/customers/store/{storeId}` | `customersRepository` |
| `/dashboard/payments` — history, initiate refund | `GET /api/v1/payments/history`, `POST /api/v1/payments/refund` | `paymentsRepository` |
| `/dashboard/wallet` — balance, transactions, withdrawals | `GET /api/v1/wallet`, `GET /api/v1/wallet/history`, `POST /api/v1/wallet/withdrawals` | `walletRepository` |
| `/dashboard/subscription` — current plan, upgrade/downgrade | `GET /api/v1/subscriptions/store/{storeId}`, `POST /api/v1/subscriptions/{id}/upgrade` | `subscriptionRepository` |
| `/dashboard/team` — list staff, invite, manage permissions | `GET /api/v1/staff/{storeId}/list`, `POST /api/v1/staff/invite`, `PUT /api/v1/staff/{staffId}/custom-permissions` | `staffRepository` |
| `/dashboard/categories` — CRUD | `GET/POST /api/v1/categories`, `PUT/DELETE /api/v1/categories/{id}` | `categoriesRepository` |
| `/dashboard/ai` — AI status, enable/disable | `GET /api/v1/ai/status/{storeId}`, `POST /api/v1/ai/enable/{storeId}` | `aiRepository` |
| `/dashboard/settings` — store settings | `GET/PUT /api/v1/stores/{storeId}/settings` | `settingsRepository` |
| `/dashboard/notifications` — list, mark read | `GET /api/v1/notifications`, `PATCH /api/v1/notifications/{id}/read` | — |
| `/dashboard/profile` — update profile, change password | `GET/PUT /api/v1/auth/me`, `PUT /api/v1/auth/password`, `PUT /api/v1/auth/profile` | `authService` |
| `/dashboard/store` — store overview, publish/unpublish | `GET /api/v1/stores`, `PATCH /api/v1/stores/{id}/publish` | — |
| `/dashboard/support` — support contact | Static page | — |

**Important:** The store `storeId` is needed for most queries. Store it in a Zustand store or derive from `GET /api/v1/stores` response (business owners can have multiple stores).

---

### Phase 2: Role-Based Routing & Guards

The middleware (`middleware.ts`) and `RoleGuard` component need to support all roles:

| Role | Frontend Route | Access |
|------|---------------|--------|
| **CUSTOMER** | `/storefront/*`, `/cart`, `/orders` | Customer portal |
| **STAFF** | `/staff/*` | Limited store operations |
| **BUSINESS_OWNER** | `/dashboard/*` | Full store management |
| **ADMIN** | `/admin/*` | Platform administration |
| **SUPER_ADMIN** | `/super-admin/*` | Full platform control |

**Update middleware.ts** to route users based on role after login:
- CUSTOMER → `/` (storefront)
- STAFF → `/staff/dashboard`
- BUSINESS_OWNER → `/dashboard`
- ADMIN → `/admin/dashboard`
- SUPER_ADMIN → `/super-admin/dashboard`

---

### Phase 3: Staff Dashboard (`/staff/*`)

Build a restricted dashboard for store STAFF members with granular permissions. The user role is `STAFF` and permissions are set per staff member via `PUT /api/v1/staff/{staffId}/custom-permissions`.

**Pages:**
| Route | Feature | Backend Endpoint |
|-------|---------|-----------------|
| `/staff/dashboard` | KPI summary (read-only) | `GET /api/v1/orders/store/{storeId}?page=0&size=5` |
| `/staff/orders` | View & update order status | `GET /api/v1/orders/{orderId}`, `PUT /api/v1/orders/{orderId}/status` |
| `/staff/products` | View & edit products | `GET/PUT /api/v1/products/{id}`, `PATCH /api/v1/products/{id}/inventory` |
| `/staff/customers` | View customers | `GET /api/v1/customers/{id}` |
| `/staff/categories` | View categories | `GET /api/v1/categories` |

**Permissions model** (check at UI level):
- Staff with `VIEW_ORDERS` can see orders
- Staff with `UPDATE_ORDER_STATUS` can change status
- Staff with `MANAGE_PRODUCTS` can edit products/inventory
- Staff with `VIEW_CUSTOMERS` can see customer list
- Fallback: if no custom permissions, use role-based defaults

**Layout:** Same `DashboardShell` as Business Owner but with staff-specific sidebar items (orders, products, customers, categories only).

---

### Phase 4: Admin Dashboard (`/admin/*`)

Platform administrators manage users, stores, orders, disputes, and view analytics.

**Pages:**
| Route | Feature | Backend Endpoint |
|-------|---------|-----------------|
| `/admin/dashboard` | Platform KPIs (total users, stores, orders, revenue) | `GET /api/v1/admin/dashboard` |
| `/admin/users` | List/search users | `GET /api/v1/admin/users` |
| `/admin/stores` | List/manage stores | `GET /api/v1/admin/stores` |
| `/admin/orders` | View all orders | `GET /api/v1/admin/orders` |
| `/admin/payments` | Payment history | `GET /api/v1/admin/payments` |
| `/admin/disputes` | List & resolve disputes | `GET /api/v1/admin/disputes`, `POST /api/v1/admin/disputes/{id}/resolve` |
| `/admin/settlements` | Force settlement/refund | `POST /api/v1/admin/settlements/force/{orderId}`, `POST /api/v1/admin/settlements/refund/{orderId}` |
| `/admin/analytics` | Platform analytics | `GET /api/v1/admin/analytics/overview`, `/revenue`, `/orders` |
| `/admin/audit-logs` | Activity audit trail | `GET /api/v1/admin/audit-logs` |
| `/admin/subscriptions` | View all subscriptions | `GET /api/v1/admin/subscriptions` |
| `/admin/wallets` | Wallet overview | `GET /api/v1/admin/wallets` |

**Layout:** Use `DashboardShell` with admin-specific sidebar (Dashboard, Users, Stores, Orders, Payments, Disputes, Settlements, Analytics, Audit Logs, Subscriptions, Wallets).

---

### Phase 5: Super Admin Dashboard (`/super-admin/*`)

Full platform control with system configuration.

**Pages:**
| Route | Feature | Backend Endpoint |
|-------|---------|-----------------|
| `/super-admin/dashboard` | Platform KPIs | `GET /api/v1/super-admin/dashboard` |
| `/super-admin/users` | Create/edit/suspend users | `GET/POST/PUT/DELETE /api/v1/super-admin/users` |
| `/super-admin/stores` | Suspend/activate stores | `GET /api/v1/super-admin/stores`, `POST .../{storeId}/suspend`, `POST .../{storeId}/activate` |
| `/super-admin/plans` | Subscription plan CRUD | `GET/POST/PUT/DELETE /api/v1/super-admin/plans` |
| `/super-admin/subscriptions` | Manage & giveaway | `GET /api/v1/super-admin/subscriptions`, `POST .../giveaway` |
| `/super-admin/settings` | Platform settings CRUD | `GET/POST/PUT/DELETE /api/v1/super-admin/settings` |
| `/super-admin/custom-solutions` | Pipeline management | `GET/PATCH /api/v1/super-admin/custom-solutions` |
| `/super-admin/waitlist` | Waitlist management | `GET /api/v1/super-admin/waitlist`, `PUT /api/v1/super-admin/waitlist/{id}/status` |
| `/super-admin/payments` | Force refund | `POST /api/v1/super-admin/payments/refund` |
| `/super-admin/audit-logs` | Full audit trail | `GET /api/v1/super-admin/audit-logs` |

**Layout:** Use `DashboardShell` with super-admin sidebar (Dashboard, Users, Stores, Plans, Subscriptions, Settings, Custom Solutions, Waitlist, Payments, Audit Logs).

---

### Phase 6: Storefront Builder / Editor

Build a simple storefront editor where business owners can customize their public store page (`/storefront/stores/{slug}`).

**Features:**
- Upload logo (`POST /api/v1/stores/{id}/logo`)
- Update store name, description, contact info (`PUT /api/v1/stores/{id}`)
- Toggle publish/unpublish (`PATCH /api/v1/stores/{id}/publish`, `.../unpublish`)
- View store as customers see it (`GET /api/v1/storefront/stores/{slug}`)
- SEO metadata editor (`PUT /api/v1/seo/store/{storeId}`)

**Page:** `/dashboard/store` (already exists, needs real API integration)

---

### Phase 7: Escrow Hide for v1

Since `NEXT_PUBLIC_ENABLE_ESCROW=false`, hide or disable:
- Escrow menu items in all sidebars
- Escrow pages (`/dashboard/escrow`, `/admin/escrows`)
- Escrow references in checkout flow
- Any "escrow protection" marketing copy (update marketing components if needed)

---

## Implementation Guidelines

### API Call Pattern
Use the existing `BaseRepository` and React Query hooks consistently:

```typescript
// In a page component
import { useQuery } from '@tanstack/react-query';
import { ordersRepository } from '@/features/dashboard/repositories/orders.repository';
import { useAuthStore } from '@/features/auth/store/auth.store';

export default function OrdersPage() {
  const storeId = useAuthStore(state => state.storeId);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', 'store', storeId],
    queryFn: () => ordersRepository.getByStore(storeId!, { page: 0, size: 20 }),
    enabled: !!storeId,
  });
  // ...
}
```

### Error Handling
Use the existing `StateComponents` (`LoadingState`, `EmptyState`, `ErrorState`) from `components/dashboard/shared/StateComponents.tsx` consistently across all pages.

### UI Components
Use existing ShadCN components — only create new ones if absolutely necessary. The `components/ui/` directory has: button, input, textarea, label, avatar, dropdown-menu. For tables use a simple HTML table with Tailwind (no data table library needed for MVP).

### Theme
Use OKLCH CSS variables from `app/globals.css` exclusively — do NOT hardcode colors. Use Tailwind classes like `bg-primary`, `text-muted-foreground`, `bg-card`, `border-border` etc.

### Responsive
All dashboards must be responsive (mobile sidebar as drawer, collapsible). The existing `DashboardShell.tsx` already handles this.

### Key Business Logic Rules
1. **Order status flow:** PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED (customer confirms delivery)
2. **No transaction fees for v1** — sellers receive 100% of order total
3. **Escrow is disabled** — do not show escrow features anywhere
4. **Subscription required** — most business operations need an active subscription (backend returns 402 if missing)
5. **Staff permissions** — check `customPermissions` field; fall back to role-based defaults
6. **Paystack** is the primary payment provider (Flutterwave available but secondary)
7. **Demo credentials:** `owner@carticom.com` / `Carticom1234` (BUSINESS_OWNER), `staff@carticom.com` / `Carticom1234` (STAFF), `admin@carticom.com` / `Carticom1234` (ADMIN), `founder@carticom.com` / `Carticom1234` (SUPER_ADMIN)
8. **Delivery confirmation** — CUSTOMER calls `POST /api/v1/orders/{orderId}/confirm-delivery` to mark DELIVERED
9. **Guest checkout** is public — `POST /api/v1/guest-checkout` creates order without auth
10. **Waitlist** is public — `POST /api/v1/waitlist/join`

## Complete API Contract Reference

See `FRONTEND_INTEGRATION.md` in the backend repo for the full endpoint catalog with request/response formats, pagination, error/ success shapes, and public vs authenticated endpoints.
