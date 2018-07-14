//서버에서 다른 웹 사이트의 데이터를 가져와 응답하기.

var http = require('http');

var options = {
    host: 'www.google.co.kr',
    port: 80,
    path: '/'
};

var req = http.get(options, function(res){
    //응답처리
    var resData ='';
    res.on('data', function(chunk){
        resData +=chunk;
    });
    
    res.on('end', function(){
        console.log(resData);
    });
});
req.on('error', function(err){
    console.log("오류 ㅂㄹ생 : " + err.message);
});