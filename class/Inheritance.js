class Animal {
  constructor(color) {
    this.color = color;
  }

  eat() {
    console.log('eat!');
  }
  sleep() {
    console.log('sleep!');
  }
}

class Tiger extends Animal {}
const tiger = new Tiger('yellow');

class Dog extends Animal {
  constructor(color, ownerName) {
    super(color);
    this.ownerName = ownerName;
  } // 새로운 데이터 추가하고 싶다면, 상속받는 class의 것들도 다 받아와야하므로 super()라는 키워드를 사용해서 , 부모 class의 constructor에 인자를 전달.
  play() {
    console.log('play!');
  }

  eat() {
    super.eat(); // 오버라이딩. 부모의 method를 하고 나서, 추가적으로 뭔가를 더 해주고 싶을 때
    console.log('강아지가 먹는다');
  }
}
const dog = new Dog('red', '현정');
console.log(dog);
dog.eat();
dog.sleep();
dog.play();
