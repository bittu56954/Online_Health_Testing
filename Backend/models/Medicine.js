import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true
    },
    genericName: {
      type: String,
      default: 'Not specified'
    },
    strength: {
      type: String,
      default: 'N/A'
    },
    drugClass: {
      type: String,
      default: 'Pharmaceutical Agent'
    },
    manufacturer: {
      type: String,
      default: 'Unknown Manufacturer'
    },
    batchNumber: {
      type: String,
      default: 'N/A'
    },
    mfgDate: {
      type: String,
      default: ''
    },
    expDate: {
      type: String,
      required: [true, 'Expiry date is required']
    },
    status: {
      type: String,
      enum: ['valid', 'expiring_soon', 'expired'],
      default: 'valid'
    },
    uses: {
      type: [String],
      default: []
    },
    problemsTreated: [
      {
        condition: { type: String },
        category: { type: String },
        detail: { type: String }
      }
    ],
    mechanism: {
      type: String,
      default: ''
    },
    dosageInfo: {
      type: String,
      default: ''
    },
    sideEffects: {
      type: [String],
      default: []
    },
    precautions: {
      type: [String],
      default: []
    },
    storage: {
      type: String,
      default: 'Store in a cool, dry place away from direct sunlight.'
    },
    warnings: {
      type: [String],
      default: ['Consult a licensed medical professional before taking any medication.']
    },
    scannedImage: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Virtual property to update status dynamically based on current date
medicineSchema.methods.calculateStatus = function () {
  if (!this.expDate) return 'valid';
  const exp = new Date(this.expDate);
  const now = new Date();
  const diffDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    this.status = 'expired';
  } else if (diffDays <= 30) {
    this.status = 'expiring_soon';
  } else {
    this.status = 'valid';
  }
  return this.status;
};

const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;
