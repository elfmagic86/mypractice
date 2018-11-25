# flow controll

- if: 소괄호 없음, 중괄호 필수
  - if v := math.Pow(x, n); v < lim {
    - 짧은 문장을 실행 가능.(비교하기전)
    - 짧은 문장의 변수는 if-else 블록 스코프로 한정됨

- switch
  - 예1
    fmt.Print("Go runs on ")
    // if랑비슷하게 짧은문장가능
    switch os := runtime.GOOS; os {
    case "darwin":
      fmt.Println("OS X.")
    case "linux":
      fmt.Println("Linux.")
    default:
      // freebsd, openbsd,
      // plan9, windows...
      fmt.Printf("%s.", os)
    }

  - 예2
    Switch cases evaluate cases from top to bottom, stopping when a case succeeds.

    (For example,

    switch i {
    case 0:
    case f():
    }
    does not call f if i==0.)

  - 예3
    t := time.Now()
    // switch true { 와 같음
    switch {
    case t.Hour() < 12:
      fmt.Println("Good morning!")
    case t.Hour() < 17:
      fmt.Println("Good afternoon.")
    default:
      fmt.Println("Good evening.")
    }

  - 타언어와 차이
    - Go only runs the selected case, not all the cases that follow. In effect, the break statement that is needed at the end of each case in those languages is provided automatically in Go
    - Another important difference is that Go's switch cases need not be constants, and the values involved need not be integers.

  - 타입 스위치
    switch v := i.(type) {
    case T:
        // here v has type T
    case S:
        // here v has type S
    default:
        // no match; here v has the same type as i
    }
