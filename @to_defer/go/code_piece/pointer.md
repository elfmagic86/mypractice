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

  - TODO -> 없음?

  - struct 관련
    - ex
      a := v
      b := &v
      fmt.Println(a, b)  // {4 2} &{4 2}
      fmt.Println(a.X, b.X) // 4 4

      // struct 포인터 p가있을 때 구조체의 X 필드에 액세스하려면 (* p) .X를 쓸 수 있습니다. 그러나 그 표기법은 번거롭기 때문에 명시 적 역 참조없이 p.X로만 작성할 수 있습니다.
      fmt.Println(a.X, (*b).X) // 4 4

