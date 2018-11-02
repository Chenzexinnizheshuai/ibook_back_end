var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user')
// var fileUpload = require('../middlewares/fileUpload')
// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)


/* GET home page. */
router.get('/info', user_controller.getUserInfo);
router.get('/exit', user_controller.exit);
router.get('/isSignIn', user_controller.isSignIn);


module.exports = router;
