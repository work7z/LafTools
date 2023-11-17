// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 11 Oct 2023
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

package nocycle

import (
	"encoding/json"
	"io/ioutil"

	"github.com/samber/lo"
)

var UNIT_TEST_SERVER_MODE bool
var HTTP_PORT_ONCE_SET int
var NodeWSToken = GetRandomString(32)

func AssignJSONToObj(prevObj interface{}, returnValue interface{}) error {
	str, er2 := json.Marshal(prevObj)
	if er2 != nil {
		return er2
	}
	er3 := json.Unmarshal(str, &returnValue)
	if er3 != nil {
		return er3
	}
	return nil
}

func GetRandomString(length int) string {
	return lo.RandomString(int(length), lo.UpperCaseLettersCharset)
}

func CheckStr(m string) (string, bool) {
	return m, lo.IsNotEmpty(m)
}

// write a function for WriteStrIntoFile
func WriteStrIntoFile(filename string, content string) error {
	return WriteBytesIntoFile(filename, []byte(content))
}

func WriteBytesIntoFile(filename string, content []byte) error {
	return ioutil.WriteFile(filename, content, 0644)
}