import Book from "../models/Book.js"

// @desc    Create a new Book
// @route   POst /api/books
// @access  Private
export const createBook = async (req, res) => {
    try {
        const { title, author, subtitle, chapters } = req.body;

        if(!title || !author) {
            return res.status(400).json({ message: "Please provide a title and author"});
        }

        const book = await Book.create({
            userId: req.user._id,
            title,
            author, 
            subtitle,
            chapters,
        });

        res.status(201).json(book);
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
        const books = await Book.find({userId: req.user._id, }).sort({ createdAt: -1 });
        res.status(200).json(books)
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
        const book = await Book.findById(req.params.id);

        if(!book) {
            return res.status(404).json({message: "Book Not Found"});
        }

        if(book.userId.toString() != req.user._id.toString()) {
            return res.status(401).json({message: "Not authorized to view this book"});
        }

        res.status(200).json(book)
    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
export const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) {
            return res.status(404).json({ message: "Book Not Found"});
        }

        if(book.userId.toString() != req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book" });
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedBook);
    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book) {
            return res.status(404).json({ message: "Book not found"});
        }

        if(book.userId.toString() != req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this book"});
        }

        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully"});
    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};  

// @desc    Update a book's Cover
// @route   PUT /api/books/cover/:id
// @access  Private
export const updateBookCover = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book) {
            return res.status(404).json({ message: "Book not found"});
        }

        if(book.userId.toString() != req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book"});
        }

        // cover Image
        if(req.file) {
            book.coverImage = `${req.file.path}`;
        }
        else {
            return res.status(400).json({ message: "Not image file provided"});
        }

        const updatedBook = await book.save();

        res.status(200).json(updatedBook);
    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
};