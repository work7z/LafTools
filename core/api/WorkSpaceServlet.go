// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 16 Nov 2023
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
	"encoding/json"
	"laftools-go/core/context"
	"laftools-go/core/log"
	"laftools-go/core/nocycle"

	"github.com/gin-gonic/gin"
)

type WorkSpaceListByUserForm struct {
	//
}

type EachWorkSpace struct {
	Label string
	Path  string
}
type WorkSpaceStruct struct {
	WorkSpaces []EachWorkSpace
}

func API_WorkSpace_List_By_User(c *gin.Context) {
	wc := context.NewWC(c)
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	var workspaceRes *WorkSpaceStruct = &WorkSpaceStruct{
		WorkSpaces: []EachWorkSpace{},
	}
	s, e := nocycle.ReadFileAsBytes(workspaceConfigFile)
	if e == nil {
		e2 := json.Unmarshal(s, workspaceRes)
		if e2 != nil {
			// ok
		} else {
			log.Ref().Error(e2)
		}
	} else {
		log.Ref().Error(e)
	}
	// anyway, if no error then users will get his/her workspace as normal
	OKLa(c, DoValueRes(workspaceRes))
}

func API_Workspace_Add_By_User(c *gin.Context) {
	OKLa(c, DoValueRes("add by user"))
}

func API_Workspace_Delete_By_User(c *gin.Context) {
	OKLa(c, DoValueRes("delete by user"))
}
