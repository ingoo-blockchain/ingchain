# IngChain 만들어보기.

블록체인이라는 느낌을 받을수있도록,
구현해보기..

> 삽질할 가능성이 높아보입니다.. 기존에 블록까진 해봤으니.. 잘되겠지?

## 1.블록 생성
### 1.1 Block Structure

index : 블록체인의 블록 높이
data : 블록에 포함된 모든 데이터.
timestamp : 타임스탬프
hash : 블록의 내용에서 가져온 sha256 해시
previousHash : 이전 블록의 해시에 대한 참조입니다. 이 값은 이전 블록을 명시적으로 정의합니다.

게시판 데이터를 블록에담는다면 ?..
여기서 분산원장 개념에 대해서 설명과 블록에 대한 정확한 의미를 이해

### 1.2 Block Hash

블록 해시의 중요도, 왜 수정이 안되는지대한 설명 JWT 예시로 설명을 하면 이해가 쉬울것
https://epthffh.tistory.com/entry/SHA256-%EC%9D%B8%EC%BD%94%EB%94%A9-%EC%86%8C%EC%8A%A4


### 1.3 createGenesisBlock

제네시스 블록에 대해서 알수있다, 

### 1.4 createBlock

블록 생성 원리에 대해서 알수있다,

### 1.5 block vaildate

블록의 무결성을 체크한다.

### 1.6 
