/**
 * Created by easys on 2015/6/12.
 */
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var session = require("express-session");
var uuid = require('uuid');


var app = new express();

var login = require("./routes/login");
var index = require("./routes/index");
var order = require("./routes/order");

//视图引擎设置
app.set("views",path.join(__dirname,'views'));
app.set("view engine",'hjs');
//app.engine("html",require("hjs").__express);

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session
app.use(session({
    genid: function(req) {
        return uuid.v4(); // use UUIDs for session IDs
    },
    resave:false,
    saveUninitialized:false,
    secret: 'keyboard cat'
}));

//验证登陆
app.use(function (req,res,next) {
    var users = req.session.users;
    if(!users){
        if (req.originalUrl != '/') {
            if (req.originalUrl == '/login' && req.method == 'POST') {
            }
            else{
                return res.redirect('/');
            }
        }
    }
    next();
});
//记录用户访问的log
app.use(function (req,res,next) {
    var users = req.session.users;
    if(users){
        var fs = require("fs");
        var date = new Date();
        var path = __dirname + '/logs/'+ (date.getFullYear()).toString() + (date.getMonth()+1).toString() + date.getDate().toString() + '.txt';
        var content = date.toLocaleString() + ":[用户]" + users.userName + "\t[URL]" + req.originalUrl + "\n";
        //使用appendFile方法时路径必须已存在，不然会报错
        fs.appendFile(path,content);
    }
    next();
});

app.use("/",login);
app.use("/login",login);
app.use("/index",index);
app.use("/order",order);

//app.get('/home', function (req,res,next) {
//    res.render("home",{title:"首页"});
//});
//
//app.get('/list', function (req,res,next) {
//    res.send("list");
//});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render("error",{
        message: err.message,
        statusCode:404
    });
    //next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        statusCode:500
    });
});

module.exports=app;