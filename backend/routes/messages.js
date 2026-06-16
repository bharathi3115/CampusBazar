import express from 'express';
import mongoose from 'mongoose';
import { Conversation } from '../models/Conversation.js';
import { Message } from '../models/Message.js';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

const router = express.Router();

// Get or Create conversation
router.post('/conversation', async (req, res) => {
  try {
    const { buyerId, productId } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    let sellerId = product.seller?.userId;
    if (!sellerId) {
      return res.status(400).json({ message: 'Product has no valid seller' });
    }

    if (buyerId === sellerId.toString()) {
      return res.status(400).json({ message: 'Cannot message yourself' });
    }

    let conversation = await Conversation.findOne({
      buyerId,
      sellerId,
      productId
    }).populate('buyerId', 'name email')
      .populate('sellerId', 'name email')
      .populate('productId', 'title img');

    if (!conversation) {
      conversation = new Conversation({
        buyerId,
        sellerId,
        productId,
        lastMessageAt: new Date()
      });
      await conversation.save();
      conversation = await Conversation.findById(conversation._id)
        .populate('buyerId', 'name email')
        .populate('sellerId', 'name email')
        .populate('productId', 'title img');
    }

    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get conversations for a user
router.get('/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({
      $or: [{ buyerId: userId }, { sellerId: userId }]
    })
      .populate('buyerId', 'name email avatarUrl department year campus stats createdAt')
      .populate('sellerId', 'name email')
      .populate('productId', 'title img')
      .sort({ lastMessageAt: -1 });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a conversation
router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId })
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark messages as read
router.put('/:conversationId/read', async (req, res) => {
  try {
    const { userId } = req.body;
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) return res.status(404).json({ message: 'Conversation not found' });

    if (conversation.buyerId.toString() === userId) {
      conversation.unreadByBuyer = 0;
    } else if (conversation.sellerId.toString() === userId) {
      conversation.unreadBySeller = 0;
    }
    await conversation.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
