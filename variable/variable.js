let a = 0;
console.log(a);

a = 1;
console.log(a);

let b;
console.log(b); // undefined // TODO: 추후에 undefined에 대해서도 자세하게 알아 볼 것임.

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

/**
 * null, undefined
 */
console.clear();

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

/**
 * reference
 * copy by value: 원시타입은 값이 복사되어 할당됨.
 * copy by reference: 객체 타입은 참조값(메모리 주소, 레퍼런스)가 복사되어 할당됨.
 */
console.clear();
let apple = 1;
let orange = apple;
orange = 2;
console.log(apple); // 1
console.log(orange); // 2

let apple2 = {
  // ex. 0x12324
  name: 'apple',
};
let orange2 = apple2; // ex. 0x12324
orange2.name = '오랜지';
console.log(apple2); // { name: '오랜지' }
console.log(orange2); // { name: '오랜지' }

/**
 * let, const
 */
console.clear();
const apple3 = {
  // ex. 0x12324
  name: 'apple',
}; // const 를 쓴다는건 apple3에 다른 메모리 주소를 담을 수(재할당 할 수 없다) 없다는 것이지, 그 메모리 주소에 있는 object의 내용이 바뀌는 것은 const와 아무 상관이 없음.
const orange3 = apple3; // ex. 0x12324
orange3.name = '오랜지';
console.log(apple3); // { name: '오랜지' }
console.log(orange3); // { name: '오랜지' }
