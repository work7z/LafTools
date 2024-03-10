// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 16 Nov 2023
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
	"laftools-go/core/handlers/context"
	"laftools-go/core/log"
	"laftools-go/core/project/syspath"
	"laftools-go/core/tools"
	"sync"

	"github.com/gin-gonic/gin"
)

type WorkSpaceListByUserForm struct {
}

var workspaceLock = &sync.Mutex{}

func getOneWorkspaceByUser(c *gin.Context) {
	wc := context.NewWC(c)
	workspaceId := c.Query("Id")
	if workspaceId == "" {
		ErrLa2(c, wc.Dot("eWfrs", "Id is required"))
	}
	workspaceConfigFile := syspath.GetUserWorkSpaceConfigFile(wc.GetUserID())
	workspaceRes := syspath.GetWorkspaceStruct(workspaceConfigFile)
	for _, each := range workspaceRes.WorkSpaces {
		if each.Id == workspaceId || each.Path == workspaceId {
			OKLa(c, DoValueRes(each))
			return
		}
	}
	OKLa(c, DoValueRes(syspath.EachWorkSpace{}))
}
func listWorkspaceByUser(c *gin.Context) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	wc := context.NewWC(c)
	workspaceRes := syspath.GetWorkspaceList(&wc)
	// anyway, if no error then users will get his/her workspace as normal
	OKLa(c, DoValueRes(workspaceRes))
}

func addWorkspaceByUser(c *gin.Context) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	wc := context.NewWC(c)
	var newSpace = &syspath.EachWorkSpace{}
	c.BindJSON(newSpace)
	// label and path cannot be empty
	// if workspaceRes.WorkSpaces already have that same path, then error
	// make sure no duplicate id
	// if newSpace.Id exist, then replace
	newSpace.Path = tools.NormalizeDir(newSpace.Path)
	err := syspath.AddNewWorkspace(newSpace, c, wc)
	if err != nil {
		ErrLa(c, err)
		return
	}
	OKLa(c, DoValueRes("OK"))
}

// DeleteWorkspaceByID deletes a workspace by its ID.
func deleteWorkspaceByID(wc *context.WebContext, workspaceIDOrPath string) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	// label and path cannot be empty
	workspaceConfigFile := syspath.GetUserWorkSpaceConfigFile(wc.GetUserID())
	workspaceRes := syspath.GetWorkspaceStruct(workspaceConfigFile)
	var newWorkSpaces []*syspath.EachWorkSpace
	for _, each := range workspaceRes.WorkSpaces {
		if each.Id != workspaceIDOrPath && each.Path != workspaceIDOrPath {
			newWorkSpaces = append(newWorkSpaces, each)
		}
	}
	workspaceRes.WorkSpaces = newWorkSpaces
	log.Ref().Debug("all", workspaceRes)
	tools.WriteObjIntoFile(workspaceConfigFile, workspaceRes)
}

// deleteWorkspaceByUser is the handler for deleting a workspace by user.
func deleteWorkspaceByUser(c *gin.Context) {
	var newSpace syspath.EachWorkSpace
	c.BindJSON(&newSpace)
	wc := context.NewWC(c)
	if newSpace.Id == "" {
		ErrLa2(c, wc.Dot("XQELf", "id cannot be empty"))
		return
	}
	deleteWorkspaceByID(&wc, newSpace.Id)
	OKLa(c, DoValueRes("OK"))
}
