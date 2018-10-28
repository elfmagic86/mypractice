# array and slice

## array

The type [n]T is an array of n values of type T.

var a [10]int
primes := [6]int{2, 3, 5, 7, 11, 13}

- 고정크기

## slice

The type []T is a slice with elements of type T.

- A slice does not store any data,
  names := [4]string{
    "John",
    "Paul",
    "George",
    "Ringo",
  }
  fmt.Println(names)

  a := names[0:2]
  b := names[1:3]
  fmt.Println(a, b)

  // 0번째값 변경이 다른 slice에 영향줌(공유)
  b[0] = "XXX"
  fmt.Println(a, b)
  fmt.Println(names)

- a[low : high]
  This selects a half-open range which includes the first element, but excludes the last one.
  fmt.Println("p[1:4] ==", p[1:4])

- 리터럴
	// Create a tic-tac-toe board.
  board := [][]string{
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
    []string{"_", "_", "_"},
  }

- TODO dynamic size array
  b := make([]int, 0, 5) // len(b)=0, cap(b)=5

  b = b[:cap(b)] // len(b)=5, cap(b)=5
  b = b[1:]      // len(b)=4, cap(b)=4

  - append
    s = append(s, 0)
