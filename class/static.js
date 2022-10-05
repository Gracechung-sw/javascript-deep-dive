/**
 * static 정적 프로퍼티와 메소드로 재사용성을 높이기.
 *  모든 객체마다 동일하게 '참조'해야하는 속성이나. 행동이 있다면
 *  class level의 속성(property)나 행동(method)를 사용하면 됨.
 *
 *  static 카워드를 속성(property)나 행동(method) 앞에 붙임.
 *  class에 한 번만 정의되고, instance에는 이 속성이나 행동이 생성되지 않음.
 *  참고) 그림
 */

// 2. class
class Fruit {
  // 생성자: new 키워드로 instance를 생성할 때 호출되는 함수.
  static MAX_NUM = 100;
  constructor(name, emoji) {
    this.name = name;
    this.emoji = emoji;
  }

  static makeRandomFruit() {
    return new Fruit('banana', '🍌');
  }

  display = (emoji) => {
    // function 키워드 사용 안 함.
    console.log(`어쩌구 ${this.emoji}`);
  };
}

// apple2는 Fruit class의 instance임.
const apple2 = new Fruit('apple', '🍎');
const orange2 = new Fruit('orange', '🍊');

const banana = Fruit.makeRandomFruit(); // static method(즉, class level의 method)는 class name. 으로 접근 가능.
console.log(banana); // Fruit { display: [Function: display], name: 'banana', emoji: '🍌' }
// static을 사용한 class level은 instance에는 포함되지 않음.
console.log(Fruit.MAX_NUM);
