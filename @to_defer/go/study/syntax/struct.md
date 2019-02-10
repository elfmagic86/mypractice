# 구조체

struct는 필드의 조합, type 선언으로 struct의 이름 지정

- 리터럴
  type Vertex struct {
    X, Y int
  }

  var (
    v1 = Vertex{1, 2}  // has type Vertex
    v2 = Vertex{X: 1}  // Y:0 is implicit
    v3 = Vertex{}      // X:0 and Y:0
    p  = &Vertex{1, 2} // has type *Vertex
  )

