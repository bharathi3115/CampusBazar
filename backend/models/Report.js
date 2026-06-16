import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['active', 'ignored', 'resolved'], default: 'active' },
  severity: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Low' },
  createdAt: { type: Date, default: Date.now }
});

export const Report = mongoose.model('Report', reportSchema);
