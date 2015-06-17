/**
 * Created by easys on 2015/6/17.
 */
var should = require('should');
var q = require('q');
var test = require('./orderTest.js');



describe('Testing Group', function() {
    it('should return -1', function() {
        query(null).then(function(data) {
            return (data).should.equal(-1);
        });
    });
});

describe('Testing Group', function() {
    it('should return 1', function() {
        query().then(function(data) {
            return (data).should.equal(1);
        });
    });
});

var query = function(sql) {
    var deferred = q.defer();
    if(sql) {
        //console.log("1");
        deferred.resolve(1);
    } else {
        //console.log("-1");
        deferred.reject(-1);
    }
    return deferred.promise;
}