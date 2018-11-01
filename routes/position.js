var express = require('express');
var router = express.Router();
var poscontrol = require('../controllers/position')
var multer =  require('multer')
var PATH = require('path')

//文件保存的路径
// var upload = multer({'dest':PATH.resolve(__dirname,'../uploads/img')})

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,PATH.resolve(__dirname,'../uploads/img'))
    },
    filename: function (req, file, cb) {
        let _originalName = file.originalname // 原名
        let _extName = PATH.extname(_originalName); // 后缀名
        let _baseName = PATH.basename(_originalName, _extName); // 文件名
        let _filename = _baseName + '_' + Date.now() + _extName // 最终的名字，拼上时间戳，防止覆盖

        // 将图片的路径放入到req.body中的，下个中间件就可以取用了
        req.body.logo = 'img/' + _filename
        cb(null, _filename)
    }
})  
var upload = multer({storage:storage})
// var save_c = require('../controllers/save_c')
router.get('/list',poscontrol.pos)
//<input type="file"  name="photo"  >
router.post('/save',upload.single('photo'),poscontrol.save)//single里的参数就是inputfile类型标签的name
router.post('/del',poscontrol.del)
router.post('/listone',poscontrol.listone)
router.post('/updata',upload.single('photo'),poscontrol.updata)
router.get('/search',poscontrol.search)
module.exports = router