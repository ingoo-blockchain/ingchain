# Mocha

1. describe는 테스트들을 구분짓고 테스트에 대해 설명하는 함수로 주로 Object 명이나 function 명을 작성합니다. (어떤 것을 작성하던 작성자 마음) 위의 코드처럼 describe 안에 또 desribe를 중첩시킬 수 있습니다.

2. it은 어떤 결과가 나와야하는지 명시합니다. 예를 들어 위의 코드에서 [1,2,3].indexOf(4)의 결과가 -1 이어야한다고 하는 것처럼 보통 어떤 함수의 결과로 기대되는 값(예측값)을 작성합니다.

3. assert는 node.js 에서 기본적으로 제공하는 assertion 라이브러리며, equal 함수는 실제로 함수가 반환하는 값과 우리가 기대하는 값(예측값)이 서로 일치하는지 비교해줍니다. equal 함수 말고도 여러 함수가 있지만, 크게 다양하지 않아 chai와 같은 다른 외부 assertion 모듈을 사용하는 것을 추천드립니다.


# 비동기

자바스크립트 코드는 사실상 거의 비동기적으로 작동하는데요~ mocha를 이용하면 비동기 테스트도 간단하게 할 수 있습니다.

it()의 콜백 인수로 done을 사용하면 자동으로 비동기 테스트로 인식되고, 비동기 로직이 완료 후 done() 을 호출하게 되면 테스트가 완료됩니다.

참고로 done은 단일 테스트 중 여러 번 호출되면 안되며 단 한번만 호출되어야 합니다.


```javascript 
describe('Test', () => {
  it('async test', done => {
    setTimeout(done, 3000);
  });
});
```

Hook

mocha는 before, after, beforeEach, afterEach 4개의 hook을 제공하여 테스트를 제어할 수 있게 도와줍니다.




mocha [debug] [options] [files]

-V, --version : Mocha 버전확인
-A, --async-only : 비동기 테스트만 허용
-c, --colors : 코드 색상 활성화
-C, --no-colors : 코드 색상 비활성화
-R, --reporter <name> : 테스트 결과에 대한 리포팅 방식 설정
-b, --bail : 첫번째 실패한 테스트만 확인
-g, --grep <pattern> : 지정한 정규표현식 패턴과 일치하는 테스트만 진행
-f, --fgrep <string> : 지정한 문자열을 포함하는 테스트만 진행
-i, --invert : --grep, --fgrep 결과와 일치하지 않는 테스트만 진행
-r, --require <name> : 가져올 모듈(Assertion 라이브러리)을 지정
-t, --timeout <ms> : 지정한 테스트가 제한 시간을 지나면 실패(기본 값 2000)
-u, --ui <name> : 사용자 인터페이스를 지정
-w, --watch : 테스트 대상 파일들을 감시


```javascript
describe('hooks', function() {
  before(() => {
    //블록 안에 첫번 째 테스트가 실행되기 전에 단 한번 실행console.log("####before");
  });

  after(() => {
    //블록 안에 테스트가 모두 끝난 후 단 한번 실행console.log("####after");
  });

  beforeEach(() => {
    //블록 안에 테스트들이 실행되기 전마다 실행console.log("####beforeEach");
  });

  afterEach(() => {
    //블록 안에 테스트들이 끝날 때마다 실행console.log("####afterEach");
  });

  it("Test 1", () => {
    console.log("####Test1");
  });
  
  it("Test 2", () => {
    console.log("####Test2");
  });
});
```