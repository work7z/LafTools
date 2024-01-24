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

package global

import (
	"laftools-go/core/tools"
	"os"
	"path"
)

func GetUserHomeDir() string {
	a, err := os.UserHomeDir()
	tools.ShouldNoErr(err, "user home dir is empty")
	e := tools.JoinWithMkdir(a)
	tools.ShouldNoErr(e, "config file is not foundable")
	return a
}

func GetAppHomeConfigDirectory() string {
	return tools.MkdirDirWithStr(path.Join(GetAppHomeDirectory(), "config"))
}
func GetAppHomeTempDirectory() string {
	return tools.MkdirDirWithStr(path.Join(GetAppHomeDirectory(), "temp"))
}

func getProjectNameAffix() string {
	// UAT, DEV, PROD("")
	if tools.IsDevMode {
		return "L-DEV"
	}
	if tools.IsUATMode {
		return "L-UAT"
	}
	return ""
}

func GetAppHomeDirName() string {
	return ".laf" + getProjectNameAffix() + "-tools-home"
}

func GetDefaultAppConfigDir() string {
	var homeDir, _ = os.UserHomeDir()
	var DefaultAppConfigDir = path.Join(homeDir, GetAppHomeDirName())
	return DefaultAppConfigDir
}
func GetAppDataDirName() string {
	return getProjectNameAffix() + "LafTools"
}

func GetAppHomeDirectory() string {
	pathname := path.Join(GetUserHomeDir(), GetAppHomeDirName())
	e := tools.MkdirDir(pathname)
	tools.ShouldNoErr(e, "~/"+GetAppHomeDirName()+" cannot be created")
	return pathname
}
func GetAppDataDirectory() string {
	pathname := path.Join(GetUserHomeDir(), GetAppDataDirName())
	e := tools.MkdirDir(pathname)
	tools.ShouldNoErr(e, "~/"+GetAppDataDirName()+" cannot be created")
	return pathname
}
