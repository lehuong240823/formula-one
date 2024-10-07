const express = require('express')
const router = express.Router()
const scheduleController = require('../controllers/scheduleController')

router.get('/schedule', scheduleController.getAllSchedule);

module.exports = router