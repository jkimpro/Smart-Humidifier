var fs = require('fs');

var infile = fs.createReadStream('./output.txt', {flags: 'r'});
var outfile = fs.createWriteStream('./output2.txt', {flags: 'w'});

//->stream 을 이용하여서 스트림 단위로 처리할 수 있음.

infile.on('data', function(data){
    
    console.log('읽어 들인 데이터', data);
    outfile.write(data);
    
})
infile.on('end', function(){
    
    console.log('파일 읽기 종료');
    outfile.end(function(){
        console.log('파일 쓰기 종료');
        
    });
});
//-> readStream 과 writeStream 을 한번에 할 수 있는 기능이 pipe 메소드 이다.