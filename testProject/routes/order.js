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

//var getUser = function(name){
//    var defered = q.defer();
//    dbHelper.query("select top 1 * from Users where name = '"+name+"'",function(err,recordSet){
//        if(!err && recordSet.length == 1){
//            userName = recordSet[0].name;
//            defered.resolve(recordSet[0].id);
//        }else {
//            console.log(err);
//            defered.reject(err);
//        }
//    });
//    return defered.promise;
//}
//
//var getOrderList = function(userId){
//    var defered = q.defer();
//    dbHelper.query("select * from orders where userId = " + userId,function(err,recordSet){
//        if(!err) {
//            var orderIds = "";
//            for (var i = 0; i < recordSet.length; i++){
//                orderIds += "'" + recordSet[i].productID + "',";
//            }
//            if(orderIds != "") orderIds = orderIds.substr(0,orderIds.length -1);
//            defered.resolve(orderIds);
//        }else {
//            console.log(err)
//            defered.reject(err);
//        };
//    })
//    return defered.promise;
//};
//
//var getProductList = function(productIds){
//    var defered = q.defer();
//    dbHelper.query("select * from products where id in("+productIds+")",function(err,recordSet){
//        if(!err) {
//            products = recordSet;
//            defered.resolve(recordSet);
//        }else console.log(err);
//    })
//    return defered.promise;
//};

module.exports = router;