# function

특정한 일을 수행하는 코드의 집합

- 유지 보수성
- 재사용 가능
- 높은 가독성

## 함수와 메모리

```JS
function add(a, b){
  return a + b
} // add라는 변수에 해당 함수 정의가 들어있는 메모리 주소가 들어있다.
const sum = add; // 이렇게되면 sum이라는 변수에도 해당 함수 정의가 들어있는 메모리 주소가 들어있다.

console.log(add(1, 2)) // 3
console.log(sum(1, 2)) // 3
```

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

**Rest 매개변수 Rest Parameters**
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

## 콜백함수

함수의 꽃 프로그래밍의 꽃 ㅎㅎ

### 일급 객체 first-class object

일반 객체처럼 모든 연산이 가능한 것

- 함수의 매개변수로 전달
- 함수의 반환값
- 할당 명령문
- 동일 비교대상

이 가능함.  
그리고

- 함수

도 일급 객체가 가능. 이를 **일급 함수(first-class function) 이라고 하기도 함. **

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

## 불변성 Immutability

코딩할 때 중요한 불변성.

**Bad**

```JS
function display(num){
  num = 5;
  console.log(num);
}
const value = 4;
display(value);
console.log(value);
```

이렇게 함수 내부에서 외부로부터 주어진 인자의 값을 변경하는 것은 좋지 않다.
이게 object인 경우 참조에 의한 복사이기 때문에 정말 심각.

그래서, 상태 ㅂ녁여이 필요한 경우에는, 새로운 상태(오브젝트, 값)을 만들어서 반환해야 한다.

```JS
function displayObj(obj){
  obj.name = 'Bob';
  console.log(obj);
}
const myObj = {name: 'Grace'};
displayObj(myObj) // {name: 'Bob'};
console.log(myObj) // {name: 'Bob'};
```

그리고 진짜 이름 변경이 목적인 함수가 있고, 그 결과를 받고 싶다면,

- 함수명을 그 역할에 맞게 변경하고 displayObj -> changeObjName
- 인자로 들어온 obj를 직접 수정하고 반환하는 것이 아닌 새로운 obj를 만들어서 반환 -> {...obj, }

```JS
function changeObjName(obj){
  return {...obj, name:'Bob'}
}
const myObj = {name: 'Grace'};
result = changeObjName(myObj)
console.log(result) // {name: 'Bob'};
console.log(myObj) // {name: 'Grace'};
```
