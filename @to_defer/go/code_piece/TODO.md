# TODO

- data type
  bool

  string

  int  int8  int16  int32  int64
  uint uint8 uint16 uint32 uint64 uintptr

  byte // uint8의 다른 이름(alias)

  rune // int32의 다른 이름(alias)
      // 유니코드 코드 포인트 값을 표현합니다. 

  float32 float64

  complex64 complex128

- 전위증감연산자가 없다?

- new 함수
  new(T) 는 모든 필드가 0(zero value) 이 할당된 T 타입의 포인터를 반환합니다.
  ( zero value 는 숫자 타입에서는 0 , 참조 타입에서는 nil 을 뜻합니다 )
  var t *T = new(T)
