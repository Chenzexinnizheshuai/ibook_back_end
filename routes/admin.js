var express = require('express');
var router = express.Router();

var admin_controllers = require('../controllers/admin')
/* GET home page. */

// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

// /api/1/admin/signup
router.post('/signup',admin_controllers.signup)
router.post('/signin',admin_controllers.signin)
module.exports = router;
