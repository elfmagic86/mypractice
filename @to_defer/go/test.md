# 테스트

## 테스트 작성 룰
  - xxx_test.go(ex: reverse_test.go)
  - import "testing"
  - TestXxxx(ex: func TestReverse(t *testing.T) {)
  - error(ex: t.Errorf("Reverse(%q) == %q, want %q", c.in, got, c.want))

## 테스트 실행
  ```sh
  go test
  ```


