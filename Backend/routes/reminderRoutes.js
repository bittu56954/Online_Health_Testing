import express from 'express';
import {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder
} from '../controllers/reminderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getReminders);
router.post('/', protect, createReminder);
router.put('/:id', protect, updateReminder);
router.delete('/:id', protect, deleteReminder);

export default router;
