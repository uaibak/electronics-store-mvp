# Pakistan Electronics Store

Production-oriented Next.js App Router e-commerce starter for a custom electronics store in Pakistan.

## Stack

- Next.js 15 App Router
- Tailwind CSS
- ShadCN-style reusable UI primitives
- MongoDB Atlas with Mongoose
- JWT cookie auth for admin

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

3. Fill in `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.

4. Start development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin access

- Login URL: `/admin/login`
- Credentials come from `.env.local`

## VPS deployment

1. Install Node.js 20+, Nginx, and PM2 on the server.
2. Clone the repository and create `.env.local`.
3. Install dependencies with `npm install`.
4. Build with `npm run build`.
5. Start with PM2:

```bash
pm2 start npm --name electronics-store -- start
pm2 save
```

6. Configure Nginx as a reverse proxy to `http://127.0.0.1:3000`.

Example Nginx server block:

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

7. Enable HTTPS with Certbot after DNS is pointed to the VPS.

## Notes

- `.env.local` must not be committed.
- Orders use cash on delivery / manual confirmation flow.
- `src/app/api/test/route.js` can be used to insert a sample product.
