package main

import (
	"fmt"
	"testing"
)

type ErrNegativeSqrt float64

func Sqrt2(x float64) (float64, error) {
	if x < 0 {
		return 0, ErrNegativeSqrt(x)
	}

	return Sqrt(x), nil
}

func (e ErrNegativeSqrt) Error() string {
	// 무한루프 case
	// return fmt.Sprintf("cannot Sqrt negative number: %s", e)
	return fmt.Sprintf("cannot Sqrt negative number: %f", float64(e))
}

func TestSqrt2(t *testing.T) {
	fmt.Println(Sqrt2(2))
	fmt.Println(Sqrt2(-2))
}
