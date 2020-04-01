# memo

- doc은 어디에 있는지.
  guide말고 doc과 api문서위치.
  메인페이지 우측의 `4.2.3  Reference | API` 이 원하는 문서의 링크임.
  https://projects.spring.io/spring-security/

  - RestTemplate의 uri encoding
     - restTemplate 요청시 url이 인코딩됨(strictEncoding이 default false이기 때문) 
     - UriComponents의 default encoding은 UTF-8

   기본 url인코딩을 막고, 커스텀 인코딩을 사용하기 위해 아래와 같은 방법이있음.
   참고: https://goni9071.tistory.com/entry/Spring-RestTemplate-Request-Parameter-Encoding
  ```

  RestTemplate restTemplate = new RestTemplate();
  DefaultUriTemplateHandler uriTemplateHandler = (DefaultUriTemplateHandler) restTemplate.getUriTemplateHandler();
   // 기본 encode 사용안함
   // DefaultUriTemplateHandler > return builder.buildAndExpand(uriVariables).encode();
  uriTemplateHandler.setStrictEncoding(true);

  // api call
  String result = restTemplate.getForObject(url, String.class);
  ```

- TODO 중첩 트랜잭션에서 예외 처리(catch한 예외)와 롤백 여부
http://woowabros.github.io/experience/2019/01/29/exception-in-transaction.html
  - 트랜잭션이 root와 참여한 sub로 구성되었을 경우 sub가 롤백 마킹을 할수잇ㅇ므
    root완료시 전파설정과 런타임상의 마킹상태가 실제 롤백여부 결정
