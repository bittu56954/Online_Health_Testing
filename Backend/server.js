import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to Database
connectDB();

const app = express();

// Disable ETags for API endpoints to return 200 OK with fresh data
app.disable('etag');

// Middleware
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cors());
app.use(morgan('dev'));

// Static uploads directory
app.use('/uploads', express.static(uploadsDir));

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MEDISCAN API Server is operational',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/admin', adminRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(`[MEDISCAN SERVER ERROR] ${err.stack}`);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = parseInt(process.env.PORT || '5001', 10);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n========================================================`);
  console.log(` [MEDISCAN SERVER] Running on http://127.0.0.1:${PORT}`);
  console.log(` Healthcheck: http://127.0.0.1:${PORT}/api/health`);
  console.log(`========================================================\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[PORT CONFLICT ERROR] Port ${PORT} is already in use by another process.`);
    console.error(`To resolve this issue, please terminate the process occupying port ${PORT} or restart nodemon.\n`);
  } else {
    console.error(`[SERVER LISTEN ERROR] ${err.message}`);
  }
});

process.on('unhandledRejection', (err) => {
  console.error(`[UNHANDLED REJECTION] ${err.message}`);
});
