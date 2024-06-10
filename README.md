# Full Stack E-Commerce: NEXT.js14, React, Typescript, Prisma, Kinde, Tailwind CSS, UploadThing, PostgreSQL, Shadcn UI, Zustand

## Key Features

- Dashboard for Admin
- Pagination
- Search Product
- Filtering Product
- Payment Gateway using Stripe
- Authentication & Authorization using Kinde
- Manages Image using UploadThing
- Beautiful UI using Shadcn UI

## Cloning the repository

```bash
git clone https://github.com/weiwei2694/nextjs14-wei-ecommerce.git
cd nextjs14-wei-ecommerce
```

## Install packages

```bash
npm install
yarn install
pnpm install
bun install
```

## Setup .env file

```bash
DATABASE_URL=

KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/auth-callback

ADMIN_EMAIL=your email

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Setup Prisma

```bash
npx prisma generate
npx prisma db push
```

## Available commands

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Starts a development instance of the app |
| `npm run build`        | Builds the app for production            |
| `npm run start`        | Starts the app in production mode        |
