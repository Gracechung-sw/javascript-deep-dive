/**
 * 접근자 프로퍼티(Access Property) 라고 하는 getter, setter
 */
class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  fullName() {
    return `${this.lastName} ${this.firstName}`;
  }
}

const student = new Student('현정', '정');
console.log(student.firstName);
console.log(student.fullName()); // 어떤 행동이라기보단, 속성에 가까운데, 함수처럼 호출하니까 별로임.

// 그럼 this.fullName = `${this.lastName} ${this.firstName}`; 이렇게 하면 되지 않냐? 안되지.
// constructor는 instance 생성 초기에만 한 번 실행되는 거니까 lastName, firstName을 업데이트 시켜줘도 fullName이 알아서 바뀌진 않는다.

class Student2 {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value) {
    console.log(value);
  }
}
// 이렇게 속성으로 가져오고 싶은 걸 함수 앞에 get을 붙여주는 접근자 프로퍼티를 사용하면
const student2 = new Student2('현정', '정');
console.log(student2.firstName);
console.log(student2.fullName); // 이렇게 할 수 있다.

// set은 할당할 때 사용
student2.fullName = '김철수';
