// 동기식 (파일작업이 끝날때 까지 대기함)
// 비동기식 (파일 작업을 요청만 하고 그 다음 작업을 바로 수행함.)

var fs = require('fs');

//파일을 비동기식으로 읽어드림
var data = fs.readFileSync('./package.json', 'utf-8');
console.log(data);
