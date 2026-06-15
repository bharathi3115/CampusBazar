import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await mongoose.connection.collection('products').drop().catch(() => {});
  await mongoose.connection.collection('users').drop().catch(() => {});
  await mongoose.connection.collection('purchases').drop().catch(() => {});
  console.log('Collections dropped');
  process.exit(0);
});
