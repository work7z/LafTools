package api

import (
	"errors"
	"laftools-go/core/context"
	"laftools-go/core/nocycle"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestAddNewWorkspace(t *testing.T) {
	// Create a mock context and web context
	c := &gin.Context{}
	wc := context.WebContext{
		OverwriteUserLang: "zh_CN",
		OverwriteUserId:   "testuser",
	}

	// Create a new workspace
	newSpace := &EachWorkSpace{
		Label: "Test Workspace",
		Path:  "/path/to/workspace",
	}

	// Call the function
	deleteWorkspaceByID(&wc, "/path/to/workspace")

	err := addNewWorkspace(newSpace, c, wc)

	// Assert that there is no error
	assert.NoError(t, err)

	// Assert that the workspace was added to the configuration file
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	assert.Contains(t, workspaceRes.WorkSpaces, *newSpace)

	// Try adding the same workspace again
	err = addNewWorkspace(newSpace, c, wc)

	// Assert that an error is returned
	expectedErr := errors.New(wc.Dot("pNO9x", "the file path exists already"))
	assert.EqualError(t, err, expectedErr.Error())
}
func TestDeleteWorkspaceByID(t *testing.T) {
	// Create a mock context and web context
	wc := context.WebContext{
		OverwriteUserLang: "zh_CN",
		OverwriteUserId:   "testuser",
	}

	// Create a workspace to be deleted
	workspaceToDelete := &EachWorkSpace{
		Id:   "workspace1",
		Path: "/path/to/workspace1",
	}

	// Create a workspace that should not be deleted
	workspaceToKeep := &EachWorkSpace{
		Id:   "workspace2",
		Path: "/path/to/workspace2",
	}

	// Add workspaces to the configuration file
	workspaceConfigFile := wc.GetUserWorkSpaceConfigFile()
	workspaceRes := getWorkspaceStruct(workspaceConfigFile)
	workspaceRes.WorkSpaces = append(workspaceRes.WorkSpaces, *workspaceToDelete, *workspaceToKeep)
	nocycle.WriteObjIntoFile(workspaceConfigFile, workspaceRes)

	// Call the function to delete the workspace
	deleteWorkspaceByID(&wc, workspaceToDelete.Id)

	// Assert that the workspace was deleted from the configuration file
	updatedWorkspaceRes := getWorkspaceStruct(workspaceConfigFile)
	assert.NotContains(t, updatedWorkspaceRes.WorkSpaces, *workspaceToDelete)
	assert.Contains(t, updatedWorkspaceRes.WorkSpaces, *workspaceToKeep)
}
