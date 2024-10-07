const express = require('express')
const router = express.Router()
const resultController = require('../controllers/resultController')

router.get('/schedule/year', resultController.getYearDistinct);
router.get('/schedule/grand-prix', resultController.getGrandPrix);
router.get('/result/all-seasons', resultController.getAllSeasons);

module.exports = router