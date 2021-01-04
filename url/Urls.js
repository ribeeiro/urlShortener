const Sequelize = require('sequelize');
const connection = require('../config/db');

const Urls = connection.define('Urls', {
    long_uri:{
        type: Sequelize.STRING,
        allowNull: false
    },
    short_path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

Urls.sync({force:false});

module.exports = Urls;