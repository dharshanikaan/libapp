const express = require('express');
const router = express.Router();
const libraryController = require('../controller/libc');

// Add Booking
router.post('/', libraryController.addBooking);

// Borrowed Books
router.get('/borrowed', libraryController.getBorrowedBooks);

// Referred Books
router.get('/referred', libraryController.getReferredBooks);

// Return Booking
router.post('/return/:title', libraryController.returnBooking);

// For fines
router.get('/pay-fine', libraryController.payFinePage);

// Referred Book
router.post('/referred', libraryController.referBook);

module.exports = router;