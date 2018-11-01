var mongoose = require('../utils/mongoose')
var userSchema = new mongoose.Schema({
   username : String,
   password : String,
   nickname : String,
   time : String
})
var TheUser = mongoose.model('user', userSchema);
//注册时保存数据
const save =async (data) => {
    var findres = await find(data)
    console.log(findres.length,'find结果')
    if(!!findres.length){
      return {
        msg : '用户名已存在'
      }
    }else{
      return new TheUser({
        ...data,
        time:new Date(),
      }).save()
      .then((result) => {
        result.msg = '注册成功'
        return result
      })
      .catch((err) => {
        return false
      })
    }

}
//查看数据
const find = async (data) => {
    console.log(data,111)
    return  await TheUser.find(data).then((res)=>{
      console.log(res,555)
    return res
    }).catch((err) => { 
      return false
    }) 
}

//登陆验证
const login =async (data)=>{
  var result =await find(data);
  console.log(result,'resresres')
  var Prplength = Object.getOwnPropertyNames(data).length;
  var res =  result[0]|| 0;
  //如果用户名和密码匹配，返回ture
  if(res!==0&&Prplength==2){
    
    console.log('nice','666666666666666666666666')
    return res
  }else{
    console.log('sb',7777777777777777777777)
    return false
  }
}
module.exports = {
    save,
    find,
    login
}