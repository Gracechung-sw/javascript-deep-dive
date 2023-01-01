# Variable

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


## 전역 변수의 문제점
이 책에서는 정말 단호하게 말한다. 
**전역 변수를 반드시 사용해야 할 이유를 찾지 못했다면 지역 변수를 사용해야 한다.**

### 변수의 생명주기
[scope - 호이스팅 Hoisting (끌어올리다는 뜻)]() 에서 알아보았듯이 변수 선언은 선언문이 어디에 있든 상관없이 가장 먼저 실행된다. 다시 말해 변수 선언은 코드가 한 줄씩 순차적으로 실행되는 시점인 런타임에 실행되는 것이 아니라 런타임 이전 단계에서 JS엔진에 의해 먼저 실행된다. 

그런데 엄밀히 말하면 위 설명은 전역변수에 한정된 것이고, 함수 냉부엣서 선언한 변수는 함수가 호출된 직후에 함수 몸체의 코드가 한 줄
씩 순차적으로 실행되기 전에 JS에 의해 먼저 변수가 선언되고 undefined로 초기화된다. 그 후, 함수 몸체ㄱ를 구성하는 문들이 순차적으로 실행되기 시작하고 변수 할당문이 실행되면 x 변수에 값이 할당된다.    

하지만 또 생각해야 할 것은 [Garbage Collection]() 이다.   
전역 변수는 반환문을 사용할 수 없으므로 마지막 문이 실행되어 더 이상 실행할 문이 ㅇ벗을 때 종료한다. 

### 전역 변수의 문제점
1. 모든 코드가 전역 변수를 참조하고 변경할 수 있는 암묵적 결합. 
2. 긴 생명주기로 상태 변경에 의한 오류가 발생할 확률이 높고, 메모리 리소스도 긴 기간동안 소비한다. 
3. 스코프 체인 상에서 종점에 존재해서 전역 변수가 가장 마지막에 거맥된다. 즉, 전역변수의 검색 속도가 가장 느리다.
4. 네임스페이스 오염. JS의 가장 큰 문제점이 파일이 분리되어 있다 하더라도 하나의 전역 스코프를 공유한다. 따라서 다른 파일 내에서 동일한 이름으로 명명된 전역 변수나 전역 함수가 같은 스코프 내에 존재할 경우, 예상치 못한 결과를 가져올 수도 있다. 


## let, const
const의 특징은 let 키워드와 대부분 동일하기 때문에 let의 중요한 특징은 위에 적어둔 것처럼 [scope의 여기]()를 참고!!!!
그래서 let과 다른 점만 보면, 
1. const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다. 

2. 재할당에 대해 
- let: 재할당 가능
- const: 재할당 불가능
  ||재할당 Reassignable | 변경 Mutable
  |---|---|---|
  let| o | o
  const|x | o

```Javascript
console.clear();
const apple3 = {
  // ex. 0x12324
  name: 'apple',
}; // const 를 쓴다는건 apple3에 다른 메모리 주소를 담을 수(재할당 할 수 없다) 없다는 것이지, 그 메모리 주소에 있는 object의 내용이 바뀌는 것은 const와 아무 상관이 없음.
const orange3 = apple3; // ex. 0x12324
orange3.name = '오랜지';
console.log(apple3); // { name: '오랜지' }
console.log(orange3); // { name: '오랜지' }
```

## Data Type

JavaScript type is dynamic, weakly typed programming language
```JS
/**
 * Data Type
 */
console.log(0 / 123); // 0
console.log(123 / 0); // Infinity
console.log(123 / -0); // -Infinity
console.log(123 / 'text'); // NaN (Not a Number)

let bigInt = 1234565677843523426133451243513461561432525125n; // bitInt는 뒤에 n을 붙이면 bigint type으로 다룰 수 있다.
console.log(bigInt);

console.clear();
// Falshy 인 값
console.log(!!0);
console.log(!!-0);
console.log(!!''); // 빈 문자열
console.log(!!null);
console.log(!!undefined);
console.log(!!NaN);
// Truthy 인 값
console.log(!!1);
console.log(!!-1);
console.log(!!'text'); // 비어있지 않은 문자열
console.log(!!{});
console.log(!!Infinity);
```

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

  **object는 어떤 데이터든 복합적으로 들어있을 수 있기 때문에 크기가 정해져있지 않다. 그래서 메모리 사이즈가 정해져있지 않고, 동적으로 조절가능한 Memory Heap에 여러 cell에 걸쳐서 데이터가 보관된다.**
  참고) 정확한 이해를 위해서는 그림이 좋다. 그림1

### null과 undefined 타입

```Javascript
// null, undefined
let variable;
console.log(variable); // undefined
// memory 상에 variable에 어떤 값도 정의되어 있지 않다는 의미.

// 이거 말고, 내가 명시적으로
// '이 변수에는 값이 없어. 아무것도 담고 있지 않을거야' 라고 해주려면 null을 할당한다.
variable = null;
console.log(variable); // null

let activeItem; // undefined 상태로, 아직 활성화된 아이템이 있는지 없는지 모르는 상태.
activeItem = null; // 활성화된 아이템이 없는 상태

console.log(typeof null); // object. JS자체에서 null을 object로 표현. 메모리상에 null이 할당됨.
console.log(typeof undefined); // undefined. 변수를 정의해 놓고 메모리상에 아무것도 할당되어있지 않을 떼
```

## 값과 참조의 차이

참고) 이것도 그림2

- 원시 타입은 Memory cell 안에 직접 값이 들어가있음. 변수가 그 Memory 자체를 가리킴

```Javascript
let a = 1;
let b = a; // copy by value '값 자체'가 복사되어 할당됨.
```

참고) 그림 3, 그림 4

- 객체는 Memory cell 안에 그 객체가 있는 momory의 주소(참조값)가 들어가있고, 변수는 그 Memory의 주소가 들어가있는 cell을 가리킴.

```Javascript
console.clear();
let apple = 1;
let orange = apple;// copy by reference '참조 값'이 복사되어 할당됨.
orange = 2;
console.log(apple); // 1
console.log(orange); // 2
```

```Javascript
let apple2 = {
  // ex. 0x12324
  name: 'apple',
};
let orange2 = apple2; // ex. 0x12324 // copy by reference '참조 값'이 복사되어 할당됨.
orange2.name = '오랜지';
console.log(apple2); // { name: '오랜지' }
console.log(orange2); // { name: '오랜지' }
```

참고) 그림5


