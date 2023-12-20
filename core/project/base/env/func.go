package env

import (
	"fmt"
	"os"
	"path"
	"runtime"
)

func GetEnvValueForLafToolsRoot() string {
	a := os.Getenv("LAFTOOLS_ROOT")
	if a != "" {
		return a
	}
	_, file, line, ok := runtime.Caller(0)
	if ok {
		fmt.Printf("File: %s, Line: %d\n", file, line)
		return path.Join(path.Dir(file), "..", "..")
	} else {
		fmt.Println("Could not get location")
	}
	return ""
}
