const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routes/lib');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/bookings', bookingRoutes);

// Start server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});