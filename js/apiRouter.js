const dbData = require('./dbData');
const express=require('express');
//var bodyParse=require('body-parser');
const api=express();

//router.use(bodyParse.json());
api.get('/',(req,res,next)=> {
    res.sendFile('api.txt', {root:'./'}, function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('api.txt');
        }
    });
});

api.get('/all',(req,res,next)=> {
    dbData.selectall('companies',function(result){
        //console.log(result);
        res.send(result);
    })
});

api.get('/test',(req,res,next)=> {
    dbData.test('companies',function(result){
        //console.log(result);
        res.send(result);
    })
});

api.get('/search',(req,res,next)=> {
    var str=req.url.split('?')[1];
    var arr=str.split('&');
    var obj={};
    var page=1;
    for(var i=0;i<arr.length;i++){
        var key = arr[i].split("=")[0];
        //decodeURI(） 解uri码
        var value = decodeURI(arr[i].split("=")[1]);

        if(key=='page') {
            page=value;
            continue;
        }

        obj[key] = value;
    }
    //console.log(obj)

    dbData.mySearch('companies',page,obj,function (result) {
        res.send(result)
    })
});

api.get('/mytest',(req,res,next)=> {
    dbData.mySearch('companies',1,{'address':'瑶湖西'},function(result){
        //console.log(result);
        res.send(result);
    })
});

api.get('/findOne?',(req,res,next)=>{
    console.log(req.url);
    var id =req.url.split("=")[1];
    dbData.findOne('companies',id,function (result) {
        res.send(result);
    })
});

//router.listen(3000);
module.exports = api;


