import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // For price drop alerts
  category: { type: String, required: true },
  condition: { type: String, required: true }, // New, Like New, Good, Fair
  department: { type: String },
  img: { type: String },
  seller: {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    listingsCount: { type: Number, default: 1 },
    responseRate: { type: String, default: '100%' }
  },
  views: { type: Number, default: 0 },
  wishlistCount: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Sold'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model('Product', productSchema);
