/**
 * Created by easys on 2015/6/15.
 */
/**
 *使用内置的Event
 **/
 var event = require("events");
 var eventEmitter = new event.EventEmitter();

var q = require("q");
var dbHelper = require('./db/dbHelper.js');

var stepOne = function (callback) {
        console.log("stepOne Start");
        var defered = q.defer();
        setTimeout(function () {
            callback("stepOne");
            defered.resolve('sdk');
            //eventEmitter.emit("stepOneEnd");
        }, 3000);
    return defered.promise;
};


var stepTwo = function (callback) {
        console.log("stepTwo Start");
    var defered = q.defer();
        setTimeout(function () {
            callback("stepTwo");
            defered.resolve('sdk');
            //eventEmitter.emit("stepTwoEnd");
        },2000);
    return defered.promise;
};


var stepThree = function (callback) {
    console.log("stepThree Start");
    setTimeout(function () {
        callback("stepThree");
        //stepTwo(_callBack);
    },1000);
};


eventEmitter.on("stepOneEnd",function(){
    stepTwo(_callBack);
});
eventEmitter.on("stepTwoEnd",function(){
    stepThree(_callBack);
});

var _callBack = function (msg) {
    console.log(msg+'End');
};


//stepOne(_callBack);

//得到用户数据
var getUsers = function () {
    var sql = "select * from users";
    dbHelper.query(sql,function(err,recordset){
        if(err){
            console.log(err);
            return [];
        }
        else {
            return recordset;
        }
    });

}

//得到用户数据
var getUsers = function () {
    var sql = "select * from users";
    dbHelper.query(sql,function(err,recordset){
        if(err){
            console.log(err);
            return [];
        }
        else {
            return recordset;
        }
    });
}

//得到用户数据
var getUsers = function () {
    var sql = "select * from users";
    dbHelper.query(sql,function(err,recordset){
        if(err){
            console.log(err);
            return [];
        }
        else {
            return recordset;
        }
    });
}



stepOne(_callBack).then(function() {
    return stepTwo(_callBack);}).then(function () {
    return stepThree(_callBack);
});

dbHelper.promiseQuery("select * from users").then(function (data) {
    return dbHelper.promiseQuery("select * from order where userid=''");
}).then(function (data2) {
    return dbHelper.promiseQuery("select * from products where orderid=''");
}).then(function (data3) {
    return data3;
});

/**
 * 通过回调实现
stepOne(function (msg1) {
    _callBack(msg1);
    stepTwo(function (msg2) {
        _callBack(msg2);
        stepThree(function (msg3) {
            _callBack(msg3);
        })
    });
});
**/

