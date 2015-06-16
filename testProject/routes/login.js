/**
 * Created by easys on 2015/6/12.
 */
var express = require("express");
var router = express.Router();
var dbHelper = require('../db/dbHelper.js');

router.get('/', function (req,res,next) {
    res.render("login",{
        title:"登录"
    });
});

//登录验证
router.post('/login', function (req,res,next) {
    console.log("Print name:"+ req.body.name);

    var name = req.body.name.trim();
    var password =  req.body.password.trim();
    if(name==""){
        res.render('login',{title:"登陆",nameErrMsg:"用户名不能为空!"});
    }
    else if(password=="")
        res.render('login',{title:"登陆",pwdErrMsg:"密码不能为空!"});
    else {
        var sql="select * from [users] where name='"+name+"' and password='"+password+"'";

        dbHelper.query(sql,function(err,recordset){
            if(err){
                res.render("error",{
                    message: err.message,
                    statusCode:err.status
                });
            }else{
                //console.log(recordset);
                if(recordset.length>0){
                    req.session.users={userName:name};
                    console.log("Login Print User :"+req.session.users.userName);
                    res.redirect('index');
                } else {
                    res.render('login',{title:"登陆",loginErrMsg:"用户名或密码有误!"});
                }
            }
        });
    }
});

module.exports = router;