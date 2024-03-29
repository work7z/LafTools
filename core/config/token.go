// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
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

package config

import (
	"encoding/json"
	"laftools-go/core/global"
	"laftools-go/core/log"
	"laftools-go/core/project/sysmodel"
	"laftools-go/core/tools"
	"path"
	"strings"
	"time"

	"github.com/natefinch/atomic"
)

func GetCurrentSystemInfo() *sysmodel.SystemInfo {
	r := &sysmodel.SystemInfo{
		HasAdminInit:    false,
		LastUpdatedTime: time.Now(),
	}
	file := GetCurrentSystemInfoFile()
	a, er := tools.ReadFileAsBytes(file)
	if er != nil {
		rr1, ee2 := json.Marshal(r)
		if ee2 != nil {
			log.Ref().Warn("unable to marshal it at current system info: ", ee2)
		}
		er2 := atomic.WriteFile(file, strings.NewReader(string(rr1)))
		if er2 != nil {
			log.Ref().Warn("unable to write it: ", er2)
		}
		return r
	} else {
		e2 := json.Unmarshal(a, &r)
		if e2 != nil {
			log.Ref().Warn("System Info is unable to read: ", e2)
		}
		return r
	}
}

func GetCurrentSystemInfoFile() string {
	return path.Join(global.GetAppHomeConfigDirectory(), "system-info.json")
}

func GetCurrentReducerSyncFile() string {
	return path.Join(global.GetAppHomeConfigDirectory(), "sync-config.json")
}

func GetAdminInitTokenFile() string {
	return path.Join(global.GetAppHomeConfigDirectory(), "access-token.txt")
}

func GetAdminInitToken() string {
	a, er := tools.ReadFileAsStr(GetAdminInitTokenFile())
	if er != nil || a == "" {
		newT := global.UUID()
		er2 := atomic.WriteFile(GetAdminInitTokenFile(), strings.NewReader(newT))
		tools.ShouldNoErr(er2, "Unable to initialize invitation code")
		return newT
	} else {
		return a
	}
}
