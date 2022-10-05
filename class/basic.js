// 객체를 손쉽게 만들 수 있는 템플릿
// 1. 생성자 함수 (오래된 고전적인 방법으로 요즘은 사용하지 않음)
function Fruit(name, emoji) {
  //  생성자 함수는 대문자로 함수명이 시작해야함.
  this.name = name; //this는 만들어지는 객체 자기자신을 가리키기 때문에, 실행하면 객체 내 name이라는 key가 생성되고 value로 인자로 들어온 name값이 할당됨.
  this.emoji = emoji;
  this.display = (emoji) => {
    console.log(`어쩌구 ${this.emoji}`);
  };
  return this; // 하지만 생성자 함수에서는 자동으로 this가 리턴되기 때문에 생략가능
}

const apple = new Fruit('apple', '🍎');
const orange = new Fruit('orange', '🍊');

// 2. class
class Fruit2 {
  // 생성자: new 키워드로 instance를 생성할 때 호출되는 함수.
  constructor(name, emoji) {
    this.name = name;
    this.emoji = emoji;
  }
  display = (emoji) => {
    // function 키워드 사용 안 함.
    console.log(`어쩌구 ${this.emoji}`);
  };
}

// apple2는 Fruit2 class의 instance임.
const apple2 = new Fruit2('apple', '🍎');
const orange2 = new Fruit2('orange', '🍊');

console.log(apple2);
