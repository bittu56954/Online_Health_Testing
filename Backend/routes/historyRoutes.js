import express from 'express';
import { getScanHistory, deleteHistoryItem, clearHistory } from '../controllers/historyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getScanHistory);
router.delete('/clear-all', protect, clearHistory);
router.delete('/:id', protect, deleteHistoryItem);

export default router;
