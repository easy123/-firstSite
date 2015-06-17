/**
 * Created by easys on 2015/6/17.
 */
var q = require('q');
var dbHelper = require('../db/dbHelper.js');

exports.getUser = function(name){
    var defered = q.defer();
    dbHelper.query("select * from Users where name = '"+name+"'",function(err,data){
        if(!err && data.length == 1) defered.resolve(data[0].id);
        else defered.reject(0);
    });
    return defered.promise;
}

exports.getOrderIdList = function(userId){
    var defered = q.defer();
    dbHelper.query("select * from orders where userId=" + userId,function(err,data){
        if(!err) {
            var orderIds = "";
            for (var i = 0; i < data.length; i++){
                if(i == data.length-1)
                    orderIds += "'" + data[i].productID + "'";
                else
                    orderIds += "'" + data[i].productID + "',";
            }
            defered.resolve(orderIds);
        }else defered.reject("");
    });
    return defered.promise;
};

exports.getProductList = function(productIds){
    var defered = q.defer();
    dbHelper.query("select * from products where id in("+productIds+")",function(err,data){
        if(!err) {
            defered.resolve(data);
        }else defered.reject({});
    });
    return defered.promise;
};


exports.query = function(sql) {
    var deferred = q.defer();
    if(sql) {
        deferred.resolve(1);
    } else {
        deferred.reject(-1);
    }
    return deferred.promise;
}