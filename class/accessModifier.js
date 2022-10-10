/**
 * class내에 있는 property(즉, field)들과 접근 제한자로 캡슐화하기
 *
 * private(#), public(기본), protected
 * method도 마찬가지!
 */
class Fruit {
  // field 선언
  #name; // constructor에서 주어지는 데이터라면 생략가능
  #emoji; // constructor에서 주어지는 데이터라면 생략가능
  #typeof = '과일'; // instance가 생성될 때 초기화 되어야 한다면 constructor 위에서 field 선언과 초기화되어야 함.
  constructor(name, emoji) {
    this.#name = name;
    this.#emoji = emoji;
  }

  display = (emoji) => {
    console.log(`어쩌구 ${this.#emoji}`);
  };
}

const apple = new Fruit('apple', '🍎');
apple.#name = '오렌지'; // 실행시 에러 발생. SyntaxError: Private field '#name' must be declared in an enclosing class
