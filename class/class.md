# class

앞서 생성자 함수는 객체를 만들어 낼 수 있는 템플릿 (마치 붕어빵틀)

```JS
function Fruit(name, emoji){
  this.name = name;
  this.emoji = emoji;
  this.display = () => {

  }
}
```

그리고 이를 통해 생성된 객체(붕어빵)

```JS
{
  name: 'apple',
  emoji: '🍎',
  display: () => {},
}
```

이게 가능한 이유는 JS에서 프로토타입을 base로 객체지향 프로그래밍을 지원하기 때문임.  
(하지만 대부분의 객체지향 언어는 prototype이 아니라 class를 통해 객체지향 프로그래밍을 지원. )  
JS는 ES6부터 class지원하지만 내부적으로는 prototype을 쓰고, 그냥 사용할 때는 이 prototype을 편하게 쓸 수 있도록 class 형식으로 사용하는게 가능.  
**Prototype은 나중에 다룸**
