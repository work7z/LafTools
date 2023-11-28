package main

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"laftools-go/core/log"
	"laftools-go/core/nocycle"
	"os"
	"path"
	"time"

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
	// current dirname
	log.Ref().Debug("OK")
	log.InternalLog.SetFormatter(&logrus.TextFormatter{})
	translateResultDir := getTranslateResultDir()
	// get raw.json in translateResultDir
	rawJsonPath := path.Join(translateResultDir, "raw.json")
	configJsonPath := path.Join(translateResultDir, "config.json")
	// unmarshal rawJsonPath as map[string]string
	// key: "en" value: "text"
	rawMap := make(map[string]string)
	configMap := make(map[string]string)
	rawJSONPathStr, _ := nocycle.ReadFileAsBytes(rawJsonPath)
	configJSONPathStr, _ := nocycle.ReadFileAsBytes(configJsonPath)
	json.Unmarshal(rawJSONPathStr, &rawMap)
	json.Unmarshal(configJSONPathStr, &configMap)
	log.Ref().Debug(rawMap)
	id := configMap["id"]
	cacheDir := nocycle.MkdirFileWithStr(path.Join(translateResultDir, "cache", id))
	langList := []string{"zh-CN", "zh-HK"}
	for _, eachLang := range langList {
		// for each rawMap
		for k, v := range rawMap {
			fmt.Println("k: ", k+" -> v:", v)
			// get md5 for k+v
			// if md5 file exists, skip
			// if md5 file not exists, translate
			// write md5 file
			// write translate result to file
			md5Str := fmt.Sprintf("%x", md5.Sum([]byte(k+v)))
			md5FilePath := nocycle.MkdirFileWithStr(path.Join(cacheDir, eachLang, md5Str))
			var resultForCurrentLang string
			if nocycle.IsFileExist(md5FilePath) {
				result2, err2 := nocycle.ReadFileAsStr(md5FilePath)
				if err2 != nil {
					log.InternalLog.Panic("err", err2)
				}
				resultForCurrentLang = result2
			}
			resultForCurrentLang, err := translateNow(v, eachLang)
			if err != nil {
				log.InternalLog.Panic("err", err)
			}
			fmt.Println(resultForCurrentLang)

		}

	}
}

func getTranslateResultDir() string {
	tmpDir := path.Join(LAFTOOLS_ROOT, "dev", "scripts", "scan", "tmp-translate-result")
	os.MkdirAll(tmpDir, os.ModePerm)
	return tmpDir
}

func translateNow(text, targetLang string) (string, error) {
	time.Sleep(1 * time.Second)
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
