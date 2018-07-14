var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req,res, next){
    
    console.log('첫번째 미들웨어 실행');
    
    var userAgent = req.header('User-Agent');
    var paramName = req.query.name; // nam
    
    res.send('<h3> 서버에서 응답. user-Agent ->' + userAgent + '</h3>'
            +'<h3> Param Name ->' +paramName);
    //서버쪽에서 클라이언트가 보낸 데이터와 헤더를 확인 할 수 있다.
    
    //http://localhost:3000/users?name=mike -> get 방식 요청 방식
});


var server = http.createServer(app).listen(app.get('port'), function(){
    
    console.log('익스프레스로 웹서버를 실행함: ' + app.get('port'));
    
})