/**
 * @file 入口文件
 *
 */
var http = require('http');
var enhancer = require('./enhancer');
var path = require('path');
var mockData = require('./mock');

var app = http.createServer(function (req, res) {
    app.handle(req, res);
});

enhancer.decorateApp(app);

app.route('/', function (req, res) {
    res.send('aaa');
});

app.route('/list', function (req, res) {
    res.send(JSON.stringify(mockData));
});

app.static('\\/static', path.resolve(__dirname, '../toutiao-es6/'));

app.listen(8099, '0.0.0.0');

console.log("http://192.168.252.4:8099/")
