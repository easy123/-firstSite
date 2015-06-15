/**
 * Created by easys on 2015/6/14.
 */
var msSql = require('mssql');

var config = {
    user: 'sa',
    password: 'sql@123',
    server: '192.168.2.199',
    database: 'testing',
    options: {
        encrypt: false
    }
}

exports.query = function(sql, callback){
    var connection = new msSql.Connection(config, function (err) {
        if(err){
            console.log(err);
        }
        var request = new msSql.Request(connection);
        request.query(sql,callback);
    });
};