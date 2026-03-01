# QuickHire Submission Checklist

## 1) Project Structure
- [x] `frontend/` (Next.js + TypeScript + Tailwind)
- [x] `backend/` (Laravel API)
- [x] Root docs: `README.md`

## 2) Core Feature Coverage
- [x] Job Listings page
- [x] Search jobs
- [x] Filter jobs by category/location
- [x] Job Detail page
- [x] Apply form (name, email, resume link, cover note)
- [x] Basic admin view (add job, delete job)
- [x] Responsive UI and reusable components

## 3) Backend API Coverage
- [x] `GET /api/jobs`
- [x] `GET /api/jobs/{id}`
- [x] `POST /api/jobs`
- [x] `DELETE /api/jobs/{id}`
- [x] `POST /api/applications`

## 4) Database & Validation
- [x] MySQL configured (`quickhire` database)
- [x] `job_listings` + `applications` tables with relationship
- [x] Required field validation
- [x] Email format validation
- [x] Resume link URL validation

## 5) Local Verification Done
- [x] Backend migrate + seed completed
- [x] API smoke tests passed (list/detail/create/apply/delete)
- [x] Frontend lint passed
- [x] Frontend build passed
- [x] Frontend route smoke checks passed:
  - [x] `/`
  - [x] `/admin`
  - [x] `/jobs/1`

## 6) Demo Run Commands

### Backend
1. `cd backend`
2. `php artisan key:generate --force`
3. `php artisan migrate:fresh --seed --force`
4. `php artisan serve --host=127.0.0.1 --port=8000`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 7) Final Submission Notes
- Include Figma link in submission description.
- Mention stack choices and endpoint list.
- Mention that seed data is included for quick demo.
- Provide screenshots/video of key flows if requested.
