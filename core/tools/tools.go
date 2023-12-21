// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 22 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package tools

import (
	"bufio"
	"encoding/json"
	"log"
	"os"
	"path"
	"strings"

	"github.com/dablelv/cyan/conv"
	"github.com/dablelv/cyan/file"
)

func IsFileNonExist(filename string) bool {
	return !IsFileExist(filename)
}
func IsFileExist(filename string) bool {
	a, b := file.IsExist(filename)
	if b != nil {
		return false
	} else {
		return a
	}
}
func MkdirFileWithStr(filename string) string {
	_ = MkdirFile(filename)
	return filename
}
func MkdirFile(filename string) error {
	if IsFileExist(filename) {
		return nil
	}
	return os.MkdirAll(filename, os.ModePerm)
}
func ShouldNoErr(e error, label string) {
	if e != nil {
		log.Panic("FATAL_ERROR:" + label + " -> " + e.Error())
	}
}

func ShouldShowWarning(e error, label string) {
	if e != nil {
		log.Print("FATAL_WARNING:" + label + " -> " + e.Error())
	}
}
func JoinWithMkdir(arg ...string) error {
	newpath := path.Join(arg...)
	err := MkdirFile(newpath)
	if err != nil {
		return err
	}
	return nil
}

func ReadFileAsStr(filename string) (string, error) {
	s, a := os.ReadFile(filename)
	if a != nil {
		return "", a
	} else {
		return strings.TrimSpace(string(s)), nil
	}
}

// func ConvertUnixPathToWindowsPathWithDiskLetter(path string) string {
// return	"C:\\Users\\jerrylai\\hmproject\\laf-tools"
// }
func ReadFileAsStrWithNoTrim(filename string) (string, error) {
	s, a := os.ReadFile(filename)
	if a != nil {
		return "", a
	} else {
		return string(s), nil
	}
}

func ReadFileAsBytes(filename string) ([]byte, error) {
	s, a := os.ReadFile(filename)
	if a != nil {
		return nil, a
	} else {
		return s, nil
	}
}

func ToAnyString(obj interface{}) string {
	a, err := conv.ToStringE(obj)
	if err != nil {
		return err.Error()
	}
	return a
}
func ReadJSONFileWithFatal(filename string) map[string]string {
	fileStr, err := ReadFileAsBytes(filename)
	ShouldNoErr(err, "unable to parse this file: "+filename)
	var obj map[string]string
	err2 := json.Unmarshal(fileStr, &obj)
	ShouldNoErr(err2, "Unable to parse its JSON: "+filename)
	return obj
}

type JSONRes = map[string]string

func ReadJSONFile(filename string) (JSONRes, error) {
	fileStr, err := ReadFileAsBytes(filename)
	ShouldNoErr(err, "unable to parse this file: "+filename)
	if err != nil {
		return nil, err
	}
	var obj map[string]string
	err2 := json.Unmarshal(fileStr, &obj)
	if err2 != nil {
		return nil, err2
	}
	return obj, nil
}
func ReadPropertiesFile(filename string) (map[string]string, error) {
	config := map[string]string{}

	if len(filename) == 0 {
		return config, nil
	}
	file, err := os.Open(filename)
	if err != nil {
		log.Panic(err)
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if equal := strings.Index(line, "="); equal >= 0 {
			if key := strings.TrimSpace(line[:equal]); len(key) > 0 {
				value := ""
				if len(line) > equal {
					value = strings.TrimSpace(line[equal+1:])
				}
				config[key] = value
			}
		}
	}

	if err := scanner.Err(); err != nil {
		log.Panic(err)
		return nil, err
	}

	return config, nil
}
