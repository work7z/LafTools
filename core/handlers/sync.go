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

package handlers

import (
	"encoding/json"
	"errors"
	"laftools-go/core/config"
	"laftools-go/core/handlers/context"
	"laftools-go/core/log"
	"laftools-go/core/tools"
	"sync"

	"github.com/gin-gonic/gin"
)

var globalValMap map[string]interface{} = make(map[string]interface{})
var lockAPI = &sync.Mutex{}
var updateIdx = 0

// workspace
var workspaceValMap map[string]map[string]interface{} = make(map[string]map[string]interface{})
var lockForWorkspace = &sync.Mutex{}

func contactKeyByReq(c *gin.Context) (string, error) {
	wc := context.NewWC(c)
	reducerName := c.Query("name")
	if reducerName == "" {
		return "", errors.New(wc.Dot("DSXi7", "Reducer name is empty"))
	}
	finalKey := reducerName
	userId := wc.GetUserID()
	workspaceId := wc.GetWorkspaceID()
	// workspace is required for some reducers
	RequireWorkspaceId := c.Query("RequireWorkspaceId") == "true"
	RequireUserId := c.Query("RequireUserId") == "true"
	if RequireUserId && userId == "" {
		return "", errors.New(wc.Dot("q5_aE", "UserID is empty"))
	}
	if RequireWorkspaceId && workspaceId == "" {
		return "", errors.New(wc.Dot("ubU3g", "WorkspaceID is empty"))
	}
	if RequireUserId {
		finalKey = finalKey + userId
	}
	if RequireWorkspaceId {
		finalKey = finalKey + workspaceId
	}
	return finalKey, nil
}

func getReducerStoreMap(c *gin.Context, crtKey string) (map[string]interface{}, error) {
	wc := context.NewWC(c)
	workspaceId := wc.GetWorkspaceID()
	// workspace is required for some reducers
	RequireWorkspaceId := c.Query("RequireWorkspaceId") == "true"
	if RequireWorkspaceId {
		e := readWorkspaceMapValIfNeeded(workspaceId, wc, crtKey)
		if e != nil {
			return nil, e
		}
		return globalValMap, nil
	} else {
		return globalValMap, nil
	}
}

func writeWorkspaceMapIntoFile(workspaceId string, wc context.WebContext, outputStr string, crtKey string) error {
	lockForWorkspace.Lock()
	defer lockForWorkspace.Unlock()
	workspace, workspaceErr := getWorkspaceById(workspaceId, &wc)
	if workspaceErr != nil {
		return workspaceErr
	}
	reducerSyncFile := getReducerSyncFileInWorkspace(workspace, crtKey)
	err := tools.WriteFileAsStr(reducerSyncFile, outputStr)
	return err
}

func readWorkspaceMapValIfNeeded(workspaceId string, wc context.WebContext, crtKey string) error {
	lockForWorkspace.Lock()
	defer lockForWorkspace.Unlock()
	workspace, workspaceErr := getWorkspaceById(workspaceId, &wc)
	if workspaceErr != nil {
		return workspaceErr
	}
	reducerSyncFile := getReducerSyncFileInWorkspace(workspace, crtKey)
	str, err := tools.ReadFileAsStr(reducerSyncFile)
	if err != nil {
		log.Ref().Warn("unable to read reducer sync file: ", err)
	} else {
		// rename reducer sync file as *.bak
		tools.CopyFile(reducerSyncFile, reducerSyncFile+".bak"+tools.GetRandomString(8))
		if workspaceValMap[workspaceId] == nil {
			workspaceValMap[workspaceId] = make(map[string]interface{})
		}
		ref := workspaceValMap[workspaceId]
		// unmarhsla str to tmpReducerValueMap
		err2 := json.Unmarshal([]byte(str), &ref)
		if err2 != nil {
			log.Ref().Warn("unable to unmarshal reducer sync file: ", err2)
		}
	}
	return nil
}

func getSyncReducer(c *gin.Context) {
	lockAPI.Lock()
	defer lockAPI.Unlock()
	// get reducer
	crtKey, err := contactKeyByReq(c)
	if err != nil {
		ErrLa2(c, err.Error())
		return
	}
	reducer := globalValMap[crtKey]
	if reducer == nil {
		ErrLa2(c, "Reducer not found")
		return
	}
	// get state
	OKLa(c, DoValueRes(reducer))
}

func saveSyncReducer(c *gin.Context) {
	lockAPI.Lock()
	defer lockAPI.Unlock()
	// get reducer
	crtKey, err := contactKeyByReq(c)
	if err != nil {
		ErrLa2(c, err.Error())
		return
	}
	// get state
	var state interface{}
	if err := c.BindJSON(&state); err != nil {
		ErrLa(c, err)
		return
	}
	updateIdx++
	// save state
	mapVal, err := getReducerStoreMap(c, crtKey)
	if err != nil {
		ErrLa2(c, err.Error())
		return
	}
	mapVal[crtKey] = state
	// saveReducerStoreMap(c, crtKey)
	wc := context.NewWC(c)
	go func() {
		// TODO: move query to other DTO
		if c.Query("RequireWorkspaceId") == "true" {
			writeWorkspaceMapIntoFile(wc.GetWorkspaceID(), context.NewWC(c), tools.ToJson(mapVal), crtKey)
		}
	}()
	OKLa(c, DoValueRes("saved"))
}

func init() {
	last_updateIdx := 0
	// last_modifiedFile := 0
	reducerSyncFile := config.GetCurrentReducerSyncFile()
	if tools.IsFileExist(reducerSyncFile) {
		str, err := tools.ReadFileAsStr(reducerSyncFile)
		if err != nil {
			log.Ref().Warn("unable to read reducer sync file: ", err)
		} else {
			// rename reducer sync file as *.bak
			tools.CopyFile(reducerSyncFile, reducerSyncFile+".bak"+tools.GetRandomString(8))
			// unmarhsla str to tmpReducerValueMap
			err2 := json.Unmarshal([]byte(str), &globalValMap)
			if err2 != nil {
				log.Ref().Warn("unable to unmarshal reducer sync file: ", err2)
			}
		}
	}
	go func() {
		// every 3 seconds, write tmpReducerValueMap to reducerSyncFile
		for {
			tools.Sleep(3000)
			if last_updateIdx != updateIdx {
				last_updateIdx = updateIdx
				lockAPI.Lock()
				tools.WriteFileAsStr(reducerSyncFile, tools.ToJson(globalValMap))
				// last_modifiedFile = tools.GetFileLastModified(reducerSyncFile)
				lockAPI.Unlock()
			}
			// if last_modifiedFile != tools.GetFileLastModified(reducerSyncFile) {
			// 	last_modifiedFile = tools.GetFileLastModified(reducerSyncFile)
			// 	str, err := tools.ReadFileAsStr(reducerSyncFile)
			// 	if err != nil {
			// 		log.Ref().Warn("unable to read reducer sync file: ", err)
			// 	} else {
			// 		// unmarhsla str to tmpReducerValueMap
			// 		lockAPI.Lock()
			// 		err2 := json.Unmarshal([]byte(str), &tmpReducerValueMap)
			// 		lockAPI.Unlock()
			// 		if err2 != nil {
			// 			log.Ref().Warn("unable to unmarshal reducer sync file: ", err2)
			// 		}
			// 	}
			// }
		}
	}()
}
