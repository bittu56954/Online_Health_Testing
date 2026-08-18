# 🚀 Real-World Production Server Deployment Guide

Welcome to the **Smart Society Management System** deployment documentation. This guide provides comprehensive, step-by-step instructions for deploying this full-stack web application to production servers (e.g., **Docker, VPS, AWS EC2, DigitalOcean, Render, Vercel, Railway, or Heroku**).

---

## 📋 1. Authentication & Security Architecture

### 👑 Fixed Administrator Credentials
The Administrator account is pre-provisioned in the database and **cannot register publicly**.
- **Admin Email / ID**: `admin@society.com`
- **Admin Password**: `Admin@123`
- **Role**: `admin`
- **Access URL**: `/login` (Select **Admin Portal** tab)

> [!IMPORTANT]
> The backend automatically guarantees that this Admin account exists and is active whenever the server boots up. Any attempt by external users to register with the role `admin` or using the admin email address is strictly rejected with a `400 Bad Request`.

### 👥 Resident Registration & Login Workflow
1. **Registration**: Residents must visit `/register` and enter their Name, Email, Phone number, and Password.
2. **OTP Verification**: A 6-digit numeric OTP is issued (sent via email or available in development) and verified on `/verify-otp`.
3. **Login**: Once verified, residents sign in at `/login` with their Email & Password.
4. **Dashboard Access**: After signing in, residents are securely routed to `/resident` where their flat bills, dues, complaints, visitors, and notices are accessible. Direct visits to `/dashboard`, `/admin/*`, or `/resident/*` without an active session automatically redirect to `/login`.

---

## ⚙️ 2. Environment Variables Configuration

### Backend Environment Variables (`Backend/.env`)
Create a `.env` file in the `Backend` directory or configure these in your server environment:

```env
# Server Port & Mode
PORT=5001
NODE_ENV=production

# MongoDB Database Connection (Replace with your live MongoDB Atlas connection string)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/smart_society?retryWrites=true&w=majority

# JWT Security
JWT_SECRET=super_secret_jwt_key_society_management_2026_secure
JWT_EXPIRE=7d

# Fixed Admin Credentials
ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@society.com
ADMIN_PASSWORD=Admin@123
ADMIN_PHONE=+91 98765 43210

# CORS Allowed Origins (Comma-separated list of your frontend URLs)
CLIENT_URL=https://your-custom-domain.com,https://your-app.vercel.app

# Optional SMTP Email Configuration (for live email OTPs)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM=noreply@smartsociety.com
```

### Frontend Environment Variables (`React/.env`)
Create a `.env` file in the `React` directory:

```env
# URL pointing to your deployed backend API
VITE_API_URL=https://api.your-domain.com/api
# Or for single-server unified deployment (leave blank or set to /api):
# VITE_API_URL=/api
```

---

## 🐳 3. Deployment Option A: One-Click Docker Containerization (Recommended for Cloud VPS / AWS / DigitalOcean)

This project includes a multi-stage `Dockerfile` and `docker-compose.yml` pre-configured out of the box.

### Step 1: Clone repository on your server
```bash
git clone <your-repository-url>
cd "Society Management System"
```

### Step 2: Launch full-stack application + MongoDB
```bash
docker-compose up -d --build
```
Your application will be live at `http://your-server-ip:5001`.

---

## 🚀 4. Deployment Option B: Unified Single Node.js Server (Render / Railway / VPS)

In this setup, a single Node.js server serves both the **REST API** and the compiled **Vite React Frontend**.

### Step 1: Build the React Frontend
```bash
npm run build
```
Or manually inside `React/`:
```bash
cd React
npm install
npm run build
```

### Step 2: Start the Backend Server
```bash
cd ../Backend
npm install
node server.js
```
The Express server in `server.js` is pre-configured to automatically serve `React/dist` and handle single-page application (SPA) client-side routing on port `5001`.

### Step 3: Run with PM2 Process Manager (For Linux / VPS / EC2)
```bash
npm install -g pm2
cd Backend
pm2 start server.js --name "smart-society"
pm2 save
pm2 startup
```

---

## 🌐 5. Deployment Option C: Decoupled Two-Tier Architecture (Vercel/Netlify + Cloud Backend)

### Frontend Deployment (Vercel / Netlify):
1. Push your repository to GitHub.
2. Link the repository to **Vercel** or **Netlify**.
3. Set **Root Directory** to `React`.
4. Set **Build Command** to `npm run build`.
5. Set **Output Directory** to `dist`.
6. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-api-domain.com/api`

### Backend Deployment (Render / Railway / AWS / Heroku):
1. Create a Web Service on **Render** or **Railway**.
2. Set **Root Directory** to `Backend`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `node server.js`.
5. Add the Backend Environment Variables defined in Section 2 (including `CLIENT_URL` pointing to your Vercel/Netlify domain).

---

## 🔒 6. Nginx & SSL Setup (Ubuntu / Debian VPS)

Copy `nginx.conf` into `/etc/nginx/sites-available/smartsociety` and create a symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/smartsociety /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

To enable free HTTPS/SSL via Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🔍 7. Verification & Health Check

After deployment, test that the system is running:

1. **API Health Endpoint**:
   ```bash
   curl https://your-server-domain.com/api/health
   ```
   **Expected Response**: `{"status":"OK","message":"Smart Society Management API is operational."}`

2. **Admin Login Test**:
   - Navigate to `/login` -> Click **Admin Portal** tab.
   - Enter `admin@society.com` and `Admin@123`.
   - Verify that you are taken directly to the **Admin Dashboard** (`/admin`).

3. **Resident Registration Test**:
   - Navigate to `/register`.
   - Register a new account -> Enter OTP -> Log in.
   - Verify that you are taken to the **Resident Dashboard** (`/resident`).

4. **Security Direct Access Test**:
   - In an Incognito window, open `/dashboard` or `/admin` directly without logging in.
   - Verify you are immediately redirected to `/login`.
