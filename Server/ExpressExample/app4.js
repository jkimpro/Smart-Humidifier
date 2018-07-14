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
    
    //''res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
    //res.end('<h1>서버에서 응답한 결과입니다.' + req.user + '</h1>');
    //send를 사용할 수 있다. -> 훨씬 간단한 방법으로 응답을 보낼 수 있다.
    
    //res.send('<h1>서버에서 응답한 결과입니다.' + req.user + '</h1>');
    var person = {name: '소녀시대', age: 20} //-> json 형태로 바로 전송이 됨
    //요즘 포맷이 대부분 json 포맷으로 전송이 됨.
    //-> 자바스크립트 객체 자체를 보낼 수도 있다.
    //res.send(person);
   /*
    var personStr = JSON.stringify(person); // -> json 문자열로 보냄 (훨씬 명시적임.)
    res.send(personStr);
    */
    /*
    var personStr = JSON.stringify(person); // -> json 문자열로 보냄 (훨씬 명시적임.)
    
    res.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
    res.write(personStr);
    res.end();N
    */
    var personStr = JSON.stringify(person); //json 형태
//    var personJS = JSON.parse(person);      //javascript 형태
    
    res.writeHead(200, {"Content-Type": "application/json; charset=utf8"});
    res.write(personStr);
    res.end();
    //상황에 맞춰서 보내면 됨.
    
});



var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 포트 번호:  ' + app.get('port'));
});