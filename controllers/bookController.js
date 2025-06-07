import Book from "../models/Book.js";

export const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: "Title and Author are required" })
        }
        const newBook = new Book({
            title,
            author,
            genre,
            publishedYear,
            createdBy: req.user.id
        })
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}