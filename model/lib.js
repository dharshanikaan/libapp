
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
        // Remove the default value here
    },
    fine: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    isReturned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
}, {
    hooks: {
        beforeCreate: (library) => {
            library.returnDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days from now
        },
    },
});

module.exports = Library;