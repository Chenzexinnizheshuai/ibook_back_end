var user_m = require('../models/user_m')
const enroll =async (req,res) => {
    // console.log(req.body,888888)
    var status =await user_m.save(req.body)
    console.log(status,'status')
    if(status){
        res.render('pos', { 
            code: 200, 
            data: JSON.stringify(status),
            
        })
    } else {
        res.render('pos', { 
            code: 500, 
            data: JSON.stringify({
                msg: '发生不可预知的问题..'
            })
        })
    }
}
const login = async (req,res) => {
    var status =await user_m.login(req.body)
    console.log(status,'status')
    if(status){//如果登陆成功，给session添加一个view属性
        req.session.view = status._id;
        res.set('content-type', 'application/json; charset=utf-8')
        res.render('login_v',{
            code : 200,
            msg : JSON.stringify('登陆成功')
        })
    }else{
        res.set('content-type', 'application/json; charset=utf-8')
        res.render('login_v',{
            code :401,
            msg : JSON.stringify('注意审题')
        })
    }
}
const flag = (req,res)=>{
    if(req.session.view){
        res.send(true)
    }else{
        res.send(false)
    }
    res.end()
    
    
    // return true;
}
module.exports = {
    enroll,
    login,
    flag
}