var express = require('express');
var http = require('http');
var app = express();


var nextCount =0;

//라우터는 클라이언트의 요청 패스를 보고 이 요청 벙보를 처리할 수 잇는 곳으로 기능을 전달해 주는 역할을 함.
app.use(function(req, res, next){           //use() 메소드를 사용해 미들웨어로 등록하면 next()메소드를 호출한다.
    console.log('첫 번쨰 미들웨어에서 요청을 처리함.');
    
    /*
    res.writeHead('200', {'Content-Type': 'text/html; charset=utf-8'});
    res.end('<h1> Express 서버에서 응답한 결과입니다. </h1>');
    */
    nextCount++;
    req.user = 'Junhyuk';
    res.writeHead('200', {'Content-Type': 'text/html; charset=utf-8'});
    next();
});

for(var i =0; i<1000; i++){
 
    app.use('/', function(req, res, next){           //use() 메소드를 사용해 미들웨어로 등록하면 next()메소드를 호출한다.
        res.write('<h3> Express 서버에서 ' + nextCount +' 번째 응답한 결과입니다. </h3>');
        nextCount++;
        console.log(nextCount +' 번쨰 미들웨어에서 요청을 처리함.');
        next();
    });
}

app.use('/', function(req, res, next){           //use() 메소드를 사용해 미들웨어로 등록하면 next()메소드를 호출한다.
    console.log(1001+' 번쨰 미들웨어에서 요청을 처리함.');
    console.log('end server');
    res.writeHead('200', {'Content-Type': 'text/html; charset=utf-8'});
    res.end('<h3> Express 서버에서 ' + req.user +' 응답한 결과입니다. </h3>');        
});

http.createServer(app).listen(3000, function(){
    console.log('Express 서버가 3000번 포트에서 시작됨. ');
});
