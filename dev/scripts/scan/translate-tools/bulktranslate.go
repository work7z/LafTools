package main

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"laftools-go/core/log"
	"laftools-go/core/nocycle"
	"os"
	"path"
	"strings"

	"github.com/dlclark/regexp2"

	gt "github.com/bas24/googletranslatefree"
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
	// get argument xxx from --id=xxx
	// go run ./translate-tools/bulktranslate.go --id=wl
	id := ""
	processArgs := os.Args[1:]
	for _, eachArg := range processArgs {
		if eachArg[:5] == "--id=" {
			id = eachArg[5:]
		}
	}
	fmt.Println("id is ", id)
	// current dirname
	log.InternalLog.SetFormatter(&logrus.TextFormatter{})
	translateResultDir := getTranslateResultDir()
	// get raw.json in translateResultDir
	rawJsonPath := path.Join(translateResultDir, "raw-"+id+".json")
	configJsonPath := path.Join(translateResultDir, "config-"+id+".json")
	// unmarshal rawJsonPath as map[string]string
	// key: "en" value: "text"
	rawMap := make(map[string]string)
	configMap := make(map[string]string)
	rawJSONPathStr, _ := nocycle.ReadFileAsBytes(rawJsonPath)
	configJSONPathStr, _ := nocycle.ReadFileAsBytes(configJsonPath)
	json.Unmarshal(rawJSONPathStr, &rawMap)
	json.Unmarshal(configJSONPathStr, &configMap)
	log.Ref().Debug(rawMap)
	cacheDir := nocycle.MkdirFileWithStr(path.Join(translateResultDir, "cache", id))
	// "zh-TW"
	langList := []string{"zh-HK", "zh-CN"}
	for _, eachLang := range langList {
		crtResultMap := make(map[string]string)
		// for each rawMap
		for k, v := range rawMap {
			fmt.Println("k: ", k+" -> v:", v)
			// get md5 for k+v
			// if md5 file exists, skip
			// if md5 file not exists, translate
			// write md5 file
			// write translate result to file
			md5Str := fmt.Sprintf("%x", md5.Sum([]byte(k+v)))
			nocycle.MkdirFileWithStr(path.Join(cacheDir, eachLang))
			md5FilePath := (path.Join(cacheDir, eachLang, md5Str))
			var resultForCurrentLang string
			fmt.Println("md5FilePath: ", md5FilePath)
			if nocycle.IsFileExist(md5FilePath) {
				fmt.Println("result existed already")
				result2, err2 := nocycle.ReadFileAsStr(md5FilePath)
				if err2 != nil {
					log.InternalLog.Panic("err", err2)
				}
				resultForCurrentLang = result2
			} else {
				fmt.Println("new text received")
				resultForCurrentLang2, err2 := translateNow(v, eachLang)
				if err2 != nil {
					log.InternalLog.Panic("err", err2)
				}
				resultForCurrentLang = resultForCurrentLang2
				fmt.Println(resultForCurrentLang)
				nocycle.WriteStrIntoFile(md5FilePath, resultForCurrentLang)
			}
			resultForCurrentLang = strings.ReplaceAll(resultForCurrentLang, "拉夫工具", "LafTools")
			resultForCurrentLang = strings.ReplaceAll(resultForCurrentLang, "Laf Tools", "LafTools")
			resultForCurrentLang = strings.ReplaceAll(resultForCurrentLang, "LafTools", "LafTools工具箱")
			resultForCurrentLang = strings.ReplaceAll(resultForCurrentLang, " LafTools工具箱 ", "LafTools工具箱")

			// TODO: if enUS-overwrite.json exist this key, then use the defined value
			crtResultMap[k] = resultForCurrentLang
		}
		// write crtResultMap to file
		crtResultMapJson, _ := json.MarshalIndent(crtResultMap, "", "    ")
		crtResultMapJsonPath := path.Join(translateResultDir, "result-"+id+"-"+eachLang+".json")
		nocycle.WriteBytesIntoFile(crtResultMapJsonPath, crtResultMapJson)
	}
	fmt.Println("Done.")
}

func getTranslateResultDir() string {
	tmpDir := path.Join(LAFTOOLS_ROOT, "dev", "scripts", "scan", "tmp-translate-result")
	os.MkdirAll(tmpDir, os.ModePerm)
	return tmpDir
}

func translateNow(text, targetLang string) (string, error) {
	// time.Sleep(1 * time.Second)
	return gt.Translate(text, "en", targetLang)
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
