import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },
  avatarUrl: { type: String },
  coverUrl: { type: String },
  studentId: { type: String },
  department: { type: String },
  year: { type: String },
  campus: { type: String },
  stats: {
    itemsBought: { type: Number, default: 0 },
    savedAmount: { type: Number, default: 0 },
    activeWishlist: { type: Number, default: 0 },
    reviewsGiven: { type: Number, default: 0 }
  },
  recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export const User = mongoose.model('User', userSchema);
