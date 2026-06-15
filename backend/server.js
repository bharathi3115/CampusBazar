import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import marketplaceRoutes from './routes/marketplace.js';
import messagesRoutes from './routes/messages.js';
import usersRoutes from './routes/users.js';
import { seedDatabase } from './seedData.js';
import { Message } from './models/Message.js';
import { Conversation } from './models/Conversation.js';
import path from 'path';

dotenv.config();
const app = express();
const PORT = 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Routes
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', usersRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_chat', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their personal room`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { conversationId, senderId, receiverId, text } = data;
      
      const message = new Message({
        conversationId,
        senderId,
        text,
        status: 'sent'
      });
      await message.save();

      const conversation = await Conversation.findById(conversationId);
      conversation.lastMessageAt = new Date();
      if (conversation.buyerId.toString() === receiverId) {
        conversation.unreadByBuyer += 1;
      } else {
        conversation.unreadBySeller += 1;
      }
      await conversation.save();

      // Emit to receiver's room
      io.to(receiverId).emit('receive_message', message);
      // Emit back to sender to confirm
      socket.emit('message_sent', message);

    } catch (error) {
      console.error('Socket message error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusbazar';
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB successfully.');
    await seedDatabase();
    server.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB.');
    console.error(err);
    // Even if DB fails, start server to return 500s or handled errors
    server.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT} (Database disconnected)`);
    });
  });
