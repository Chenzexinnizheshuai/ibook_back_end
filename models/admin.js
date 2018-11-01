const mongoose = require('../utils/mongoose')
const bcrypt = require('bcrypt')
const hash = require('../utils/index')


const userModel = mongoose.model('admin',new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    chathead: String
}))




//注册账号，存入数据库
const signup = async ({username,password,nickname,chathead})=>{
    let _password = await hash(password)
    // 对密码加密后在存取
    return new userModel({
        username,
        password:_password,
        nickname,
        chathead
    }).save()
    .then((results)=>{
        let { _id, username, nickname, chathead } = results
        return { _id, username, nickname, chathead }
    })
    .catch((err)=>{
        return false
    })
}
// 验证用户是否存在
const judgeUsername = (username)=>{
    return userModel.find({username})
    .then((results)=>{
        return results
    })
    .catch((err)=>{
        return false
    })
}


// 登录
// 登录
// @param pwd 是用户传入的密码
// @param password 是此用户的加密密码
// :result 是否匹配
const signin = async (pwd, { password }) => {
    return bcrypt.compare(pwd, password)
}



module.exports = {
    signup,
    judgeUsername,
    signin,
}