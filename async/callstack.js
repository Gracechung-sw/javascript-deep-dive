function a() {
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
 * |a|
 * |b|
 * |c|
 *  ㅡ
 * 실행 결과
 * 3
 */
