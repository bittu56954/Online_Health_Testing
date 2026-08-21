import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ensureAdminAccount } from './adminInit.js';

dotenv.config();

// Disable command buffering so queries fail fast or fallback instead of hanging for 14s
mongoose.set('bufferCommands', false);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, '..');

let isConnecting = false;
let isSwitchingFallback = false;
let memoryServerInstance = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (isConnecting) return;
  isConnecting = true;

  const primaryUri = process.env.MONGO_URI || 'mongodb+srv://krbittu803110_db_user:dPU9R7yWn6z813GU@cluster0.j2vupm7.mongodb.net/india';
  const localUri = 'mongodb://127.0.0.1:27017/mediscan_db';

  const connectionOpts = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 15000,
    family: 4
  };

  if (primaryUri) {
    try {
      console.log(`[MEDISCAN DB] Connecting to Primary Database...`);
      const conn = await mongoose.connect(primaryUri, connectionOpts);
      console.log(`[MEDISCAN DB] Successfully Connected to Primary Database: ${conn.connection.host}`);
      isConnecting = false;
      await ensureAdminAccount();
      return conn;
    } catch (primaryErr) {
      console.warn(`[MEDISCAN DB] Primary DB connection unavailable (${primaryErr.message}). Switching to fallback...`);
    }
  }

  // If running on Vercel or local fallback required, try MongoMemoryServer in-memory DB
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    if (!memoryServerInstance) {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServerInstance = await MongoMemoryServer.create();
    }

    const mongoUri = memoryServerInstance.getUri();
    const conn = await mongoose.connect(mongoUri);
    console.log(`[MEDISCAN DB] Connected to In-Memory Database Fallback: ${conn.connection.host}`);
    isConnecting = false;
    isSwitchingFallback = false;
    await ensureAdminAccount();
    return conn;
  } catch (fallbackErr) {
    console.error(`[MEDISCAN DB Critical Error] Failed to initialize in-memory fallback: ${fallbackErr.message}`);
    isConnecting = false;
    isSwitchingFallback = false;
    return mongoose.connection;
  }
};

mongoose.connection.on('disconnected', () => {
  if (!isSwitchingFallback && !isConnecting) {
    console.warn('[MEDISCAN DB] Mongoose connection lost. Re-establishing connection...');
    setTimeout(() => connectDB(), 3000);
  }
});

mongoose.connection.on('error', (err) => {
  console.error(`[MEDISCAN DB Runtime Warning] ${err.message}`);
});

export default connectDB;

