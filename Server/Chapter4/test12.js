//http 모듈로 요청받은 파일 내용을 읽고 응답하기

var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req,res){

    if(err) throw err;
    
   var instream = fs.createReadStream('./output.txt'); instream.pipe(res); 
});

server.listen(7001, '127.0.0.1');
