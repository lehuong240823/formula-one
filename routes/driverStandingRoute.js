const express = require('express')
const router = express.Router()
const driverStandingController = require('../controllers/driverStandingController')

router.get('/driver-standing/year', driverStandingController.getYear);
router.get('/driver-standing/driver', driverStandingController.getAllDrivers);
router.get('/driver-standing/all-drivers-standing', driverStandingController.getAllDriversStanding);
router.get('/driver-standing/driver-standing', driverStandingController.getDriverStanding);

module.exports = router