// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 22 Oct 2023
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
	"codegen-go/core/gutils"
	"codegen-go/core/nocycle"
	"path"
)

func GetUserConfigFile() string {
	return (path.Join(gutils.GetAppHomeConfigDirectory(), "users.json"))
}
func GetAppTempUploadDir() string {
	return nocycle.MkdirFileWithStr((path.Join(gutils.GetAppHomeTempDirectory(), "upload")))
}
func GetUserPWDir() string {
	a := path.Join(gutils.GetAppHomeConfigDirectory(), "pw")
	_ = nocycle.MkdirFile(a)
	return a
}