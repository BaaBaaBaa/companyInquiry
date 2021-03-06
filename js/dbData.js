let dbData = {
    test: function(name, callback){
        let mongoose = require('mongoose');
        let database_name     = 'mongodb://localhost:27017/lxf';
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.find({
                "address": {$regex:/瑶湖西/g}
            }).toArray((err, result) => {
                if(err){
                    console.log('error:' + err);
                    return;
                }
                console.log(result);
                callback(result);
            })
        });
    },
    selectall: function(name, callback){
        let mongoose = require('mongoose');
        let database_name     = 'mongodb://localhost:27017/lxf';
        mongoose.connect(database_name, (err, db) => {
            let collection = db.collection(name);
            collection.find({

            }).toArray((err, result) => {
                if(err){
                    console.log('error:' + err);
                    return;
                }
                console.log(result);
                callback(result);
            })
        });
    },
    /*
    *   默认连接数据库 mongodb://localhost:27017/lxf
    *   参数：1.collection名字 2.查询条件（对象） 3.回调
    *   作用：返回符合查询条件的doc
    * */
    mySearch:function(name,page=1,searchObj,callback){
        let mongoose = require('mongoose');
        let database_name     = 'mongodb://localhost:27017/lxf';
        mongoose.connect(database_name,{ useNewUrlParser: true },(err, db) => {
            let collection = db.collection(name);
            let findParam={};

            for(var i in searchObj){
                findParam[i]=new RegExp(searchObj[i]);
            }
            console.log(findParam);

            collection.find(findParam).toArray((err, result) => {
                if(err){
                    console.log('error:' + err);
                    return;
                }
                var len=result.length;
                //result=result.slice((page-1)*10,page*10).push({'数量':result.length});
                console.log(result.slice((page-1)*10,page*10));
                callback([{数量:result.length},...result.slice((page-1)*10,page*10)]);
            })
        });
    },
    findOne:function (name,id,callback) {
        var ObjectId = require('mongodb').ObjectID;
        let mongoose = require('mongoose');
        let database_name     = 'mongodb://localhost:27017/lxf';
        console.log('id '+id);
        mongoose.connect(database_name,{ useNewUrlParser: true },(err, db) => {
            let collection = db.collection(name);
            collection.find({
                "_id":new ObjectId(id)
            }).toArray((err, result) => {
                if(err){
                    console.log('error:' + err);
                    return;
                }
                console.log(result);
                callback(result);
            })
        });
    },
    addOne:function (name,docOBJ,) {
        let mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/lxf',{ useNewUrlParser: true },(err, db) => {
            var Schema=new mongoose.Schema({
                name:        { type:String },
                province:    { type:String },
                city:        { type:String },
                legalPerson: { type:String },
                type:        { type:String },
                setupTime:   { type:String },
                capital:     { type:String },
                address:     { type:String },
                mail:        { type:String },
                scope:       { type:String },
                website:     { type:String },
                phone:       { type:String },
                morePhone:   { type:String }
            });
            var company=mongoose.model("company",Schema);
            var addData=new company({
                name:        "云公司",
                province:    "江西",
                city:        "南昌",
                legalPerson: "lxf",
                type:        "无限责任公司",
                setupTime:   "今天",
                capital:     "3个亿",
                address:     "云地址",
                mail:        "无",
                scope:       "破产、吹牛皮",
                website:     "",
                phone:       "",
                morePhone:   ""
            });
            addData.save(function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
        });
    }


}

module.exports = dbData;
