const user_model = require('../models/user')

const isSignIn = async function(req, res, next) {
    // 先验证用户是否登录
    if ( req.session.abc ) {
        res.render('user', {
            code: 200,
            data: JSON.stringify({ msg: '用户已登录' })
        })
    } else {
         res.render('user', {
             code: 201,
             data: JSON.stringify({ msg: '用户未登录' })
         })
    }
    

}

const getUserInfo = async (req, res) => {
    
    let _result = await user_model.getUserInfoById(req.session.abc.id)

    res.render('user', {
        code: 200,
        data: JSON.stringify({
            userid: _result._id,
            username: _result.username,
            nickname: _result.nickname,
            chathead: _result.chathead
        })
    })

}

// 返回用户信息
const exit = async (req, res) => {
    
    req.session.userinfo = null

    res.render('user', { code: 200, data: JSON.stringify({ msg: '删除成功' }) })

}
module.exports = {
    getUserInfo,
    exit,
    isSignIn
}