package main

import (
	"fmt"
	"testing"
)

// https://tour.golang.org/moretypes/26
func fibonacci() func() int {
	cur := 0
	prev := 1

	return func() int {
		defer func() {
			prev, cur = cur, prev+cur
		}()
		return cur
	}
}

func TestFib(t *testing.T) {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}
