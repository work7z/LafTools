// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 22 Sep 2023
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

package nocycle

import "os"

var (
	RefId               string        // for port information, if it's empty, then I will tell you in the home directory
	IsDevMode           bool   = true // by default, it's true
	SystemUserLanguage  string = "en_US"
	LafToolsGoRoot      string = os.Getenv("LAFTOOLS_ROOT")
	CodeGenAppConfigDir string = os.Getenv("CODEGEN_APP_DIR")
)
