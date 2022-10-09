// function fetchEgg(chicken) {
//   // Promise할 때 속으로 생각해 '내가 ~~ 한 비동기 작업을 할 건데,
//   //  일단 이 promsie객체를 가지고 있어.
//   // 그 비동기 작업이 다 되면 내가 알려줄게.
//   return Promise.resolve(`${chicken} from 🥚`);
// }

// fetchEgg('🐔').then((egg) => console.log(egg));

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
    }, 3000);
  });
}

// 바나나와 사과를 같이 가지고 오기
getBanana()
  .then((banana) => getApple().then((apple) => [banana, apple]))
  .then(console.log);
// 실행 결과: [ '🍌', '🍎' ] 총 4초

// 이를 병렬적으로 한 번에 모든 promise들을 실행하기
// Promise.all([여기에 내가 실행하고 싶은 promise들을 배열로 정의하면 됨.]);
Promise.all([getBanana(), getApple()]).then((fruits) =>
  console.log('all', fruits)
); // 총 3초
// 실행 결과: all [ '🍌', '🍎' ] 총 3초
