// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 18 Nov 2023
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

package env

import (
	"os"
	"path"
	"time"
)

var homeDir, _ = os.UserHomeDir()

// to start developing, update your own config in this file.
// note that you shouldn't commit this file unless any value really need to be updated.

var ENV_DefaultCodeGenRoot = os.Getenv("LAFTOOLS_ROOT")
var ENV_defaultAppConfigDir = path.Join(homeDir, ENV_AppDirName)

var ENV_ShouldPrintLogAsJSON = false

// test stuff
// var DEV_EXIT_SECONDS = "30"
var DEV_EXIT_SECONDS = "5"
var DEV_WAKUP_TIMES int64 = 0
var DEV_USING_TSX_FOR_REAL_OUTPUT = false // for ws-index, true will use ts directly, otherwise will use js

var DEV_PUBLIC_RELOAD_FREQUENCY = time.Millisecond * 20 // check frequency
