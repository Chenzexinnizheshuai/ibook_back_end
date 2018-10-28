var mongoose = require('../utils/mongoose')
mongoose.connect("mongodb://localhost:27017/book", {useNewUrlParser:true}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') }
})
var bookSchema = new mongoose.Schema({
    bookname : String,
    author : String,
    type : String,
    time : String,
    logo : String
})
var TheBook = mongoose.model('book', bookSchema);

//后端数据M层

//获取全部数据
var alldata =(req,res)=>{
    let _query = {} //查询条件 为空表示全部数据都进行查询，单个查询{'bookname','西游记'}
    return TheBook.find({}).then((res)=>{
        return res
    }).catch((err) => { 
        return false
    }) 
}
//获取一页数据
var data =async (req,res)=>{
    var {pagenum} = req.query;//页码
    var pagesize = 10;//一页中的数据数量
    var allpage =await alldata(req,res)
    console.log(pagenum,'qqqqqqqqqqqqqqqqqqq')
    let _query = {} //查询条件 为空表示全部数据都进行查询，单个查询{'bookname','西游记'}
    return TheBook.find(_query).sort('-time').skip((~~pagenum-1)*pagesize).limit(pagesize).then((res)=>{
        return {'res' : res,'allpage' : Math.ceil(allpage.length/10) ,'pagenum' : pagenum }
    }).catch((err) => { 
        return false
    }) 
}
//保存数据
var save = (body)=> {
    return new TheBook({
        ...body,
        time : new Date()
    }).save()
      .then((result) => {
          console.log(result)
        return result
      })
      .catch((err) => {
        return false
      })
}
//删除数据
var del = (id)=>{
    var row = abook(id)
    console.log('del')
    return TheBook.deleteOne({_id:id}).then((res)=>{
        return id
    })
}

//获取指定id的数据 
/*
{ _id: 5bd08fe22eac8c46381956a3,
  bookname: '红楼梦',
  author: '曹雪芹',
  type: '小说',
  time: '1540394978952',
  __v: 0 } 
 */
const abook = (id)=>{
    return TheBook.find({_id:id}).then((res)=>{
        
        return res;
    }).catch((err) => {
        return false
    }) 
}

//修改数据
const updata = (obj)=>{
    console.log(obj,88888888888888)
    return TheBook.updateOne({ _id: obj._id },{...obj,time : new Date()}).then((res)=>{
        return res
    }).catch((err) => {
        return false
    }) 
}
module.exports = {
    data,
    save,
    del,
    abook,
    updata
}