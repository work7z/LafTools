// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 18 Oct 2023
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
	"os"
	"testing"
)

func TestMergeTwoJSONs(t *testing.T) {
	originalJSON := `{"name": "John", "age": 30,"b": {"a": 1,"aaa": 39}}`
	targetJSON := `{"age": 35, "city": "New York","b": {"aaa": [1,2,3]}}`
	expectedResult := `{"age":35,"b":{"a":1,"aaa":[1,2,3]},"city":"New York","name":"John"}`

	result, err := MergeTwoJSONs(originalJSON, targetJSON)
	if err != nil {
		t.Errorf("MergeTwoJSONs returned an error: %v", err)
	}

	if result != expectedResult {
		t.Errorf("MergeTwoJSONs returned unexpected result: got %v, want %v", result, expectedResult)
	}
}

func TestWriteJSONToFile(t *testing.T) {
	// Create temporary file
	file, err := os.CreateTemp("", "test.json")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(file.Name())

	// Write initial JSON data to file
	initialData := map[string]interface{}{
		"name": "Alice",
		"age":  30,
	}
	err = WriteObjectIntoFileWithMergeChecking(file.Name(), initialData)
	if err != nil {
		t.Fatal(err)
	}

	// Write new JSON data to file
	newData := map[string]interface{}{
		"name":  "Bob",
		"email": "bob@example.com",
	}
	err = WriteObjectIntoFileWithMergeChecking(file.Name(), newData)
	if err != nil {
		t.Fatal(err)
	}

	// Read final JSON data from file
	finalDataBytes, err := os.ReadFile(file.Name())
	if err != nil {
		t.Fatal(err)
	}
	var finalData map[string]interface{}
	err = json.Unmarshal(finalDataBytes, &finalData)
	if err != nil {
		t.Fatal(err)
	}

	// change reflect.DeepEqual into checking JSON fields one by one
	if string(finalDataBytes) != `{"age":30,"email":"bob@example.com","name":"Bob"}` {
		t.Errorf("Unexpected final data: %v", string(finalDataBytes))
	}

}
