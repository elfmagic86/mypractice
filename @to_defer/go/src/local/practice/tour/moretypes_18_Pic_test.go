package main

import (
	"testing"

	"golang.org/x/tour/pic"

	"bytes"
	"fmt"
	"io"
	"os"
)

// https://tour.golang.org/moretypes/18
func Pic(dx, dy int) [][]uint8 {
	pic := make([][]uint8, dy)
	for y := range pic {
		pic[y] = createPicRow(y, dx)
	}

	return pic
}
func createPicRow(y, rowSize int) []uint8 {
	row := make([]uint8, rowSize)
	for x := range row {
		row[x] = uint8(x * y)
	}
	return row
}

// https://stackoverflow.com/questions/10473800/in-go-how-do-i-capture-stdout-of-a-function-into-a-string
func TestPic(t *testing.T) {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	// run (online에서 확인시 이미지 보여줌)
	pic.Show(Pic)

	// copy
	outC := make(chan string) // chan??
	go func() {
		var buf bytes.Buffer
		io.Copy(&buf, r)
		outC <- buf.String()
	}()

	// restore
	w.Close()
	os.Stdout = old
	out := <-outC

	fmt.Println("========================")
	fmt.Print(out)
	fmt.Println("========================")
}
