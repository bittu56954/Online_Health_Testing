import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllMedicines,
  getAllScans
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect & adminOnly middleware to all admin routes
router.use(protect, adminOnly);

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/medicines', getAllMedicines);
router.get('/scans', getAllScans);

export default router;
