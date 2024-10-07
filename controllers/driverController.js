const mysql = require('mysql2/promise');
const getConnection = require('../config/db');

const driverController = {
getAllDrivers: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const [result] = await connection.promise().query(`SELECT driver.*, team.short_name 
                FROM team 
                JOIN driver 
                ON team.team_id = driver.team_id;`);
            response.json(result);
        } catch (error) {
            response.status(500).json({ message: 'Error getting driver', error: error.message });
        } finally{
            if (connection) {
                await connection.end();
            }
        }
    }
}

module.exports = driverController