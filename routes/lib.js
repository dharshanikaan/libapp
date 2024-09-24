const express = require('express');
const router = express.Router();
const Booking = require('../model/lib');

// Add Booking
router.post('/', async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Book title is required.' });
    }

    try {
        const newBooking = await Booking.create({ title });
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Return Booking
router.post('/return/:id', async (req, res) => {
    const { id } = req.params;
    const { returnDate } = req.body;

    try {
        const booking = await Booking.findByPk(id);
        if (!booking || booking.isReturned) return res.status(404).send('Booking not found or already returned');

        const lateDays = Math.max(0, (new Date(returnDate) - new Date(booking.returnDate)) / (1000 * 60 * 60 * 24));
        const fine = lateDays * 5; // Example fine rate: $5 per day

        booking.isReturned = true;
        booking.fine = fine;
        await booking.save();

        res.json({ message: 'Booking returned', fine });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;