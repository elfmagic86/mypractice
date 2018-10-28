package main

import (
	"strings"
	"testing"

	"golang.org/x/tour/wc"
)

func WordCount(s string) map[string]int {
	countMap := make(map[string]int)
	for _, word := range strings.Fields(s) {
		_, hasKey := countMap[word]
		if !hasKey {
			countMap[word] = 0
		}
		countMap[word] = countMap[word] + 1
	}

	return countMap
}

func TestMap(t *testing.T) {
	wc.Test(WordCount)
}
