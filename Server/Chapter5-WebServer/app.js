var express = require('express');
var http = require('http');

//익스프레스 객체 생성
var app = express();

app.set('port', process.env.PORT || 3000); //속성을 설정하고,

var server = http.createServer(app).listen(app.get('port'), function(){
     
    //미리 지정된 것을 가져옴
    
    console.log('익스프레스로 웹서버를 실행 함: ' + app.get('port')); //여기로 가져옴
});