package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

const debug = true

func check(e error) {
	if e != nil {
		log.Fatal(e)
		//panic(e)
	}
}

func main() {
	if len(os.Args) < 3 {
		xs := strings.Split(os.Args[0], "/")
		name := xs[len(xs)-1]
		fmt.Println(name)
		fmt.Printf("Usage : %s <output filename> <input file 1> (..<input file n>)\n", name)
		return
	}
	outputFilename := os.Args[1]
	fmt.Println("writing into", outputFilename)
	i := 2
	/* @lineCount : start from 1 */
	lineIndex := 0
	/* @lines : map [line content] -> line index */
	lines := make(map[string]int)
	for i <= len(os.Args)-1 {
		name := os.Args[i]
		fmt.Println("reading from", name)
		if file, err := os.Open(name); err != nil {
			// failed to read from the file
			log.Fatal(err)
		} else {
			defer file.Close()
			scanner := bufio.NewScanner(file)
			for scanner.Scan() {
				line := scanner.Text()
				if lines[line] == 0 {
					lineIndex++
					lines[line] = lineIndex
				}
			}
		}
		i += 1
	}
	if file, err := os.Create(outputFilename); err != nil {
		log.Fatal(err)
	} else {
		defer file.Close()
		writer := bufio.NewWriter(file)
		defer writer.Flush()
		for j := 1; j <= lineIndex; j++ {
			finding := true
			for k, v := range lines {
				if finding && j == v {
					if _, err := writer.WriteString(k + "\n"); err != nil {
						log.Fatal(err)
					}
					finding = false
				}
			}
		}
	}
}
