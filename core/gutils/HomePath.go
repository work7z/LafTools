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

package gutils

import (
	"laftools-go/core/env"
	"laftools-go/core/nocycle"
	"os"
	"path"
)

func GetUserHomeDir() string {
	a, err := os.UserHomeDir()
	nocycle.ShouldNoErr(err, "user home dir is empty")
	e := nocycle.JoinWithMkdir(a)
	nocycle.ShouldNoErr(e, "config file is not foundable")
	return a
}

func GetAppHomeConfigDirectory() string {
	return nocycle.MkdirFileWithStr(path.Join(GetAppHomePath(), "config"))
}
func GetAppHomeGlobalDataDirectory() string {
	return nocycle.MkdirFileWithStr(path.Join(GetAppHomePath(), "data"))
}
func GetAppHomeTempDirectory() string {
	return nocycle.MkdirFileWithStr(path.Join(GetAppHomePath(), "temp"))
}

func GetAppHomePath() string {
	pathname := path.Join(GetUserHomeDir(), env.ENV_AppDirName)
	e := nocycle.MkdirFile(pathname)
	nocycle.ShouldNoErr(e, "~/"+env.ENV_AppDirName+" cannot be created")
	return pathname
}
