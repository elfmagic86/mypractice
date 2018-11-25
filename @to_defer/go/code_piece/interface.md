# interface

- The empty interface
  용도는?
    Empty interfaces are used by code that handles values of unknown type.  

  var i interface{}
  func describe(i interface{}) {

  - 제로 인터페이스 사용
    // ok는 해당타입이 맞는지 T/F 값을 제공하여 사용하기 전에 체크할수있음
    // 해당타입이 아니라면 각 타입의 기본값 반환
    s, ok := i.(string)
    fmt.Println(s, ok)

    // ok를 안쓰면 해당타입이 아닐 경우 에러남.
    f := i.(float64)
    fmt.Println(f, ok)


- 예제코드(https://tour.golang.org/methods/9)
  - 사용법은 아래와 같음
    인터페이스 선언부는 메소드에 암시적으로 구현되므로 명시적인 선언 필요없음.

  - method `func (v *Vertex) Abs() float64 {`는 *Vertex타입이에 인터페이스 구현되어있음 주의

  package main

  import (
    "fmt"
    "math"
  )

  type Abser interface {
    Abs() float64
  }

  func main() {
    var a Abser = MyFloat(-math.Sqrt2)
    f := MyFloat(-math.Sqrt2)
    v := Vertex{3, 4}

    a = f  // a MyFloat implements Abser
    a = &v // a *Vertex implements Abser

    // In the following line, v is a Vertex (not *Vertex)
    // and does NOT implement Abser.
    a = v

    fmt.Println(a.Abs())
  }

  type MyFloat float64

  func (f MyFloat) Abs() float64 {
    if f < 0 {
      return float64(-f)
    }
    return float64(f)
  }

  type Vertex struct {
    X, Y float64
  }

  func (v *Vertex) Abs() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
  }
