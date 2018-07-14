/*

set으로 설정하고 get 으로 뺀다.
응답을 보내는 방법 미들웨어 (가장 간단한 응답 방법) -> 중간에 가로채서 보내는 방법
*/

// 전형적으로 app 라는 이름을 가장 많이 씌임
var express = require('express');
var http = require('http');

var app = express(); // express 서버 객체가 되어 버림

//포트 설정 -> 포트라는 속성을 설정한 것.(지정한 설정)
app.set('port', process.env.PORT || 3000); //-> 포트라는 환경 변수가 있으면 그걸 사용하고, 아니면 3000을 사용하여라

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹서버를 실행함: ' + app.get('port'));
    
});

