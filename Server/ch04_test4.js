/*
on(event, listener) -> 지정한 이벤트의 리스너를 추가함.
once(event, listener) -> 지정한 이벤트의 리스너를 추가하지만, 한 번 실행한 후 에는 자동적으로 리스너가 제거됨.
removeListener(event, listener) -> 지정한 이벤트에 대한 리스너를 제거함.

*/

var Calc = require('./calc3');

var calc = new Calc();
calc.emit('stop');

console.log(Calc.title + '에 stop 이벤트 전달함');
