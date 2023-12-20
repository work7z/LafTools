// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 25 Nov 2023
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
	"laftools-go/core/handlers/context"
	"testing"
)

// TODO: make it good later

func TestAddNewWorkspace(t *testing.T) {
	// tools.MkdirFileWithStr("/home")
	// // Create a mock context and web context
	// c := &gin.Context{}
	// wc := context.WebContext{
	// 	OverwriteUserLang: "zh_CN",
	// 	OverwriteUserId:   "testuser",
	// }

	// // Create a new workspace
	// newSpace := &EachWorkSpace{
	// 	Id:    "SGPSI",
	// 	Label: "Test Workspace",
	// 	Path:  "/home",
	// }

	// // Call the function
	// deleteWorkspaceByID(&wc, newSpace.Path)
	// deleteWorkspaceByID(&wc, newSpace.Id)

	// err := addNewWorkspace(newSpace, c, wc)

	// // Assert that there is no error
	// assert.NoError(t, err)

	// // Assert that the workspace was added to the configuration file
	// workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	// workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	// assert.Contains(t, workspaceRes.WorkSpaces, *newSpace)

	// // Try adding the same workspace again
	// err = addNewWorkspace(newSpace, c, wc)

	// // Assert that an error is returned
	// expectedErr := errors.New(wc.Dot("2nKgN", "the file path is used by other workspace"))
	// assert.EqualError(t, err, expectedErr.Error())
}
func TestDeleteWorkspaceByID(t *testing.T) {
	// // Create a mock context and web context
	// wc := context.WebContext{
	// 	OverwriteUserLang: "zh_CN",
	// 	OverwriteUserId:   "testuser",
	// }

	// // Create a workspace to be deleted
	// workspaceToDelete := &EachWorkSpace{
	// 	Id:   "workspace1",
	// 	Path: "/path/to/workspace1",
	// }

	// // Create a workspace that should not be deleted
	// workspaceToKeep := &EachWorkSpace{
	// 	Id:   "workspace2",
	// 	Path: "/path/to/workspace2",
	// }

	// // Add workspaces to the configuration file
	// workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	// workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	// workspaceRes.WorkSpaces = append(workspaceRes.WorkSpaces, workspaceToDelete, workspaceToKeep)
	// tools.WriteObjIntoFile(workspaceConfigFile, workspaceRes)

	// // Call the function to delete the workspace
	// deleteWorkspaceByID(&wc, workspaceToDelete.Id)

	// // Assert that the workspace was deleted from the configuration file
	// updatedWorkspaceRes := getWorkspaceStruct(workspaceConfigFile)
	// assert.NotContains(t, updatedWorkspaceRes.WorkSpaces, *workspaceToDelete)
	// assert.Contains(t, updatedWorkspaceRes.WorkSpaces, *workspaceToKeep)
}
func TestGetWorkspaceList(t *testing.T) {
	// Create a mock web context
	wc := context.WebContext{
		OverwriteUserLang: "zh_CN",
		OverwriteUserId:   "testuser",
	}

	// Call the function
	workspaceList := getWorkspaceList(&wc)
	t.Log("workspaceList", workspaceList)

}
