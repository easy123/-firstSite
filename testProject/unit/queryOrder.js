/**
 * Created by easys on 2015/6/16.
 */
var dbHelper = require('../db/dbHelper.js');

//exports.getOrder = function (sql) {
//   return dbHelper.promiseQuery(sql).then(function (data) {
//        var orderSql = "select * from orders where 1=1 ";
//        //for(var i =0; i <data.length; i++){
//        orderSql=orderSql+"and userid="+data[0].id +" order by productID desc";
//        //}
//        var order = dbHelper.promiseQuery(orderSql);
//        return order;
//    }).then(function (data) {
//        //console.log(data);
//        var proSql = "select * from products where 1=1 ";
//        var where = "(";
//        for(var i=0;i<data.length;i++){
//            if(i==0)
//                where+=data[i].productID;
//            else
//                where+=","+data[i].productID;
//            orderId.push(data[i].id);//订单编号
//        };
//        where+=")";
//        proSql+="and id in"+where+" order by id desc";
//
//        var pro = dbHelper.promiseQuery(proSql);
//        return pro;
//    }).then(function (data) {
//        for(var i = 0; i < data.length; i++){
//            data[i].orderId = orderId[i];
//            data[i].userName = username;
//        }
//        return data;
//    });
//};