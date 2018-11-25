# methods

## 주의

- 포인터 차이
  - Methods with pointer receivers
    포인터 복사.
    `(v *Vertex) Scale`의 변경값은 전달된 객체에 반영됨

  - Methods with value receivers
    새 객체를 값복사해서 사용함,
    `(v Vertex) Scale`의 변경된 값은 새 객체에 반영됨.

    - C++ 복사생성자, 복사대입연산자 로 생각할것.
      `Vertex newV = oldV`도 같은 동작으로 생각하면됨.

  - 어떤경우에 pointer receiver를 사용할까
    The first is so that the method can modify the value that its receiver points to.
    The second is to avoid copying the value on each method call. This can be more efficient if the receiver is a large struct

## code

- methods on types
  type Vertex struct {
    X, Y float64
  }

  func (v Vertex) Abs() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
  }

  func (v *Vertex) Scale(f float64) {
    v.X = v.X * f
    v.Y = v.Y * f
  }

  v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v)
	fmt.Println(v.Abs())

- Pointer receivers
  
