import express from 'express'
import { addReview, deleteReview, updateReview } from "../controllers/reviewController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/books/:id/reviews', authenticateToken, addReview);
router.put('/reviews/:id', authenticateToken, updateReview);
router.delete('/reviews/:id', authenticateToken, deleteReview);

export default router;