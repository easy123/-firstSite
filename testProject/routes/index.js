/**
 * Created by easys on 2015/6/12.
 */
var express = require("express");
var router = express.Router();
var dbHelper = require('../db/dbHelper.js');

router.get('/', function (req,res,next) {
    var myDate = new Date();
    var hours = myDate.getHours(); //获取当前小时数(0-23)
    var user = req.session.users;
    console.log("Index Print User :"+req.session.users);

    dbHelper.query('select * from products', function (err,recordset) {
        if(err){
            res.render("error",{
                message: err.message,
                statusCode:err.status
            });
        }
        else{
            res.render("index",{
                title:"登录成功",
                name:user.userName,
                am:hours>=6 && hours<=12,
                pm:hours>12 && hours<=18,
                night:hours >18,
                partials:{'logout': 'shared/logout'},
                logoutUrl:"index/logout",
                product:recordset,
                list:[
                    { 'id':1, 'img':'/images/shpf.jpg', 'remarks':'浦发银行', 'price':20000},
                    { 'id':2, 'img':'/images/jtyh.jpg', 'remarks':'交通银行', 'price':1999},
                    { 'id':3, 'img':'/images/gdyh.jpg', 'remarks':'光大银行', 'price':20000},
                    { 'id':4, 'img':'/images/xyyh.jpg', 'remarks':'兴业银行', 'price':1999},
                    { 'id':5, 'img':'/images/hxyh.jpg', 'remarks':'华夏银行', 'price':20000},
                    { 'id':6, 'img':'/images/payh.jpg', 'remarks':'平安银行', 'price':1999},
                    { 'id':7, 'img':'/images/gfyh.jpg', 'remarks':'广发银行', 'price':20000},
                    { 'id':8, 'img':'/images/zsyh.jpg', 'remarks':'招商银行', 'price':1999}
                ]
            });
        }
    });
});

//删除数据
router.post('/delete',function(req,res,next){
    if(err){
        res.render("error",{
            message: err.message,
            statusCode:err.status
        });
    }
    else {
        dbHelper.query('delete  from products where id=' + req.body.id, function (errs, recordsets) {
            res.send({isSuccess: true});
        });
    }
});
//修改数据
router.post('/edit',function(req,res,next){
    var sql = "";
    var id = req.body.id;
    if(id)
        sql="update products set name='"+req.body.name+"', image='"+req.body.image+"', des='"+req.body.des+"' where id="+req.body.id;
    else
        sql = "insert into products(name,des,image) values('"+req.body.name+"','"+req.body.des+"','"+req.body.image+"')";
    dbHelper.query(sql,function(err,recordset){
        if(err){
            res.render("error",{
                message: err.message,
                statusCode:err.status
            });
        }
        else {
            res.send({isSuccess: true});
        }
    });
});

router.get('/logout',function(req,res,next){
    req.session.destroy(function(){
        res.redirect("/");
    });
});
module.exports = router;