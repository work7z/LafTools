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
	"errors"
	"laftools-go/core/context"
	"laftools-go/core/log"
	"laftools-go/core/nocycle"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
)

type WorkSpaceListByUserForm struct {
	//
}

type EachWorkSpace struct {
	Id    string
	Label string
	Path  string
}
type WorkSpaceStruct struct {
	WorkSpaces []EachWorkSpace
}

// lock for workspace
// TODO: we use multiple instance to lock each user's workspace config file separately.
var workspaceLock = &sync.Mutex{}

func API_WorkSpace_GetOne_By_User(c *gin.Context) {

	wc := context.NewWC(c)
	workspaceId := c.Query("Id")
	if workspaceId == "" {
		ErrLa2(c, wc.Dot("eWfrs", "Id is required"))
	}
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	for _, each := range workspaceRes.WorkSpaces {
		if each.Id == workspaceId || each.Path == workspaceId {
			OKLa(c, DoValueRes(each))
			return
		}
	}
	OKLa(c, DoValueRes(EachWorkSpace{}))
}
func API_WorkSpace_List_By_User(c *gin.Context) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	wc := context.NewWC(c)
	workspaceRes := getWorkspaceList(&wc)
	// anyway, if no error then users will get his/her workspace as normal
	OKLa(c, DoValueRes(workspaceRes))
}

func getWorkspaceList(wc *context.WebContext) *WorkSpaceStruct {
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	return workspaceRes
}

func API_Workspace_Add_By_User(c *gin.Context) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	wc := context.NewWC(c)
	var newSpace = &EachWorkSpace{}
	c.BindJSON(newSpace)
	// label and path cannot be empty
	// if workspaceRes.WorkSpaces already have that same path, then error
	// make sure no duplicate id
	// if newSpace.Id exist, then replace
	err := addNewWorkspace(newSpace, c, wc)
	if err != nil {
		ErrLa(c, err)
		return
	}
	OKLa(c, DoValueRes("OK"))
}

func addNewWorkspace(newSpace *EachWorkSpace, c *gin.Context, wc context.WebContext) error {
	newSpace.Path = strings.Trim(newSpace.Path, "")
	if newSpace.Path == "" {
		return errors.New(wc.Dot("IWLGS", "path cannot be empty"))
	}
	if newSpace.Id == "" {
		return errors.New(wc.Dot("rj39U", "Id is required"))
	}
	// check if Path exist
	if nocycle.IsFileNonExist(newSpace.Path) {
		return errors.New(wc.Dot("WXi6O", "Path does not exist, please check if your input is correct"))
	}

	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)

	for _, each := range workspaceRes.WorkSpaces {
		if each.Path == newSpace.Path {
			log.Ref().Debug("each.Path: ", each.Path)
			return errors.New(wc.Dot("7jymU", "the file path is used by other workspace"))
		}
		if each.Id == newSpace.Id {
			return errors.New(wc.Dot("cPzXD", "the id is used by other workspace, check id -> ", each.Id))
		}
	}

	workspaceRes.WorkSpaces = append(workspaceRes.WorkSpaces, *newSpace)
	nocycle.WriteObjIntoFile(workspaceConfigFile, workspaceRes)
	return nil
}

// DeleteWorkspaceByID deletes a workspace by its ID.
func deleteWorkspaceByID(wc *context.WebContext, workspaceIDOrPath string) {
	workspaceLock.Lock()
	defer workspaceLock.Unlock()
	// label and path cannot be empty
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	var newWorkSpaces []EachWorkSpace
	for _, each := range workspaceRes.WorkSpaces {
		if each.Id != workspaceIDOrPath && each.Path != workspaceIDOrPath {
			newWorkSpaces = append(newWorkSpaces, each)
		}
	}
	workspaceRes.WorkSpaces = newWorkSpaces
	log.Ref().Debug("all", workspaceRes)
	nocycle.WriteObjIntoFile(workspaceConfigFile, workspaceRes)
}

// API_Workspace_Delete_By_User is the handler for deleting a workspace by user.
func API_Workspace_Delete_By_User(c *gin.Context) {
	var newSpace EachWorkSpace
	c.BindJSON(&newSpace)
	wc := context.NewWC(c)
	if newSpace.Id == "" {
		ErrLa2(c, wc.Dot("XQELf", "id cannot be empty"))
		return
	}
	deleteWorkspaceByID(&wc, newSpace.Id)
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
