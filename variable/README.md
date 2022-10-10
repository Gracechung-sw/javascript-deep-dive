# Variable

## Memory

하드 디스크
연산 CPU
메모리

메모리상에 데이터를 읽고 쓰고
메모리 cell = 1 byte(8 bit) size
의 모음.
applicatio이 memory상에 올라왔을 때,

- Code
- Data
- Stack
- Heap
  의 메모리 구조를 가진다.

## Variable

Application이 실행되면

- 입력(input) -> 처리(process) -> 출력(output)/저장(storage) 큰 3가지 줄기를 가진다.
- 이 중 처리(process)에서 처리 과정 중의 데이터(ex. 사용자에게 입력받은 데이터라던지..)를 잠시 저정해 두는 것이 필요.

변수(Variable)은

- 값을 저장하는 공간
- 자료를 저장할 수 있는 **이름이 주어진** 기억장소

JS에서 변수 사용

- let, const와 같은 키워드를 사용해서 선언해야함.

### let

```Javascript
let a; // 아직 a라는 변수에 값이 없는 상태
let b = 0; // b 변수를 선언하면서 값을 할당.
b = 1; // 값의 재할당.
```

## Naming

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

## let, const

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