var express = require('express');
var http = require('http');
var static = require('server-static');

var path = require('path');
var app = express();


app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    console.log('첫번째 익스프레스 실행중입니다.');
    
    res.writeHead(200, {"Content-Type": 'text/html; charset=utf8'});
    res.write('<h1> 내 이름은 김준혁입니다. </h1>')
    
    next();
});
app.use(function(req, res, next){
    
    for(var i =0; i<100; i++)
    {
        res.write('<h1>' + i +'번째 행입니다. </h1>'); 
    }
    next(); 
});


app.use(function(req, res, next){
    res.end('<h1> 마지막 행입니다 </h1>');
});

var server = http.createServer(app).listen(app.get('port'),function(){
    
    console.log('익스프레스 실행중입니다.');
});