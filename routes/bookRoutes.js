import express from 'express';
import { addBook } from '../controllers/bookController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/books', authenticateToken, addBook)

export default router;