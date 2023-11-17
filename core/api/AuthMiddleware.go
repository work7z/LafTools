// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 28 Sep 2023
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

import (
	"codegen-go/core/config"
	"codegen-go/core/context"
	"codegen-go/core/log"
	"codegen-go/core/url"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(c *gin.Context) {
	fullPath := c.FullPath()
	log.Ref().Debug("full path: ", fullPath)
	webContext := &context.WebContext{GinContext: c}
	headerClientToken := webContext.GetHeaderClientToken()

	isThatPassable := auth(headerClientToken, fullPath)
	if !isThatPassable {
		log.Ref().Warn("Invalid token from client: ", headerClientToken)
		ErrLa2(c, "INVALID_TOKEN_ERROR")
		return
	} else {
		c.Next()
	}

}
func auth(headerClientToken, fullPath string) bool {

	allowURLDefinitions := url.Fn_GetAllowURLDefinitions()
	isThisPathCanbeSkipped := false
	for _, definition := range allowURLDefinitions {
		if fullPath == "" || fullPath == "/" {
			isThisPathCanbeSkipped = true
		}
		if strings.Index(fullPath, url.FormatThatPathGlobally(definition)) == 0 {
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
		_, userObj_f := config.GetItemByTokenDirectly(headerClientToken)
		if !userObj_f {
			return false
		}
	}
	return true

}
