# Carticom Frontend — Navigation, Routing & Login Behavior

## Overview

- **Single login page** for all roles (`/login`)
- After login, detect role from JWT and **redirect to role-specific dashboard** (NOT homepage)
- Navbar changes based on auth state AND role
- Public landing page (`/`) fetches subscription plans from API
- Unauthenticated users trying to access protected routes → redirect to `/login`

---

## 1. Login Flow (Single Page for All Roles)

**Page:** `/login` (already built, needs redirect fix)

### Current Behavior (change needed)
Currently on successful login, it always redirects to `/dashboard`:
```typescript
router.push(returnUrl ? decodeURIComponent(returnUrl) : '/dashboard');
```

### Required Behavior
After successful login, detect the user's role from the JWT or the login response, then redirect:

| Role | Redirect To |
|------|------------|
| **SUPER_ADMIN** | `/super-admin/dashboard` |
| **ADMIN** | `/admin/dashboard` |
| **BUSINESS_OWNER** | `/dashboard` |
| **STAFF** | `/staff/dashboard` |
| **CUSTOMER** | `/storefront` (or `/storefront/stores`) |

The `useAuth` hook's `login()` function already stores the `user` object which has a `role` field. The login page should read `result.user.role` after successful login and map it to the correct route.

### Implementation
```typescript
// In LoginForm.tsx onSubmit():
if (result.success) {
  authToasts.loginSuccess();
  const role = result.user?.role; // e.g. 'BUSINESS_OWNER'
  const roleRedirects: Record<string, string> = {
    'SUPER_ADMIN': '/super-admin/dashboard',
    'ADMIN': '/admin/dashboard',
    'BUSINESS_OWNER': '/dashboard',
    'STAFF': '/staff/dashboard',
    'CUSTOMER': '/storefront',
  };
  const redirectTo = roleRedirects[role] || '/dashboard';
  const returnUrl = searchParams.get('returnUrl');
  router.push(returnUrl ? decodeURIComponent(returnUrl) : redirectTo);
}
```

The middleware (`middleware.ts`) already has `getRoleRedirect()` logic — use the same mapping client-side.

---

## 2. Middleware (Route Protection)

**File:** `middleware.ts` — already correctly implemented. Keep as-is.

### What it already does correctly:
- Redirects unauthenticated users from `/dashboard`, `/staff`, `/admin`, `/super-admin`, `/onboarding` to `/login?redirect=<path>`
- Redirects authenticated users away from `/login` and `/register` to their role dashboard
- Role-based routing: if a STAFF user tries `/dashboard`, redirect to `/staff/dashboard`
- If tokens exist (accessToken + refreshToken), does NOT redirect to login

### What to verify:
- The cookie names `accessToken` and `refreshToken` match what the auth store persists
- The JWT payload has a `role` claim (case-sensitive: `SUPER_ADMIN`, `ADMIN`, `BUSINESS_OWNER`, `STAFF`, `CUSTOMER`)

---

## 3. Navbar Behavior by Auth State and Role

**File:** `components/common/DynamicNavbar.tsx` — needs modification

### Current Behavior
- **Unauthenticated:** Shows Features, Pricing, About, Contact + Login + Get Started
- **Authenticated (any role):** Shows Dashboard, Store, Products, Orders, Carticom AI + Notification bell + User dropdown

### Required Behavior

#### A. Unauthenticated (Visitor)
```
[Logo]  Features  Pricing  About  Contact  [Login]  [Get Started]
```
- All links point to public pages
- Login → `/login`
- Get Started → `/register`
- **If user tries any protected route → middleware redirects to `/login`**

#### B. BUSINESS_OWNER (Authenticated)
```
[Logo → /dashboard]  Dashboard  Store  Products  Orders  Analytics  AI  [Bell]  [Avatar ▼]
                                                                                    ├── My Profile
                                                                                    ├── Store Settings
                                                                                    ├── Subscription
                                                                                    ├── Support
                                                                                    └── Logout
```
- Logo links to `/dashboard`
- Nav links: Dashboard, Store, Products, Orders, Analytics, AI
- Mobile: same links + profile options

#### C. STAFF (Authenticated)
```
[Logo → /staff/dashboard]  Dashboard  Orders  Products  [Bell]  [Avatar ▼]
                                                                        ├── My Profile
                                                                        └── Logout
```
- Logo links to `/staff/dashboard`
- Limited nav links (only what permissions allow): Dashboard, Orders, Products
- No Store Settings, no Subscription in dropdown
- Mobile: same

#### D. ADMIN (Authenticated)
```
[Logo → /admin/dashboard]  Dashboard  Stores  Users  Orders  Payments  Disputes  Analytics  [Bell]  [Avatar ▼]
                                                                                                            ├── My Profile
                                                                                                            ├── Platform Settings
                                                                                                            ├── Audit Logs
                                                                                                            └── Logout
```
- Logo links to `/admin/dashboard`
- Nav links: Dashboard, Stores, Users, Orders, Payments, Disputes, Analytics
- Dropdown: My Profile, Platform Settings, Audit Logs, Logout

#### E. SUPER_ADMIN (Authenticated)
```
[Logo → /super-admin/dashboard]  Dashboard  Stores  Users  Plans  Settings  Waitlist  Audit  [Bell]  [Avatar ▼]
                                                                                                               ├── My Profile
                                                                                                               ├── All Settings
                                                                                                               └── Logout
```
- Logo links to `/super-admin/dashboard`
- Nav links: Dashboard, Stores, Users, Plans, Settings, Waitlist, Audit
- Dropdown: My Profile, All Settings, Logout

#### F. CUSTOMER (Authenticated)
```
[Logo → /storefront]  My Orders  Wishlist  Cart  [Bell]  [Avatar ▼]
                                                              ├── My Profile
                                                              └── Logout
```
- Logo links to `/storefront`
- Nav links: My Orders, Wishlist, Cart
- Dropdown: My Profile, Logout

### Navbar Implementation
Use the `user.role` from the auth store (`useAuthStore(state => state.user?.role)`) to switch nav link sets:

```typescript
const roleNavLinks: Record<string, { href: string; label: string }[]> = {
  BUSINESS_OWNER: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/store', label: 'Store' },
    { href: '/dashboard/products', label: 'Products' },
    { href: '/dashboard/orders', label: 'Orders' },
    { href: '/dashboard/analytics', label: 'Analytics' },
    { href: '/dashboard/ai', label: 'AI' },
  ],
  STAFF: [
    { href: '/staff/dashboard', label: 'Dashboard' },
    { href: '/staff/orders', label: 'Orders' },
    { href: '/staff/products', label: 'Products' },
  ],
  ADMIN: [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/stores', label: 'Stores' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/payments', label: 'Payments' },
    { href: '/admin/disputes', label: 'Disputes' },
    { href: '/admin/analytics', label: 'Analytics' },
  ],
  SUPER_ADMIN: [
    { href: '/super-admin/dashboard', label: 'Dashboard' },
    { href: '/super-admin/stores', label: 'Stores' },
    { href: '/super-admin/users', label: 'Users' },
    { href: '/super-admin/plans', label: 'Plans' },
    { href: '/super-admin/settings', label: 'Settings' },
    { href: '/super-admin/waitlist', label: 'Waitlist' },
    { href: '/super-admin/audit-logs', label: 'Audit' },
  ],
  CUSTOMER: [
    { href: '/storefront/orders', label: 'My Orders' },
    { href: '/storefront/wishlist', label: 'Wishlist' },
    { href: '/storefront/cart', label: 'Cart' },
  ],
};

const navLinks = isAuthenticated ? (roleNavLinks[user?.role] || roleNavLinks.BUSINESS_OWNER) : publicNavLinks;
```

---

## 4. Landing Page — Fetch Subscription Plans from API

**File:** `app/page.tsx` (server component) OR `components/marketing/Pricing.tsx` (client component)

### Current Behavior
The landing page (`/`) is a static server component. The Pricing section likely uses hardcoded plans.

### Required Behavior
The landing page should fetch active subscription plans from the backend API:

```
GET /api/v1/subscriptions/plans  (public, no auth required)
```

### Implementation Options

**Option A: Client-side fetch in Pricing.tsx**
```typescript
// In components/marketing/Pricing.tsx:
'use client';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

export function Pricing() {
  const { data, isLoading } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: () => axios.get('/api/v1/subscriptions/plans').then(r => r.data.data),
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  const plans = data || FALLBACK_PLANS; // fallback while loading

  // Render plans...
}
```

**Option B: Server-side fetch in page.tsx**
```typescript
// In app/page.tsx:
export default async function Home() {
  let plans = [];
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/subscriptions/plans`, {
      next: { revalidate: 300 } // ISR every 5 min
    });
    plans = await res.json();
  } catch {
    plans = FALLBACK_PLANS;
  }

  return (
    <main>
      <Hero />
      ...
      <Pricing plans={plans} />
      ...
    </main>
  );
}
```

**Fallback plans** (hardcoded, shown while loading or if API fails):
```typescript
const FALLBACK_PLANS = [
  { name: 'Free', price: 0, monthlyPrice: 0, productLimit: 10, staffLimit: 1, features: ['Basic storefront', 'Paystack payments', 'Community support'] },
  { name: 'Starter', price: 5000, monthlyPrice: 5000, productLimit: 100, staffLimit: 2, features: ['Custom domain', 'Paystack + Flutterwave', 'Email support', 'Basic analytics'] },
  { name: 'Growth', price: 12000, monthlyPrice: 12000, productLimit: 1000, staffLimit: 10, features: ['All gateways', 'Priority support', 'AI automation', 'Full analytics', 'API access'] },
  { name: 'Business', price: 25000, monthlyPrice: 25000, productLimit: 99999, staffLimit: 99999, features: ['Unlimited everything', '24/7 phone support', 'Full AI', 'Dedicated manager', 'Custom integrations'] },
  { name: 'Enterprise', price: 50000, monthlyPrice: 50000, productLimit: 99999, staffLimit: 99999, features: ['White-label', 'On-premise', 'SLA guarantee', 'Custom AI training', 'Dedicated support team'] },
];
```

---

## 5. Logout Flow

When a user clicks Logout:
1. Call `POST /api/v1/auth/logout` (blacklists the token)
2. Clear auth store (remove tokens from localStorage/cookies)
3. **Redirect to `/login`** (NOT `/`)

Current logout in `DynamicNavbar.tsx` redirects to `/` — change to `/login`:
```typescript
const handleLogout = async () => {
  await logout();
  window.location.href = '/login';
};
```

And in `useAuth.ts`:
```typescript
const handleLogout = useCallback(async () => {
  try {
    await authService.logout();
  } finally {
    store.logout();
    router.push('/login'); // was router.push('/')
  }
}, [store, router]);
```

---

## 6. Session Expired Handling

- If the backend returns 401 during any API call → Axios interceptor (in `lib/axios.ts`) automatically tries to refresh the token
- If refresh fails → redirect to `/login?session=expired`
- The login page already shows a "Your session has expired" banner when it sees the `session=expired` query param

---

## 7. Summary of Routes by Role

| Role | Base Path | Dashboard | Auth Required |
|------|-----------|-----------|---------------|
| **Public** | `/` | Landing page | No |
| **All** | `/login` | Login | No (redirect away if authenticated) |
| **All** | `/register` | Register | No (redirect away if authenticated) |
| **BUSINESS_OWNER** | `/dashboard` | Store owner dashboard | Yes |
| **STAFF** | `/staff` | Staff dashboard | Yes |
| **ADMIN** | `/admin` | Admin panel | Yes |
| **SUPER_ADMIN** | `/super-admin` | Super admin panel | Yes |
| **CUSTOMER** | `/storefront` | Customer portal | Yes |

The middleware already handles all of this. The only changes needed are:
1. Login page — redirect to role-specific dashboard (not always `/dashboard`)
2. Navbar — show role-specific nav links
3. Landing page — fetch subscription plans from API
4. Logout — redirect to `/login` (not `/`)
