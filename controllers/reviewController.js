import Book from "../models/Book.js";
import Review from "../models/Review.js";

export const addReview = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;
        const { rating, comment } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: `Rating must be between 1 and 5` });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: `Book not found` })
        }

        const existingReview = await Review.findOne({ book: bookId, user: userId })
        if (existingReview) {
            return res.status(400).json({ error: `You have already reviewed this book` })
        }

        const review = new Review({
            book: bookId,
            user: userId,
            rating,
            comment
        })
        review.save();

        res.status(201).json({ review })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}