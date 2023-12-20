// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 20 Sep 2023
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

package handlers

import (
	"laftools-go/core/global"
	"path"
	"testing"

	"github.com/dablelv/cyan/file"
)

func TestSystemRouter(t *testing.T) {
	// r := gin.Default()
	// ConfigSystemRouter(r)
	// // t.Log("handlers ", r.Handlers)
	// for _, info := range r.Routes() {
	// 	t.Log("info path:", info.Path)
	// 	if strings.Index(info.Path, url.CONFIG_URL_PUBLIC_BASE_PREFIX) == 0 {
	// 		t.Log("URL Matched.")
	// 	} else {
	// 		if info.Path != "/"  {
	// 			t.Fatal("Invalid path, that does not start with expectation. The path " + info.Path + " should start with " + url.CONFIG_URL_PUBLIC_BASE_PREFIX)
	// 		}
	// 	}
	// }
}

func TestStaticNonProhibitedAccessible(t *testing.T) {
	filesList := []string{
		"menu.json",
	}

	for i := range filesList {
		exist, err := file.IsExist(path.Join(global.GetResourceNonProhibitedDir(), filesList[i]))
		if err != nil {
			t.Error(err)
			return
		}
		if !exist {
			t.Error("file not found under " + global.GetResourceNonProhibitedDir())
		}
	}
}
