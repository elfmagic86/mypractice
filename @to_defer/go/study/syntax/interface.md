# interface

- 
- 인터페이스 선언부는 메소드에 암시적으로 구현되므로 명시적인 선언 필요없음.
- 값이 (value, 구체type)인 튜플로 구성됨
  ex)  (&{Hello}, *main.T)

- nil인 구체타입 사용시
  https://tour.golang.org/methods/12
    var t *T
    var i I
    i.M() // nil 에러, 구체타입이 nil이기에 구현메서드도 찾을수없음
    i = t
    i.M() // nil 에러안남. nil처리는 보통 M메서드에서 함

- The empty interface
  - 알수없는 타입처리, 메서드 없음

  - 문법
    var i interface{}
    func describe(i interface{}) {

  - 알수없는 타입 추정하여 사용(type assertion)
    // ok는 해당타입이 맞는지 T/F 값을 제공하여 사용하기 전에 체크할수있음
    // 해당타입이 아니라면 각 타입의 기본값 반환
    s, ok := i.(string)
    fmt.Println(s, ok)

    // ok를 안쓰면 해당타입이 아닐 경우 에러남.
    f := i.(float64)
    fmt.Println(f, ok)

  - 타입스위치
    func do(i interface{}) {
      // 여기서 type은 keyword
      switch v := i.(type) {
      case T:
          // here v has type T
      case S:
