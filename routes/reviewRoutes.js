import express from 'express'
import { addReview } from "../controllers/reviewController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/books/:id/reviews', authenticateToken, addReview);

export default router;