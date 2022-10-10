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

function fetchFruits() {
  return getBanana().then((banana) =>
    getApple().then((apple) => [banana, apple])
  );
}

fetchFruits().then(console.log);
// 실행 결과: [ '🍌', '🍎' ]
// 그런데 이것도 callback 지옥.

// 이를 방지할 수 있는 async, await.
// async [비동기 함수]: 이 함수는 비동기 함수야. 그러니 이 함수를 호출하면 promise가 호출이 되는데,
// 그럼 이 [비동기 함수] 내에서는 조금 더 동기적으로 작성할 수 있다.
async function fetchFruits() {
  const banana = await getBanana(); // await. banana를 받아올 때 까지 기다려.
  const apple = await getApple();

  return [banana, apple];
}

fetchFruits().then(console.log);
