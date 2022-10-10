# 비동기 Async

## 학습 목표

1. 동기와 비동기의 차이점
2. 동기적 callback과 비동기 callback
3. promise
4. 비동기 코드를 동기적으로 보이게 작성 가능한 async/await

## Javascript Runtime Environment

에는 JS engine이 탑재되어있다.
그래서 JS 소스 코드를 JS engine 이 번역해서 실행

실행 중 동적으로 객체를 생성하는 경우 Memory heap에 생성됨.
그리고 call stack이 있는데, 함수 실행 순서를 기억한다. 이 때, JS Call stack는 **하나의 싱글 컨텍스트 스택이며 한번에 하나의 일만 처리 Single Thread.** 이다.  
그래서 JS는 기본적으로 동기적으로 진행됨.

## callstack

```JS
function a() {
  for (let i=0; i<10000000000000000000000; i++);
  return 1;
}

function b() {
  return a() + 1;
}

function c() {
  return b() + 1;
}

const result = c();
console.log(result);

/**
 * 실행 순서
 * |a| // 근데 a 함수가 호출되면 이 것이 다 실행되고 나서 return 후에서야 b가 실행가능하다.
 * |b|
 * |c|
 *  ㅡ
 * 실행 결과
 * 3
 */

```

이렇게 동기적으로 수행되기 때문에 어떤 함수에서 실행 속도가 너무 오래 걸리면, 전체적인 application 실행 속도가 늦어진다.

## 콜백 비동기 사용해보기

JS언어 자체는 동기적으로 작성해주지만 JS 런타임 환경에서 Host API에 다양한 기능들이 있다.
이 api는 multi thread에서 처리해주기 때문에 여러 요청에 대한 코드를 동시에 수행가능하다.

```JS
// callback 함수 를 전달받아서, 이 callback 함수를 몇 초 뒤에 실행시킬 건지 지정
function execute() {
  console.log('1');
  setTimeout(()=> {
    console.log('2');
  }, 3000);
  console.log('3');
}
// 실행 결과
// 1 이 먼저 출력되고,
// setTimeout이라는 node api - 야 node야 나 3초 뒤에 이 cb 함수를 알려줘 하고 넘어감
// 3 이 출력
// node timer에서 3초 뒤에 이 cb함수가 task queue에 들어오고,
// callstack이 비워져있으니 task queue에서 call stack으로 가져와서 하나씩 실행 그래서
// 2 이 출력

```

사진 6 참고)

예제)

주어진 seconds가 지나면 callback 함수를 호출하도록 해보자.
단, seconds가 0보다 작으면 에러를 던지자.

```JS
function runInDelay(cb, seconds){
  if(!callback){
    throw new Error('callback 함수를 전달해야함.')
  }
  if(!seconds || seconds < 0){
    throw new Error('seconds는 0보다 커야함.')
  }

  try{
    setTimeout(cb(), seconds * 1000);
  }catch(error){} // 이렇게 try/catch로 감싸서 에러가 발생해도 application이 죽지는 않도록 한다.
}
```

## Promise

MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

promise를 이용해서 '야 이 일이 언제 끝날진 모르겠지만 promise가 있으니까 내가 끝나면 끝났다고 알려줄게'
그래서 promise에는

- then: 내가 일이 끝난 다음 할 일을 등록할 수 있는 then,
- catch: 애러가 발생했을 때 잡을 수 있는 catch,
- finally: 실제 모든 일이 끝났을 때 할일은 finally.

Promise의 상태 3가지

- pending: initial state, neither fulfilled nor rejected.
  이제 막 promise가 만들어져서 수행되지 않은 상태
- fulfilled: meaning that the operation was completed successfully.
  코드가 성공적으로 수행된 상태
- rejected: meaning that the operation failed. 에러가 발생해서 실패한 상태

그리고 promise를 사용하는 중요한 이유는,  
callback에서 callback을 전달, 전달, ....해서 순차적으로 수행되도록 하는데에서 callback hell이 있을 수 있는데,  
이렇게 사용되지 않도록 함수형 프로그래밍 처럼 순차적으로 코딩할 수 있도록 도와줌.

```JS
function runInDelay(seconds){
  // promise를 만들 때는 2가지 인자를 전달받아서 처리하는 callback함수를 넣어준다.
  // 2가지 인자는 뭐냐면,
    // 성공했을 때, 즉 .then을 호출할 때 사용할 resolve라는 함수
    // 실패한 것을 알려주는 reject 함수
  return new Promise() => {
    if (!seconds || seconds < 0>){
      reject(new Error('seconds는 0보다 커야함.'))
    }
    setTimeout(resolve(), seconds * 1000)
  }; // 바로 약속(promise)를 리턴
}

runInDelay(2)
.then(필요한 일을 수행)
.catch(에러를 처리)
.finally(최종적으로 무조건 호출)

```

```JS
// Promise를 좀 더 간단하게 아래와 같이 작성해줄 수 있다.
function fetchEgg(chicken) {
  // Promise할 때 속으로 생각해 '내가 ~~ 한 비동기 작업을 할 건데,
  //  일단 이 promsie객체를 가지고 있어.
  // 그 비동기 작업이 다 되면 내가 알려줄게.
  return Promise.resolve(`${chicken} from 🥚`);
}

fetchEgg('🐔').then((egg) => console.log(egg));

```

## promise 병렬 처리

```JS
function getBanana() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('🍌');
    }, 1000);
  });
}

function getApple() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('🍎');
    }, 1000);
  });
}

// 바나나와 사과를 같이 가지고 오기
getBanana()
  .then((banana) => getApple().then((apple) => [banana, apple]))
  .then(console.log);
// 실행 결과: [ '🍌', '🍎' ]
```

## 비동기 코드를 동기적으로 절차적으로 작성 async, await

```JS
function getBanana() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('🍌');
    }, 1000);
  });
}

function getApple() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('🍎');
    }, 1000);
  });
}

// 바나나와 사과를 같이 가지고 오기
getBanana()
  .then((banana) => getApple().then((apple) => [banana, apple]))
  .then(console.log);
// 실행 결과: [ '🍌', '🍎' ]
```

그런데 이것도 callback 지옥.

이를 방지할 수 있는 async, await.  
async [비동기 함수]: 이 함수는 비동기 함수야. 그러니 이 함수를 호출하면 promise가 호출이 되는데,  
그럼 이 [비동기 함수] 내에서는 조금 더 동기적으로 작성할 수 있다.

```JS
async function fetchFruits() {
  const banana = await getBanana(); // await. banana를 받아올 때 까지 기다려.
  const apple = await getApple();

  return [banana, apple];
}

fetchFruits().then(console.log);
```
