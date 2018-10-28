var express = require('express')
var router = express.Router()
var ac = require('../controllers/acon')

    router.get('/a',ac)
    // router('/a',(res)=>{
    //     res.send('aaa')
    // })

    


module.exports = router;