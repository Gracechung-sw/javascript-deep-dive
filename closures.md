# clousures

MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

A closure is the combination of a **function** bundled togethre(encloused) with references to its surrounding state(the **lexical environment**).

- 내부 함수와
- 그 외부를 둘러싸고 있는 렉시컬 환경의 조합

In other words, a clousure gives you access to an outer functions' scope from an inner function.  
내부 함수에서 외부 함수의 상태에 접근할 수 있는 권한을 주는 것을 말한다.

## scope와 실행 컨텍스트 복습

그림 15~22)

## closure란

inner라는 함수의 참조값을 리턴하게 됨.
inner_f(그림에선 inner라는 변수인데, 헷갈려서 inner_f라고 바꿈)라는 변수에 이 걸 할당함.
그래서 inner_f라는 변수는 inner라는 함수를 가리키고 있어서
inner_f 변수의 함수를 호출하면, inner 함수를 호출하는 것과 같다.

이 때 function inner에서 변수 x에 접근하는데, 이 x는 outer 함수에 있는 x를 가리키고 있다.
내부 함수(여기선 function ineer)는 이를 감싸고 있는 외부 함수(여기선 function outer)의 상태(변수)에 접근할 수 있다. closure라는 특징때문에!

const inner = outer(); 에서는
에서 inner 스코프 렉시컬 환경이 실행 컨텍스트 스택에 들어오는게 아니라,
inner 렉시컬 환경이 그대로 리턴된다.  
그림 23~26)

## closure 예제

```JS
const text = 'hello';

function func() {
  console.log(text);
}
func();
// 위의 경우보다, closure라고 지징하는 경우는,
// 중접된 함수에서 내부 함수에서 외부 함수의 상태에 접근할 수 있는 것을 클로저라고 한다.
function outer(){
  const x = 0;
  function inner() {
    console.log(`inside inner: ${x}`);
  }
  return inner;
}

const inner_f = outer();
inner_f();
```

## closure 사용 이유. 활용 예제

closure는 내부 정보를 은닉하고, 공개 함수(public, 외부 함수) 를 통한 데이터 조작을 위해 쓰인다.  
즉, 캡슐화와 정보은닉을 위해 사용한다.  
클래스 private를 사용하는 것과 같은 효과.

```JS
function makeCounter() {
  let count = 0;
  function increase() {
    count++;
    console.log(count);
  }
  return increase;
}

const increase = makeCounter();
increase();
increase();
increase();
```

```JS
const counter = (function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment() {
      changeBy(1);
    },

    decrement() {
      changeBy(-1);
    },

    value() {
      return privateCounter;
    },
  };
})();

console.log(counter.value()); // 0.

counter.increment();
counter.increment();
console.log(counter.value()); // 2.

counter.decrement();
console.log(counter.value()); // 1.

```

**하지만 이젠! closure가 아닌 private class 필드 또는 메소드를 사용하면 됨!!**

```JS
class Counter {
  #count = 0;
  increase() {
    this.#count++;
    console.log(this.#count);
  }
}
const counter = new Counter();
counter.increase();

```

## closure에서 let, var의 차이점

### let 사용

```JS
function loop() {
  const array = [];
  // var과 let의 차이점!
  for (let i = 0; i < 5; i++) {
    array.push(function () {
      console.log(i);
    });
  }
  return array;
}

const array = loop();
array.forEach((func) => func());
```

실행결과:  
0  
1  
2  
3  
4

### var 사용

```JS
function loop() {
  const array = [];
  // var과 let의 차이점!
  for (var i = 0; i < 5; i++) {
    array.push(function () {
      console.log(i);
    });
  }
  return array;
}

const array = loop();
array.forEach((func) => func());
```

실행결과:  
5  
5  
5  
5  
5

var는 block scope가 아닌 함수 scope만 가짐.
그래서

```JS
for (var i = 0; i < 5; i++) {
array.push(function () {
console.log(i);
});
}
```

여기서 얼마나 많은 function()을 생성하는지와 상관없이 console.log(i)에서의 i는 for문의 i를 가리킴.  
그래서 출력을 하게 되면 최종적인 i에 접근하니까 계속 i = 5 에 접근하기 때문임.
