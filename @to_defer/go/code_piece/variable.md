# variable


- 변수/상수  var/const
  const Truth = true  // 대문자
  
- zero values
  - primitive type ??
    0 for numeric types,
    false for the boolean type, and
    "" (the empty string) for strings.
      var i int
      var f float64
      var b bool
      var s string
      fmt.Printf("%v %v %v %q\n", i, f, b, s)

  - ?? type
    nill
      // pointer, array, slice, map
      var p *int
      var arr [10]int
      var aSlice []int
      var aMap map[string]int

- sault
  - 선언시, 초기값 할당하면 타입생략가능
  - := 은 sault(함수내 변수, 할당이므로 타입 생략, var를 의미함)

- 여럿 선언
  var (
    ToBe   bool       = false
    MaxInt uint64     = 1<<64 - 1   // 2^64 -1
    z      complex128 = cmplx.Sqrt(-5 + 12i)
  )

- 타입변환
  The expression T(v) converts the value v to the type T.

  - todo: 암시적 형변환은 항상 에러인듯?
