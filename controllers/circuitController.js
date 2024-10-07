const mysql = require('mysql2/promise');
const getConnection = require('../config/db');

const circuitController = {
getAllCircuits: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const [result] = await connection.promise().query('SELECT * FROM circuit');
            response.json(result);
        } catch (error) {
            response.status(500).json({ message: 'Error getting circuit', error: error.message });
        } finally{
            if (connection) {
                await connection.end();
            }
        }
    }
}

module.exports = circuitController