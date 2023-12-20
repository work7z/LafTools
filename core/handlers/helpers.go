// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
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
	"errors"
	"laftools-go/core/context"

	"github.com/gin-gonic/gin"
)

func AnyIsFalse(arr ...bool) bool {
	for _, b := range arr {
		if !b {
			return true
		}
	}
	return false
}
func IncompleteParam(wc context.WebContext) {
	HasErrorS(wc, wc.Dot("1719", "Incomplete request parameter"))
}
func HasErrorS(wc context.WebContext, e string) bool {
	return HasError(wc, errors.New(e))
}
func HasError(wc context.WebContext, e error) bool {
	if e != nil {
		ErrLa(wc.GinContext, e)
		return true
	} else {
		return false
	}
}

type GoResponseType = map[string]any

func DoValueRes(anyItem interface{}) GoResponseType {
	return gin.H{
		"value": anyItem,
	}
}

func DoListRes(anyItem interface{}) GoResponseType {
	return gin.H{
		"list": anyItem,
	}
}

func DoValueResForWS(statusCode int, typeStr string, anyItem interface{}) GoResponseType {
	return gin.H{
		"type":   typeStr,
		"status": statusCode,
		"value":  anyItem,
	}
}
