# scope

- 변수를 참조할 수 있는(= 접근할 수 있는) 유효한 범위
- 식별자(변수, 함수, 클래스 이름..)가 유효한 범위
  그리고 scope는 식별자가 선언된 위치에 따라 코드 블럭({}) 에 의해 결정된다.

- 블럭 안의 변수는 블럭 안에서만 유효

## scope의 필요성

- 식별자간 이름 충돌 방지
- 메모리 절약: 블럭안의 변수는 블럭이 끝나는 순간 memory에서 지워짐.

```JS
{
  const a = 'a';
  console.log(a); // a
}
console.log(a); // ReferenceError: a is not defined

```

## scope 블럭 참조 범위

```JS
{
  const x = 1;
  {
    const y = 2;
    console.log(x); // 1 내부 {}에서는 상위 scope까지 접근 가능.
  }
  console.log(x); // 1
  console.log(y); // ReferenceError: y is not defined
}

```

## 전역 scope, 지역 scope

```JS
const text = 'global' // 전역 변수(글로벌 변수), 전역 scope (글로벌 스코프)
{
  const text = 'inside block1'; // 지역 변수, 지역 scope(로컬 스코프)
}

```

## Garbage Collection

MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management

메모리를 청소해줘야 하는데,
어떤 프로그래밍 언어를 사용하느냐에 따라

- 얼마나 자주
- 어떻게

메모리를 청소하는지가 달라짐.
ex.

- C: 개발자는 직접 메모리를 관리해야함.(얼마만큼의 메모리 크기를 원하는지, 메모리 할당, 데이터를 넣고, 이를 다 썼다면 하나하나 일일히 지워줘야함. )
- C#, Go, Java, JS, TS : 등은 개발자가 직접 메모리 관리를 해주지 않아도 Garbage collector가 알아서 해줌.

JS의 GC는 javascript engine에서 제공해주는 것이고, 백그라운에서 동작한다.  
백그라운드라고 해서 우리가 아에 신경쓰지 않기보단, GC도 동작하는데 CPU 즉 비용이 사용된다.  
따라서 무분별하게 선언하고 불필요한 메모리를 할당하거나 재할당 하는 것을 지양하는 것이 좋다.

```JS
let apple = {
  name: 'apple,
}
let orange = apple;
```

이 상태에서는 object가 heap에 만들어지고, apple과 orange는 이 object의 heap 주소를 참조하고 있다.  
그 다음에

```JS
orange = null;
apple = null;
```

이렇게 하면 apple이나 orange나 object를 참조하고 있는 변수가 없다.

이럴때 주기적으로 GC가 object참조하고 있는 게 있는지 아닌지 확인 후
아무도 쓰고있지 않다면, memory에서 제거함.

## 실행 컨텍스트 (Execution Context)

함수 호출시, 함수의 순서를 기억하는 것은 call stack.
그런데,

- 어떻게 돌아 올 때 반환도니 값을 기억하는 거지?
- scope에서 어떻게 내부 scope에서 외부 scope의 변수를 참조 할 수 있는 거지?

바로 실행 컨텍스트 (Execution Context)가 코드의 실행 순서와 스코프를 기억하고 있기 때문이다.
그림 11)

어떻게 기억?
-> 각각의 블록은 렉시컬 환경(Lexical Environment)라는 내부 오브젝트를 가지고 있다.
이 렉시컬 환경 오브젝트

- 블럭안에 선언된 변수와
- 각각의 정보
- 근접한 상위 블럭은 뭐뭐인지에 대한 정보

가 있는 오브젝트가 있다.

## 렉시컬 환경(Lexical Environment)

렉시컬 환경 object 내부에는
그림 12)

- 환경 레코드 (Environment Record): 현재 block에 대한 정보를 담고 있음.
- 외부 환경 참조 (Outer Lexical Environment Reference): 부모는 누군지, 부모를 참조하고 있는 외부 환경 참고

가 있다.

## 스코프 체인 (Scope Chain)

그림 13)

## 호이스팅 Hoisting (끌어올리다는 뜻)

Javascript 엔진 (번역기, interpreter)이 코드를 실행하기 전, 변수, 함수, 클래스의 선언문을 끌어올리는 것을 말함.  
변수의 선언과 초기화를 분리한 후, **선언한 코드의 최상단**으로 옮김.

### 변수 선언 키워드 let, const

변수 선언 키워드 let(재할당이 꼭 필요한 경우만 사용), const도 호이스팅과 함께 잘 살펴봐야함.

원래는 var만 있었는데,
var에 어떤 문제가 있었길래 let, const를 사용해야 하는지!

#### Var의 특징

- 일반 코딩 방식과 어긋나서 개발하면서도 멘붕이 옴
- 코드의 가독성과 유지보수성에 좋지 않음

1. 변수 선언하는 키워드 없이 선언 & 할당이 가능함.

```JS
something = 'sth';
console.log(something); // sth
```

2. 중복 선언이 가능함

```JS
var something = 'sth';
var something = 'sth2';
console.log(something); // sth2

// let을 사용하면
let num = 0
let num = 1; // Cannot redeclare block-scoped variable 'num'
```

3. 블록 레벨의 scope가 지원되지 않음.

```JS
var apple = '사과';
{
  var apple = '사과2';
}
console.log(apple) // 사과2
```

4. 함수 레벨 scope만 지원 됨.

```JS
function example() {
  var dog = 'dog';
}
console.log(dog); //ReferenceError: dog is not defined
```

### 함수 호이스팅

```JS
print();

function print() {
  console.log('Hello');
}
```

이렇게 함수가 선언되기 전에 호출해도 된다.
왜? JS엔진이 코드 실행 전 함수의 선언을 제일 위로 호이스팅 해주기 때문.  
정리하면

- 함수의 호이스팅은 함수의 선언문 전에 호출이 가능하게 해줌
- 그래서 함수의 선언문은 선언 이전에도 호출이 가능함.

그런데 이경우는 어떨까

### 변수(let, const)와 클래스의 호이스팅

```JS
console.log(hi) // ReferenceError: Canno access 'hi' before initialization

let hi = 'hi';
```

에러를 보면, hi가 정의되어 있지가 않다가 아니라.
초기화 전에는 사용할 수 없다는 에러이다. (즉, hi가 선언되어있긴 한데, 초기화가 안되있다는 거임.)

변수(let, const)와 클래스는 선언만 호이스팅이 되고, 초기화는 안됨.
JS에서는 초기화 된 변수에 접근하면 컴파일(빌드) 에러가 발생.

⭐️

```JS
let x = 1;
{
  console.log(x); // // ReferenceError: Canno access 'x' before initialization
  let x = 2;
}
```

왜? 1로 출력되지 않을까?  
아니다. 왜냐하면 let x = 2;에서 x가 선언된 것만 console.log(x); 위로 호이스팅 된다.  
그리고 나서 아직 2로는 초기화 되지 않은 상태.

그래서 초기화 전에는 사용할 수 없다는 에러가 발생 한 것이다. (즉,x 가 선언되어있긴 한데, 초기화가 안되있다는 거임.)

## Strict Mode

React와 같은 프레임워크 사용시 기본적으로 엄격 모드인데,
순수 JS만 사용시, 맨 상단에 'use strict'라고 적어주면 strict mode가 된다.

이게 뭔데? MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode  
Strict Mode에서 할 수 없는 것들

1.

```JS
var x = 1;
delete x
```

2.

```JS
function add(x){
  var a = 2;
  b = a + x;
}
add(1)
```

3.

```JS
function add(x){
  console.log(this); // undefined
}
```
