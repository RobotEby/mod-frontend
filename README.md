# Movelaria On Demand (MOD) — Frontend

A modern furniture e-commerce frontend for **Movelaria On Demand (MOD)**, built with React, TypeScript and Vite.

This repository contains the customer-facing shopping experience and the admin interface for managing products, orders, categories and inventory. It is designed to work together with the MOD backend API.

## Project Overview

Movelaria On Demand is a collaborative full-stack project focused on an online furniture store experience. The frontend provides:

- Home and brand presentation pages
- Product catalog with filters, sorting and quick view
- Product detail pages
- Cart and checkout flow
- Authentication screens
- User account area
- Wishlist support
- Blog, FAQ, privacy, LGPD and terms pages
- Admin dashboard routes for products, orders, categories and inventory
- Responsive navigation, mobile bottom navigation and UI feedback components

The application currently combines local/mock catalog data with API-ready integrations for authentication, account profile and wishlist features.

## Related Repository

Backend API:

```txt
https://github.com/Fedolfo/mod-platform-backend
```

## Tech Stack

- **React 19**
- **TypeScript** (strict mode enabled)
- **Vite**
- **React Router DOM** (nested layout routes)
- **Redux Toolkit**
- **React Redux**
- **TanStack React Query**
- **Axios**
- **React Hook Form**
- **Zod**
- **Radix UI**
- **Tailwind CSS**
- **Lucide React**
- **Recharts**
- **Sonner**
- **next-themes**
- **Vitest + Testing Library** (unit/integration tests)
- **ESLint**

## Requirements

Before running the project, make sure you have:

- Node.js 20 or newer recommended
- npm installed
- Backend API running locally or remotely

## Getting Started

Clone the repository:

```bash
git clone https://github.com/RobotEby/mod-platform-frontend.git
cd mod-platform-frontend
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

The Vite server is configured to run on:

```txt
http://localhost:8080
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the production-ready application.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run typecheck
```

Runs `tsc --noEmit` in strict mode.

```bash
npm test
```

Runs the Vitest test suite once.

```bash
npm run test:watch
```

Runs Vitest in watch mode during development.

```bash
npm run preview
```

Serves the production build locally for preview.

## Environment Variables

| Variable            | Required | Description                                    | Example                 |
| ------------------- | -------: | ---------------------------------------------- | ----------------------- |
| `VITE_API_BASE_URL` |      Yes | Base URL of the backend API, without `/api/v1` | `http://localhost:3000` |

## Application Routes

### Public Routes

| Route          | Description                |
| -------------- | -------------------------- |
| `/`            | Home page                  |
| `/catalogo`    | Product catalog            |
| `/produto/:id` | Product details            |
| `/carrinho`    | Shopping cart              |
| `/checkout`    | Checkout                   |
| `/auth`        | Authentication page        |
| `/conta`       | User account               |
| `/lista-desejos` | Wishlist (saved products) |
| `/sobre`       | About page                 |
| `/contato`     | Contact page               |
| `/blog`        | Blog list                  |
| `/blog/:slug`  | Blog post                  |
| `/faq`         | Frequently asked questions |
| `/termos`      | Terms of use               |
| `/privacidade` | Privacy policy             |
| `/LGPD`        | LGPD information           |
| `*`            | Not found page             |

### Admin Routes

Admin routes are protected by `AdminGuard` and rendered inside `AdminLayout`.

| Route               | Description          |
| ------------------- | -------------------- |
| `/admin`            | Admin dashboard      |
| `/admin/produtos`   | Product management   |
| `/admin/pedidos`    | Order management     |
| `/admin/categorias` | Category management  |
| `/admin/estoque`    | Inventory management |

## API Integration

The API client is located at:

```txt
src/lib/api-client.ts
```

It creates an Axios instance using:

```ts
`${import.meta.env.VITE_API_BASE_URL}/api/v1`;
```

The client also:

- Adds `Authorization: Bearer <token>` when a token exists
- Reads tokens from Redux state or `localStorage`
- Clears auth state on `401`
- Redirects unauthenticated users to `/auth`
- Logs common API errors for `403`, `404`, `500` and connection failures

## Authentication Flow

Authentication state is managed with Redux Toolkit under:

```txt
src/features/user/
```

Main files:

```txt
src/features/user/userSlice.ts
src/features/user/userThunks.ts
src/integrations/account/account-client.ts
```

Supported client operations:

| Operation      | Frontend endpoint        |
| -------------- | ------------------------ |
| Register       | `POST /account/register` |
| Login          | `POST /account/login`    |
| Logout         | `POST /account/logout`   |
| Get profile    | `GET /account/profile`   |
| Update profile | `PUT /account/profile`   |

Session data is stored locally using:

```txt
localStorage.user
localStorage.token
```

## Catalog and Product Data

The catalog currently uses local mock data from:

```txt
src/lib/mockData.ts
```

Current mock domain models include:

- Categories
- Products
- Orders
- Order items

Catalog features include:

- Category filtering
- Price range filtering
- Search by product name or description
- Offer filtering
- Quick filter presets
- Sorting by newest, price, discount and name
- Grid/list view mode
- Product quick view
- Persisted catalog filter state in `localStorage`

## Cart

The cart context is implemented in:

```txt
src/contexts/CartContext.tsx
```

It supports:

- Add item
- Remove item
- Update quantity
- Clear cart
- Total item count
- Total price calculation

## Wishlist

Wishlist support is implemented in:

```txt
src/contexts/WishlistContext.tsx
```

It integrates with the backend through:

| Operation      | Endpoint                      |
| -------------- | ----------------------------- |
| Fetch wishlist | `GET /wishlist`               |
| Add item       | `POST /wishlist`              |
| Remove item    | `DELETE /wishlist/:productId` |

## Suggested Project Structure

```txt
src/
├── app/
│   ├── hooks.ts
│   └── store.ts
├── components/
│   ├── admin/
│   ├── ui/
│   └── PublicLayout.tsx
├── contexts/
│   ├── CartContext.tsx
│   ├── NotificationContext.tsx
│   └── WishlistContext.tsx
├── features/
│   └── user/
├── hooks/
├── integrations/
│   └── account/
├── lib/
│   └── errors.ts
├── pages/
├── test/
│   └── setup.ts
├── types/
├── App.tsx
├── main.tsx
└── index.css
docs/
└── master-to-main-migration.md
```

Note: authentication state now lives solely in Redux (`src/features/user/`).
A parallel, disconnected `src/contexts/AuthContext.tsx` existed previously —
it was never actually mounted in `App.tsx`, so `useAuth()` always returned a
default `user: null`, and its own session-restore effect dispatched a plain
object with no Redux action `type` (a no-op). It has been removed; the
Wishlist and Notification contexts now read the real Redux user state.

## Backend Compatibility Notes

The frontend is prepared to consume a backend under:

```txt
/api/v1
```

Current backend repository routes include:

- `/api/v1/products`
- `/api/v1/account`
- `/api/v1/cart`

Before connecting all production flows, review these integration points:

1. The frontend calls `GET /account/profile` (via `accountClient.getProfile()`),
   while the current backend profile route expects an `email` query parameter.
2. The frontend wishlist context calls `/wishlist`, but the backend repository
   currently exposes `products`, `account` and `cart` modules — there is no
   `/wishlist` module yet.
3. The catalog page currently uses mock product/category data (`src/lib/mockData.ts`)
   instead of the backend products endpoint.
4. **`Account.tsx` calls `/user_addresses`, `/user_payment_methods` and
   `/profiles/:id`.** These look like leftovers from an earlier, likely
   Supabase-based backend design (the naming convention and the `Json` type in
   `src/types/types.ts` are Supabase-generated-type conventions) and do not
   match the current `/api/v1/account` structure. These calls now correctly go
   through the shared `apiClient` (so they carry the auth token and use the
   configured base URL — that part was a real bug, now fixed), but the
   endpoint paths themselves still need to be aligned with whatever the real
   backend exposes for addresses/payment methods/profile updates.
5. **Known type duplication:** there are currently four separate, slightly
   different `Product`-shaped type definitions in this codebase
   (`src/types/types.ts`, `src/types/products.tsx`, `src/services/productService.ts`,
   and previously a fourth local copy in `ProductTable.tsx`, now consolidated
   to reuse `productService.ts`'s type). The public storefront
   (`Catalog.tsx`, `ProductDetail.tsx`, `Wishlist.tsx`) uses `mockData.ts`'s
   local `Product`/`mockProducts`, while the **admin** product management
   (`AdminProducts.tsx`, `ProductForm.tsx`, `ProductTable.tsx`) uses a
   completely separate `productService.ts` mock data source with its own
   `Product` interface. In other words, **the admin panel manages a different
   in-memory product catalog than the one customers actually browse.**
   Unifying these into a single source of truth is a real, valuable follow-up
   but a large enough refactor that it was intentionally left out of this
   pass rather than rushed.
6. **No active session verification on load.** `userThunks.ts` defines a
   `fetchUser` thunk (calls `GET /account/profile` to verify/refresh the
   session) with correct reducer cases in `userSlice.ts`, but nothing in the
   app ever dispatches it. On page reload, the logged-in state is restored
   purely from `localStorage` without re-validating it against the backend —
   an expired or revoked token would still appear "logged in" client-side
   until the next API call returns a 401.

Recommended next step:

```txt
Align frontend service clients with backend routes or add the missing backend routes required by the current frontend flows.
```

## Running with the Backend

Start the backend first:

```bash
cd ../mod-platform-backend
npm install
npm run start:dev
```

Then start the frontend:

```bash
cd ../mod-platform-frontend
npm install
npm run dev
```

Expected local URLs:

| Service          | URL                            |
| ---------------- | ------------------------------ |
| Frontend         | `http://localhost:8080`        |
| Backend          | `http://localhost:3000`        |
| Backend API base | `http://localhost:3000/api/v1` |
| Swagger docs     | `http://localhost:3000/docs`   |

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing

Unit and integration tests use Vitest + React Testing Library:

```bash
npm test
```

16 tests currently cover:

- `src/contexts/CartContext.test.tsx` — cart math, add/remove/update/clear,
  and two regression tests locking in bugs found and fixed during this
  refactor pass (a `total`/`totalPrice` naming mismatch that crashed the Cart
  and Checkout pages at runtime, and a quantity selector that was silently
  ignored when adding items to the cart).
- `src/contexts/WishlistContext.test.tsx` — regression test for a critical
  bug where the wishlist context read user state from a disconnected,
  unmounted `AuthContext` and so never fetched wishlist items for a logged-in
  user; it now reads the real Redux auth state.
- `src/lib/errors.test.ts` — the shared Axios/Error message extraction
  helper.

There is currently no end-to-end/browser test suite, and admin pages,
forms, and most page-level components are not yet covered by component
tests — this is a starting test suite, not full coverage.

## Known Limitations

- Image upload in the admin product form only supports pasting an image URL.
  A drag-and-drop file upload flow was scaffolded in the UI but its upload
  handler was never implemented (there is no backend file-storage endpoint
  available), which used to leave the UI stuck in a permanent "uploading..."
  state if used. That broken path has been removed rather than shipped as a
  non-functional feature; implement it once a real upload endpoint exists.
- See "Backend Compatibility Notes" above for the product-catalog type
  duplication between the public storefront and the admin panel, the
  leftover Supabase-shaped endpoints in `Account.tsx`, and the missing
  session-refresh-on-load behavior.
- No rate limiting or CSRF protection is implemented client-side (expected
  to be enforced by the backend).
- `npm audit` currently reports five vulnerabilities in Vite, Vitest and
  transitive development tooling (three moderate, one high and one critical),
  while `npm audit --omit=dev` reports no production dependency vulnerabilities.
  Resolving the development findings requires major Vite/Vitest upgrades,
  which were intentionally left out of this pass to avoid an unrelated,
  high-risk dependency jump.

## Recommended Improvements

- Replace mock catalog data with real backend product/category endpoints,
  and unify the four parallel `Product` type definitions into one
- Align auth/profile/address/payment routes with the actual backend
- Add a wishlist backend module, or update the frontend integration to match
  whatever module the backend actually exposes
- Dispatch `fetchUser()` on app load to verify/refresh the session instead of
  trusting `localStorage` alone
- Expand test coverage to admin pages and key forms
- Code-split the main bundle (currently a single ~1.6 MB / ~470 KB gzip chunk)
- Add screenshots or demo GIFs to this README

## Collaboration

This frontend was developed as part of the collaborative **Movelaria On Demand (MOD)** project together with the backend repository.

## License

No license file was identified in this repository during this README preparation. Add a license before distributing or publishing the project as open source.
