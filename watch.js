var webpack = require ('webpack');
var fs = require('fs-extra');
var watch = require('watch');
var http = require('http-server');
var webpackConfig = require('./webpack.config.js');
var livereload = require('livereload');

var compiler = webpack(webpackConfig);

compiler.watch({}, function() {
  copyDemo();
});

watch.watchTree('src/demos', function() {
  copyDemo();
});

function copyDemo() {
  fs.emptyDir('./dist/demos', function() {
    fs.mkdir('./dist/demos', function() {
      fs.copy('./src/demos', './dist/demos');
    });
  });
}


var server = http.createServer({
  root: './dist'
});

server.listen(8888);

lr = livereload.createServer();
lr.watch(__dirname + "/dist");

