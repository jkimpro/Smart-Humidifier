//splice()메소드로 배열 요소 여러개를 한꺼번에 추가하거나 삭제하기.

var Users = [{name: '소녀시대', age: 20, sex: 'female'}, {name: '김준혁', age: 20, sex: 'male'}];

Users.push({name: '유찬우', age: 26, sex: 'male'});
Users.push({name: '선미', age: 24, sex: 'female'});
Users.push({name: '귀요미', age: 26, sex: 'female'});

Users.unshift({name: '보미', age: 26, sex: 'female'});
Users.unshift({name: '백호수', age: 25, sex: 'female'});

Users.forEach(function(item, index){
   console.log(item); 
});

//delete Users[1] 를 사용하면 요소가 삭제는 되지만, 배열 크기는 그대로 이다.
//-> 이러한 경우를 대비하여서 splice 함수가 필요한 것이다.

Users.splice(1,0,{name: '애프터스쿨', age: 25, sex: 'female'});
console.log('splice()로 요소를 인덱스 1에 추가한 후');
console.dir(Users);

Users.splice(2,1);
console.log('splice()로 인덱스 2의 요소를 1개 삭제한 후');
console.dir(Users);
