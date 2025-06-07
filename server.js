import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Server starting')

import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

const app = express();
app.use(express.json());

app.use('/booksApi/auth', authRoutes);
app.use('/booksApi', bookRoutes);
app.use('/booksApi/review', reviewRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch((err) => console.log(err));