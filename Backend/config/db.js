import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ensureAdminAccount } from './adminInit.js';

dotenv.config();

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
    serverSelectionTimeoutMS: 4000,
    connectTimeoutMS: 4000,
    socketTimeoutMS: 30000,
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
      console.warn(`[MEDISCAN DB] Primary DB connection unavailable (${primaryErr.message}). Switching to local fallback...`);
    }
  }

  if (process.env.VERCEL) {
    console.warn(`[MEDISCAN DB] Running on Vercel Serverless environment. Skipping local MongoDB / MongoMemoryServer fallback.`);
    isConnecting = false;
    return mongoose.connection;
  }

  isSwitchingFallback = true;
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    const conn = await mongoose.connect(localUri, connectionOpts);
    console.log(`[MEDISCAN DB] Connected to Local MongoDB: ${conn.connection.host}`);
    isConnecting = false;
    isSwitchingFallback = false;
    await ensureAdminAccount();
    return conn;
  } catch (localErr) {
    console.warn(`[MEDISCAN DB] Local MongoDB server not running. Initializing Persistent Embedded Database...`);
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }

      const dbDir = path.join(backendDir, 'data', 'db');
      if (!fs.existsSync(dbDir)) {
        try { fs.mkdirSync(dbDir, { recursive: true }); } catch (e) {}
      }

      if (!memoryServerInstance) {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        try {
          const lockFile = path.join(dbDir, 'mongod.lock');
          if (fs.existsSync(lockFile)) {
            try { fs.unlinkSync(lockFile); } catch (e) {}
          }
          memoryServerInstance = await MongoMemoryServer.create({
            instance: {
              dbPath: dbDir,
              storageEngine: 'wiredTiger'
            }
          });
        } catch (dbPathErr) {
          console.warn(`[MEDISCAN DB] Persistent storage locked/unavailable (${dbPathErr.message}). Switching to pure in-memory server...`);
          memoryServerInstance = await MongoMemoryServer.create();
        }
      }

      const mongoUri = memoryServerInstance.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`[MEDISCAN DB] Connected to Embedded Database (MERN Active): ${conn.connection.host}`);
      isConnecting = false;
      isSwitchingFallback = false;
      await ensureAdminAccount();
      return conn;
    } catch (memErr) {
      console.error(`[MEDISCAN DB] Persistent Embedded DB failed (${memErr.message}), initializing pure in-memory database fallback...`);
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memoryServerInstance = await MongoMemoryServer.create();
        const mongoUri = memoryServerInstance.getUri();
        const conn = await mongoose.connect(mongoUri);
        console.log(`[MEDISCAN DB] Connected to Pure In-Memory Database: ${conn.connection.host}`);
        isConnecting = false;
        isSwitchingFallback = false;
        await ensureAdminAccount();
        return conn;
      } catch (finalErr) {
        console.error(`[MEDISCAN DB Critical Error] Failed to initialize any database instance: ${finalErr.message}`);
        isConnecting = false;
        isSwitchingFallback = false;
      }
    }
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

