# Scope

## scope란

- 모든 식별자(변수명, 함수명, 클래스 명.. 등)은 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효한 범위
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
JS엔진은 코드를 실행할 때 *코드가 어디서 실행되며 주변에 어떤 코드가 있는지* 코드의 문맥(context)를 고려한다. 
코드가 어디서 실행되며 주변에 어떤 코드가 있는지를 **렉시컬 환경(lexical environment)**이라고 하며 이를 구현한 것이 **실행 컨텍스트(execution context)**이다. 코든 코드는 실행 컨텍스트에서 평가되고 실행된다.    

렉시컬 환경에 대해서는 *[여기]()*, 실행 컨텍스트에 대해서는 *[여기]()*를 참고!   


JS엔진은 스코프를 통해 어떤 변수를 참조해야 할 것인지 결정한다. 따라서 스코프란 JS엔진이 식별자를 검색할 때 사용하는 규식이라고 할 수 있다. 

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

## 스코프의 종류 
### 전역 scope, 지역 scope

```JS
const text = 'global' // 전역 변수(글로벌 변수), 전역 scope (글로벌 스코프)
{
  const text = 'inside block1'; // 지역 변수, 지역 scope(로컬 스코프)
}

```
함수는 중첩될 수 있으므로 함수의 scope도 중첩될 수 있다.   이는 scope가 함수의 중첩에 의해 계층적 구조를 갖는다는 것을 의미한다. 그리고 이렇게 scope가 계층적으로 연결된 것을 scope chain이라고 한다.   

**변수를 참조할 때 JS엔진은 스코프 체인을 통해 별수르 ㄹㅊ마조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색한다.**

### 블록 레벨 스코프, 함수 레벨 스코프
지역늠 함수 몸체 내부를 말하고 지역은 지역 스코프를 만든다고 했다. 이는 코드 블록이 아닌 함수에 의해서만 지역 스코프가 생성된다는 것을 의미한다.    
C, Java를 비롯한 대부분의 프로그래밍 언어는 함수 몸체만이 아니라 모든 코드 블록(if, for, while, try/catch... 등)이 지역 스코프를 만든다. 이러한 특성을 **블록 레벨 스코프**라 한다. 하지만 var 키워드로 선언된 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다. 이러한 특성을 **함수 레벨 스코프**라고 한다. 

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
  name: 'apple',
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

## 렉시컬 스코프
```JS
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo():
bar();

// 실행 결과
// 1
// 1

```

위 예제의 실행 결과는 bar 함수의 상위 스코프가 
1. 함수를 어디서 호출했는지에 따라 상위 스코프가 결정한다. (동적 스코프 dynamic scope)
2. 함수를 어디서 정의했는지에 따라 함수의 상위 스코프를 결정한다. (정적 스코프 static scope)
에 따라 달라진다. 

JS는 렉시컬 스코프를 따르므로 함수를 어디서 정의했는지에 따라 상위 스코프를 결정한다. 즉, 정적 스코프를 따른다. 
그래서 bar 함수 객체느 ㄴ자신이 정의된 스코프, 즉 전역 스코프를 기억한다. 그리고 bar 함수가 호출되면 호출된 곳이 어디인지에 관계없이 언제나 자신이 기억하고 있는 전역 스코프를 상위 스코프로 사용한다. 따라서 위 예제를 실행하면 전역 변수 x값 1을 두 번 출력한다. 

## 스코프 체인 (Scope Chain)

그림 13)

## 호이스팅 Hoisting (끌어올리다는 뜻)

Javascript 엔진 (번역기, interpreter)이 코드를 실행하기 전, 변수, 함수, 클래스의 선언문을 끌어올리는 것을 말함.  
변수의 선언과 초기화를 분리한 후, **선언한 코드의 최상단**으로 옮김.

### 변수 선언 키워드 var, let, const

변수 선언 키워드 let(재할당이 꼭 필요한 경우만 사용), const도 호이스팅과 함께 잘 살펴봐야함.

원래는 var만 있었는데,
var에 어떤 문제가 있었길래 let, const를 사용해야 하는지!

### Var의 특징. var 키워드로 선언한 변수의 문제점. 

- 일반 코딩 방식과 어긋나서 개발하면서도 멘붕이 옴
- 코드의 가독성과 유지보수성에 좋지 않음

1. 변수 선언하는 키워드 없이 선언 & 할당이 가능함.

```JS
something = 'sth';
console.log(something); // sth
```

2. 중복 선언이 가능함
var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언이 허용된다.   
하지만 let, const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.   

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
블록 레벨의 scope가 지원되지 않고, 함수 레벨 scope만 지원 된다는 말은, 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다는 말이 된다. 
전역 변수를 사용하는 것의 문제점은 [전역 변수의 문제점]() 에서 정리하여두었다. 

5. 변수 호이스팅
var 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문 이전에 참조할 수 있다. 
그리고 할당문 이전에 변수를 참조하면, 언제나 undefined를 반환한다. 

**어떻게?** var 키워드로 선언한 변수는 런타임 이전에 JS엔진에 의해 **선언 단계와 초기화 단계가 한번에 진행된다.**
즉, 선언단계에서 스코프에 변수 식별자를 등록해 JS엔진에 변수의 존재를 알리고, 초기화 단계에서 undefined로 초기화 하는 것이 한번에 같이 진행되는 것이다. 

에러를 발생시키지 않는다는 점에서 가독성을 떨어뜨리고 버그를 발생시킬 여지를 만든다. 
```JS
console.log(foo); // undefined

foo = 123;

console.log(foo); //123

var foo; // 변수 선언문은 런타임 이전에 JS엔진에 의해 암묵적으로 실행된다. 
```

반면 let키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것'처럼'
(호이스팅이 발생하긴 한다!!!! 단지 변수 선언문 전에 참조하면 undefined가 아니라 ReferenceError 즉 에러!!를 발생시킨다는 점이 다른 것이다!!) 변수를 변수 선언문 이전에 참조하면 ReferenceError가 발생한다. 
**어떻게?** let 키워드로 선언한 변수는 런타임 이전에 JS엔진에 의해 **선언 단계와 초기화 단계가 분리되어 진행된다.**
즉, **런타임 이전에 JS엔진에 의해 선언 단계가 먼저 실행되지만, 초기화 단계는 변수 선언문에 도달했을 때 실행된다.**

앞서서 말했던 것 처럼 선언 단계부터 초기화 단계 시작 시점인 변수 선언문에 도달까지 변수를 참조할 수 없고, 참조하면 ReferenceError가 발생하는 구간을 **일시적 사각지대(Temporal Dead Zone; TDZ)**라고 한다. 


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

JS 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 JS엔진의 최적화 작업에 문제를 일으킬 수 잇는 코드에 대해 병시적인 에러를 발생시킴. 

ES5부터 strict mode가 추가됨. 
React와 같은 프레임워크 사용시 기본적으로 엄격 모드인데,
순수 JS만 사용시, 맨 상단에 'use strict'라고 적어주면 strict mode가 된다.

*근데 린트 도구는 strict mode가 제한하는 오류물론 코딩 컨벤션까지 강제할 수 있기 때문에 strict mode보다는 린트 도구 사용을 권장. *


MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode  

Strict Mode에서 할 수 없는 것들

1. delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생. 

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

3. 일반함수의 this
strict mode에서 함수를 일반 ㅎ마수로서 호출하면 this에 undefined가 바인딩된다.   
생성자 함수가 아닌 일반 ㅎ마수 내부에서는 this를 사용할 필요가 없기 때문이다. 

```JS
function add(x){
  console.log(this); // undefined
}

```
4. 암묵적 전역 방지 
선언하지 않는 변수를 참조시 ReferenceError 발생
```JS
(function() {
  'use strict';

  x = 1;
  console.log(x);
}()); // ReferenceError: x is not defined
```

