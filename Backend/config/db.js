import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import dns from 'dns';
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

  // Set reliable public DNS servers to resolve MongoDB SRV records on Vercel/Windows/ISPs
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (dnsErr) {
    // Ignore DNS set errors in restricted environments
  }

  const primaryUri = process.env.MONGO_URI || 'mongodb+srv://krbittu803110_db_user:dPU9R7yWn6z813GU@cluster0.j2vupm7.mongodb.net/india';

  const connectionOpts = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
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
      console.warn(`[MEDISCAN DB] Primary DB connection unavailable (${primaryErr.message}).`);
    }
  }

  // Only attempt MongoMemoryServer in local development (NOT on Vercel serverless environment)
  if (!process.env.VERCEL) {
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
    }
  }

  isConnecting = false;
  return mongoose.connection;
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

