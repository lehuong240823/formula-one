const mysql = require('mysql2/promise');
const getConnection = require('../config/db');

const scheduleController = {
getAllSchedule: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const query = 'SELECT schedule.*, circuit.grand_prix, circuit.carbon_png FROM schedule JOIN circuit WHERE schedule.circuit_id = circuit.circuit_id;';
            const [result] = await connection.promise().query(query);
            response.json(result);
        } catch (error) {
            response.status(500).json({ message: 'Error getting schedule', error: error.message });
        } finally{
            if (connection) {
                await connection.end();
            }
        }
    }
}

module.exports = scheduleController