// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
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

package config

import (
	"encoding/json"
	"laftools-go/core/global"
	"laftools-go/core/log"
	"laftools-go/core/tools"
	"path"
	"strings"
	"time"

	file2 "github.com/dablelv/cyan/file"
)

type UserConfig struct {
	Id             string
	Username       string
	Password       string
	Token          string
	CreateTime     time.Time
	IsAdmin        bool
	InvitationCode string
}

func GetUserPassword(userConfig *UserConfig) string {
	pwFile := GetUserPasswordPatchFile(*userConfig)
	log.Ref().Debug("check pw file : ", pwFile)
	if tools.IsFileNonExist(pwFile) {
		log.Ref().Debug("return from password: " + userConfig.Password)
		return userConfig.Password
	} else {
		s, err := tools.ReadFileAsStr(pwFile)
		s = strings.TrimSpace(s)
		if err != nil || strings.TrimSpace(s) == "" {
			log.Ref().Debug("return from password, not from s ", s)
			return userConfig.Password
		} else {
			log.Ref().Debug("return from password file: ", s)
			return s
		}
	}
}

func GetUserPasswordPatchFile(userConfig UserConfig) string {
	return path.Join(GetUserPWDir(), userConfig.Username+".txt")
}
func GetUserConfigDir() string {
	return path.Dir(GetUserConfigFile())
}

type UserConfigMap = map[string]UserConfig

func GetUserConfigFromFile() (UserConfigMap, error) {
	userConfigFile := GetUserConfigFile()
	var res UserConfigMap = make(UserConfigMap)
	return getMapByFile(userConfigFile, res)
}
func GetItemByUserName(userConfig UserConfigMap, submittedUsername string) (*UserConfig, bool) {
	for _, config := range userConfig {
		if config.Username == submittedUsername {
			return &config, true
		}
	}
	return nil, false
}

func GetItemByTokenDirectly(token string) (*UserConfig, bool) {
	userConfig, e := GetUserConfigFromFile()
	if e != nil {
		return nil, false
	}
	for _, config := range userConfig {
		if config.Token == token {
			return &config, true
		}
	}
	return nil, false
}

func GetItemByToken(userConfig UserConfigMap, token string) (*UserConfig, bool) {
	for _, config := range userConfig {
		if config.Token == token {
			return &config, true
		}
	}
	return nil, false
}

// /////////////////////////////
func WriteUserAnyKeyFromFile(userId string, key string, item_str string) error {
	file := GetUserAnyKeyFile(userId, key)
	var item interface{}
	err := json.Unmarshal([]byte(item_str), &item)
	if err != nil {
		return err
	}
	err2 := tools.WriteObjectIntoFileWithMergeChecking(file, item)
	if err2 != nil {
		return err2
	}
	return nil
}

func ReadUserAnyKeyFromFile(userId string, key string) (string, error) {
	file := GetUserAnyKeyFile(userId, key)
	if tools.IsFileNonExist(file) {
		return "", nil
	}
	a, b := tools.ReadFileAsBytes(file)
	if b != nil {
		return "", b
	}
	return string(a), nil
}

///////////////////////////////

func GetPidConfigFromFile() (map[string]map[string]any, error) {
	file := getPIDConfigFile()
	var res map[string]map[string]any = make(map[string]map[string]any)
	return getMapByFile(file, res)
}
func SetUserConfigIntoFile(b UserConfigMap) error {
	for _, config := range b {
		config.Username = strings.TrimSpace(config.Username)
	}
	file := GetUserConfigFile()
	file2.CreateFile(file)
	err := tools.WriteObjectIntoFileWithMergeChecking(file, b)
	return err
}

func getMapByFile[T any](userConfigFile string, res T) (T, error) {
	if !tools.IsFileExist(userConfigFile) {
		return res, nil
	}
	a, err := tools.ReadFileAsBytes(userConfigFile)
	if err != nil {
		log.Ref().Error("Unable to read the config file", userConfigFile)
		return res, err
	}
	err2 := json.Unmarshal(a, &res)
	if err2 != nil {
		log.Ref().Error("Unable to parse the config file", userConfigFile)
		return res, err
	}
	return res, nil
}

func GetUserAnyKeyFile(userId string, key string) string {
	userMyFolder := GetTargetUserOwnFolder(userId)
	return (path.Join(userMyFolder, key+".json"))
}
func GetUserForgeFile(userId string) string {
	userMyFolder := GetTargetUserOwnFolder(userId)
	finalFolder := tools.MkdirFileWithStr(path.Join(userMyFolder, "forge"))
	return (path.Join(finalFolder, "forge.json"))
}
func GetUserWorkSpaceConfigFile(userId string) string {
	return GetUserAnyKeyFile(userId, "workspace-config")
}
func shortenUserId(userId string) string {
	return userId[0:8]
}
func GetDefaultWorkSpaceDir(userId string) string {
	return tools.MkdirFileWithStr(path.Join(global.GetAppDataDirectory(), shortenUserId(userId), "workspace", "laf-tools"))
}

func GetTargetUserOwnFolder(userId string) string {
	userMyFolder := tools.MkdirFileWithStr(path.Join(global.GetAppHomeConfigDirectory(), "users", userId))
	return userMyFolder
}

func getPIDConfigFile() string {
	return (path.Join(global.GetAppHomeConfigDirectory(), "pid.json"))
}
