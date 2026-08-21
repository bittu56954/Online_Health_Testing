import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ensureAdminAccount } from './adminInit.js';

dotenv.config();

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
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
    family: 4
  };

  try {
    console.log(`[MEDISCAN DB] Connecting to Primary Database...`);
    cachedPromise = mongoose.connect(primaryUri, connectionOpts);
    const conn = await cachedPromise;
    cachedConn = conn;
    cachedPromise = null;
    console.log(`[MEDISCAN DB] Successfully Connected to Primary Database: ${conn.connection.host}`);
    
    // Provision default accounts asynchronously in background
    ensureAdminAccount().catch((err) => {
      console.warn('[MEDISCAN DB ADMIN INIT WARN]', err.message);
    });

    return conn;
  } catch (primaryErr) {
    cachedPromise = null;
    console.error(`[MEDISCAN DB ERR] Connection failed: ${primaryErr.message}`);

    if (!process.env.VERCEL) {
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const memoryServerInstance = await MongoMemoryServer.create();
        const mongoUri = memoryServerInstance.getUri();
        const conn = await mongoose.connect(mongoUri);
        cachedConn = conn;
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

