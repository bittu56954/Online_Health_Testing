import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    medicineName: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true
    },
    reminderDate: {
      type: Date,
      required: [true, 'Reminder date is required']
    },
    reminderType: {
      type: String,
      enum: ['expiry', 'dosage', 'refill'],
      default: 'expiry'
    },
    notes: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['upcoming', 'completed', 'expired'],
      default: 'upcoming'
    }
  },
  {
    timestamps: true
  }
);

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;
