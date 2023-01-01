# Object


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




