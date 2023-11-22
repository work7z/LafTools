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
	"sync"

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

// lock for workspace
// TODO: we use multiple instance to lock each user's workspace config file separately.
var workspaceLock = &sync.Mutex{}

func API_WorkSpace_List_By_User(c *gin.Context) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	wc := context.NewWC(c)
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	// anyway, if no error then users will get his/her workspace as normal
	OKLa(c, DoValueRes(workspaceRes))
}

func API_Workspace_Add_By_User(c *gin.Context) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	wc := context.NewWC(c)
	var newSpace = &EachWorkSpace{}
	c.BindJSON(newSpace)
	// label and path cannot be empty
	if newSpace.Label == "" || newSpace.Path == "" {
		ErrLa2(c, wc.Dot("bAkuz", "label and path cannot be empty"))
		return
	}
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	// if workspaceRes.WorkSpaces already have that same path, then error
	for _, each := range workspaceRes.WorkSpaces {
		if each.Path == newSpace.Path {
			ErrLa2(c, wc.Dot("RBgEN", "already have that path"))
			return
		}
	}
	workspaceRes.WorkSpaces = append(workspaceRes.WorkSpaces, *newSpace)
	nocycle.WriteObjIntoFile(workspaceConfigFile, workspaceRes)
	OKLa(c, DoValueRes("OK"))
}

func API_Workspace_Delete_By_User(c *gin.Context) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	wc := context.NewWC(c)
	// label and path cannot be empty
	var newSpace = &EachWorkSpace{}
	c.BindJSON(newSpace)
	if newSpace.Path == "" {
		ErrLa2(c, wc.Dot("XQELf", "path cannot be empty"))
		return
	}
	// using path to delete
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	var newWorkSpaces []EachWorkSpace
	for _, each := range workspaceRes.WorkSpaces {
		if each.Path != newSpace.Path {
			newWorkSpaces = append(newWorkSpaces, each)
		}
	}
	workspaceRes.WorkSpaces = newWorkSpaces
	nocycle.WriteObjIntoFile(workspaceConfigFile, workspaceRes)
	OKLa(c, DoValueRes("OK"))
}

func getWorkspaceStruct(workspaceConfigFile string) *WorkSpaceStruct {
	var workspaceRes *WorkSpaceStruct = &WorkSpaceStruct{
		WorkSpaces: []EachWorkSpace{},
	}
	s, e := nocycle.ReadFileAsBytes(workspaceConfigFile)
	if e == nil {
		e2 := json.Unmarshal(s, workspaceRes)
		if e2 != nil {

		} else {
			log.Ref().Error(e2)
		}
	} else {
		log.Ref().Error(e)
	}
	return workspaceRes
}
