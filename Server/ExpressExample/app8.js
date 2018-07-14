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
router.route('/process/login').post(function(req,res){
    console.log('/process/login 라우팅 함수에서 받음');
    
    var paramId = req.body.id || req.query.id; 
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200, {"Content-Type": "text/html;charset=utf8"});
    res.write("<h1> 서버에서 로그인 응답 </h1>");
    res.write("<div> <p>" + paramId +"</p> </div>"); //-> 뷰를 통해 편하게 만들수 있음.
    res.write("<div> <p>" + paramPassword +"</p> </div>"); //-> 뷰를 통해 편하게 만들수 있음.
    res.end();
});

app.use('/', router); //라우팅 마지막


app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신 페이지는 없습니다.</h1>');
    
}); //모든 요청에 대해서 처리하겠다는 뜻.

var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('서버 실행');
});
