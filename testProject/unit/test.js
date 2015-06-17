/**
 * Created by easys on 2015/6/16.
 */
var shouId = require("should");
var dbHelper = require('../db/dbHelper.js');
var test = require('./orderTest.js');

var getArray = function () {
    return [1,2];
}
var getString = function () {
    return "String Test";
}

describe("Test Array", function () {
    it("return 2", function () {
        getArray().should.have.length(2);
    });
});

describe("Test String", function () {
    it("return string", function () {
        getString().should.endWith('Test');
    });
});

//describe("查询用户测试", function () {
//    describe("查询所有用户", function () {
//        it("return sql", function (done) {
//            dbHelper.query("select * from users", function (err,data) {
//                if (err) return done(err);
//                console.log(data);
//                done();//测试异步需要加
//            });
//        });
//    });
//    describe("查询单个用户", function () {
//        it("return sql", function (done) {
//            dbHelper.query("select * from users where name='admin'", function (err,data) {
//                if (err) return done(err);
//                console.log(data);
//                done();
//            });
//        });
//    });
//});


describe('Test Order', function () {

    describe('Test GetUser Function',function(){
        it('result should is 1',function(){
            return test.getUser('admin').then(function(data){
                data.should.eql(1);
            });
        });
    });

    describe('Test getOrderIdList Function',function(){
        it('result is string',function(){
            return test.getOrderIdList(1).then(function(data){
                data.should.be.type('string');
            });
        });
    });

    describe('Test getProductList Function',function(){
        it('result is not error',function(){
            return test.getProductList('150,151').then(function(data){
                data.should.length(2);
            });
        });
    });

});