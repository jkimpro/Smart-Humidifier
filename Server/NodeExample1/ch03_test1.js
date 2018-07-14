var age = 20;
console.log('나이 : %d', age);

var name = '소녀시대';
console.log('이름: %s', name);

function mul(a,b){
    return a*b;
}

var result = mul(10,10);

console.log('더하기(10,10) : %d', result);


//javascript의 특이한 속성
var Person ={};
Person['age'] = 20;
Person['name'] = '소녀시대';

var oper = function(a,b)
{
    return a+b;
}
Person['add'] = oper;
console.log('더하기: %d', Person.add(10,10));

//배열요소 하나 씩 확인하기
var Users = [{name: '소녀시대', age: 20, sex: 'female'}, {name: '김준혁', age: 20, sex: 'male'}];

Users.push({name: '유찬우', age: 26, sex: 'male'});

for(var i =0; i<Users.length; i++)
{
    console.log(Users[i]);
    
}

//shift 배열의 앞에 요소를 삭제하는 것
//unshift 배열의 앞에 있는 요소를 추가하는 것


Users.forEach(function(item, index){

    console.log('배열 요소 #' + index + ' : %s', item.name);

});