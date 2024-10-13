const path = require('path'); 
const Library = require('../model/lib');

let borrowedBooks = [];
let referredBooks = [];

// Add Booking
exports.addBooking = (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Book title is required.' });
    }

    const book = {
        title,
        takenDate: new Date(),
        returnDate: new Date(Date.now() + 1 * 60 * 1000),
        fine: 0
    };

    borrowedBooks.push(book);
    res.status(201).json(book);
};

// Borrowed Books
exports.getBorrowedBooks = (req, res) => {
    res.json(borrowedBooks);
};

// Referred Books
exports.getReferredBooks = (req, res) => {
    res.json(referredBooks);
};

// Return Booking
exports.returnBooking = (req, res) => {
    const { title } = req.params;
    const index = borrowedBooks.findIndex(book => book.title === title);
    if (index === -1) return res.status(404).json({ message: 'Booking not found.' });

    const booking = borrowedBooks[index];
    const lateMinutes = Math.max(0, (new Date() - new Date(booking.returnDate)) / (1000 * 60));
    const fine = lateMinutes > 0 ? lateMinutes * 10 : 0;

    referredBooks.push({ ...booking, returnedOn: new Date(), fine });
    borrowedBooks.splice(index, 1);

    // Update the database
    Library.create({
        title: booking.title,
        takenDate: booking.takenDate,
        returnDate: booking.returnDate,
        fine,
        isReturned: true
    }).catch(err => console.error('Failed to update database:', err));

    res.json({ message: 'Booking returned', fine });
};

// For fines
exports.payFinePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/pay-fine.html')); 
};

// Referred Book
exports.referBook = (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Book title is required.' });
    }

    const bookIndex = referredBooks.findIndex(book => book.title === title);
    if (bookIndex === -1) {
        const referredBook = {
            title,
            returnedOn: new Date()
        };
        referredBooks.push(referredBook);
        return res.status(201).json(referredBook);
    } else {
        return res.status(409).json({ message: 'Book already referred.' });
    }
};