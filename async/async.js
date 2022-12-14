function getBanana() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('๐');
    }, 1000);
  });
}

function getApple() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('๐');
    }, 3000);
  });
}

function fetchFruits() {
  return getBanana().then((banana) =>
    getApple().then((apple) => [banana, apple])
  );
}

fetchFruits().then(console.log);
// ์คํ ๊ฒฐ๊ณผ: [ '๐', '๐' ]
// ๊ทธ๋ฐ๋ฐ ์ด๊ฒ๋ callback ์ง์ฅ.

// ์ด๋ฅผ ๋ฐฉ์งํ  ์ ์๋ async, await.
// async [๋น๋๊ธฐ ํจ์]: ์ด ํจ์๋ ๋น๋๊ธฐ ํจ์์ผ. ๊ทธ๋ฌ๋ ์ด ํจ์๋ฅผ ํธ์ถํ๋ฉด promise๊ฐ ํธ์ถ์ด ๋๋๋ฐ,
// ๊ทธ๋ผ ์ด [๋น๋๊ธฐ ํจ์] ๋ด์์๋ ์กฐ๊ธ ๋ ๋๊ธฐ์ ์ผ๋ก ์์ฑํ  ์ ์๋ค.
async function fetchFruits() {
  const banana = await getBanana(); // await. banana๋ฅผ ๋ฐ์์ฌ ๋ ๊น์ง ๊ธฐ๋ค๋ ค.
  const apple = await getApple();

  return [banana, apple];
}

fetchFruits().then(console.log);
