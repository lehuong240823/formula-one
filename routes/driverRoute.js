const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driverController')

router.get('/driver', driverController.getAllDrivers);

module.exports = router