// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
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

package middleware

import (
	gconfig "laftools-go/core/config"
	"laftools-go/core/handlers/config"
	"strings"
)

func Auth(headerClientToken, fullPath string) bool {

	allowURLDefinitions := config.Fn_GetAllowURLDefinitions()
	isThisPathCanbeSkipped := false
	for _, definition := range allowURLDefinitions {
		if fullPath == "" || fullPath == "/" {
			isThisPathCanbeSkipped = true
		}
		if strings.Index(fullPath, config.FormatThatPathGlobally(definition)) == 0 {
			isThisPathCanbeSkipped = true
		}
		if strings.Index(fullPath, definition) == 0 {
			isThisPathCanbeSkipped = true
		}
		if isThisPathCanbeSkipped {
			break
		}
	}
	if !isThisPathCanbeSkipped {
		_, userObj_f := gconfig.GetItemByTokenDirectly(headerClientToken)
		if !userObj_f {
			return false
		}
	}
	return true

}
