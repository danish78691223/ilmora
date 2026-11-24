# ILMORA — Online Language Institute

A full-stack React + Express + MongoDB website with English, Urdu and Arabic content, RTL support, application submissions and a protected CMS.

## Requirements
- Node.js 20+
- MongoDB 6+ (local or Atlas)

## 1. Configure the API

```bash
cd backend
cp .env.example .env
npm install
```

Set `MONGODB_URI`, a long random `JWT_SECRET`, `CLIENT_ORIGIN`, and the initial admin credentials in `.env`.

## 2. Seed the database

```bash
npm run seed
```

The seed script creates a default administrator and multilingual starter content. Change the default credentials immediately after first login.

## 3. Run locally

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173. Admin: http://localhost:5173/admin/login.

## Default seed administrator
The seed script reads `ADMIN_USERNAME` and `ADMIN_PASSWORD` from the backend environment. Defaults are `admin` and `ChangeMe123!` only when those variables are not supplied. Set your own credentials before running the seed script.

## Deployment
- Deploy `backend/` to Render, Railway, Fly.io or a Node host. Set all backend environment variables. Use a managed MongoDB database.
- Deploy `frontend/` to Vercel or Netlify. Set `VITE_API_URL` to the deployed API origin (no trailing slash).
- Set backend `CLIENT_ORIGIN` to the exact deployed frontend origin.
- Enable HTTPS. Cookies are `httpOnly`, `secure` in production and `sameSite=lax`.
- Configure `ADMIN_EMAIL` and SMTP variables to enable email notifications.
- Uploads are stored locally in `backend/uploads`; for multi-instance production, replace this with S3/Cloudinary storage and a CDN.

## CMS
Sign in at `/admin/login`. The CMS supports dashboard metrics, searchable/filterable submissions, status changes, deletion, CSV export, password changes and multilingual website content editing. The content editor edits the complete structured site content as JSON with three language values, which makes every section/content string editable without changing code. Teacher, course, testimonial and FAQ collections are part of the same structured content document.

## Security notes
This project includes Helmet, API rate limiting, strict CORS, JWT in httpOnly cookies, bcrypt password hashing, input validation/sanitization, a honeypot field, and same-origin cookie settings. For high-risk production deployments, add a managed WAF, CAPTCHA provider, audit logging, object storage, automated backups, MFA, and a dedicated CSRF token strategy if you change the cookie/CORS deployment model. Do not expose MongoDB or JWT secrets. Use a strong unique admin password.
