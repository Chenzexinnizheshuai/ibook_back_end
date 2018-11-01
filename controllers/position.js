var posmodel = require('../models/positionmodels')
var pos =async (req, res, next)=>{
    // res.json(posmodel)
    //因为整个程序app.set('views', path.join(__dirname, 'views'));所以view下的文件只用写文件名
    res.set('content-type', 'application/json; charset=utf8')
    var _data =await posmodel.data(req)
    res.render('pos',{"code":200,"data":JSON.stringify(_data)})
}
//后端控制器

//添加信息
const save = async (req, res, next)=>{
    // res.json(posmodel)
    //因为整个程序app.set('views', path.join(__dirname, 'views'));所以view下的文件只用写文件名
    res.set('content-type', 'application/json; charset=utf8')
    var data = await posmodel.save(req.body)
    console.log(req.body,66666666666)
    if ( data ) { // 插入成功
        res.render('pos', { 
            code: 200, 
            data: JSON.stringify(data)
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
//删除数据
const del =async (req,res)=>{
    console.log(req.body,'body')
    let _data =await posmodel.del(req.body.id)
   
    res.send(_data)

}
//查询一条数据
const listone =async (req,res)=>{
    // var id = req.body.id;
    var data =await posmodel.abook(req.body.id)
    res.send(data)
    
}

//更改一条数据
const updata =async (req,res)=>{
    var data =await posmodel.updata(req.body)
    console.log(data,'updata_c')

    res.send(data)
}

//前台搜索数据，根据搜索框传入的内容返回指定的内容
const search =async (req,res)=>{
    console.log(req.query.key)
    var key = req.query.key;
    let reg = new RegExp(key,'g')
    var result =await posmodel.alldata(req,res,{bookname : reg})   
    res.send(result) 
    console.log(result,'99999')
    res.end()
}
module.exports={
    pos,
    save,
    del,
    listone,
    updata,
    search
}