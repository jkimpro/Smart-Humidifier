var express = require('express');
var http = require('http');
var path = require('path');
var static = require('serve-static');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');



var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());


var router = express.Router();


router.route('/process/setUserCookie').get(function(req,res){
    console.log('/process/setUserCookie 라우팅 함수 호출됨');
    
    //-> 쿠키라는 정보가 저장이 됨
    res.cookie('user', {
        id: 'mike', 
        name: '소녀시대',
        authorized: true 
    });
    //이쪽 페이지를 열어주기 위한것.
    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req,res){
    console.log('/process/showCookie 라우팅 함수 호출됨.');
    res.send(req.cookies);
});


router.route('/process/login').post(function(req,res){ //요청, 응답 객체 -> 응답객체에 쿠키 메소드가 있음.
    console.log('/process/login 라우팅 함수에서 받음');
    
    var paramId = req.body.id || req.query.id; 
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200, {"Content-Type": "text/html;charset=utf8"});
    res.write("<h1> 서버에서 로그인 응답 </h1>");
    res.write("<div> <p>" + paramId +"</p> </div>"); //-> 뷰를 통해 편하게 만들수 있음.
    res.write("<div> <p>" + paramPassword +"</p> </div>"); //-> 뷰를 통해 편하게 만들수 있음.
    res.end();
});


app.use('/', router);

//라우팅 안쪽에 넣으면 안됨.
app.all('*', function(req, res){
    res.status(404).send('<h1>요청하신 페이지는 없습니다.</h1>');
    
});
var server = http.createServer(app).listen(app.get('port'), function(){
   console.log('서버 실행');
});
