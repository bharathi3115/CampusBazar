import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import marketplaceRoutes from './routes/marketplace.js';
import { seedDatabase } from './seedData.js';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/marketplace', marketplaceRoutes);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campusbazar';
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB successfully.');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB.');
    console.error(err);
    // Even if DB fails, start server to return 500s or handled errors
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT} (Database disconnected)`);
    });
  });
