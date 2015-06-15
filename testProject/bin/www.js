/**
 * Created by easys on 2015/6/12.
 */
var http = require("http");
var app = require("../app.js");


http.createServer(app).listen(9002).on("listening", function () {
    console.log("Runing");
});