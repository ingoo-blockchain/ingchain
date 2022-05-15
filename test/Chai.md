# Chai
https://www.happykoo.net/@happykoo/posts/63
아까 제가 체이닝을 이용하여 하나의 영어 문장으로 단일 테스트를 작성할 수 있다고 하였습니다.

chai는 다음과 같은 chain들을 제공하여 코드의 가독성을 높이고 좀 더 직관적으로 테스트를 작성할 수 있게 도와줍니다.

실질적으로 테스트 결과에 영향을 미치지는 않고, 하나의 문장으로 만들기 위한 도구라고 생각하면 됩니다.

```
```

- to
- be
- been
- is
- that
- which
- and
- has
- have
- with
- at
- of
- same
- but
- does
- still

예를 들어 { a : 1 }는 a라는 프로퍼티를 가지고 있음을 테스트하고 싶으면 다음과 같이 작성합니다.

```javascript
expect({a : 1}).to.have.own.property('a');
```

