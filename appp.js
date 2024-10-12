const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routes/lib');
const sequelize = require('./util/database');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/bookings', bookingRoutes);

//  with the database and start server
sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Server is running on http://localhost:3000`);
        });
    })
    .catch(err => console.error('Unable to connect to the database:', err));