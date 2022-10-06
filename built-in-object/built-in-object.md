# JS Built-in Objects

JS로 작성된 .js 코드들은 JS runtime환경(Browser, Node)에서 실행 될 수 있다.
이 JS에는 유용한 많은 built-in object들이 있고,
그 외에 기능을 수행하기 위해서 runtime환경에서 제공해주는 host object(Browser APIs, Node APIs) 들이 있다.
그리고 우리가 정의한 객체들인 user-defined object 도 있다.

그래서 JS에서 제공해주는 Built-in object들엔 뭐가 있는지 살펴보고자 한다.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference

## Wrapper 객체

Wrapper Object는 원시'값'을 필요에 따라서 관련된 built-in '객체'로 변환한다.

```JS
const number = 123; // number 원시 타입
// number. // 여기까지 치면, vscode hint에 사용할 수 있는 함수들이 뜬다.

// number.toString() // 이렇게 '값' 인데도 '객체'처럼 뒤에 함수를 사용할 수 있는 이유가 JS에 있는 '래퍼 객체'가 있기 때문이다.
console.log(number.toString()); // 이 때는 number 원시타입을 감싸고 있는 'Number class 의 객체'로 감싸진다.
console.log(number) // 이 때는 다시 원시 타입.
```

그럼 왜 '원시 타입'을 굳이 쓰는 걸까? 아에 처음부터 전부 Number class로 생성하면 무거워지니까.  
그래서 원시타입을 쓰다가 정말 필요할 때 객체로 변환하고, 또 다시 필요시 원시타입으로 변환해서 메모리 관리를 효과적으로 할 수 있는 것임.

## Global 객체

전역적으로 사용할 수 있는 것.

```JS
console.log(globalThis);
```

- JS에서 globalThis나 this는 전역 객체를 가리킴.
- Node에서의 this는 현재 모듈에 있는 정보를 나타냄.
- Browser에서 this는 Window 전역 객체를 나타냄.

## Boolean 함수들

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
