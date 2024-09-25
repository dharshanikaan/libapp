const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Library = sequelize.define('Library', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    takenDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    returnDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    fine: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    isReturned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Library;