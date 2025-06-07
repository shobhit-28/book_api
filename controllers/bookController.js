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

export const getBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { author, genre } = req.query;
        const filter = {};
        if (author) {
            filter.author = new RegExp(author, 'i');
        }
        if (genre) {
            filter.genre = new RegExp(genre, 'i');
        }
        let books = []
        if (req.query.page) {
            books = await Book.find(filter).skip(skip).limit(limit);
        } else {
            books = await Book.find(filter);
        }
        const total = await Book.countDocuments(filter);

        if (books?.length === 0) {
            let code = 200
            if (req.query.page || author || genre) {
                code = 404
            }
            res.status(code).json({
                message: req.query.page ? `Page ${page} does not exist` : `No books found`,
                data: {
                    page,
                    totalPages: Math.ceil(total / limit),
                    totalBooks: total,
                    books
                }
            });
        }

        res.status(200).json({
            message: req.query.page ? `Here are the books from page ${page}` : `Showing all books for you`,
            data: {
                page,
                totalPages: Math.ceil(total / limit),
                totalBooks: total,
                books
            }
        });
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}