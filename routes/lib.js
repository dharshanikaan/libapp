const express = require('express');
const router = express.Router();

let borrowedBooks = [];
let referredBooks = [];

// Add Booking
router.post('/', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Book title is required.' });
    }

    const book = {
        title,
        takenDate: new Date(),
        returnDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        fine: 0
    };
    
    borrowedBooks.push(book);
    res.status(201).json(book);
});

// Get all Borrowed Books
router.get('/borrowed', (req, res) => {
    res.json(borrowedBooks);
});

// Get all Referred Books
router.get('/referred', (req, res) => {
    res.json(referredBooks);
});

// Return Booking
router.post('/return/:title', (req, res) => {
    const { title } = req.params;

    const index = borrowedBooks.findIndex(book => book.title === title);
    if (index === -1) return res.status(404).json({ message: 'Booking not found.' });

    const booking = borrowedBooks[index];
    const lateHours = Math.max(0, (new Date() - new Date(booking.returnDate)) / (1000 * 60 * 60));
    const fine = lateHours > 0 ? lateHours * 5 : 0; // Example fine calculation

    // Move to referred list
    referredBooks.push({ ...booking, returnedOn: new Date() });
    borrowedBooks.splice(index, 1); // Remove from borrowed list

    res.json({ message: 'Booking returned', fine });
});

module.exports = router;