var express = require('express');
var router = express.Router();
var usercontrol = require('../controllers/user_c')
var multer =  require('multer')
var PATH = require('path')


router.post('/enroll',usercontrol.enroll)
router.post('/login',usercontrol.login)
router.get('/flag',usercontrol.flag)
module.exports = router
