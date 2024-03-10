// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Mon, 25 Sep 2023
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

package tools

const LockExtension = ".lock"
const MAX_CHECK_FILE_LONG = 20 * 1000 // 20 seconds

func GetLockFile(pathname string) string {
	return pathname + LockExtension
}

func HasLockFile(pathname string) bool {
	a := GetLockFile(pathname)
	if !IsFileExist(a) {
		return false
	} else {
		// TODO: make lock file logic if neededu
		return false
	}
}
