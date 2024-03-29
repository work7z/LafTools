// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 12 Oct 2023
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

package ext

import (
	"laftools-go/core/handlers/context"
	"laftools-go/core/project/base/form"
	"laftools-go/core/project/tools"
	"testing"
)

func TestFuncMapForEachExtVM(t *testing.T) {
	ctx := context.WebContext{}
	// allExtVM := GetAllExtVM(&ctx)
	// check the FuncMap output
	allMap := tools.GetAllFunctionMap(&ctx)

	for funcName, funcValue := range allMap {
		res := funcValue.ConvertText(form.ValueReq{
			InputText: "test, this is testing 中文",
		})
		if res.Err != nil {
			t.Error(res.Err)
		}
		t.Log("[NORMAL] funcName", funcName)
	}
}
