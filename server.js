import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Server starting')

// const authRoutes = require('./routes/authRoutes');
// const bookRoutes = require('./routes/bookRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');

import authRoutes from './routes/authRoutes.js'
// import bookRoutes from './routes/bookRoutes'
// import reviewRoutes from './routes/reviewRoutes'

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
// app.use('/api', bookRoutes);
// app.use('/api', reviewRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
}).catch((err) => console.log(err));