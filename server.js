var connect = require('connect'),
  fs = require('fs'),
  http = require('http'),
  index = fs.readFileSync('index.html');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('.'))
  .use(function(req, res){
    res.end(index);
  });

http.createServer(app).listen(3000);
