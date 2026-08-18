import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';
import Medicine from './models/Medicine.js';
import ScanHistory from './models/ScanHistory.js';
import Reminder from './models/Reminder.js';
import { VERIFIED_MEDICINES } from './utils/medicineDatabase.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('[MEDISCAN SEEDER] Clearing existing collections...');
    await User.deleteMany({});
    await Medicine.deleteMany({});
    await ScanHistory.deleteMany({});
    await Reminder.deleteMany({});

    console.log('[MEDISCAN SEEDER] Creating seed users...');
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@mediscan.com',
      password: 'Admin@123',
      role: 'admin',
      isVerified: true,
      phone: '+1 800-555-0199'
    });

    const demoUser = await User.create({
      name: 'John Doe',
      email: 'user@mediscan.com',
      password: 'User@123',
      role: 'user',
      isVerified: true,
      phone: '+1 555-0142',
      medicalNotes: 'No known drug allergies.'
    });

    console.log('[MEDISCAN SEEDER] Creating sample user medicines...');
    
    // 1. Valid Medicine
    const today = new Date();
    const futureExp = new Date();
    futureExp.setMonth(today.getMonth() + 14);

    const expSoon = new Date();
    expSoon.setDate(today.getDate() + 12);

    const expiredDate = new Date();
    expiredDate.setDate(today.getDate() - 45);

    const med1 = await Medicine.create({
      user: demoUser._id,
      name: 'Paracetamol / Dolo 650',
      genericName: 'Paracetamol (Acetaminophen)',
      strength: '650mg',
      manufacturer: 'Micro Labs Ltd',
      batchNumber: 'B-DL65099',
      mfgDate: '2025-01-10',
      expDate: futureExp.toISOString().split('T')[0],
      status: 'valid',
      uses: ['Fever reduction (Antipyretic)', 'Mild to moderate body pain', 'Headaches'],
      sideEffects: ['Nausea (rare)', 'Liver toxicity if taken above 4000mg/day'],
      precautions: ['Do not consume with alcohol', 'Do not exceed 4g daily'],
      storage: 'Store below 30°C in a dry place.',
      warnings: ['OVERDOSE WARNING: Excessive dose causes severe liver damage.']
    });

    // 2. Expiring Soon Medicine
    const med2 = await Medicine.create({
      user: demoUser._id,
      name: 'Augmentin 625 Duo',
      genericName: 'Amoxicillin + Potassium Clavulanate',
      strength: '625mg',
      manufacturer: 'GlaxoSmithKline',
      batchNumber: 'B-AG62512',
      mfgDate: '2024-11-01',
      expDate: expSoon.toISOString().split('T')[0],
      status: 'expiring_soon',
      uses: ['Respiratory tract infections', 'Sinusitis and otitis media'],
      sideEffects: ['Loose stools', 'Nausea'],
      precautions: ['Complete full prescribed course'],
      storage: 'Store below 25°C.',
      warnings: ['ANTIBIOTIC: Do not use without valid prescription.']
    });

    // 3. Expired Medicine
    const med3 = await Medicine.create({
      user: demoUser._id,
      name: 'Cetirizine HCl',
      genericName: 'Cetirizine Hydrochloride',
      strength: '10mg',
      manufacturer: 'Cipla Ltd',
      batchNumber: 'B-CT10043',
      mfgDate: '2024-02-15',
      expDate: expiredDate.toISOString().split('T')[0],
      status: 'expired',
      uses: ['Allergic rhinitis', 'Hives and skin itching'],
      sideEffects: ['Drowsiness', 'Dry mouth'],
      precautions: ['Avoid driving after consumption'],
      storage: 'Store in a dry place.',
      warnings: ['EXPIRED MEDICINE: Do not ingest. Dispose of safely.']
    });

    console.log('[MEDISCAN SEEDER] Creating scan history entries...');
    await ScanHistory.create({
      user: demoUser._id,
      imageName: 'dolo_650_strip.png',
      status: 'identified',
      confidenceScore: 96,
      identifiedMedicine: {
        name: med1.name,
        genericName: med1.genericName,
        strength: med1.strength,
        manufacturer: med1.manufacturer,
        batchNumber: med1.batchNumber,
        expDate: med1.expDate,
        expStatus: med1.status,
        uses: med1.uses,
        sideEffects: med1.sideEffects,
        precautions: med1.precautions,
        storage: med1.storage,
        warnings: med1.warnings
      }
    });

    await ScanHistory.create({
      user: demoUser._id,
      imageName: 'blurry_unknown_bottle.jpg',
      status: 'unidentified',
      confidenceScore: 12,
      rawExtractedText: 'xyz123 unclear text'
    });

    console.log('[MEDISCAN SEEDER] Creating reminders...');
    await Reminder.create({
      user: demoUser._id,
      medicineName: 'Augmentin 625 Duo',
      reminderDate: expSoon,
      reminderType: 'expiry',
      notes: 'Dispose or replace medicine strip before expiry date.',
      status: 'upcoming'
    });

    console.log('\n========================================================');
    console.log(' [MEDISCAN SEED SUCCESSFUL] Default Credentials:');
    console.log(' Admin Account: admin@mediscan.com | Password: Admin@123');
    console.log(' User Account:  user@mediscan.com  | Password: User@123');
    console.log('========================================================\n');

    process.exit(0);
  } catch (error) {
    console.error(`[MEDISCAN SEED ERROR] ${error.message}`);
    process.exit(1);
  }
};

seedData();
