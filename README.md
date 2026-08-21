# MEDISCAN - Full-Stack Medicine Information Scanner (MERN)

**MEDISCAN** is a production-ready, full-stack Medicine Information Scanner web application built strictly with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). 

It allows users to upload or scan medicine packaging images to extract OCR text, match active ingredients against verified pharmaceutical databases, track medicine expiry dates, receive automated reminders, and manage a personal digital medicine cabinet.

---

## 🚀 Key Features

### 🔐 1. User Authentication & Authorization
- **Registration & Verification**: Email verification via 6-digit OTP codes sent using NodeMailer (with console output fallback for local testing without SMTP).
- **Secure Password Management**: Passwords hashed with `bcryptjs`.
- **JWT Protection**: Secure stateful JWT authentication with token persistence.
- **Forgot Password**: Password reset workflow via email OTP verification.
- **Role-Based Access Control**: Separate privileges for standard **Users** and **Administrators**.

### 🔍 2. Medicine Label Scanner (OCR)
- **Image Analysis**: Drag-and-drop or file upload for pill strips, medicine bottles, and packaging.
- **OCR Engine**: Tesseract.js optical character recognition engine.
- **Verified Pharmaceutical Database Match**: Matches generic ingredients, brand names, dosage strengths, batch numbers, and manufacturing/expiry dates.
- **No-Guessing Safety Policy**: If an image is blurry or cannot be reliably identified, MEDISCAN explicitly shows **"Medicine could not be identified"** to prevent dangerous false matches.

### 💊 3. My Medicines Cabinet
- Digital repository for all saved medicines.
- Real-time expiry status indicators (`Valid / Safe`, `Expiring Soon`, `Expired`).
- Filter by status tab and live search by name, generic ingredient, or manufacturer.
- Detailed modal view displaying common uses, side effects, precautions, storage guidelines, and warnings.

### 📜 4. Scan History Logs
- Detailed audit logs of all past scan events.
- Track scan timestamps, match confidence scores, and raw OCR text.

### 🔔 5. Expiry & Dosage Reminders
- Custom expiry and dosage schedule reminders.
- Categorized view of upcoming vs expired alerts.

### 🛡️ 6. Admin Panel
- Dedicated protected route (`/admin`) for system administrators.
- Dashboard analytics (Total Users, Saved Medicines, Scan Logs, Unidentified Scans).
- User Management: Toggle roles (`user`/`admin`) and delete user accounts.
- Audit logs for global medicines and scan events.

---

## 🛠 Tech Stack

- **Frontend**: React.js (React Router DOM v7, Lucide Icons, Plain CSS only).
- **Backend**: Node.js + Express.js (MVC Architecture).
- **Database**: MongoDB (Mongoose ODM models for `User`, `Medicine`, `ScanHistory`, `Reminder`).
- **Authentication**: JSON Web Tokens (JWT) + `bcryptjs`.
- **Email Service**: NodeMailer for OTP delivery.
- **OCR Engine**: Tesseract.js.
- **Styling**: **Plain CSS only** (No Tailwind, Bootstrap, or Material UI used).

---

## 🔑 Default Credentials

Run database seeding to generate pre-seeded accounts and sample data:

```bash
npm run seed
```

- **Admin Account**: `admin@gmail.com` | Password: `admin123`
- **User Account**: `user@mediscan.com`  | Password: `User@123`

---

## 🚦 Local Setup & Running Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` (App falls back automatically to `mongodb-memory-server` if local MongoDB service is inactive).

### 2. Install Dependencies
In the root project directory:

```bash
npm run install:all
```

### 3. Seed Database (Optional)
```bash
npm run seed
```

### 4. Start Application
To run both backend and frontend servers concurrently:

```bash
npm run dev
```

- **Frontend**: Runs at `http://localhost:5173`
- **Backend API**: Runs at `http://localhost:5001/api`

---

## 📡 Backend REST API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register user & send OTP
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/resend-otp` - Resend verification OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Send password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `PUT /api/auth/change-password` - Change password (Protected)

### Medicines (`/api/medicines`)
- `POST /api/medicines/scan` - Process image upload / OCR scan (Protected)
- `POST /api/medicines/save` - Save identified medicine (Protected)
- `GET /api/medicines` - Get user's saved medicines (Protected)
- `GET /api/medicines/:id` - Get medicine details (Protected)
- `PUT /api/medicines/:id` - Update medicine details (Protected)
- `DELETE /api/medicines/:id` - Delete medicine (Protected)

### History (`/api/history`)
- `GET /api/history` - Get scan history (Protected)
- `DELETE /api/history/:id` - Delete history item (Protected)
- `DELETE /api/history/clear-all` - Clear all history (Protected)

### Reminders (`/api/reminders`)
- `GET /api/reminders` - Get reminders (Protected)
- `POST /api/reminders` - Create reminder (Protected)
- `PUT /api/reminders/:id` - Update reminder (Protected)
- `DELETE /api/reminders/:id` - Delete reminder (Protected)

### Admin (`/api/admin`)
- `GET /api/admin/stats` - Admin statistics (Admin Only)
- `GET /api/admin/users` - Get all users (Admin Only)
- `PUT /api/admin/users/:id/role` - Update user role (Admin Only)
- `DELETE /api/admin/users/:id` - Delete user account (Admin Only)
- `GET /api/admin/medicines` - View all saved medicines (Admin Only)
- `GET /api/admin/scans` - Audit all scan history logs (Admin Only)

---

## ⚠️ Medical Safety Disclaimer

This application is for informational purposes only. Do not provide diagnosis or personalized treatment recommendations. Medicine uses and safety information must come from a reliable verified source. Never guess medicine information from an unclear image.
