package main

import (
	"fmt"
	"math"
	"testing"
)

// http://go-tour-kr.appspot.com/#23
func Sqrt(x float64) float64 {
	const initZ float64 = 1

	z := initZ
	for i := 10; i >= 0; i-- {
		z = z - (z*z-x)/(2*z)
	}

	return z
}

func TestSeq(t *testing.T) {
	fmt.Println("math.Sqrt: ", math.Sqrt(2))
	fmt.Println("tour sqrt: ", Sqrt(2))
}
