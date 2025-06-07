import express from 'express';
import { addBook, getBooks } from '../controllers/bookController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/books', authenticateToken, addBook)
router.get('/books', getBooks)

export default router;