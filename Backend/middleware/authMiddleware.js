import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - Verify JWT token in Authorization header
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'mediscan_super_secret_jwt_key_2026_safe_health_app'
      );

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User account not found.' });
      }

      next();
    } catch (error) {
      console.error(`[AUTH MIDDLEWARE ERROR] Token validation failed: ${error.message}`);
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token.' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided.' });
  }
};

// Optional protect middleware (attaches user if valid token, but allows guest access)
export const optionalProtect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'mediscan_super_secret_jwt_key_2026_safe_health_app'
      );
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Ignore token failure for guest scan
    }
  }
  next();
};

// Admin authorization middleware
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied: Admin privileges required.' });
  }
};
