var url = require('url');

//주소 문자열을 URL 객체로 만들기
var curURL = url.parse('https://www.google.com/search?source=hp&ei=9SnvWsjJOcS80ATSs414&q=steve+jobs&oq=steve+jo&gs_l=psy-ab.3.0.0l10.525696.527841.0.528842.11.8.0.0.0.0.121.803.0j7.7.0....0...1.1.64.psy-ab..4.7.803.0..35i39k1j0i131k1.0.ePe4-OgDYJE');

//URL 객체를 주소 문자열로 만들기
var curStr = url.format(curURL);

console.log('주소 문자열 : %s', curStr);     //나눈것을 하나의 문자열로 합친 curStr 을 출력.
console.dir(curURL);                    //객체의 각 요소로 분할하여 출력을 한다.

var querystring = require('querystring');
var param = querystring.parse(curURL.query);

console.log('요청 파라미터 중 query의 값: %s', param.query);
console.log('원본 요청 파라미터 : %s', querystring.stringify(param));
