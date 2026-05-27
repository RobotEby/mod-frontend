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
- **TypeScript**
- **Vite**
- **React Router DOM**
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

If `.env.example` does not exist yet, create `.env.local` manually:

```env
VITE_API_BASE_URL=http://localhost:3000
```

The frontend API client automatically appends `/api/v1` to `VITE_API_BASE_URL`.

For example:

```env
VITE_API_BASE_URL=http://localhost:3000
```

will generate requests to:

```txt
http://localhost:3000/api/v1
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
│   └── ui/
├── contexts/
├── features/
│   └── user/
├── hooks/
├── integrations/
│   └── account/
├── lib/
├── pages/
├── types/
├── App.tsx
├── main.tsx
└── index.css
```

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

1. The frontend calls `GET /account/profile`, while the current backend profile route expects an `email` query parameter.
2. The frontend `AuthContext` calls `/auth/me`, while the backend currently exposes account routes under `/api/v1/account`.
3. The frontend wishlist context calls `/wishlist`, but the backend repository currently exposes `products`, `account` and `cart` modules.
4. The catalog page currently uses mock product/category data instead of the backend products endpoint.

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

## Recommended Improvements

- Add `.env.example` with `VITE_API_BASE_URL`
- Replace mock catalog data with real backend product/category endpoints
- Align auth/profile routes with the backend
- Add wishlist backend module or update the frontend wishlist integration
- Add automated tests
- Add CI pipeline for lint/build validation
- Add deployment documentation
- Add screenshots or demo GIFs to this README

## Collaboration

This frontend was developed as part of the collaborative **Movelaria On Demand (MOD)** project together with the backend repository.

## License

No license file was identified in this repository during this README preparation. Add a license before distributing or publishing the project as open source.
