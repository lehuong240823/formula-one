const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')

router.get('/img-file', fileController);

module.exports = router