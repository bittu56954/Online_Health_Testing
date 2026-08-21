import User from '../models/User.js';

/**
 * Ensures that the default fixed administrator account exists and is active.
 * If the admin user does not exist, it will be automatically created.
 * If it exists, it ensures the role is 'admin', isVerified is true, and status is 'active'.
 */
export const ensureAdminAccount = async () => {
  try {
    const defaultAccounts = [
      {
        name: 'System Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 9876543210',
        isVerified: true,
        status: 'active'
      },
      {
        name: 'Mediscan Admin',
        email: 'admin@mediscan.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1 800-555-0199',
        isVerified: true,
        status: 'active'
      },
      {
        name: 'Demo User',
        email: 'user@mediscan.com',
        password: 'User@123',
        role: 'user',
        phone: '+1 555-0142',
        isVerified: true,
        status: 'active'
      },
      {
        name: 'Super Admin',
        email: 'admin@society.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91 98765 43210',
        isVerified: true,
        status: 'active'
      }
    ];

    for (const acc of defaultAccounts) {
      let existing = await User.findOne({ email: acc.email }).select('+password');
      if (!existing) {
        await User.create(acc);
        console.log(`✅ Default Account (${acc.email}) successfully provisioned.`);
      } else {
        let needsSave = false;
        if (existing.role !== acc.role) {
          existing.role = acc.role;
          needsSave = true;
        }
        if (!existing.isVerified) {
          existing.isVerified = true;
          needsSave = true;
        }
        if (existing.status !== 'active') {
          existing.status = 'active';
          needsSave = true;
        }
        const isPasswordMatch = await existing.matchPassword(acc.password);
        if (!isPasswordMatch) {
          existing.password = acc.password;
          needsSave = true;
        }
        if (needsSave) {
          await existing.save();
          console.log(`✅ Default Account (${acc.email}) updated.`);
        }
      }
    }
  } catch (error) {
    console.error('⚠️ Error ensuring default accounts:', error.message);
  }
};
