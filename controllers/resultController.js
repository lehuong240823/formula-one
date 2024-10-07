const mysql = require('mysql2/promise');
const getConnection = require('../config/db');

const resultController = {
    getYearDistinct: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const query = `SELECT DISTINCT(schedule.year) 
                        FROM result 
                        JOIN schedule 
                        ON result.result_id = schedule.schedule_id;`;
            const [result] = await connection.promise().query(query);
            response.json(result);
        } catch (error) {
            response.status(500).json({ message: 'Error getting year', error: error.message });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    getGrandPrix: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const year = request.query.year;
            const query = `SELECT DISTINCT(circuit.grand_prix)
                        FROM circuit 
                        JOIN schedule 
                        ON schedule.circuit_id = circuit.circuit_id
                        JOIN result 
                        ON result.schedule_id = schedule.schedule_id
                        WHERE schedule.year = ?;`;
            const [result] = await connection.promise().query(query, [year]);
            response.json(result);
        } catch (error) {
            response.status(500).json({ message: 'Error getting year', error: error.message });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    getAllSeasons: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const year = request.query.year;
            const query = `SELECT circuit.grand_prix, session.date, session.month, schedule.year, 
                driver.name, result.car, result.laps, result.time_retired, 
                max_table.max, result.type 
                FROM result JOIN 
                (SELECT result.schedule_id, MAX(result.pts) AS max
                FROM result 
                WHERE result.type = 'race'
                GROUP BY result.schedule_id) 
                AS max_table
                ON result.schedule_id = max_table.schedule_id
                JOIN schedule 
                ON result.schedule_id = schedule.schedule_id
                JOIN session
                ON schedule.schedule_id = session.schedule_id
                JOIN circuit
                ON schedule.circuit_id = circuit.circuit_id
                JOIN driver
                ON result.driver_id = driver.driver_id
                WHERE result.pts = max_table.max
                AND result.type = 'race'
                AND session.name = 'Race'
                AND schedule.year = ?;`;
            const [result] = await connection.promise().query(query, [year]);
            response.json(result);
        } catch (error) {
            response.status(500).json({ message: 'Error getting result', error: error.message });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    },

    getAllResult: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const query = 'SELECT schedule.*, circuit.grand_prix, circuit.carbon_png FROM schedule JOIN circuit WHERE schedule.circuit_id = circuit.circuit_id;';
            const [result] = await connection.promise().query(query);
            response.json(result);
        } catch (error) {
            response.status(500).json({ message: 'Error getting schedule', error: error.message });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
}

module.exports = resultController