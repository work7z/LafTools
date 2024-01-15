package syspath

import (
	"encoding/json"
	"errors"
	"laftools-go/core/global"
	"laftools-go/core/handlers/context"
	"laftools-go/core/log"
	"laftools-go/core/tools"
	"path"
	"path/filepath"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
)

func GetWorkspaceStruct(workspaceConfigFile string) *WorkSpaceStruct {
	var workspaceRes *WorkSpaceStruct = &WorkSpaceStruct{
		WorkSpaces: []*EachWorkSpace{},
	}
	s, e := tools.ReadFileAsBytes(workspaceConfigFile)
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

type EachWorkSpace struct {
	Id       string
	Label    string
	Path     string
	ShowPath string
}
type WorkSpaceStruct struct {
	WorkSpaces []*EachWorkSpace
}

// workspace
var workspaceValMap map[string]map[string]interface{} = make(map[string]map[string]interface{})
var lockForWorkspace = &sync.Mutex{}

var WS_DEFAULT_ID = "default"

func getWorkspaceById(workspaceId string, wc *context.WebContext) (*EachWorkSpace, error) {
	workspaceList := GetWorkspaceList(wc)
	// get workspace from workspaceList by id
	var workspace *EachWorkSpace
	for _, item := range workspaceList.WorkSpaces {
		if item.Id == workspaceId {
			workspace = item
			break
		}
	}
	if workspace == nil {
		return nil, errors.New("workspace not found")
	}
	return workspace, nil
}

func AddNewWorkspace(newSpace *EachWorkSpace, c *gin.Context, wc context.WebContext) error {
	newSpace.Path = strings.Trim(newSpace.Path, "")
	if newSpace.Path == "" {
		return errors.New(wc.Dot("IWLGS", "path cannot be empty"))
	}
	newSpace.Id = global.ShortShortUUID()
	// if newSpace.Id == "" {
	// 	return errors.New(wc.Dot("rj39U", "Id is required"))
	// }
	// check if Path exist
	if tools.IsFileNonExist(newSpace.Path) {
		return errors.New(wc.Dot("WXi6O", "Path does not exist, please check if your input is correct"))
	}

	workspaceConfigFile := GetUserWorkSpaceConfigFile(wc.GetUserID())
	workspaceRes := GetWorkspaceStruct(workspaceConfigFile)

	for _, each := range workspaceRes.WorkSpaces {
		if each.Path == newSpace.Path {
			log.Ref().Debug("each.Path: ", each.Path)
			return errors.New(wc.Dot("7jymU", "the file path is used by other workspace"))
		}
		if each.Id == newSpace.Id {
			return errors.New(wc.Dot("cPzXD", "the id is used by other workspace, check id -> ", each.Id))
		}
	}

	workspaceRes.WorkSpaces = append(workspaceRes.WorkSpaces, newSpace)
	tools.WriteObjIntoFile(workspaceConfigFile, workspaceRes)
	return nil
}

func GetWorkspaceInnerFolder(workspace *EachWorkSpace) string {
	return (tools.MkdirDirWithStr(path.Join(workspace.Path)))
}

func getReducerSyncFileInWorkspace(workspace *EachWorkSpace, crtKey string) string {
	f := tools.MkdirDirWithStr(path.Join(GetWorkspaceInnerFolder(workspace), "status", crtKey))
	file := path.Join(
		f,
		"reducerSync.json",
	)
	if !tools.IsFileExist(file) {
		// write {} into this file
		tools.WriteFileAsStr(file, "{}")
	}
	return file
}

func GetUserDefaultWorkspaceDir(userId string) string {
	return tools.MkdirDirWithStr(path.Join(global.GetAppDataDirectory(), safeCutStr(userId, 0, 8), "workspace", "laf-tools"))
}
func safeCutStr(str string, start int, end int) string {
	if len(str) < end {
		return str
	}
	return str[start:end]
}

func GetTargetUserOwnFolder(userId string) string {
	userMyFolder := tools.MkdirDirWithStr(path.Join(global.GetAppHomeConfigDirectory(), "users", userId))
	return userMyFolder
}

func getPIDConfigFile() string {
	return (path.Join(global.GetAppHomeConfigDirectory(), "pid.json"))
}

func GetUserConfigDir() string {
	return path.Dir(GetUserConfigFile())
}

func GetWorkspaceList(wc *context.WebContext) *WorkSpaceStruct {
	workspaceConfigFile := GetUserWorkSpaceConfigFile(wc.GetUserID())
	workspaceRes := GetWorkspaceStruct(workspaceConfigFile)
	hasDefault := false
	for _, item := range workspaceRes.WorkSpaces {
		if item.Id == WS_DEFAULT_ID {
			hasDefault = true
		}
	}
	if !hasDefault {
		defaultPath := GetUserDefaultWorkspaceDir(wc.GetUserID())
		AddNewWorkspace(&EachWorkSpace{
			Id:   WS_DEFAULT_ID,
			Path: defaultPath,
		}, wc.GinContext, *wc)
		workspaceRes = GetWorkspaceStruct(workspaceConfigFile)
	}
	for _, item := range workspaceRes.WorkSpaces {
		// iterate workspaceRes, and take the last one of its Path according to current platform if Label is nil or empty, then assign it to Label
		item.Path = tools.NormalizeDir(item.Path)
		dir, file := filepath.Split(item.Path)
		if strings.Trim(item.Label, "") == "" {
			(item).Label = file
		}
		item.ShowPath = dir
		item.ShowPath = strings.ReplaceAll(item.ShowPath, global.GetUserHomeDir(), "~")
	}
	return workspaceRes
}

func WriteMapDataIntoWorkspaceFile(workspaceId string, wc context.WebContext, outputStr string, crtKey string) error {
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

func ReadSyncDataFromWorkspaceMap(workspaceId string, wc context.WebContext, crtKey string) (map[string]interface{}, error) {
	lockForWorkspace.Lock()
	defer lockForWorkspace.Unlock()
	workspace, workspaceErr := getWorkspaceById(workspaceId, &wc)
	if workspaceErr != nil {
		return nil, workspaceErr
	}
	reducerSyncFile := getReducerSyncFileInWorkspace(workspace, crtKey)
	str, err := tools.ReadFileAsStr(reducerSyncFile)
	if err != nil {
		log.Ref().Warn("unable to read reducer sync file: ", err)
		return nil, err
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
		return ref, nil
	}
}
