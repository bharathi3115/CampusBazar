import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import marketplaceRoutes from './routes/marketplace.js';
import messagesRoutes from './routes/messages.js';
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import reportsRoutes from './routes/reports.js';
import adminRoutes from './routes/admin.js';
import { seedDatabase } from './seedData.js';
import { Message } from './models/Message.js';
import { Conversation } from './models/Conversation.js';
import path from 'path';
import rateLimit from 'express-rate-limit';

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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 auth requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

// Serve static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/admin', adminRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_chat', ({ userId, role }) => {
    const roomName = `${userId}_${role}`;
    socket.join(roomName);
    console.log(`User joined their ${role} room: ${roomName}`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { conversationId, productId, senderId, receiverId, senderRole, receiverRole, text } = data;
      
      const message = new Message({
        conversationId,
        productId,
        senderId,
        receiverId,
        senderRole,
        receiverRole,
        text,
        status: 'sent'
      });
      await message.save();

      const conversation = await Conversation.findById(conversationId);
      conversation.lastMessageAt = new Date();
      if (receiverRole === 'buyer') {
        conversation.unreadByBuyer += 1;
      } else {
        conversation.unreadBySeller += 1;
      }
      await conversation.save();

      // Emit to receiver's specific role room
      io.to(`${receiverId}_${receiverRole}`).emit('receive_message', message);
      // Emit back to sender's specific role room to confirm
      io.to(`${senderId}_${senderRole}`).emit('message_sent', message);

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
