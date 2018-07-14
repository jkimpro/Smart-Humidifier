var fs = require('fs');

//비동기식 방식 -> 노드에서 훨씬더 많이 쓰이는 방식
fs.readFile('./package.json', 'utf-8', function(err, data){
    
    console.log(data);
})

console.log('프로젝트 폴더 안의 package.jason 파일을 읽도록 요청했습니다.');
