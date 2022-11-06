# javascript-deep-dive

# JavaScript

라는 언어 자체는 '로직을 표현하기 위한' '문법'만 았는 거고,
기능은

- host 환경(node환경, browser환경)에서 제공해주는 api
- framework
- library
  를 사용해야 할 수 있다.

**JavaScript '언어' 에 대해서 '제대로' 배워보자!**

# 공부 순서

JavaScript ES6+
Basic: 기본 문법, 사용법, 개발자답게 사고하는 방법

- let, const
- if, for, switch, while
- function
- object

Advanced: JS의 내부 구현사항

- Prototype
- Hoisting
- Scope
- Closure


# [ Variable ] Javascript Deep Dive 
- 04장. 변수
- 06장 타입 
- 11장. 원시 값과 객체의 비교

## 변수란 무엇인가? 왜 필요한가?

### 메모리와 변수가 필요한 이유, 배경
사람은 계산과 기억을 모두 두뇌에서 파지만, 컴퓨터는 연산과 기억을 수행하는 부품이 나눠져 있다. 컴퓨터는 CPU를 사용해 연산하고, 메모리를 사용해 데이터를 기억한다.   

메모리상에 데이터를 읽고 쓰고   
메모리는 데이터를 저장할 수 있는 메모리 cell의 집합체   
메모리 cell = 1 byte(8 bit) size

applicatio이 메모리상에 올라왔을 때,
이 메모리는
- Code
- Data
- Stack
- Heap
  의 메모리 구조를 가진다.


Application이 실행되면

- 입력(input) -> 처리(process) -> 출력(output)/저장(storage) 큰 3가지 줄기를 가진다.
- 이 중 처리(process)에서 처리 과정 중의 데이터(ex. 사용자에게 입력받은 데이터라던지..)를 잠시 저정해 두는 것이 필요.

10 + 20 이라는 연산에서 연산 결과 30을 재사용하고 싶다면 메모리 주소를 통해 연산 결과인 30이 저장된 메모리 공간에 직접 접근하는 것 외에는 방법이 없다. 하지만!
- 메모리 주소를 통해 값에 직접 접근하는 것은 치명적인 오류를 발생시킬 가능성이 높은 매우 위험한 일이다. 
- 자바스크립트는 개발자의 직접적인 메모리 제어를 허용하지 않는다. 
### 그래서 변수란?
프로그래밍 언어느 ㄴ기억하고 싶은 값을 메모리에 저장하고, 저장된 값을 읽어들여 재사용하기 위해 변수를 사용한다. 따라서 
변수(Variable)은

- 값을 저장하기 위해 확보한 메모리 공간
- 그리고 그 메모리 공간을 식별하기 쉽도록 **이름이 주어진** 기억장소
- 값의 위치를 가리키는 상징적인 이름.

그리고 프로그래밍 언어의 컴파일러 또는 인터프리터에 의해 값이 저장된 메모리 공간의 주소로 치환되어 실행된다.   
자바스크립트의 경우는 자바스크립트 엔진이 변수명과 **매핑**된 메모리 주소를 통해 메모리 공간에 접근해서 저장된 값을 반환한다. 

```
let result = 10 + 20
```
에서 변수(식별자에 속한다)result는 값 30이 저장되어 있는 메모리 주소 0x066..어쩌고 를 기억해야한다. 
즉, 변수는 값이 저장되어 있는 메모리 주소와 매핑 관계를 맺으며, 이 매핑 정보도 메모리에 저장되어야 한다.   

변수명 result --> 메모리 주소 0x066..어쩌고 -- 메모리 30


## 변수 선언
ES6 이후 let, const와 같은 키워드를 사용해서 선언해야함.
그 전까지는 var 키워드가 JS에서 변수를 선언할 수 있는 유일한 키워드였다. 

### var이 뭐길래 let, const를 쓰라고 하는건가?
let, const 키워드를 도입한 이유는 var 키워드의 여러 단점을 보완하기 위해서이다.    
따라서 let, const 키워드가 도입된 이유를 정확히 파악하려면 먼저 var 키워드의 단점부터 정확히 이해해야 한다.   
그런데, 그 전에 var 키워드의 단점을 이해하려면 먼저 스코프라는 JS 핵심 개념을 이해해햐 한다. 

*스코프에 대해서는 [여기]() 참고* 


여기엔 스코프를 공부하고 왔다고 생각하고 var의 단점에 대해서 정리하겠다. 
### 변수 Naming

```Javascript
let 0x00006 = 1;
```

이렇게 메모리 주소를 직접 사용하면 가독성이 매우 떨어지고, 어려운 점이 많다.
해당 변수의 역할을 명확하게 드러내는 의미있는 변수명을 짓는 것이 중요하다.

- 변수 MDN 문서: developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Variables
- 예약어 종류: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#keywords

naming에 대한 꿀팁

```Javascript
let backAudio;
let windAudio;
```

이렇게 Audio인데 어떤 autio에 대한 변수가 여러개일 때 공통적인 것을 이렇게 뒤에적기보다

```Javascript
let audioBack; // audio인데, 어떤 audio냐면 Back
let audioWind; // audio인데, 어떤 audio냐면 Wind
```

이렇게 앞에 적어두면 나중에 audio까지만 쳐도 관련된 것들의 hint를 editor를 통해 볼 수 있음.

*변수명, 함수명 잘 짓기에 대해서는 [여기]() 참고* 


# [ Function ] Javascript Deep Dive
- 12장. 함수
- 18장. 함수와 일급 객체
- 26장. 화살표 함수

## 함수란, 
일련의 과정을 문(statement)으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것. 
특정한 일을 수행하는 코드의 집합

## 함수를 사용하는 이유
- 유지 보수성
- 재사용 가능
- 높은 가독성
이에 대한 자세한 내용은 *[여기]() 참고* 

## 함수 리터럴
리터럴이란, 사람이 이해할 수 있느 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기법을 말한다. 
즉, 함수 리터럴도 값을 생성하며 이렇게 생성된 함수(=값)은 객체다. 
함수가 객체라는 사실은 '함수와 일급 객체' 부분을 이해해야한다. 

## 함수와 메모리

```JS
function add(a, b){
  return a + b
} // add라는 변수에 해당 함수 정의가 들어있는 메모리 주소가 들어있다.
const sum = add; // 이렇게되면 sum이라는 변수에도 해당 함수 정의가 들어있는 메모리 주소가 들어있다.

console.log(add(1, 2)) // 3
console.log(sum(1, 2)) // 3
```
## 함수의 표현식과 선언문의 차이

### 함수 선언문

```
function [함수명]() {}
```
### 함수 표현식

값으로 표현될 수 있는 것.  
이렇게 변수에 함수를 값으로 할당가능한 이유는 함수도 object이기 때문.  
이에 대한 사항은 variable README를 참고할 수 있다.

```
const [함수명] = function() {}
```

```JS
let add = function (a, b) {
  return a+b;
}
console.log(add(1, 2))

```

### 함수 생성 시점과 함수 호이스팅
```JS
// 함수 참조
console.dir(add); // f add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)) // 7
console.log(sub(2, 5)) // TypeError: sub is not a function

// 함수 선언문 -> 런타임 이전에 JS엔진에 의해서 함수 객체가 먼저 생성된다. 
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x - y;
}

```

함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성된다.    그리고 JS엔진은 함수 이름과 동일한 이름의 식별자를 함묵적으로 생성하고 생성된 함수 객체를 할당한다.    

즉, 런타임에는 이미 함수 객체가 생성되어 있고 함수 이름과 동리한 식별자에 할당까지 완료된 상태이다. 따라서 함수 선언문 이전에 함수를 참조할 수 있으며 호출할 수도 있다. 이처럼 함수 선언문이 콛의 선두로 끌어 올려진 것처럼 동작하는 JS 고유의 특징을 **함수 호이스팅**이라고 한다.   

반면 함수 표현식의 경우
var 키워드를 사용한 변수 선언문 이전에 변수 호이스팅에 의해 undefined로 평가되고, 변수 할당문은 런타임에 평가되므로 함수 표현식의 함수 리터럴도 이 때 평가되어 함수 객체가 된다. 
그래서 할당문 전에 함수 참조시 undefined, 함수 호출시 TypeError가 뜨는 것이다.   
정리하면 **함수 표현식으로 함수를 정의하면 함수 호이스팅이 발생하는 것이 아니라 변수 호이스팅이 발생한다.**

### 화살표 함수

위 함수 표현식을 좀 더 간단하게 사용할 수 있는 화살표 함수.

```
const [함수명] = () => {}
```

```JS
let add = (a, b) => {
  return a+b;
}
console.log(add(1, 2))


// 그리고 화살표 함수 {} 내에서 어떤 복잡한 로직이 아니라 return만 하는 함수라면, return, {} 괄호 생략 가능

let add = (a, b) => a+b;

console.log(add(1, 2))
```

**function 키워드를 사용한 함수 표현식과 화살표 함수의 차이점은 뒤에서 계속..!!**
**생성자 함수 (`const object = new Function()`)도 뒤에서 다룸!**

## 리턴

```JS
function add(a, b){}

const result = add(1, 2)
console.log(result) // undefined. 즉, return이 명시되어있지 않으면 JS에서 알아서 undefined가 반환됨.
```

또한 return에 관련되어서 기억할 것은,  
return을 함수 중간에 하게 되면 함수가 종료되므로  
이는 조건이 맞지 않는 경우 함수가 무거운 연산을 수행하기 이전에 도입부분에서 함수를 일찍이 종료하게 짜는 것이 효율적임 (early return)

## Parameters

매개변수의 기본값은 무조건 undefined

```JS
function add(a, b){
  console.log(a);
  console.log(b);
  return a+b;
}

add()
// undefined
// undefined
// 즉, 에러가 발생하는게 아니라 a, b가 undefined로 들어감.
add(1, 2, 3)
// 이러면 추가되는 값(여기선 3)이 무시되고 실행됨.
```

그런데 기본값을 지정해주고 싶다면

```JS
function add(a=1, b=2){
  console.log(a);
  console.log(b);
  return a+b;
}

add()
// 1
// 2
```

```JS
function add(a, b){
  console.log(a);
  console.log(b);
  console.log(arguments);

  return a+b;
}
add(1, 2, 3)
// undefined
// undefined
// [Arguments] {'0':1, "1":2, "2":3} // 이렇게 arguments를 출력하면
```
### Rest 매개변수 Rest Parameters
매개변수가 얼마나 들어올지 모를때, 전부 배열로 받고 싶을 때 사용

```JS
function sum(...numbers) {
  console.log(numbers)
}
sum(1, 2, 3, 4)
// [1, 2, 3, 4]


function sum(a, b, ...numbers) {
  console.log(a)
  console.log(b)
  console.log(numbers)
}
sum(1, 2, 3, 4)
// 1
// 2
// [3, 4]
```
## 불변성 Immutability. 참조에 의한 전달과 외부 상태의 변경
코딩할 때 중요한 불변성.

원시 값은 값에 의한 전달, 객체는 참조에 의한 전달 방식으로 동작한다.   
매개변수도 함수 몸체 내부에서 변수와 동일하게 취급되므로 매개변수 또한 타입에 따라 값에 의한 전달, 참조에 의한 전달 방식을 그대로 따른다.    



```JS
function displayObj(obj){
  obj.name = 'Bob';
  console.log(obj);
}
const myObj = {name: 'Grace'};
displayObj(myObj) // {name: 'Bob'};
console.log(myObj) // {name: 'Bob'};
```
이렇게 함수 내부에서 외부로부터 주어진 인자의 값을 변경하는 것은 좋지 않다.
이게 object인 경우 참조에 의한 복사이기 때문에 정말 심각.

객체가 변경할 수 있는 값이며, 참조에 의한 전달 방식으로 동작하기 때문에 부작용이 발생한다. 이러한 문제의 해결 방법 중 하나는 객체를 불변 객체로 ㅁ나들어 사용하는 것이다. 객체의 복사본을 새롭게 생성하는 비용은 들지만 객체를 마치 원시 값처럼 변경 불가능한 값으로 동작하게 만드는 것이다. 

그래서, 상태 변경이 필요한 경우에는, 새로운 상태(오브젝트, 값)을 만들어서 반환해야 한다.   
그리고 진짜 이름 변경이 목적인 함수가 있고, 그 결과를 받고 싶다면,   

- 함수명을 그 역할에 맞게 변경하고 displayObj -> changeObjName
- 인자로 들어온 obj를 직접 수정하고 반환하는 것이 아닌 새로운 obj를 만들어서 반환 -> {...obj, } or deep copy를 통해 새로운 객체를 생성하고 재할다응ㄹ 통해 교체. 

```JS
function changeObjName(obj){
  return {...obj, name:'Bob'}
}
const myObj = {name: 'Grace'};
result = changeObjName(myObj)
console.log(result) // {name: 'Bob'};
console.log(myObj) // {name: 'Grace'};
```

외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는 함수를 **순수 함수**라고 하고, 
순수 함수를 통해 부수 효과를 초대한 억제하여 오류를 피하고 프로그램의 안정성을 높이려는 프로그래밍 패러다임을 **함수형 프로그래밍**이라 한다. 

## 콜백함수

함수의 꽃 프로그래밍의 꽃 ㅎㅎ
콜백 함수는 함수형 프로그래밍 패턴 뿐만 아니라 비동기 처리(이벤트 처리, Ajax 통신, 타이머 함수 등)에 활용되는 중요한 패턴이다.   

### 일급 객체 first-class object

일반 객체처럼 모든 연산이 가능한 것

- 함수의 매개변수로 전달
- 함수의 반환값
- 할당 명령문
- 동일 비교대상

이 가능함.  
그리고

- 함수

도 일급 객체가 가능. 이를 **일급 함수(first-class function)** 이라고 하기도 함. **

### 고차 함수 Higher-order function

- 인자로 함수(이를 콜백함수라고 하죠)를 받거나
- 함수를 반환하는 함수

를 고차함수라고 한다.

```JS
const add = (a, b) -> a + b;
const multiply = (a, b) -> a * b;

function calculator(a, b, action) {
  let result = action(a, b); // 이렇게 외부로부터 함수를 가리키고 있는 reference(참조값)가 주어져서, 이 함수를 내부에서 나중에 호출하는데, 이를(여기선 action이라는 함수) 콜백함수라고 한다.
  // 그리고 이 콜백함수는 고차함수(여기선 calculator이라는 함수) 안에서 필요한 순간에 호출이 나중에 된다.
  console.log(result);
  return result;
}

calculator(1, 2, add) // 3

calculator(1, 2, multiply) // 2
```

주어진 숫자만큼 0부터 순회하는 함수를 만들건데,  
순회하면서 주어진 특정한 일을 수행해야 한다.  
ex.최대값 5가 주어지고, 이를 순회하면서 숫자를 다 출력하고 싶음

```JS
function iterator(max, action){
  result = 0
  for (let i=0; i < max; i++){
    result += i
    action(i)
  }
  return result
}

function printNum(num){
  console.log(num)
}

iterator(5, printNum)
// or iterator(5, (num) => console.log(num))
```

또 다른 예: setTimeout이라는 고차함수

```JS
setTimeout(callbackFunction, 1000)
setTimeout(()=> {
console.log('1초 뒤 이 함수가 실행될 거에요')
}, 3000)
```

고차 함수는 매개변수를 통해 전달받은 콜백 함수의 호출 시점을 결정해서 호출한다. 

# [ Object ] Javascript Deep Dive 
- 10장. 객체 리터럴
- 11장. 원시 값과 객체의 비교
- 17장. 생성자 함수에 의한 객체 생성

## 객체란?
객체에 대해서 알아보기 전에 이전에 [원시 값과 객체의 비교]() 부분을 다시 숙지하고 올 필요가 있다. 

객체(object)는 0개 이상의 **속성(데이터, property)**로 구성된 집합이며, 프로퍼티는 key와 value로 구성된다. 

```
{key: value}
```

```JS
let apple = {
  name: 'apple', // 이렇게 써도 되고, // 프로퍼티
  // name은 프로퍼티 key, 'apple'은 프로퍼티 value
  'hello': '🍎', // 이렇게 프로퍼티 key를 '' 로 감싸도 된다.  // 프로퍼티
}

```
## 객체 안의 함수 ⭐️

객체는 서로 연관있는 **속성(객체의 상태를 나타내는 값 data, property)** 과 **행동(property를 참조하고 조작할 수 있는 동작, method)**을 묶어주기 위해 사용.
즉, 포인트는 **밀접하게 관련있는 상태와 행동을 객체로 묶어나가야 겠구나**
여기서 행동(함수, method) 부분을 알아보자.

JS에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. JS의 함수는 [일급 객체]() 이므로 값으로 취급할 수 있다. 따라서 함수도 프로퍼티 값으로 사용할 수 있고, 프로퍼티 값이 함수인 경우, 일반 함수와 구분하기 위해서 method라고 한다. 

```JS
const apple = {
  name: 'apple', // property
  display: function() { // method
    console.log("어쩌구")
  }
}

apple.display(); // "어쩌구"
```

```JS
const circle = {
  radius: 5, // property
  getDiameter: function() {// method
    return 2 * this.radius;  // method 내부에서 사용한 this 키워드는 객체 자신(circle)을 가리키는 참조 변수아다. 자세한 것은 this 정리 부분 참고. 
  }
}
```

## 객체 생성 
### 객체 리터럴 (object literal)
리터럴이란, 사람이 이해할 수 있느 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기법을 말한다. 
그래서 객체 리터럴이란 객체를 생성하기 위한 표기법이다. 

객체 리터럴은 중괄호({...}) 내에 0개 이상의 프로퍼티를 정의하는 것이고, 변수에 할당되는 시점에 JS엔진은 객체 리터럴을 해석해 생성한다. 

### 생성자 함수
생성자 함수(constructor)란, new 연산자와 함께 호출하여 객체를 생성하는 함수를 말한다.   

방법 1. Object 생성자 함수
new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성해주고, 이후 property나 method를 추가해서 객체를 완성할 수 있다. 
```JS
// 빈 객체의 생성
const person = new Object()

// property 추가
person.name = 'Lee';

// method 추가
person.sayHello = function () {
  consol.log('Hi My name is' + this.name)
}
```
그리고 Object 외에도 String, Number, Date, Promise... 등의 built-in 생성자 함수들이 제공된다. 

2. new 키워드 생성자 함수
이때의 생성자 함수는
- 인스턴스를 생성하고
- 생성된 인스턴스를 초기화 (인스턴스 프로퍼티 추가 및 초기값 항당)
하는 역할을 한다. 

```JS
const apple = {
  name: 'apple', // 속성
  display: function() { // 행동
    console.log("어쩌구 🍎")
  }
}

apple.display(); // "어쩌구 🍎"

const orange = {
  name: 'apple', // 속성
  display: function() { // 행동
    console.log("어쩌구 🍊")
  }
}

orange.display(); // "어쩌구 🍊"
```

간편하게 생성자 함수로 만들어보면

```JS
function Fruit(name, emoji){ //  생성자 함수는 대문자로 함수명이 시작해야함.
  this.name = name; //this는 만들어지는 객체 자기자신을 가리키기 때문에, 실행하면 객체 내 name이라는 key가 생성되고 value로 인자로 들어온 name값이 할당됨.
  this.emoji = emoji;
  this.display = (emoji) => {
    console.log(`어쩌구 ${this.emoji}`)
  }
  return this; // 하지만 생성자 함수에서는 자동으로 this가 리턴되기 때문에 생략가능
}

const apple = new Fruit('apple', '🍎')
const orange = new Fruit('orange', '🍊')

```
즉, JS의 생성자 함수는 어떤 형식이 정해져 있는 것이 아니라 일반 **함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.** (다시 말해 new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작한다. )

### 객체 리터럴로 객체 생성 vs 생성자 함수로 객체 생성 장/단점 비교

1. 객체 리터럴로 객체 생성의 문제점

프로퍼티 구조가 동일함에도 불구하고 매번 같은 프로퍼티와 메서드를 기술해야 한다. 생성해야하는 객체가 수십개라면... 정말 비효율적이다. 

2. 생성자 함수로 객체 생성의 장점
생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다. 

### 생성자 함수의 인스턴스 생성 과정
1. 인스턴스 생성과 this 바인딩
함수 몸체의 코드가 한 줄씩 실행되는 **런타임 이전에** 생성자 함수로 빈 객체가 생성되고, 이 빈 객체(인스턴스)는 this에 바인딩 된다. 
2. 인스턴스 초기화
생성자 함수에 기술되어있는 코드가 한 줄씩 실행되어 this에 바인딩 되어 있는 인스턴스를 초기화한다. 
3. 인스턴스 반환
생성자 함수 내부에서 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환한다. 
```JS
function Circle(radius) {
  // 1. 런타임 전, 암묵적으로 빈 객체가 생성되고 this에 바인딩된다. 

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다. 
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  }

  // 3. 암묵적으로 this를 반환한다. 
  // 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다. 
  return 100;
}

// 인스턴스 생성. Circle 생성자 함수는 명시적으로 반환한 객체를 반환한다. 
const circle = new Circle(1);
console.log(circle) // Circle {radius: 1, getDiameter: f}
```

## 객체 동적으로 접근하기

```JS
let obj = {
  name: 'grace',
  age: 28.
}

// 코딩하는 시점에, 정적으로 접근이 확정되는 경우 아래와 같이 쓸 수 있다.
obj.name
obj.age

// 동적으로 속성에 접근하고 싶을 때는 대괄호 표기법 사용.
function getValue(obj, key){
  //return obj.key // 이렇게는 안되고,
  return obj[key] // 이렇게 해야 한다.
}
console.log(getValue(obj, 'name'))

```

## 객체 축약 표현
### 프로퍼티 축약 표현
키와 value의 변수명이 같다면 생략 가능.
```JS
const x = 1;
const y = 2;
const coordinate = {x, y} // = {x: x, y: y}
console.log(coordinate) // {x: 1, y: 2}

function makeObj(name, age) {
  return {
    name,
    age
  }
}
```
### 메서드 축약 표현
단, ES6의 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다. 
```JS
// ES5
const circle = {
  radius: 5, // property
  getDiameter: function() {// method
    return 2 * this.radius; 
  }
}

circle.getDiameter()
```
```JS
// ES6
const circle = {
  radius: 5, // property
  getDiameter() {// method
    return 2 * this.radius; 
  }
}

circle.getDiameter()
```
#### 어떻게 다르게 동작한다는 거지? (26.2 메서드)