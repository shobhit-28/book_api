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

export const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user.id;

        const {rating, comment} = req.body;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({error: `Review not found`})
        }

        if (review.user.toString() !== userId) {
            return res.status(403).json({error: `You are not authorised to update this review`})
        }

        if (rating) review.rating = rating
        if (comment) review.comment = comment

        review.save();

        res.status(200).json(review)

    } catch (error) {
        res.status(500).json({error: error?.message})
    }
}

export const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id
        const userId = req.user.id
        const review = await Review.findById(reviewId)

        if (!review) {
            return res.status(404).json({error: `Review not found`})
        }

        if (review.user.toString() !== userId) {
            return res.status(403).json({error: `You are not authorised to delete this review`})
        }

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({message: `Review deleted`})

    } catch (error) {
        res.status(500).json({error: error?.message})
    }
}