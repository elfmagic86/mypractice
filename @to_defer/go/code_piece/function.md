# function

- Multiple results
- Named return values
  func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
  }

  func main() {
    fmt.Println(split(17))
  }

- funcion values
  func compute(fn func(float64, float64) float64) float64 {
    return fn(3, 4)
  }
  hypot := func(x, y float64) float64 {
    return math.Sqrt(x*x + y*y)
  }
  fmt.Println(hypot(5, 12))

- function closures
  - java와 다르게 mutation
