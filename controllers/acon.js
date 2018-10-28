var am = require('../models/am')
// var av = require('../views/av.ejs')
var ac = (req, res, next)=>{
    res.render('av',{aa:am.a})
}
module.exports = ac