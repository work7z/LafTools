// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Mon, 25 Sep 2023
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

package log

import (
	"encoding/json"
	"io/ioutil"
	"laftools-go/core/gutils"
	"laftools-go/core/nocycle"
	"path"
)

const TYPE_ERROR = "ERROR"
const TYPE_WARN = "WARN"

type GlobalLogType struct {
	MsgID       string
	Type        string
	Title       string
	Description string
}
type GlobalLogCollector struct {
	List []GlobalLogType
}

var instGlobalLogCollector = GlobalLogCollector{}

func PublishLogToExternalLog(item GlobalLogType) {
	instGlobalLogCollector.List = append(instGlobalLogCollector.List, item)
	a, err := json.Marshal(instGlobalLogCollector)
	if err == nil {
		filepath := path.Join(gutils.GetAppHomeDirectory(), "publish-to-external.json")
		err2 := ioutil.WriteFile(filepath, a, 0755)
		if err2 != nil {
			InternalLog.Warnf("Publish-log-pid.json unable to access")
		}
	} else {
		nocycle.ShouldNoErr(err, "Unable to publish log to external log")
	}
}
