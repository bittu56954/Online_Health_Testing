import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  scanMedicine,
  saveMedicine,
  getUserMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
} from '../controllers/medicineController.js';
import { protect, optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer storage engine for medicine label uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'scan-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed!'));
  }
});

router.post('/scan', optionalProtect, upload.single('medicineImage'), scanMedicine);
router.post('/save', protect, saveMedicine);
router.get('/', protect, getUserMedicines);
router.get('/:id', protect, getMedicineById);
router.put('/:id', protect, updateMedicine);
router.delete('/:id', protect, deleteMedicine);

export default router;
