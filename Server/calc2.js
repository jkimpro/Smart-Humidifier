/*

calc.js 처럼 exports 속성으로 만들지는 않았다.

*/
var calc = {};
calc.add = function(a,b)
{
    return a+b;
}

module.exports = calc;
