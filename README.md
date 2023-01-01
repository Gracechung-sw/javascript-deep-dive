# javascript-deep-dive

# JavaScript

라는 언어 자체는 '로직을 표현하기 위한' '문법'만 았는 거고,
기능은

- host 환경(node환경, browser환경)에서 제공해주는 api
- framework
- library
  를 사용해야 할 수 있다.

**JavaScript '언어' 에 대해서 '제대로' 배워보자!**

# 공부 순서

JavaScript ES6+
Basic: 기본 문법, 사용법, 개발자답게 사고하는 방법

- let, const
- if, for, switch, while
- function
- object

Advanced: JS의 내부 구현사항

- Prototype
- Hoisting
- Scope
- Closure


# [Variable]()
> Related < Javascript Deep Dive > Chapter
> - 04장. 변수
> - 06장 타입 
> - 11장. 원시 값과 객체의 비교
> - 14장. 전역 변수의 문제점

- [변수란 무엇인가? 왜 필요한가?]()
  - 메모리와 변수가 필요한 이유, 배경
  - 그래서 변수란?

- [변수 선언]()
  - var이 뭐길래 let, const를 쓰라고 하는건가?
  - 변수 Naming


# [Function]()
> Related < Javascript Deep Dive > Chapter
> - 12장. 함수
> - 18장. 함수와 일급 객체
> - 26장. 화살표 함수

- [함수란] ()
- [함수를 사용하는 이유]()
- [함수 리터럴]()
- [함수와 메모리]()
- [함수의 표현식과 선언문의 차이]()
  - 함수 선언문
  - 함수 표현신
  - 함수 생성 시점과 함수 호이스팅
  - 화살표 함수
- [리턴]()
- [Parameters]()
  - Rest 매개변수 Rest Parameters
- [불변성 Immutability. 참조에 의한 전달과 외부 상태의 변경]()
- [콜백함수]()
  - 일급 객체 first-class object
  - 고차 함수 Higher-order function
  - 

# [Object]() 
> Related <Javascript Deep Dive> Chapter
> - 10장. 객체 리터럴
> - 11장. 원시 값과 객체의 비교
> - 17장. 생성자 함수에 의한 객체 생성

- [객체란]()
- [객체 안의 함수 ⭐️]()
- [객체 생성]()
  - 객체 리터럴 (object literal)
  - 생성자 함수
  - 객체 리터럴로 객체 생성 vs 생성자 함수로 객체 생성 장/단점 비교
  - 생성자 함수의 인스턴스 생성 과정
- [객체 동적으로 접근하기]()
- [객체 축약 표현]()
  - 프로퍼티 축약 표현
  - 메서드 축약 표현

# [Array]()
> Related <Javascript Deep Dive> Chapter
> Compare with Python! see 
> - 27장. 배열
- [JS에서 배열이란]()
- [배열 생성 방법]()
- [Array methods]()


# [Scope]()
> Related < Javascript Deep Dive > Chapter
> - 13장. 스코프
> - 15장. let, const 키워드와 블록 레벨 스코프
> - 20장. strict mode
> - 23장. 실행 컨텍스트

- [scope란]()
- [scope의 필요성]()
- [scope 블럭 참조 범위]()
- [스코프의 종류]()
  - 전역 scope, 지역 scope
  - 블록 레벨 스코프, 함수 레벨 스코프
- [Garbage Collection]()
- [실행 컨텍스트 (Execution Context)]()
- [렉시컬 환경(Lexical Environment)]()
- [렉시컬 스코프]()
- [스코프 체인 (Scope Chain)]()
- [호이스팅 Hoisting (끌어올리다는 뜻)]()
  - 변수 선언 키워드 var, let, const
  - Var의 특징. var 키워드로 선언한 변수의 문제점. 
  - 함수 호이스팅
  - 변수(let, const)와 클래스의 호이스팅
- [Strict Mode]()


# [Prototype]()
> Related < Javascript Deep Dive > Chapter
> - 19장. 프로토타입

- [Prototype 이란]()
- [오버라이딩과 섀도잉]()
- [Prototype을 이용한 상속(inheritance)]()
  - 상속도 확인하는 법
  - Mixin
- [Prototype 눈으로 확인하기]()
- [Prototype chain]()
- [Prototype descriptor]()
- [객체 불변성을 위하여]()

# [this]()
> Related < Javascript Deep Dive > Chapter
> - 22장. this
- [This란]()
- [This 바인딩]()
  - global context에서의 this
  - 생성자 함수나 class 내부에서의 this
  - 일반 함수 내부에서의 this
- [동적 binding]()
- [정적 binding]()
  - 방법 1. bind 함수를 이용해서 수동적으로 바인딩 해주기
  - 방법2. 화살표 함수 사용
- 화살표 함수
  - 화살표 함수의 특징


# [Async]()
> Related < Javascript Deep Dive > Chapter
> - 42장. 비동기 프로그래밍
> - 45장. 프로미스
> - 46장. 제너레이터와 async/await
> - 47장. 에러 처리
