function add(a,b,callback)
{
    var result = a+b;
    callback(result);
    
    var count =0;    
    var history = function(){
        count++;
        return count + ':' + a+ '+' + b +'=' + result;
    };
    return history;
}

var add_history = add(10,10, function(result){
    console.log('파라미터로 전달된 콜백 함수 호출됨');
    console.log('더하기 (10,10)의 결과 : %d', result);
});

var add_nonBlockingCheck = add(10,10, function(result){
   
    console.log('비동기식 확인');
    console.log('카운트 결과 출력 예정');
});
for(var i =0; i<10; i++){
    console.log('결과 값으로 받은 함수 실행 결과 : '+ add_history());
}

console.log('비동기식 카운트 실행 결과: ' + add_nonBlockingCheck());
console.log('결과 값으로 받은 함수 실행 결과 : '+ add_history());

//it is time to end