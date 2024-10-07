const express = require('express')
const router = express.Router()
const circuitController = require('../controllers/circuitController')

router.get('/circuit', circuitController.getAllCircuits);

module.exports = router