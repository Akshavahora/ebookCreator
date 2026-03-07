import Book from "../models/Book.js"

// @desc    Create a new Book
// @route   POst /api/book
// @access  Private
export const createBook = async (req, res) => {
    try {
        const { title, author, subtitle, chapter } = req.body;

        if(!title || !author) {
            return res.statud(400).json({ message: "Please provide a title and author"});
        }

        const book = await Book.create({
            userId: req.user._id,
            title,
            author, 
            subtitle,
            chapters,
        });

        res.status(201).json(Book);
    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
}

// @desc    Get all books foe a user
// @route   GET /api/books
// @access  Private
export const getBooks = async (req, res) => {
    try {

    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Private 
export const getBookById = async (req, res) => {
    try {

    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};

// @desc    Update a book
// @route   PUT /api/book/:id
// @access  Private
export const updateBook = async (req, res) => {
    try {

    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};

// @desc    Delete a book
// @route   DELETE /api/book/:id
// @access  Private
export const deleteBook = async (req, res) => {
    try {

    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};  

// @desc    Update a book's Cover
// @route   PUT /api/book/cover/:id
// @access  Private
export const updateBookCover = async (req, res) => {
    try {

    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};

