# Object

객체는 서로 연관있는 **속성(데이터, property)** 과 **행동(함수, method)** 을 묶어주기 위해 사용.
즉, 포인트는 **밀접하게 관련있는 상태와 행동을 객체로 묶어나가야 겠구나**

### 속성(데이터, property)의 예시

```JS
let apple = {
  name: 'apple',
  color: 'red',
  display: '🍎'
}
```

### 행동(함수, method)의 예시

```JS
let apple = {
  name: 'apple', // 속성
  display: function() { // 행동
    console.log("어쩌구")
  }
}
```

앞서 variable 공부했던 것을 보면,

## Data Type

JavaScript type is dynamic, weakly typed programming language

### primitive type(원시, 단일 데이터 타입)

- number

  - MDN BigInt(2^53-1): https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/BigInt

  - MDN Number: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number

- string
- boolean
- null : 텅텅 비어있는 것을 말함
- undefined
- Symbol

**원시 타입은 어디에 변수가 선언되어 있느냐에 따라 Memory(local variable)의 Data(global variable)나 Stack memory에 값이 위치해있다.**

### Object(복합 데이터- 원시, 단일 데이터 타입이 아닌 모든 타입)

- object

  - array
  - function
  - ...

  object는 야러 데이터의 상태, 행동을 함께 묶어서 보관할 수 있는 데이터 타입을 복합 데이터, 객체. 라고 한다.`{key: value}` 로 표현 가능.

## 객체 생성

### 객체 리터럴(object literal)

```
{key: value}
```

```JS
let apple = {
  name: 'apple', // 이렇게 써도 되고,
  // key를 '' 로 감싸도 된다.
  'hello': '🍎',
}

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

## 객체 축약 버전

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

## 객체 안의 함수 ⭐️

객체는 서로 연관있는 **속성(데이터, property)** 과 **행동(함수, method)**을 묶어주기 위해 사용.
즉, 포인트는 **밀접하게 관련있는 상태와 행동을 객체로 묶어나가야 겠구나**
여기서 행동(함수, method) 부분을 알아보자.

### 행동(함수, method)의 예시

```JS
const apple = {
  name: 'apple', // 속성
  display: function() { // 행동
    console.log("어쩌구")
  }
}

apple.display(); // "어쩌구"
```

## 생성자 함수

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
