//외장 모듈은 가급적 위에서 가져옴
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');


var bodyParser = require('body-parser');


var app = express();

app.set('port', process.env.PORT || 3000);

//static 안에 폴더를 지정
app.use('/public', static(path.join(__dirname, 'public'))); //미들웨어 등록 -> 미리 만들어진것을 가져옴
//-> 특정한 폴더를 오픈해서 사용가능토록 함.

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // -> 일반적인 post 방식으로 접근하는 것. req.query 로 접근이 안됨.
//주소표시줄에서 끄적이는 것은 get 방식이고, post 는 그렇지 않다.

//결론적으로 use 를 통해 bodyParser 로 미들웨어 처리
//그다음에 body 안에서 처리하게 됨

app.use(function(req,res, next){
    
    console.log('첫번째 미들웨어 실행');
    var userAgent = req.header('User-Agent');
    var paramId = req.body.id || req.query.id; // post 방식 || get방식
   
    res.send('<h3> 서버에서 응답. user-Agent ->' + userAgent + '</h3>'
            +'<h3> Param Id ->' +paramId);
    //post 방식에서는 body 안에 parameter 가 포함되어 있다.
    
    //서버쪽에서 클라이언트가 보낸 데이터와 헤더를 확인 할 수 있다.
    //http://localhost:3000/users?name=mike -> get 방식 요청 방식
});


var server = http.createServer(app).listen(app.get('port'), function(){
    
    console.log('익스프레스로 웹서버를 실행함: ' + app.get('port'));
    
})