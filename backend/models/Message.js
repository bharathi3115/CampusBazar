import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderRole: { type: String, enum: ['buyer', 'seller'], required: true },
  receiverRole: { type: String, enum: ['buyer', 'seller'], required: true },
  text: { type: String, required: true },
  status: { type: String, enum: ['sent', 'read'], default: 'sent' }
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);
