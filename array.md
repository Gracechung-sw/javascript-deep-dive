# Data Structure Indexed Collections - Array

## JS에서 배열이란
### 정적 배열
C 기준, 
크기를 지정하고 해당 크기만큼의 연속된 메모리 공간을 할당받는 작업을 수행하는 자료형을 말함.    
이때 연속된 메모리 공간을 할당받으면, **실제 메모리에는 지정한 타입의 사이즈만큼 할당되고, 거기에 값이 순차적으로 들어간다.**
> JS Deep Dive 책 494p에 따르면 이러한 배열, 즉, 지정된 하나의 데이터 타입으로 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 `자료구조(배열)을 밀집 배열(dense array)`라고 한다고 함. 
#### 장점
이 때 지정한 타입의 사이즈라는 건 컴파일러와 프로세서의 구조에 따라 상이하다.    
이러한 특성 때문에 배열은 어느 위치나 O(1)에 조회가 가능하다.  
즉, `검색 대상 요소의 메모리 주소 = 배열의 시작 메모리 주소 + 인덱스 * 요소의 바이트 수` 로 말이다. 
#### 단점
1. 위의 장점처럼 인덱스를 통해서는 O(1) 접근이 가능하지만
값으로 특정 요소를 검색하는 경우 배열의 모든 요소를 처음부터 특정 요소를 발견할 때까지 차례대로 검색해야 하므로 O(n)
2. 베열의 요소를 삽입하거나 삭제하는 경우 배열의 요소를 연속저긍로 유지하기 위해 요소를 이동시켜야 한다는 단점. (JS Deep Dive 495p)
3. 정적 배열과 밀접 배열의 단점이라고도 할 수 있는데,    
3-1) 하지만 실제 데이터에서는 전체 크기를 가늠하기 힘들어서, 너무 작은 영역을 할당하여 모자라거나 너무 많은 영역을 할당해 낭비가 생길 수 있다.    
그래서 크기를 지정하지 않고 자동으로 리사이징하는 동적배열이 필요.    
3-2) 그리고 한가지 타입이 아니라 여러 타입이 한 배열에 들어가려면? 

즉, 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 있다. 
배열의 요소가 연속적으로 이어져 있지 않는 배열을 `희소 배열(sparse array)`라고 한다. 

### 동적 배열
자바, C++, Python에서 동적 배열을 제공. Python(동적 프로그래밍 언어)에서는 정적 배열을 따로 제공하지 않으며 동적 배열인 List만 제공.    
> 그렇담 JS는??? https://www.inflearn.com/questions/528543/javascript-array-%EB%8A%94-dynamic-array-%EC%9D%B8%EA%B0%80%EC%9A%94 참고. JS의 배열의 성질은 희소 배열(sparse array)이며, *배열이 구현된 방식도 일반적인 배열의 동작을 흉내 낸 특수한 객체*이다. 
그래서 JS의 배열의 요소는 사실 프로퍼티 값이며, JS에서 사용할 수 잇는 모든 값은 객체의 프로퍼티 값이 될 수 있으므로 어떤 타입의 값이라도 배열의 요소가 될 수 있는 것이다.    
```JS
const sparse = [, 2, , 4] // 희소배열

// 최소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다. 
console.log(sparse.length) // length 프로퍼티 값은 이렇지만 실제 배열은 값 없이 비어있는 요소를 위해 메모리 공간을 확보하지 않고, 빈 요소를 생성하지도 않는다. 
console.log(sparse) // [empty, 2, empty, 4]

// 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않는다. 
console.log(Object.getOwnPropertyDescriptors(sparse))
/*
{ 
'1': {value: 2, writable: true, enumerable: true, configurable: true},
'3': {value: 4, writable: true, enumerable: true, configurable: true},
'length': {value: 4, writable: true, enumerable: false, configurable: false}
}
 * /

```
일반적인 배열과 JS 배열의 장단점 정리   
>> 1. 일반적인 배열은 인덱스로 요소에 빠르게 접근 할 수 있다. 하지만 요소를 삽입 또는 삭제하는 경우에는 효율적이지 않다. 
>> 2. JS 배열은 해시 테이블로 구현된 객체이므로 인덱스로 요소에 접근하는 경우 일반적인 배열보다 성능적인 면에서 느릴 수 있다. 하지만 요소를 삽입/삭제하는 경우 빠름. 

## 배열 생성 방법

1.

```JS
let array = new Array(3); // 배열 크기
console.log(array); // [<3 empty items>]

let array = new Array(1, 2, 3); // 배열 원소
console.log(array); // [1, 2, 3]
```

2.  배열 리터럴 이용해서 생성

```JS
const arr = [1, 2, 3, 4]
console.log(arr) // [1, 2, 3, 4]

// 그대로 복사해서 새로운 배열 생성 할 때는
const arr2 = Array.from(arr)
console.log(arr2) // [1, 2, 3, 4]
```

'일반적으로' 배열은 동일한 메모리 크기를 가지며, 연속적으로 이어져 있어야 하지만,  
JS에서의 배열은 연속적으로 이어져있지 않고, 이를 보장해주지 않는다. 즉, object와 유사함.  
JS의 배열은 일반적인 배열의 동작을 흉내낸 특수한 객체이다!  
또한 이를 보완하기 위해서 Int32Array, BigInt64Array.. 등등의 타입이 정해져 있는 타입 배열이 있늠 (Typed collections)

```JS
const array = Array.from({
  0: '안',
  1: '녕',
  length: 2,
}) // 즉, object로 생성했는데, 배열로 만들어진다.
console.log(array) // ['안', '녕']
```

## array method

**point는 배열 자체를 변경하는지, 새로운 배열을 반환하는지임**

1.배열에 추가/삭제 할 수 있는 간단한 방법.

```JS
const fruits = ['🍌', '🍎', '🍇', '🍑'];
```

추가

```JS
// 뒤에 추가
fruits.push('💟') // push(...items: T[]): number; 로, 배열 자체를 수정하고, 길이를 반환해줌.

// 앞에 추가
fruits.unshift('💟')
```

삭제
JS 배열은 사실 객체이기 때문에 배열의 특정 요소를 삭제하기 위해 delete 연산자 사용가능. 

```JS
const fruits = ['🍌', '🍎', '🍇', '🍑'];
delete fruits[1];
// 이렇게 하면
console.log(fruits) // ['🍌', <1 empty item>, '🍇', '🍑']; 이렇게 [1] 에 값이 empty로 비워져있는 상태로 그대로 남아있음.
```
하지만 객체의 프로퍼티를 삭제하는 delete로 삭제하게 되면 `희소배열`이 되며, length 프로퍼티 값은 변하지 않는다. 

따라서 별로 좋지 않은 방법이고, 희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면 Array.prototype.splice 메소드를 사용하는게 좋다. 
```JS
cosnt arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
arr.splice(1, 1) // arr[1]부터 1개의 요소를 제거
console.log(arr) // [1, 3]

console.log(arr.length) // length 프로퍼티가 자동 갱신된다. 

````



```JS
//제일 뒤 삭제
let lastItem = fruits.pop();

//제일 앞 삭제
let lastItem = fruits.shift();
```



2. 특정한 오브젝트가 배열인지 체크

```JS
console.log(Array.isArray(fruits))
```

3. 특정한 아이템의 위치 찾기

```JS
fruits.indexOf('🍎')
```

4. 배열 안에 특정한 아이템이 있는지 체크

```JS
fruits.includes('🍎')
```
