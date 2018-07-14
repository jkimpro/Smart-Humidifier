var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req,res, next){
    
    console.log('첫번째 미들웨어 호출');
    
    //그저 사용자만확인하고 싶다면
    req.user = 'mike';
    next();
  
});
//슬래시는 요청 패스임. -> 여러개의 미들웨어 사용이 가능함.
app.use(function(req,res, next){
    
    console.log('두번째 미들웨어 호출됨.');
    
    res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
    res.write('<h1>서버에서 응답한 결과입니다.' + req.user + '</h1>');
      
});



var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 포트 번호:  ' + app.get('port'));
});