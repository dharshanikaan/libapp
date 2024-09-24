const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Library = sequelize.define('Library', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    takenDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically set to current date
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW', 'INTERVAL 5 DAY'), // Set to 14 days later
    },
    fine: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    isReturned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Library;