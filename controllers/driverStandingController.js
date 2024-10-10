const mysql = require('mysql2/promise');
const getConnection = require('../config/db');

const driverStandingController = {
    getYear: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const query = `SELECT DISTINCT(schedule.year)
                FROM result
                JOIN schedule
                ON result.schedule_id = schedule.schedule_id;`;
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
    getAllDrivers: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const year = request.query.year;
            const query = `SELECT DISTINCT(driver.driver_id), driver.name
                FROM result
                JOIN driver
                ON result.driver_id = driver.driver_id
                JOIN schedule
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
    getAllDriversStanding: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const year = request.query.year;
            const query = `SELECT DISTINCT(driver.name), driver.country, 
                result.car, total_pts_table.total_pts
                FROM result
                JOIN driver ON driver.driver_id = result.driver_id
                JOIN
                (SELECT driver.driver_id, SUM(result.pts) AS total_pts 
                FROM result
                JOIN driver 
                ON driver.driver_id = result.driver_id
                JOIN schedule 
                ON schedule.schedule_id = result.schedule_id
                WHERE schedule.year = ?
                GROUP BY result.driver_id
                ORDER BY total_pts DESC) AS total_pts_table
                ON driver.driver_id = total_pts_table.driver_id;`;
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
    getDriverStanding: async function (request, response) {
        let connection;
        try {
            connection = await getConnection();
            const year = request.query.year;
            const driver_name = request.query.driver_name;
            const query = `SELECT DISTINCT(schedule.schedule_id), circuit.grand_prix, 
                session.date, session.month, schedule.year, 
                result.car, result.time_retired, driver_pts_table.total_pts 
                FROM result
                JOIN driver ON driver.driver_id = result.driver_id
                JOIN schedule ON schedule.schedule_id = result.schedule_id
                JOIN session ON schedule.schedule_id = session.schedule_id
                JOIN circuit ON circuit.circuit_id = schedule.circuit_id
                JOIN
                (
                SELECT result.schedule_id, driver.driver_id, SUM(result.pts) as total_pts 
                FROM result
                JOIN driver ON driver.driver_id = result.driver_id
                JOIN schedule ON schedule.schedule_id = result.schedule_id
                GROUP BY result.driver_id, result.schedule_id
                ) AS driver_pts_table
                ON result.schedule_id = driver_pts_table.schedule_id
                WHERE result.driver_id = driver_pts_table.driver_id
                AND session.name = 'Race'
                AND schedule.year = ?
                AND driver.name = ?
                ORDER BY schedule.schedule_id;`;
            const [result] = await connection.promise().query(query, [year, driver_name]);
            response.json(result);
        } catch (error) {
            response.status(500).json({ message: 'Error getting year', error: error.message });
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
}

module.exports = driverStandingController