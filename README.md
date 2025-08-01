# Restaurant Training Portal ResiQ

## Project Overview
A full-stack monorepo for a restaurant training portal, featuring authentication, cocktail and wine management, and a custom liquor database with integration.

---

## Directory Structure
```
res-train/
  backend/      # Prisma schema, migrations, and (optionally) API server
  frontend/     # Next.js app, API routes, and UI components
```

---

## Setup Instructions (make private)

### 1. Clone the Repository
```sh
git clone <repo-url>
cd res-train
```

### 2. Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### 3. Database Setup (Prisma)
- Configure your database connection in `backend/.env`:
  ```
  DATABASE_URL=your_postgres_connection_string
  ```
- Run migrations:
  ```sh
  cd backend
  npx prisma migrate dev
  ```

### 4. Environment Variables
- **Frontend** (`frontend/.env.local`):
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  COCKTAILDB_API_URL=https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
  DATABASE_URL=your_postgres_connection_string
  ```
- **Backend** (`backend/.env`):
  ```
  DATABASE_URL=your_postgres_connection_string
  ```

---

## Running the App

### Backend (if API server is set up)
```sh
cd backend
npm run start # or: ts-node server.ts
```

### Frontend (Next.js)
```sh
cd frontend
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Liquor API (uodate)
- **GET /api/liquors**: Returns custom liquors (from DB) and liquors from TheCocktailDB.
- **POST /api/liquors**: Adds a custom liquor to the database.

> **Note:** In production, move API logic to the backend for security and scalability.

---

## Development Notes
- Use the `@/` alias for absolute imports in the frontend (see `frontend/tsconfig.json`).
- Use relative imports in the backend.
- For custom liquor management, use the dashboard page in the frontend.

---

## Hosting

- hosting services: vercel

---

## License
MIT 
