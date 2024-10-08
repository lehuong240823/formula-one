const express = require('express')
const router = express.Router()
const resultController = require('../controllers/resultController')

router.get('/schedule/year', resultController.getYearDistinct);
router.get('/schedule/grand-prix', resultController.getGrandPrix);
router.get('/result/types', resultController.getResultTypes);
router.get('/result/all-seasons', resultController.getAllSeasons);
router.get('/result/race-result', resultController.getRaceResult);

module.exports = router