const Sequelize = require('sequelize').Sequelize;

const connection = new Sequelize('myUrl', 'root', process.env.PASSWORDsequelize,{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = connection;