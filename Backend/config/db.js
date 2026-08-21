import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { ensureAdminAccount } from './adminInit.js';

dotenv.config();

// Ensure Google public DNS is used for reliable MongoDB SRV resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore in environments where setting DNS servers is restricted
}

let cachedConn = null;
let cachedPromise = null;

const connectDB = async () => {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return cachedConn;
  }

  if (mongoose.connection.readyState === 1) {
    cachedConn = mongoose.connection;
    return cachedConn;
  }

  if (cachedPromise) {
    await cachedPromise;
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }
  }

  const primaryUri = process.env.MONGO_URI || 'mongodb+srv://krbittu803110_db_user:dPU9R7yWn6z813GU@cluster0.j2vupm7.mongodb.net/india';

  const connectionOpts = {
    serverSelectionTimeoutMS: 2000,
    connectTimeoutMS: 2000,
    socketTimeoutMS: 2000,
    maxPoolSize: 1,
    minPoolSize: 0,
    family: 4
  };

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('MongoDB connection timeout (2500ms limit reached)')), 2500);
  });

  try {
    console.log(`[MEDISCAN DB] Connecting to Primary Database...`);
    cachedPromise = Promise.race([
      mongoose.connect(primaryUri, connectionOpts),
      timeoutPromise
    ]);
    const conn = await cachedPromise;
    cachedConn = conn;
    cachedPromise = null;
    console.log(`[MEDISCAN DB] Successfully Connected to Primary Database: ${conn.connection.host}`);
    
    if (!process.env.VERCEL) {
      ensureAdminAccount().catch((err) => {
        console.warn('[MEDISCAN DB ADMIN INIT WARN]', err.message);
      });
    }

    return conn;
  } catch (primaryErr) {
    cachedPromise = null;
    console.warn(`[MEDISCAN DB WARN] Primary DB connection failed: ${primaryErr.message}`);
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
      }
    } catch (discErr) {}

    if (!process.env.VERCEL) {
      try {
        if (mongoose.connection.readyState !== 0) {
          await mongoose.disconnect();
        }

        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const memoryServerInstance = await MongoMemoryServer.create();
        const mongoUri = memoryServerInstance.getUri();
        const conn = await mongoose.connect(mongoUri);
        cachedConn = conn;
        console.log(`[MEDISCAN DB] Connected to In-Memory Database Fallback: ${conn.connection.host}`);
        await ensureAdminAccount();
        return conn;
      } catch (fallbackErr) {
        console.error(`[MEDISCAN DB FALLBACK ERR] ${fallbackErr.message}`);
      }
    }
    throw primaryErr;
  }
};

export default connectDB;

