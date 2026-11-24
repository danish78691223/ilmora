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

For local development, `MONGODB_URI=mongodb://127.0.0.1:27017/ILMORA_institute` is suitable when MongoDB is running on your computer.

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

### Backend on Render
1. Create a MongoDB Atlas cluster and a database user. In Atlas Network Access, allow connections from your deployment host (for a quick initial setup, Atlas documents the `0.0.0.0/0` option; restrict this where practical).
2. Copy the Atlas connection string. Replace the username, password and database name with your actual values. URL-encode special characters in the database password.
3. Create a Render **Web Service** for this repository and set **Root Directory** to `backend`.
4. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
5. In Render → service → Environment, add:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = your MongoDB Atlas URI (usually starts with `mongodb+srv://`; never use localhost on Render)
   - `JWT_SECRET` = a long, random secret
   - `CLIENT_ORIGIN` = the exact deployed frontend origin, without a trailing slash
   - `ADMIN_USERNAME` and `ADMIN_PASSWORD` = your own strong initial admin credentials
6. Save the variables and redeploy. Check `https://YOUR-RENDER-SERVICE.onrender.com/api/health`; it should return `{"ok":true}`.

### Frontend on Vercel or Netlify
- Set `VITE_API_URL` to the deployed backend origin (no trailing slash).
- Set backend `CLIENT_ORIGIN` to the exact deployed frontend origin.
- Redeploy the frontend after changing its environment variable.

### Other production notes
- Enable HTTPS. Cookies are `httpOnly`, `secure` in production and `sameSite=lax`.
- Configure `ADMIN_EMAIL` and SMTP variables to enable email notifications.
- Uploads are stored locally in `backend/uploads`; for multi-instance production, replace this with S3/Cloudinary storage and a CDN.

## CMS
Sign in at `/admin/login`. The CMS supports dashboard metrics, searchable/filterable submissions, status changes, deletion, CSV export, password changes and multilingual website content editing. The content editor edits the complete structured site content as JSON with three language values, which makes every section/content string editable without changing code. Teacher, course, testimonial and FAQ collections are part of the same structured content document.

## Security notes
This project includes Helmet, API rate limiting, strict CORS, JWT in httpOnly cookies, bcrypt password hashing, input validation/sanitization, a honeypot field, and same-origin cookie settings. For high-risk production deployments, add a managed WAF, CAPTCHA provider, audit logging, object storage, automated backups, MFA, and a dedicated CSRF token strategy if you change the cookie/CORS deployment model. Do not expose MongoDB or JWT secrets. Use a strong unique admin password.
