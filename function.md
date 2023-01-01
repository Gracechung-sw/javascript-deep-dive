# Function

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