/**
 * Created by easys on 2015/6/16.
 */
var express = require('express');
var router = express.Router();
var dbHelper = require('../db/dbHelper.js');


var orderId = new Array();
var orders = [];

router.get('/',function(req,res){
    var myDate = new Date();
    var hours = myDate.getHours(); //获取当前小时数(0-23)
    var username = req.session.users.userName;
    var sql = "select * from users where name='"+username+"'";
    dbHelper.promiseQuery(sql).then(function (data) {
        var orderSql = "select * from orders where 1=1 ";
        //for(var i =0; i <data.length; i++){
            orderSql=orderSql+"and userid="+data[0].id +" order by productID desc";
        //}
        var order = dbHelper.promiseQuery(orderSql);
        return order;
    }).then(function (data) {
        //console.log(data);
        var proSql = "select * from products where 1=1 ";
        var where = "(";
        for(var i=0;i<data.length;i++){
            if(i==0)
                where+=data[i].productID;
            else
                where+=","+data[i].productID;
            orderId.push(data[i].id);//订单编号
        };
        where+=")";
        proSql+="and id in"+where+" order by id desc";

        var pro = dbHelper.promiseQuery(proSql);
        return pro;
    }).then(function (data) {
        for(var i = 0; i < data.length; i++){
            data[i].orderId = orderId[i];
            data[i].userName = username;
        }
        res.render('order',{
            title:"订单列表",
            name:username,
            am:hours>=6 && hours<=12,
            pm:hours>12 && hours<=18,
            night:hours >18,
            partials:{'logout': 'shared/logout'},
            logoutUrl:"index/logout",
            order:data
        });
        //return data;
    });
});

module.exports = router;