import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  lastMessageAt: { type: Date, default: Date.now },
  unreadByBuyer: { type: Number, default: 0 },
  unreadBySeller: { type: Number, default: 0 }
}, { timestamps: true });

export const Conversation = mongoose.model('Conversation', conversationSchema);
