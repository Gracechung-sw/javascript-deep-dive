# Prototype

JS에서 prototype은
다양한 객체들간 비슷한 특징을 class로 만든것(생성자 함수로 template로 만들 것)처럼 객체지향 프로그램을 위해 prototype을 사용함.  
Javascript has dynamic tytping, prototype-based object-orientation, and first-class functions.

최신 JS, TS모두 class를 사용하는데, 왜 prototype를 배워야 할까?  
왜냐하면 JS가 prototype을 base로 만들어진 언어이고,
class도 사실 prototype을 감싸고 있는 문법적 wrapper이기 때문이다.

## Prototype 눈으로 확인하기

모든 객체는 내부에 숨겨진 [[Prototype]]을 가지고 있다.
이 prototype은 외부에서 직접 접근이 불가하고, 접근하려면

- **proto**
- Object.getPrototypeOf()
- Object.setPrototypeOf()
- 생성자 함수에서는: prototype으로 접근 가능

## Prototype chain

객체간 상속의 연결 고리는 prototype chain으로 연결되어 있음.
그리고 chain의 맨 위는 결국 Object 라는 prototype을 상속하고 있다.
그림 14)

## Prototype descriptor

object내에도 object의 상태를 가지고 있는 descriptor가 있음.

```JS
const dog = {name: '와우', emoji: '🐶'}

console.log(Object.keys(dog)) // ['name', 'emoji']
console.log(Object.values(dog)) // ['와우', '🐶']
console.log(Object.entries(dog)) // [['name', '와우'], ['emoji', '🐶']]
console.log('name' in dog) // true
```

object의 각각의 property는 property descriptor라고 하는 객체로 저장됨.

```JS
const descriptors = Object.getOwnPropertyDescriptors(dog);
console.log(descriptors) // {'name':{value: '와우', writable: true, enumerable: true, configurable: true}, 'emoji':{value: '🐶', writable: true, enumerable: true, configurable: true}}

const desc = Object.getOwnPropertyDescriptor(dog, 'name'); // 어떤 객체의 어떤 키에 대한 설명을 받아 올 것인지
console.log(desc) // {value: '와우', writable: true, enumerable: true, configurable: true}


Object.defineProperty(dog, 'name', {
  value: '멍멍',
  writable: false,
  enumerable: false,
  configurable: false,
});

console.log(dog.name);
console.log(Object.keys(dog));
delete dog.name;
console.log(dog.name);

const student = {};
Object.defineProperties(student, {
  firstName: {
    value: '영희',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  lastName: {
    value: '김',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  fullName: {
    get() {
      return `${lastName} ${firstName}`;
    },
    set(name) {
      [this.lastName, this.firstName] = name.split(' ');
    },
    configurable: true,
  },
});
console.log(student);
```

## 객체 불변성을 위하여

object의 불변성을 보장하기 위해 사용하는 함수

1. object 동결 함수 Object.freeze

동결! Object.freeze 추가 ❌, 삭제 ❌, 쓰기 ❌, 속성 재정의 ❌

```JS
// 동결! Object.freeze 추가 ❌, 삭제 ❌, 쓰기 ❌, 속성 재정의 ❌
// (단, 얕은 꽁꽁 얼림!)
const ellie = { name: '엘리' };
const dog = { name: '와우', emoji: '🐶', owner: ellie };
Object.freeze(dog);

dog.name = '멍멍';
console.log(dog); // { name: '와우', emoji: '🐶', owner: { name: '엘리' } }; 여전히 name은 와우

dog.age = 4;
console.log(dog); // { name: '와우', emoji: '🐶', owner: { name: '엘리' } }; age에 대한 정보는 없음.

delete dog.name;
console.log(dog); // { name: '와우', emoji: '🐶', owner: { name: '엘리' } }; 삭제 불가


// (단, 얕은 꽁꽁 얼림!) freeze한 객체가 다른 객체를 참조하고 있다면, 그 참조 객체까지는 freeze가 안 됨.
// 즉, dog의 owner에 ellie라는 객체가 있는데, 이 ellie객체까지는 freeze가 안 됨.
ellie.name = '엘리얌';
console.log(dog); // { name: '와우', emoji: '🐶', owner: { name: '엘리얌' } }; 엘리얌으로 바뀌어져 있음.

```

2. object 밀봉 함수 Object.seal

밀봉! Object.seal 값의 수정 ✅, 추가 ❌, 삭제 ❌, 속성 재정의 ❌

```JS
const ellie = { name: '엘리' };
const dog = { name: '와우', emoji: '🐶', owner: ellie };
const cat = {...dog};

Object.seal(cat);
console.log(cat); // { name: '와우', emoji: '🐶', owner: { name: '엘리' } };

cat.name = '냐옹';
console.log(cat); // { name: '냐용', emoji: '🐶', owner: { name: '엘리' } }; name은 수정되어 있음.

delete cat.emoji;
console.log(cat); // { name: '냐용', emoji: '🐶', owner: { name: '엘리' } }; 삭제는 안 됨.
```

3. 확장 금지
   확장 금지 preventExtensions 추가 ❌

```JS
const tiger = { name: '어흥' };
Object.preventExtensions(tiger);
console.log(Object.isExtensible(tiger));

tiger.name = '어흐응';
console.log(tiger);

delete tiger.name;
console.log(tiger);

tiger.age = 1;
console.log(tiger);
```

## Prototype

```JS
const dog1 = {name: '뭉치', emoji: '🐶'};
const dog2 = {name: '코코', emoji: '🦮'};

// 이렇게 유사한 객체들 생성에는 생성자 함수 또는 최근에는 class(하지만 prototype을 감싸는 문법적 설탕일 뿐, 내부적 동작은 prototype임) 을 사용한다.
// 생성자 함수
function Dog(name, emoji) {
  this.name = name;
  this.emoji = emoji;

  // 인스턴스 레벨의 함수
  this.printName = () => {
    console.log(`${this.name} ${this.emoji}`)
  }
}
const dog1 = new Dog('뭉치', '🐶');
const dog2 = new Dog('코코', '🦮');

// 프로토타입 레벨의 함수
Dog.prototype.printName = function () {
  console.log(`${this.name} ${this.emoji}`)
} // 이런식으로 해주면 됨.
const dog1 = new Dog('뭉치', '🐶');


// 오버라이딩
// 인스턴스 레벨(자식)에서 동일한 이름으로 함수를 재정의하면 (오버라이딩 하면)
// 프로토타입 레벨(부모) 함수의 프로퍼티는 가려진다. (섀도잉 됨)
dog1.printName = function () {
  console.log('안녕!);
}
dog1.printName();

// 정적 레벨의 함수
Dog.hello = () => {
  console.log('Hello!');
};
Dog.hello();
// 정적 레벨의 데이터
Dog.MAX_AGE = 20;
```

## Prototype을 이용한 상속(inheritance)

Object.create는 인자로 넘겨준 prototype을 base로 해서, 새로운 object를 만들어준다.

```JS
// 프로토타입을 베이스로한 객체지향 프로그래밍
function Animal(name, emoji) {
  this.name = name;
  this.emoji = emoji;
}

Animal.prototype.printName = function () {
  console.log(`${this.name} ${this.emoji}`);
};

function Dog(name, emoji, owner) {
  super(name, emoji) // 상속시, 부모 생성자에 연결해주는데 필요. 이와 같은 것이 .call
  Animal.call(this, name, emoji); // 위의 super와 같은 것으로, 'Animal의 생성자함수를 call하는데, this는 내 this를 사용해줘 그리고 name, emoji 값은 여기 있어' 라는 의미.
  this.owner = owner;
}
// Dog.prototype = Object.create(Object.prototype);
Dog.prototype = Object.create(Animal.prototype); //Object.create는 인자로 넘겨준 prototype을 base로 해서, 새로운 object를 만들어준다.

Dog.prototype.play = () => {
  console.log('같이 놀자옹!');
};

function Tiger(name, emoji) {
  Animal.call(this, name, emoji);
}

Tiger.prototype = Object.create(Animal.prototype);
Tiger.prototype.hunt = () => {
  console.log('사냥하자! ..🐇..');
};

const dog1 = new Dog('멍멍', '🐶', '엘리');
dog1.play();
dog1.printName();
const tiger1 = new Tiger('어흥', '🐯');
tiger1.printName();
tiger1.hunt();

console.log(dog1 instanceof Dog);
console.log(dog1 instanceof Animal);
console.log(dog1 instanceof Tiger);
console.log(tiger1 instanceof Dog);
console.log(tiger1 instanceof Animal);
console.log(tiger1 instanceof Tiger);
```

## 상속도 확인하는 법

내가 만든 객체가 누구를 상속하는지, 어떤 class 또는 생성자 함수의 instance인지 확인할 수 있는 instanceof 에 대해 알아보자!

```JS
// ... 위의 코드에 이어서
const dog1 = new Dog('멍멍', '🐶', '엘리');
const tiger1 = new Tiger('어흥', '🐯');

console.log(dog1 instanceof Dog); // True
console.log(dog1 instanceof Animal); // True
console.log(dog1 instanceof Tiger); // False
```

## Mixin

여러가지 기능을 섞을 때 사용.  
기본적으로 JS에서 object는 다중상속이 안됨. 즉 하나의 부모만 상속 가능. object는 단 하나의 prototype을 가리킬 수 있다.  
하지만 여러개의 함수들을 상속하고 싶다면 mixin!
Object.assign 이라는 static함수를 통해

```JS
// 오브젝트는 단 하나의 prototype을 가리킬 수 있다 (부모는 단 하나!)
// 하지만! 여러개의 함수들을 상속하고 싶다!
// Mixin!
const play = {
  play: function () {
    console.log(`${this.name} 놀아요!`);
  },
};

const sleep = {
  sleep: function () {
    console.log(`${this.name} 자요!`);
  },
};

function Dog(name) {
  this.name = name;
}

Object.assign(Dog.prototype, play, sleep); // Dog의 prototype에 play 객체와 sleep 객체를 할당할거야. 즉, 이 두 객체의 함수를 섞어줘(mixin)
const dog = new Dog('멍멍');
console.log(dog);
dog.play();
dog.sleep();

class Animal {}
class Tiger extends Animal {
  constructor(name) {
    super();
    this.name = name;
  }
}

Object.assign(Tiger.prototype, play, sleep);
const tiger = new Tiger('어흥!');
tiger.play();
tiger.sleep();
```
