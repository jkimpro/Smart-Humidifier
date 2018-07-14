//버퍼 단위로 읽기 쓰기.
var output = '안녕 1!';
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf-8');
console.log('첫 번째 버퍼의 문자열 : %s', buffer1.toString());

var buffer2 = new Buffer('안녕 2!', 'utf-8');
console.log('두 번째 버퍼의 문자열 : %s', buffer2.toString());
console.log('버퍼 객체의 타입 : %s', Buffer.isBuffer(buffer1));



var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf-8', 0, byteLen);
var str2 = buffer2.toString('utf-8');

buffer1.copy(buffer2, 0,0,len);
console.log('두 번째 버퍼에 복사한 후의 문자열 : %s', buffer2.toString('utf-8'));

var buffer3 = Buffer.concat([buffer1, buffer2]);                            //concat 은 붙이는 역할,
console.log('두 개의 버퍼를 붙인 후의 문자열 : %s', buffer3.toString('utf-8'));
