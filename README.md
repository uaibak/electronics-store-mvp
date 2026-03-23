# Pakistan Electronics Store

Production-ready Next.js App Router e-commerce application for a custom electronics store in Pakistan. The project includes a customer storefront, MongoDB-backed product and order APIs, JWT-based admin access, responsive Tailwind UI, SEO metadata, and a repeatable seed flow for local testing.

## Overview

This project is designed for a store that sells household electronics such as fans, irons, air coolers, and washing machines. It uses a single Next.js codebase for both the public website and the admin dashboard.

Core capabilities:
- Responsive storefront for desktop and mobile
- Category browsing and product detail pages
- Cart and checkout flow with cash on delivery / manual confirmation
- MongoDB Atlas integration through Mongoose
- Admin authentication with JWT cookies
- Admin product CRUD and order status management
- Metadata API, sitemap, robots, and Open Graph support
- Seed script for test products and sample orders

## Tech Stack

- Next.js 15 with App Router
- React 19
- TypeScript with `allowJs`
- Tailwind CSS
- ShadCN-style UI primitives
- MongoDB Atlas
- Mongoose
- `jose` for JWT signing and verification
- `zod` for API payload validation

## Theme

The UI is built around the following design system:
- Primary: `#0F172A`
- Accent: `#2563EB`
- CTA: `#F59E0B`
- Background: `#F8FAFC`
- Text: `#111827`
- Headings: `Poppins`
- Body: `Inter`

## Project Structure

```text
.
- .env.example
- .env.local
- .gitignore
- LICENSE
- README.md
- components.json
- middleware.ts
- next-env.d.ts
- next.config.ts
- package.json
- postcss.config.js
- tailwind.config.ts
- tsconfig.json
- scripts/
  - seed.js
- src/
  - app/
    - admin/
      - login/
        - page.tsx
      - orders/
        - page.tsx
      - products/
        - page.tsx
      - page.tsx
    - api/
      - admin/
        - login/
          - route.ts
        - logout/
          - route.ts
      - orders/
        - [id]/
          - route.ts
        - route.ts
      - products/
        - [id]/
          - route.ts
        - route.ts
      - test/
        - route.ts
    - cart/
      - page.tsx
    - category/
      - [category]/
        - page.tsx
    - checkout/
      - page.tsx
    - order-confirmation/
      - page.tsx
    - product/
      - [slug]/
        - page.tsx
    - static-pages/
      - about/
        - page.tsx
      - contact/
        - page.tsx
      - policies/
        - page.tsx
    - globals.css
    - layout.tsx
    - not-found.tsx
    - page.tsx
    - robots.ts
    - sitemap.ts
  - components/
    - admin/
      - admin-login-form.tsx
      - admin-logout-button.tsx
      - admin-orders-manager.tsx
      - admin-products-manager.tsx
    - pages/
      - cart-client-page.tsx
      - checkout-client-page.tsx
    - providers/
      - cart-provider.tsx
    - ui/
      - button.tsx
      - input.tsx
      - label.tsx
    - Button.jsx
    - Container.tsx
    - Footer.jsx
    - Form.tsx
    - Input.jsx
    - Navbar.jsx
    - product-actions.tsx
    - ProductCard.jsx
  - lib/
    - api.ts
    - auth.ts
    - constants.ts
    - data.ts
    - db.js
    - utils.ts
  - models/
    - Order.js
    - Product.js
  - types/
    - global.d.ts
```

## Features

### Storefront

- Home page with hero section, featured categories, and featured product grid
- Category pages for:
  - Fans
  - Irons
  - Air Coolers
  - Washing Machines
- Product detail pages at `/product/[slug]`
- Client-side cart stored in local storage
- Checkout page for customer name, phone, address, and city
- Order confirmation screen
- Static pages:
  - About
  - Contact
  - Policies

### Admin Panel

- Login at `/admin/login`
- Protected admin routes through `middleware.ts`
- Product management:
  - Add product
  - Edit product
  - Delete product
- Order management:
  - View customer info and purchased items
  - Update status to `Pending`, `Confirmed`, `Packed`, `Delivered`, or `Cancelled`

### SEO

- Global metadata in `src/app/layout.tsx`
- Dynamic product metadata in `src/app/product/[slug]/page.tsx`
- Open Graph metadata for product detail pages
- Sitemap generation in `src/app/sitemap.ts`
- Robots rules in `src/app/robots.ts`
- Clean URLs and image `alt` text

## API Endpoints

### Products

- `GET /api/products`
  Returns all products
- `POST /api/products`
  Creates a product, admin only
- `GET /api/products/:id`
  Returns a single product by Mongo ID
- `PUT /api/products/:id`
  Updates a product, admin only
- `DELETE /api/products/:id`
  Deletes a product, admin only

### Orders

- `POST /api/orders`
  Creates a new order from checkout data
- `GET /api/orders`
  Returns all orders for admin view
- `PUT /api/orders/:id`
  Updates order status, admin only

### Admin Auth

- `POST /api/admin/login`
  Verifies admin credentials and sets JWT cookie
- `POST /api/admin/logout`
  Clears admin cookie

### Test Route

- `POST /api/test`
  Inserts one sample product into the database

## Environment Variables

Create `.env.local` in the project root.

Example values are in `.env.example`.

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/electronics-store
MONGO_DNS_SERVERS=8.8.8.8,1.1.1.1
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-me
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Variable details:
- `MONGO_URI`: MongoDB Atlas connection string
- `MONGO_DNS_SERVERS`: optional DNS override for environments where Node SRV lookup fails
- `JWT_SECRET`: secret used to sign admin JWT cookies
- `ADMIN_EMAIL`: admin login username
- `ADMIN_PASSWORD`: admin login password
- `NEXT_PUBLIC_BASE_URL`: base URL used for metadata and sitemap

## MongoDB Notes

This project supports MongoDB Atlas. If `mongodb+srv://` fails in Node while working in other tools, your environment may have SRV lookup issues. The app supports `MONGO_DNS_SERVERS` to set explicit resolvers before connecting.

Example:

```env
MONGO_DNS_SERVERS=8.8.8.8,1.1.1.1
```

If your environment still blocks SRV resolution, you can use the non-SRV `mongodb://...` URI in the app while keeping `mongodb+srv://...` for tools such as the VS Code MongoDB extension.

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Create local environment file

```bash
cp .env.example .env.local
```

On Windows PowerShell, if `cp` is not convenient, just create `.env.local` manually and paste the variables.

### 3. Fill `.env.local`

Set real values for:
- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### 4. Run the development server

```bash
npm run dev
```

Open:
- Storefront: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

## Available Scripts

- `npm run dev`: start local development server
- `npm run build`: create production build
- `npm start`: run production server after build
- `npm run lint`: run Next lint
- `npm run seed`: insert dummy products and orders into MongoDB

Note for Windows PowerShell environments with execution policy restrictions:

```powershell
npm.cmd run seed
```

## Seeding Dummy Data

A repeatable seed script is included at `scripts/seed.js`.

What it does:
- deletes existing orders
- deletes existing products
- inserts 8 sample products
- inserts 2 sample orders

Run:

```bash
npm run seed
```

If MongoDB Atlas rejects the connection, check:
- your current public IP is allowed in Atlas `Network Access`
- your database user exists in Atlas `Database Access`
- your password is correct and URL-encoded if necessary
- your cluster is active and not paused

## Admin Workflow

1. Open `/admin/login`
2. Sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. Go to:
   - `/admin/products` to manage catalog items
   - `/admin/orders` to update order statuses

## Cart and Checkout Flow

- Cart state is stored client-side in browser local storage
- Product cards and detail pages can add items to cart
- Checkout sends order data to `/api/orders`
- Orders are created with `Pending` status by default
- This project uses cash on delivery / manual confirmation only

## Production Build

Build and test locally:

```bash
npm run build
npm start
```

The production build has already been validated in this repository.

## VPS Deployment

Recommended stack:
- Ubuntu VPS on DigitalOcean or AWS
- Node.js 20+
- Nginx
- PM2

### Deployment steps

1. Provision the server
2. Install Node.js, Nginx, and PM2
3. Clone the repository
4. Create `.env.local` with production values
5. Install dependencies:

```bash
npm install
```

6. Build the app:

```bash
npm run build
```

7. Start with PM2:

```bash
pm2 start npm --name electronics-store -- start
pm2 save
```

8. Configure Nginx to proxy requests to port `3000`

Example:

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. Point your domain to the VPS
10. Enable HTTPS with Certbot

## Security Notes

- Do not commit `.env.local`
- Use a strong `JWT_SECRET`
- Use strong Atlas database credentials
- Restrict Atlas IP access in production to trusted IPs only
- Replace the default admin credentials before deployment

## Current Status

Implemented and working in codebase:
- storefront pages
- admin pages
- MongoDB models and API routes
- JWT auth
- responsive Tailwind UI
- SEO metadata
- sitemap and robots
- seed script
- deployment guidance

## Useful Files

- `src/app/page.tsx`
- `src/app/product/[slug]/page.tsx`
- `src/app/api/products/route.ts`
- `src/app/api/orders/route.ts`
- `src/app/admin/products/page.tsx`
- `src/app/admin/orders/page.tsx`
- `src/lib/db.js`
- `scripts/seed.js`
- `middleware.ts`

## License

This repository includes a `LICENSE` file at the root. Review it before redistribution or commercial use.
