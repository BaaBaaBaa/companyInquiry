var express=require('express');
var app=express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

app.use('/src', express.static('./'));
//app.use('/', express.static('./html/index.html'));会在地址栏显示文件目录，不安全，难受

app.use('/favicon.ico',function (req,res,next) {
    res.send();
});

app.use("/api", require("./js/apiRouter"));

app.use('/',function (req, res, next) {
    console.log(req.url);
    if(req.url=='/')
        res.sendFile('index.html', {root:'./html'}, function(err) {
                if (err) {
                console.log(err);
                res.status(err.status).end();
            }
            else {
                console.log('来自'+req.url+' sent index.hml');
            }
        });
})

app.listen(3000,'0.0.0.0',function () {
    console.log('服务器启动成功');
});