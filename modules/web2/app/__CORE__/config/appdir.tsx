// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import path from "path"
import { getLafToolsDataDir } from "./homedir"
import { isDevEnv } from "../hooks/env"
import fsutils from "../utils/FileUtils"

export let getAppDataInternalDir = (): string => {
    return fsutils.mkdir(path.join(getLafToolsDataDir(), 'data'))
}

export let getAppDatabaseMainFile = () => {
    return path.join(getAppDataInternalDir(), 'app.db')
}

export let getAppDatabaseVerFile = () => {
    return fsutils.mkdir(path.join(getAppDataInternalDir(), 'app.ver'))
}

export let getAppDataTestKVDir = () => {
    if (!isDevEnv()) {
        throw new Error('[ERROR:dyLeCZv0g]')
    }
    return fsutils.mkdir(path.join(getAppDataInternalDir(), '_kv'))
}