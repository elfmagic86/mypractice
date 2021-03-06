# beginner

## jwt 기본

<https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e>

- jwt 기본형태
  `header.payload.verify signature`
  header: 알고리즘, 토큰타입
  payload: json 데이터
  verify signature: 아래의 `secretOrPrivateKey`로 signing된 signature

- 기본동작
  <https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback>
  > 서버에서 jwt를 생성하고 클라이언트는 서버에게 받은 jwt를 쿠키등에 유지함.
  > 차후 클라이언트는 서버에 어떤 요청시 jwt를 함께 보내며 서버는 verify를 통해 변질된 요청인지 판별함

  1. jwt.sign(payload, secretOrPrivateKey, [options, callback])
    비밀키 or 개인키 sign된 서명이 포함된 jwt 생성

  2. jwt.verify(token, secretOrPublicKey, [options, callback])
    비밀키 or 공개키로 유효한 서명인지 확인 후 decode한 값을 반환해줌(실패시 err or null)

  3. jwt.decode(token [, options])
    서명 검증없이 jwt의 header와 payload를 decode한 값
    유효성 보장할 수 없으니 사용에 주의

- secretOrPrivateKey(비밀키 or 개인키/공개키)
  - 비밀키를 사용할 경우: 어떤문자열

  - 개인키/공개키를 사용할 경우:
    sign에 개인키를 사용하고
    verify에 공개키를 사용함

## jwt.io -> debugger UI 사용예(비밀키)

- jwt가 유효한지 확인할때
  1. Decoded -> verify signature의
    your-256-bit-secret 대신 비밀키(ex: secret)를 먼저 입력함

  2. Encoded PASTE A TOKEN HERE에 JWT를 붙여넣기함
      Signature Verified라고 하단에 나오면 정상

- 유효한 jwt를 만들때
  1. 위의 Decoded -> verify signature에 비밀키입력
  2. payload값적절히 변경
      - Invalid Signature이 계속나오면 Encoded PASTE의 jwt를 그대로 복사/붙여넣기를 해주면 사라짐
      - 참고로 `signature`값은 비밀키가 같더라도 payload가 다를 경우 다른값 생성됨

## TODO

다른 세부옵션들
  토큰 만기
  청중? 사이트?

- https://jwt.io/
- http://lazyhoneyant.tistory.com/2

- 절차
  https://velopert.com/2350

- oauth, jwt
  https://swalloow.github.io/implement-jwt
  >  JWT는 토큰 유형이고 OAuth는 토큰을 발급하고 인증하는 방법을 설명하는 일종의 프레임워크입니다

- http://throughkim.kr/2017/03/14/Jwt/

- 안전
  https://medium.com/@OutOfBedlam/jwt-%EC%9E%90%EB%B0%94-%EA%B0%80%EC%9D%B4%EB%93%9C-53ccd7b2ba10

- 사용해야할까?
  https://blog.outsider.ne.kr/1160
