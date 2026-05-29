# LEADoPS

LEADoPS is a full-stack lead operations dashboard for managing sales leads, users, authentication, and pipeline views. It ships with a dark enterprise UI, role-based access control, lead CRUD, search, filters, pagination, and Docker support.

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, Zustand
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, Zod
- Auth: JWT authentication with protected routes and role checks
- DevOps: Docker Compose, separate frontend/backend Dockerfiles

## Features

- Login and protected dashboard shell
- Dark LeadOps admin interface
- Lead list with search, status/source filters, sorting, pagination, create, edit, and delete
- Lead detail page
- Dashboard, Analytics, Monitoring, and Export views
- Admin-only user management route
- Backend validation, centralized errors, request logging, and JWT middleware

## Project Structure

```text
LEADoPS/
  backend/      Express + TypeScript + MongoDB API
  frontend/     React + Vite + Tailwind dashboard
  docker-compose.yml
```

## Local Development

### Prerequisites

- Node.js 20+
- npm
- MongoDB running locally, or Docker

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Default API URL: `http://localhost:5000/api`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Default app URL: `http://localhost:5173`

If your backend runs on a different URL, create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Docker

Create `backend/.env` from `backend/.env.example`, then run:

```bash
docker compose up --build
```

Frontend will be available at `http://localhost:3000`.

## Useful Scripts

Backend:

```bash
npm run dev
npm run build
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## Environment Variables

Backend variables:

| Variable | Description |
| --- | --- |
| `PORT` | API server port |
| `MONGODB_URI` | MongoDB connection string |
| `CORS_ORIGIN` | Allowed frontend origin |
| `JWT_SECRET` | JWT signing secret, at least 24 characters |
| `JWT_EXPIRES_IN` | Access token lifetime |
| `LOG_LEVEL` | Logger level |
| `LOG_DIR` | Backend log directory |

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/leads`
- `POST /api/leads`
- `GET /api/leads/:id`
- `PATCH /api/leads/:id`
- `DELETE /api/leads/:id`

## Repository

GitHub: https://github.com/aniruddiyengar123-jpg/LEADoPS
