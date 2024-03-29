// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 20 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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
