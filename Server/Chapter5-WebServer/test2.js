var http = require('http');
var server = http.createServer();
var fs = require('fs');

var port = 3000;
server.listen(port, function(){    
    console.log('웹 서버가 시작되었습니다. : %d', port);
});

//클라이언트 연결 이벤트 관리
server.on('connection', function(socket){
    var addr = socket.address();
    console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});


//클라이언트 요청 이벤트 처리
server.on('request', function(req, res){
   
    var filename = 'house.jpg';
    
    console.log('클라이언트 요청이 들어왔습니다. ');
    fs.readFile(filename, function(err, data){
        res.writeHead(200, {"Content-Type": "image/jpg"});
        res.write(data);
    });
    
//    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write(" <head>");
    res.write(" <title> 응답페이지 </title>");
    res.write(" </head>");
    res.write(" <body>");
    
    
    
    res.write("     <h1> node js 로 부터의 응답 페이지 </h1>");
    res.write(" </body>");
    res.write("</html>");
    res.end();

    //console.dir(req);
   
});

//서버 종료 이벤트 처리
server.on('close', function(){
    console.log('서버가 종료됩니다.');
});