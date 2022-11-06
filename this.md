# This

## This란
this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)이다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.   

## This 바인딩

- Java, C#, C++ 등 대부분의 객체지향 프로그래밍 언어에서의 this binding은 코드상에서 정적으로 결정됨. this는 항상 자신의 instance 자체를 가리킴!  
  그래서 정적으로 instance가 만들어지는 시점에 이를 가리키도록 this가 결정되면, this는 정적으로 계~속 이걸 가리킴. 변경 불가.
- **JS, TS에서의 this binding은 런타임 상에서 누가 호출하느냐에 따라서 동적으로 this가 뭘 가리키는지 결정됨.** 즉, this caller에 의해 동적으로 결정됨. -> 이 때문에 예상하지 못하고 구현시 예상치 못한 버그가 발생하는 경우도 있다.

### global context에서의 this

- 브라우저 환경에서

```JS
// 브라우저에서 this를 쳐보면 window 객체가 나옴.
// globalThis도 window 객체가 나옴
```

- node 환경에서
  - global context에서의 this란 module을 가리킴.

```JS
const x = 0;
module.exports.x = x;
console.log(this); // {x:0}
console.log(globalThis); // node에서 전역으로 사용할 수 있는 전역 객체가 출력됨.

globalThis.setTimeout() //globalThis는 생략이 가능하기 때문에 그냥 setTimeOut()으로 사용하곤 함.
```

### 생성자 함수나 class 내부에서의 this

- 앞으로 만들어질 instance 객체 자체를 가리킴.

### 일반 함수 내부에서의 this

- 브라우저 환경에서

```JS
function func() {
  console.log(this); // window가 나옴.
}
func();
```

- node 환경에서

```JS
function func() {
  console.log(this); // global this가 나옴.
}
func();

```

단 strict mode에서는 함수 내부 scope에 this라는 정보가 없기 때문에 undefined.

일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다.   *이에 대한 내용은 < Javascript Deep Dive > 349p 참고*

### 동적 binding

```JS
// 생성자 함수
function Cat(name) {
  this.name = name;
  this.printName = function () {
    console.log(`고양이의 이름을 출력: ${this.name}`)
  }
}

function Dog(name) {
  this.name = name;
  this.printName = function () {
    console.log(`강아지의 이름을 출력: ${this.name}`)
  }
}

const cat = new Cat('나비'); // 이게 실행되는 순간 this object {} 에서
// name 키의 value는 '나비'이고,
// printName 키의 value는 저 함수를 가리키는 참조값이 된다.
const dog = new Dog('미남');
// 이게 실행되는 순간 this object {} 에서
// name 키의 value는 '미남'이고,
// printName 키의 value는 저 함수를 가리키는 참조값이 된다.
cat.printName();
dog.printName();

```

```JS
// 아래처럼 dog instance의 printName에 cat의 printName을 할당해주면
dog.printName = cat.printName;
dog.printName(); // 고양이의 이름을 출력: 미남. 이 나옴. 하지만 this.name이 cat instance의 name을 가리키는게 아니라 dog 의 name을 가리킴.
// caller가 dog이기 때문에 동적으로 this가 dog로 변경되면서! dog의 this.name이 나온 것임.
```

```JS
function printOnMonitor(printName) {
  console.log('모니터를 준비하고! 전달된 콜백을 실행!');
  printName();
}

printOnMonitor(cat.printName); // 이렇게 printOnMonitor라는 함수에 cat.printName에 있는 함수 참조값을 전달하면
// printOnMonitor에서 이 콜백함수 printName()를 실행하는데
// 실행 결과는
// 모니터를 준비하고! 전달된 콜백을 실행!
// 고양이의 이름을 출력: undefined

// 가 출력됨.

// 왜 undefined??? printOnMonitor에 있는 printName()에는 caller가 없기 때문에 undefined로 나옴.
```

## 정적 binding

위 **동적 binding**에서 살펴보았듯이
JS, TS에서의 this binding은 런타임 상에서 누가 호출하느냐에 따라서 동적으로 this가 뭘 가리키는지 결정됨. 즉, this caller에 의해 동적으로 결정됨. -> 이 때문에 예상하지 못하고 구현시 예상치 못한 버그가 발생하는 경우도 있다.

이를 방지하는 방법은?!
정적으로 바인딩 시키기!

### 방법 1. bind 함수를 이용해서 수동적으로 바인딩 해주기

```JS
// 생성자 함수
function Cat(name) {
  this.name = name;
  this.printName = function () {
    console.log(`고양이의 이름을 출력: ${this.name}`)
  }
  // HERE!
  this.printName = this.printName.bind(this);
}

```

### 방법2. 화살표 함수 사용

화살표 함수는 화살표함수를 만드는 그 순간, 렉시컬 환경에서의 this를 기억해서 그 정보를 가짐.
이때의 this는 화살표 함수 밖에서 제일 근접한 scope의 this를 가리킴.

```JS
// 생성자 함수
function Cat(name) {
  this.name = name;
  // HERE!
  this.printName = () => {
    console.log(`고양이의 이름을 출력: ${this.name}`)
  }
}

```

## 화살표 함수

자바스크립트의 함수는 만능 슈퍼맨!

- 함수처럼 사용하기도 하고
- 함수를 사용해서 객체를 찍어내는 tempalate와 prototype 특징을 이용하기 위해 생성자 함수로도 사용할 수 있다. (class)

하지만 이를 위해서 불필요한 무거운 prototype(많은 데이터를 담고 있는 객체)가 생성됨.

### 화살표 함수의 특징

- 문법이 깔끔함
- 생성자 함수로 사용이 불가능 (즉, 무거운 prototype을 만들지 않음.)
- 함수 자체 arguments 객체도 가지고 있지 않음.
- this에 대한 binding이 정적으로 결정됨. 어떻게? 함수에서 제일 근접한 상위 scope의 this에 정적으로 바인딩 됨. 그래서 화살표 함수가 만들어 질 때 그 순간 이를 감싸는 scope의 this로 정적으로 영원히 바인딩 된다.
