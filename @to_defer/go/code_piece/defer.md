# defer

- node의 event loop(FIFO queue)와 비슷하지만 LIFO stack으로 동작
  - https://blog.golang.org/defer-panic-and-recover
  > Defer is commonly used to simplify functions that perform various clean-up actions.

    1. A deferred function's arguments are evaluated when the defer statement is evaluated.
      func a() {
          i := 0
          // print "0"
          defer fmt.Println(i)
          i++
          return
      }

    2. Deferred function calls are executed in Last In First Out order after the surrounding function returns.
      //This function prints "3210":
      func b() {
          for i := 0; i < 4; i++ {
              defer fmt.Print(i)
          }
      }

    3. Deferred functions may read and assign to the returning function's named return values.
      // return 2
      func c() (i int) {
          defer func() { i++ }()
          return 1
      }

TODO 위 링크에서 설명하는 panic, recover 예시
