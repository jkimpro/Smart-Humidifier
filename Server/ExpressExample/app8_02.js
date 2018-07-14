var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var static = require('serve-static');

app.set('port', process.env.PORT || 3000);

app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//라우팅 함수
var router = express.Router();

//-> 이 요청 패쓰에 들어온것 만 확인하겠다는 것.
router.route('/process/login/:name').post(function(req,res){
    console.log('/process/login/:name 라우팅 함수에서 받음');
    
    //name 이라는 param으로 들어옴
    var paramName = req.params.name;        //url parameter;
    //get 방식, post 방식, url 방식

    
    
    var paramId = req.body.id || req.query.id; 
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200, {"Content-Type": "text/html;charset=utf8"});
    res.write("<h1> 서버에서 로그인 응답 </h1>");
    res.write("<div> <p>" + paramName +"</p> </div>"); //-> 뷰를 통해 편하게 만들수 있음.
    res.write("<div> <p>" + paramId +"</p> </div>"); //-> 뷰를 통해 편하게 만들수 있음.
    res.write("<div> <p>" + paramPassword +"</p> </div>"); //-> 뷰를 통해 편하게 만들수 있음.
    res.end();
    
});

app.use('/', router); //라우팅 마지막



/*
app.use(function(req,res,next){
    
    console.log('첫번째 익스프레스 입니다.');
    var userAgent = req.header('User-Agent');
    var paramId = req.body.id || req.query.id;
    
    res.send('<h3> userAgent 는 ' + userAgent + '이고, paramId는 ' + paramId + '이다 </h3>');
});
*/
var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('서버 실행');
});
