const express = require('express')
const router = express.Router()
const save_c = require('../controllers/save_c')

router.get('/',save_c)

module.exports = router;