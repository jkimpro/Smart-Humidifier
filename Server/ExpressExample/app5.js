var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req,res, next){
    
    console.log('첫번째 미들웨어 실행');
    res.redirect('http://google.co.kr'); //웹페이지로 이동하게 만듦 -> 자동으로 이동하도록 만듦
    
    //http://localhost:3000/users?name=mike -> get 방식 요청 방식
});


var server = http.createServer(app).listen(app.get('port'), function(){
    
    console.log('익스프레스로 웹서버를 실행함: ' + app.get('port'));
    
})