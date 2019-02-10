# loop

- 반복문
  - for만 존재, 소괄호() 없음
  - 무한루프: for {}
  - while: for i < 100 {}

- range
  var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
  for i, v := range pow {
      fmt.Printf("2**%d = %d\n", i, v)
  }
  
  for _, value := range pow {
    fmt.Printf("%d\n", value)
  }
