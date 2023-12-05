// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 5 Dec 2023
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
	"laftools-go/core/context"
	"sync"

	"github.com/gin-gonic/gin"
)

var tmpReducerValueMap map[string]interface{} = make(map[string]interface{})
var lock = &sync.Mutex{}

func API_Sync_Reducer_Get(c *gin.Context) {
	lock.Lock()
	defer lock.Unlock()
	// get reducer
	reducerName := c.Param("name")
	wc := context.NewWC(c)
	crtKey := reducerName + wc.GetUserID() + wc.GetWorkspaceID()
	reducer := tmpReducerValueMap[crtKey]
	if reducer == nil {
		c.JSON(404, gin.H{
			"error": "Reducer not found",
		})
		return
	}
	// get state
	OKLa(c, DoValueRes(reducer))
}

func API_Sync_Reducer_Save(c *gin.Context) {
	lock.Lock()
	defer lock.Unlock()

	// get reducer
	reducerName := c.Param("name")
	wc := context.NewWC(c)
	crtKey := reducerName + wc.GetUserID() + wc.GetWorkspaceID()
	// get state
	var state interface{}
	if err := c.BindJSON(&state); err != nil {
		ErrLa(c, err)
		return
	}
	// save state
	tmpReducerValueMap[crtKey] = state
	OKLa(c, DoValueRes("saved"))
}
