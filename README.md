# QuickHire - Simple Job Board Application

QuickHire is a mini full-stack job board built with:
- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Backend:** Laravel (REST API)
- **Database:** MySQL

It includes:
- Job listings with search + filters (category/location)
- Job detail view
- Application submission form
- Basic admin panel (add/delete jobs)
- Admin authentication (login/logout with Sanctum token)

## Project Structure

- `frontend/` → Next.js UI
- `backend/` → Laravel API

## Backend Setup (Laravel)

1. Open a terminal in `backend/`
2. Install dependencies:
   - `composer install`
3. Configure environment in `.env` (already prepared for MySQL):
   - `DB_CONNECTION=mysql`
   - `DB_HOST=127.0.0.1`
   - `DB_PORT=3306`
   - `DB_DATABASE=quickhire`
   - `DB_USERNAME=root`
   - `DB_PASSWORD=`
4. Create database in MySQL: `quickhire`
5. Generate app key:
   - `php artisan key:generate`
6. Run migrations:
   - `php artisan migrate`
7. Start API server:
   - `php artisan serve`

Default API URL: `http://127.0.0.1:8000/api`

## Frontend Setup (Next.js)

1. Open a terminal in `frontend/`
2. Install dependencies:
   - `npm install`
3. Create `.env.local` with:
   - `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api`
4. Start frontend dev server:
   - `npm run dev`

Default frontend URL: `http://localhost:3000`

## API Endpoints

### Jobs
- `GET /api/jobs` → list jobs (supports `search`, `category`, `location` query params)
- `GET /api/jobs/{id}` → get single job details
- `POST /api/jobs` → create new job (**auth required**)
- `DELETE /api/jobs/{id}` → delete a job (**auth required**)

### Applications
- `POST /api/applications` → submit a job application

### Auth
- `POST /api/auth/login` → admin login (returns bearer token)
- `GET /api/auth/me` → get authenticated admin profile (**auth required**)
- `POST /api/auth/logout` → revoke current token (**auth required**)

## Data Models

### Job (`job_listings`)
- `id`
- `title`
- `company`
- `location`
- `category`
- `description`
- `created_at`

### Application (`applications`)
- `id`
- `job_id` (FK → `job_listings.id`)
- `name`
- `email`
- `resume_link`
- `cover_note`
- `created_at`

## Validation Implemented

- Required fields validated on create endpoints
- `email` must be valid format
- `resume_link` must be a valid URL
- `job_id` must exist in `job_listings`

## Frontend Routes

- `/` → Public landing page (Figma-style)
- `/jobs` → Job Listings + Search/Filters (category/location)
- `/jobs/[id]` → Job Detail + Apply Form
- `/admin` → Authenticated admin dashboard (Add/Delete jobs)
- `/admin/login` → Admin login page

## Requirement Coverage

### Frontend
- ✅ Job Listings page shows all jobs
- ✅ Search by keyword
- ✅ Filter by category and/or location
- ✅ Job detail page with full description
- ✅ Apply form includes: name, email, resume URL, cover note
- ✅ Admin view includes add and delete job listing
- ✅ Responsive UI built with Tailwind CSS
- ✅ Reusable components and organized folder structure

### Backend API
- ✅ `GET /api/jobs`
- ✅ `GET /api/jobs/{id}`
- ✅ `POST /api/jobs` (protected)
- ✅ `DELETE /api/jobs/{id}` (protected)
- ✅ `POST /api/applications`
- ✅ Admin auth endpoints (`/api/auth/login`, `/api/auth/me`, `/api/auth/logout`)

### Database
- ✅ MySQL persistence
- ✅ `job_listings` and `applications` tables
- ✅ Relationship: Job → Applications (`applications.job_id` FK)

### Validation
- ✅ Required fields on create endpoints
- ✅ Email format validation
- ✅ Resume URL validation
- ✅ Existing `job_id` validation for application submission

## Admin Login (Demo)

- Email: `admin@quickhire.test`
- Password: `admin12345`

Credentials are seeded by `php artisan db:seed` (or `php artisan migrate:fresh --seed`).

## Build / Quality Checks

Frontend:
- `npm run lint`
- `npm run build`

Backend route check:
- `php artisan route:list --path=api`

End-to-end smoke test examples:
- `GET /api/jobs`
- `POST /api/jobs`
- `POST /api/applications`
- `DELETE /api/jobs/{id}`

## Optional Improvements Included

- Environment-based API URL (`NEXT_PUBLIC_API_URL`)
- Clean JSON API response format (`message`, `data`)
- Loading states for application/admin actions

## Deployment Guidance (Optional)

### Frontend (Vercel)
1. Import `frontend/` repository/project to Vercel
2. Set env var: `NEXT_PUBLIC_API_URL=https://<your-backend-domain>/api`
3. Build command: `npm run build`

### Backend (Render / Railway)
1. Deploy `backend/` as a PHP web service
2. Set MySQL connection env vars (`DB_*`)
3. Run migrations on deploy: `php artisan migrate --force`
4. Set `APP_ENV=production`, `APP_DEBUG=false`

## Notes

- The UI is implemented with clean, responsive structure and reusable components.
- The Figma link could not be programmatically inspected in this environment due WebGL restrictions; the implementation follows the required professional layout, typography hierarchy, spacing, and responsive behavior as closely as possible.
