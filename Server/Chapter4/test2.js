
//process 객체는 노드에서 언제든지 사용할수 있는 객체
// EventEmitter를 상속받도록 만드어져 있어서 on() 과 emit()메소드를 바로 사용가능

process.on('exit', function(){
    
    console.log('exit 이벤트 발생함');
});

setTimeout(function(){
    
    console.log('2초 후에 시스템 종료 시도함.');
    process.exit();
}, 2000);

