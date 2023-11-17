// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 5 Oct 2023
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

package api

import "github.com/gin-gonic/gin"

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