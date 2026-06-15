import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  status: { type: String, enum: ['sent', 'read'], default: 'sent' }
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);
