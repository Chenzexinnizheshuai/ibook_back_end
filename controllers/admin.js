
const admin_model = require('../models/admin')




// 检测有没有用户
// 注册
const signup = async(req,res,next) =>{

    let jodge_username = await admin_model.judgeUsername(req.body.username);
    if( jodge_username.length === 0 ) { // 检测该用户没有注册,将账号存入数据库
        let _data =  await admin_model.signup(req.body)
        if ( _data ) { // 插入成功
            res.render('admin', { 
                code: 200, 
                data: JSON.stringify(_data)
            })
        } else {
            res.render('admin', { 
                code: 500, 
                data: JSON.stringify({
                    msg: '发生不可预知的问题..'
                })
            })
        }
    } else { //检测该用户已被注册，提示用户
        res.render('admin', {
            code: 201,
            data: JSON.stringify('用户名已存在')
        })
    }
}
// 登录
const signin = async (req,res,next)=>{
    //检测账号是否存在
    let jodge_username = await admin_model.judgeUsername(req.body.username);
    if( jodge_username.length === 1 ) { // 如果存在
        let _data =  await admin_model.signin(req.body.password,jodge_username[0])
        if ( _data ) { // 登录成功
            req.session.abc = {
                id: jodge_username[0]._id
            } 
            res.render('admin', { 
                code: 200, 
                data: JSON.stringify('success')
            })
        } else {
            res.render('admin', { 
                code: 203, 
                data: JSON.stringify('密码错误')
            })
        }
    } else { //检测该用户已被注册，提示用户
        res.render('admin', {
            code: 202,
            data: JSON.stringify('用户名不存在')
        })
    }
}


module.exports = {
    signup,
    signin
}