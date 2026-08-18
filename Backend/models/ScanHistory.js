import mongoose from 'mongoose';

const scanHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    imageName: {
      type: String,
      default: 'scanned_medicine.jpg'
    },
    imageUrl: {
      type: String,
      default: ''
    },
    rawExtractedText: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['identified', 'unidentified'],
      default: 'unidentified'
    },
    identifiedMedicine: {
      name: { type: String, default: '' },
      genericName: { type: String, default: '' },
      strength: { type: String, default: '' },
      drugClass: { type: String, default: '' },
      manufacturer: { type: String, default: '' },
      batchNumber: { type: String, default: '' },
      mfgDate: { type: String, default: '' },
      expDate: { type: String, default: '' },
      expStatus: { type: String, default: '' },
      uses: [String],
      problemsTreated: [
        {
          condition: { type: String },
          category: { type: String },
          detail: { type: String }
        }
      ],
      mechanism: { type: String, default: '' },
      dosageInfo: { type: String, default: '' },
      sideEffects: [String],
      precautions: [String],
      storage: { type: String, default: '' },
      warnings: [String]
    },
    confidenceScore: {
      type: Number,
      default: 0
    },
    scanDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const ScanHistory = mongoose.model('ScanHistory', scanHistorySchema);
export default ScanHistory;
