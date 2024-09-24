const Sequelize = require('sequelize');

const sequelize = new Sequelize('library','root','root',{
    host :"localhost",
    dialect:"mysql",
    port: 3305,

});

module.exports = sequelize;