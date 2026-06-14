import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  productImage: { type: String },
  purchasePrice: { type: Number, required: true },
  sellerName: { type: String, required: true },
  sellerRating: { type: Number, default: 0 },
  purchaseDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Completed', 'Pending Pickup', 'Cancelled'], default: 'Pending Pickup' },
  transactionId: { type: String, required: true, unique: true }
});

export const Purchase = mongoose.model('Purchase', purchaseSchema);
