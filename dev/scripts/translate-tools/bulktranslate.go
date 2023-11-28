package main

import (
	"fmt"
	"laftools-go/core/log"
	"os"
	"path"

	"github.com/dlclark/regexp2"

	"github.com/sirupsen/logrus"
)

var LAFTOOLS_ROOT string = os.Getenv("LAFTOOLS_ROOT")

type TranslateConfig struct {
	Type    string
	Prefix  string
	Target  string
	Pattern *regexp2.Regexp
	Dir     string
}

func main() {
	// current dirname
	log.Ref().Debug("OK")
	log.InternalLog.SetFormatter(&logrus.TextFormatter{})
	translateResultDir := getTranslateResultDir()
	log.Ref().Debug("translateResultDir: %s", translateResultDir)
	allConfig := getAllTranslateConfig()
	log.Ref().Debug("all-config size: ", len(allConfig))
}

func beGOOD(idx int) string {
	return fmt.Sprintf("((?<![\\\\])['\"`])((?:.(?!(?<![\\\\])\\1))*.?)\\%d", idx)
}

func getAllTranslateConfig() []TranslateConfig {
	baseDIR := "/Users/jerrylai/mincontent/PersonalProjects/laftools-go"
	webDIR := path.Join(baseDIR, "sub", "web")
	nodeDIR := path.Join(baseDIR, "sub", "node")
	commonText := regexp2.MustCompile(`Dot\s*\(\s*`+beGOOD(1)+`\s*,\s*`+beGOOD(3), 0)

	return []TranslateConfig{
		{
			Type:    "go",
			Prefix:  ".Dot(",
			Target:  path.Join(baseDIR, "resources", "lang"),
			Pattern: commonText,
			Dir:     path.Join(baseDIR, "core"),
		},
		{
			Type:    "ts",
			Prefix:  "Dot(",
			Target:  path.Join(webDIR, "public", "static", "lang"),
			Pattern: commonText,
			Dir:     path.Join(webDIR, "src"),
		},
		{
			Type:    "ts",
			Prefix:  "Dot(",
			Target:  "/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal/public/static/lang",
			Pattern: commonText,
			Dir:     "/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal/src",
		},
		{
			Type:    "ts",
			Prefix:  "Dot(",
			Target:  path.Join(nodeDIR, "src", "lang"),
			Pattern: commonText,
			Dir:     path.Join(nodeDIR, "src"),
		},
		{
			Type:    "ts",
			Prefix:  "Dot(",
			Target:  "/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/resources/lang2",
			Pattern: commonText,
			Dir:     "/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/java/com",
		},
	}
}
func getTranslateResultDir() string {
	a := path.Join(LAFTOOLS_ROOT, "tmp", "translate")
	os.MkdirAll(a, os.ModePerm)
	return a
}

func __ExampleCall() {
	// var text string = `Toggle the visibility of toolbars tabs.`
	// text = "Click to select a file for processing. The toolbox will directly process {0} in service and show the result in the output region."
	// text = "It allows developers to execute various commands, such as running {0}, installing packages, and navigating the file system, all from within the editor. "
	// // you can use "auto" for source language
	// // so, translator will detect language
	// result, _ := gt.Translate(text, "en", "zh-CN")
	// fmt.Println(result)

	// result2, _ := gt.Translate(text, "en", "zh-HK")
	// fmt.Println(result2)

	// result3, _ := gt.Translate(text, "en", "zh-TW")
	// fmt.Println(result3)
	// // Output: "Hola, Mundo!"
}
