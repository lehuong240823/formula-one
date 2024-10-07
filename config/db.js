const mysql = require('mysql2');
const config = require('../config')

const getConnnection = async function () {
    try {
        const connection = await mysql.createConnection(config.db);
        console.log('Successfully connected to the database!');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
}

module.exports = getConnnection;

