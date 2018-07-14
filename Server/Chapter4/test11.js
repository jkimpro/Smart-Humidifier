var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists){
    if(exists)
    {
        fs.unlink(outname, function(err){       //같은 이릉ㅁ을 가진 파일을 다시 만들기 전에 먼저 이전 파일을 삭제 하도록 unlink()메소드를 사용.
            if(err) throw err;
            
        console.log('기존파일 [' + outname + '] 삭제함');
        });
    }
    var infile = fs.createReadStream(inname, {flags: 'r'});
    var outfile = fs.createWriteStream(outname, {flags: 'w'});
    
    infile.pipe(outfile);           //기존에 만들어 놓은 output2.txt 파일이 있을 경우 파일이 중복될 수 있다.
    console.log('파일 복사 [' + inname + '] -> ['+outname +']');
});