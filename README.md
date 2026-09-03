# 1Fi EMI App

A full-stack product and EMI financing application inspired by modern checkout experiences. Users can browse a catalog of smartphones, select specific storage and color variants, explore tailored EMI plans (featuring zero-cost and interest-bearing options with cashbacks), and proceed with their chosen plan.

---

## Features

* **Product Listing**: Displays available smartphone catalog with starting prices and thumbnails.
* **Product Detail Pages with Unique URLs**: Dynamic routing mapped by product slug (`/products/:slug`).
* **Product Variants**: Interactive selection across storage tiers and color finishes.
* **Product Images**: High-resolution, real product images reflecting the active variant.
* **MRP and Selling Price**: Prominent display of discounted selling price alongside struck-through MRP.
* **EMI Plan Listing**: Clean vertical list of available EMI financing options per variant.
* **Monthly EMI Amount**: Pre-computed monthly installment amounts for each tenure.
* **Tenure Options**: Multiple tenure durations (e.g., 3 months, 12 months, 24 months).
* **Interest Rate Transparency**: Clear breakdown of 0% No-Cost EMI vs. interest-bearing plans.
* **Cashback Support**: Highlights additional cashback incentives on select plans.
* **Interactive Plan Selection**: Single-select visual toggle with distinct active outline and ring styles.
* **Responsive UI**: Snapmint-style layout featuring a desktop two-column split and mobile-optimized single column.
* **Backend API & PostgreSQL**: RESTful backend built with Express and Prisma connected to PostgreSQL.
* **Error & Loading States**: Resilient data fetching with loading spinners and user-friendly error views.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React (v19), Vite, Tailwind CSS (v4), React Router (v7) |
| **Backend** | Node.js, Express (v5), Prisma ORM (v6) |
| **Database** | PostgreSQL (Neon PostgreSQL in production) |
| **Deployment** | Vercel (Frontend), Render (Backend Web Service) |

---

## Project Structure

```text
1fi-emi-app/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── index.js
│   ├── prisma.config.js
│   └── package.json
└── README.md
```

---

## Local Setup

### Prerequisites
* Node.js (v18 or higher)
* PostgreSQL running locally (or a remote PostgreSQL connection string)
* npm or yarn

---

### Backend Setup

1. Navigate to the `server/` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file inside `server/`:
   ```env
   PORT=5001
   DATABASE_URL="your-postgresql-connection-string"
   ```

3. Generate the Prisma Client, push the schema to PostgreSQL, and seed initial data:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. Start the server:
   ```bash
   # Production start
   npm start

   # Or development with nodemon hot-reloading
   npm run dev
   ```

The backend server will run at `http://localhost:5001`.

---

### Frontend Setup

1. Navigate to the `client/` directory and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Create a `.env` file inside `client/`:
   ```env
   VITE_API_URL=http://localhost:5001
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The client application will run at `http://localhost:5173`.

---

## API Endpoints

### 1. Health Check
* **Route**: `GET /api/health`
* **Description**: Verifies the backend server is running and responsive.
* **Response** (`200 OK`):
  ```json
  {
    "status": "ok"
  }
  ```

---

### 2. Get All Products
* **Route**: `GET /api/products`
* **Description**: Fetches all products including their variant list and pricing to render catalog cards.
* **Response** (`200 OK`):
  ```json
  [
    {
      "id": 1,
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "description": "The next-generation iPhone engineered with titanium and powered by the groundbreaking A19 Pro chip.",
      "createdAt": "2026-09-03T15:20:33.722Z",
      "variants": [
        {
          "id": 1,
          "productId": 1,
          "variantLabel": "256GB · Natural Titanium",
          "mrp": "139900.00",
          "price": "134900.00",
          "imageUrl": "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-17-Pro/Cosmic-Orange/Apple-iPhone-17-Pro-Cosmic-Orange-thumbnail_v1.png",
          "colorHex": "#78736e",
          "createdAt": "2026-09-03T15:20:33.722Z"
        },
        {
          "id": 2,
          "productId": 1,
          "variantLabel": "512GB · Midnight Navy",
          "mrp": "159900.00",
          "price": "154900.00",
          "imageUrl": "/products/iphone-17-pro-midnight-navy.jpg",
          "colorHex": "#1e293b",
          "createdAt": "2026-09-03T15:20:33.722Z"
        }
      ]
    }
  ]
  ```

---

### 3. Get Product by Slug
* **Route**: `GET /api/products/:slug`
* **Description**: Retrieves a single product by slug, including all variants and their nested EMI plans.
* **Example**: `GET /api/products/iphone-17-pro`
* **Response** (`200 OK`):
  ```json
  {
    "id": 1,
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "description": "The next-generation iPhone engineered with titanium and powered by the groundbreaking A19 Pro chip.",
    "createdAt": "2026-09-03T15:20:33.722Z",
    "variants": [
      {
        "id": 1,
        "productId": 1,
        "variantLabel": "256GB · Natural Titanium",
        "mrp": "139900.00",
        "price": "134900.00",
        "imageUrl": "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-17-Pro/Cosmic-Orange/Apple-iPhone-17-Pro-Cosmic-Orange-thumbnail_v1.png",
        "colorHex": "#78736e",
        "createdAt": "2026-09-03T15:20:33.722Z",
        "emiPlans": [
          {
            "id": 1,
            "variantId": 1,
            "monthlyAmount": "44966.67",
            "tenureMonths": 3,
            "interestRate": "0.00",
            "cashback": "0.00",
            "createdAt": "2026-09-03T15:20:33.722Z"
          },
          {
            "id": 2,
            "variantId": 1,
            "monthlyAmount": "11241.67",
            "tenureMonths": 12,
            "interestRate": "0.00",
            "cashback": "4047.00",
            "createdAt": "2026-09-03T15:20:33.722Z"
          },
          {
            "id": 3,
            "variantId": 1,
            "monthlyAmount": "6256.13",
            "tenureMonths": 24,
            "interestRate": "10.50",
            "cashback": "0.00",
            "createdAt": "2026-09-03T15:20:33.722Z"
          }
        ]
      }
    ]
  }
  ```

* **Error Response** (`404 Not Found` for nonexistent product):
  ```json
  {
    "error": "Product not found"
  }
  ```

---

## Database Schema

### Relationships

* **Product → Variant**: One-to-Many (`Product.variants`). Each product has multiple storage and color variants. Deleting a product cascades to delete all associated variants.
* **Variant → EmiPlan**: One-to-Many (`Variant.emiPlans`). Each variant defines its price and associated EMI tenure plans. Deleting a variant cascades to delete all associated EMI plans.

### [`server/prisma/schema.prisma`](file:///Users/abhavkushwaha/Downloads/1fi-emi-app/server/prisma/schema.prisma)

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          Int       @id @default(autoincrement())
  name        String
  slug        String    @unique
  description String?
  createdAt   DateTime  @default(now())
  variants    Variant[]
}

model Variant {
  id           Int       @id @default(autoincrement())
  productId    Int
  variantLabel String
  mrp          Decimal   @db.Decimal(10, 2)
  price        Decimal   @db.Decimal(10, 2)
  imageUrl     String?
  colorHex     String?
  createdAt    DateTime  @default(now())

  product      Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  emiPlans     EmiPlan[]
}

model EmiPlan {
  id             Int      @id @default(autoincrement())
  variantId      Int
  monthlyAmount  Decimal  @db.Decimal(10, 2)
  tenureMonths   Int
  interestRate   Decimal  @db.Decimal(5, 2)
  cashback       Decimal  @db.Decimal(10, 2) @default(0)
  createdAt      DateTime @default(now())

  variant        Variant  @relation(fields: [variantId], references: [id], onDelete: Cascade)
}
```

---

## Seed Data

The seed data script is located at [`server/prisma/seed.js`](file:///Users/abhavkushwaha/Downloads/1fi-emi-app/server/prisma/seed.js). It wipes existing rows in order of foreign key constraints and creates 3 smartphone products, each with 3 variants (combining storage and color) and 3 EMI plans per variant.

### Products & Slugs

1. **iPhone 17 Pro** (`slug: iphone-17-pro`)
   * `256GB · Natural Titanium`
   * `512GB · Midnight Navy`
   * `1TB · Desert Bronze`
2. **Samsung Galaxy S25 Ultra** (`slug: samsung-galaxy-s25-ultra`)
   * `256GB · Titanium Silver`
   * `512GB · Onyx Black`
   * `1TB · Forest Emerald`
3. **Google Pixel 10 Pro** (`slug: google-pixel-10-pro`)
   * `128GB · Hazel Green`
   * `256GB · Berry Rose`
   * `512GB · Amber Coral`

---

## Deployment

### Production Architecture

```text
React / Vite
     ↓
   Vercel
     ↓
 Render API
     ↓
Neon PostgreSQL
```

* The React frontend is deployed on **Vercel** and communicates with the backend via the `VITE_API_URL` environment variable.
* The Node/Express API is deployed as a Web Service on **Render** and connects to the database via the `DATABASE_URL` environment variable.
* The relational database is hosted serverless on **Neon PostgreSQL**.

### Deployment URLs

* **Live Demo**: `https://1fi-emi-app-beta.vercel.app/`
* **Backend API**: `https://onefi-emi-app-jcbd.onrender.com`
* **Demo Video**: <ADD_VIDEO_LINK>

---

## Production API Examples

Using the production Render service base URL:

* **Health Check**:
  `https://onefi-emi-app-jcbd.onrender.com/api/health`
* **Products Catalog**:
  `https://onefi-emi-app-jcbd.onrender.com/api/products`
* **Single Product by Slug**:
  `https://onefi-emi-app-jcbd.onrender.com/api/products/iphone-17-pro`

---

## Assignment Requirements Checklist

| Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Dynamic backend/database data** | ✅ | Products, variants, and EMI plans stored in and fetched from PostgreSQL |
| **Unique product URLs** | ✅ | Dynamic routes mapped to `/products/:slug` |
| **3+ products** | ✅ | 3 smartphone models (`iphone-17-pro`, `samsung-galaxy-s25-ultra`, `google-pixel-10-pro`) |
| **2+ variants per product** | ✅ | 3 variants per product (differing by storage, color finish, MRP, and price) |
| **EMI plans** | ✅ | 3 plans per variant: 3m (0%), 12m (0% + cashback), 24m (interest-bearing) |
| **Responsive UI** | ✅ | Snapmint-style layout: 2 columns on desktop, single-column stacked on mobile |
| **Backend APIs** | ✅ | Express REST endpoints (`/api/health`, `/api/products`, `/api/products/:slug`) |
| **PostgreSQL database** | ✅ | Relational database schema with CASCADE relationships via Prisma |
| **Deployed frontend/backend** | ✅ | Production-ready configuration for Vercel, Render, and Neon |
