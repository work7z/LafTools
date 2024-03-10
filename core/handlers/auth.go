// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
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
	"laftools-go/core/handlers/context"
	"laftools-go/core/handlers/middleware"
	"laftools-go/core/log"

	"github.com/gin-gonic/gin"
)

func authMiddleware(c *gin.Context) {
	fullPath := c.FullPath()
	log.Ref().Debug("full path: ", fullPath)
	webContext := &context.WebContext{GinContext: c}
	headerClientToken := webContext.GetHeaderClientToken()

	isThatPassable := middleware.Auth(headerClientToken, fullPath)
	if !isThatPassable {
		log.Ref().Warn("Invalid token from client: ", headerClientToken)
		ErrLa2(c, "INVALID_TOKEN_ERROR")
		return
	} else {
		c.Next()
	}

}
