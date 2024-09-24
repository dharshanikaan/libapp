const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routes/lib');
const sequelize = require('./util/database');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/bookings', bookingRoutes);

// Sync database and start server
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
      console.log(`Server is running on http://localhost:3000`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = app;