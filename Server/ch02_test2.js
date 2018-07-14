console.log('argv 속성의 파라미터 수: ' + process.argv.length);

console.dir(process.argv);

if(process.argv.length >2)
{
    console.log('세 번째 파라미터의 값: %s', process.argv[2]);
}
process.argv.forEach(function(item, index){ //forEach는 각배열 안에 들어 있는 각 아이템값과 인덱스를 함께 확인하고 싶을 때 사용
    console.log(index + ' : ', item);
});

proocess.argv.forEach(function(item, index){
    console.log('none fiction');
});

process.arg.forEach(function(item, index)
{
    console.log('none function');
    console.log('goods');
    
});