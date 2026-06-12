import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },
  recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export const User = mongoose.model('User', userSchema);
