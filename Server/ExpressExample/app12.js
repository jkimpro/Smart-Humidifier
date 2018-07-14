var express = require('express');
var http = require('http');
var path = require('path');
var static = require('serve-static');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');


var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({    //세선에 대한 설정정보
    secret:'my key',
    resave: true,
    saveUninitialized: true
}));

var router = express.Router();

router.route('/process/product').get(function(req,res){
    console.log('process/product 라우팅 함수 호출됨');
    
    //로그인이 되었는지 안되었는지 확인하는것.
    //=session 에 user 정보가 있는지 없는지 확인한다는 것.
    
    if(req.session.user){
        res.redirect('/public/product.html');
    }
    else{
        res.redirect('/public/login2.html');
    }
    
});

router.route('/process/login').post(function(req,res){
    console.log('/process/login 라우팅 함수 호출됨');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터: ' + paramId + ',' + paramPassword);
    
    if(req.session.user){
        console.log('이미 로그인 되어있습니다.');
        
        res.redirect('/public/product.html');
    }
    else{
        req.session.user ={
            id:paramId,
            name: '소녀시대',
            authorized: true
        };
        res.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
        res.write('<h1>로그인 성공</h1>');
        res.write('<p>Id' + paramId + '</p>');
        res.write('<br><br><a href = "/process/product"> 상품 페이지로 이동하기 </a>');
        res.end();
    }
});


router.route('/process/logout').get(function(req,res){
    
    console.log('/process/logout 라우팅 함수 호출됨');
    if(req.session.user)
    {
        console.log('로그아웃합니다.');
        req.session.destroy(function(err){
           if(err) {console.log('세션 삭제 시 에러 발생.'); return;}
            console.log('세션 삭제 성공');
            res.redirect('/public/login2.html');
        });
    }
    else{
        console.log('로그인되어 있지 않습니다.');
        res.redirect('/public/login2.html');
    }
})



router.route('/process/setUserCookie').get(function(req,res){
    console.log('/process/setUserCookie 라우팅 함수 호출됨');
    
    res.cookie('user', {
        id: 'mike', 
        name: '소녀시대',
        authorized: true 
    });
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
    
    res.writeHead(100, {"Content-Type": "text/html;charset=utf8"});
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
