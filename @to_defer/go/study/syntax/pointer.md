# pointer

  - The & operator generates a pointer to its operand(피연산자).
    i := 42
    p = &i

  - The * operator denotes(의미하다/나타내다) the pointer's underlying value.(기본값)
    fmt.Println(*p) // read i through the pointer p
    *p = 21         // set i through the pointer p

    This is known as "dereferencing" or "indirecting".
    이를 "역 참조"또는 "간접"이라고합니다.
    Unlike C, Go has no pointer arithmetic
    C와 달리 Go에는 포인터 연산이 없습니다.

  - 인터프리터 포인터 관련 salut주의
    - p.X -> (*p).X
      a := v
      b := &v
      fmt.Println(a, b)  // {4 2} &{4 2}
      fmt.Println(a.X, b.X) // 4 4

      // struct 포인터 p가있을 때 구조체의 X 필드에 액세스하려면 (* p) .X를 쓸 수 있습니다. 그러나 그 표기법은 번거롭기 때문에 명시 적 역 참조없이 p.X로만 작성할 수 있습니다.
      fmt.Println(a.X, (*b).X) // 4 4



    - method 일경우만 v.Scale(5) -> (&v).Scale(5) 변환
      type Vertex struct {
        X, Y float64
      }

      // 메소드이기에 아래표현 둘다 가능
      // 1. v.Scale(3)
      // 2. (&v).Scale(3)
      func (v *Vertex) Scale(f float64) {
        v.X = v.X * f
        v.Y = v.Y * f
      }

      // 함수이기에 명시적으로 포인터 전달해야함(인터프리터가 변환안해줌)
      // 1. v.Scale(3) // 컴파일 에러
      // 2. (&v).Scale(3)
      func ScaleFunc(v *Vertex, f float64) {
        v.X = v.X * f
        v.Y = v.Y * f
      }

      // 유사케이스로 arg가 v Vertex일경우, 아래와 같은 변환을 지원해줌
      //  p.Abs() is interpreted as (*p).Abs().
