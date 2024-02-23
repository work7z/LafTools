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

import { getAppDataTestKVDir } from "../config/appdir"
import { isDevEnv } from "../hooks/env"
import fs from 'fs'
import path from 'path'
let globalKV: { [key: string]: string } = {}

let isDev = isDevEnv()

let kvDir = getAppDataTestKVDir()

export default {
    getKey: (key: string): string | null => {
        if (isDev) {
            // get  $kvDir/$key, return its value or empty
            let file = path.join(kvDir, key)
            if (fs.existsSync(file)) {
                return fs.readFileSync(file, { encoding: 'utf8' })
            }
            return null
        }
        return globalKV[key]
    },
    setKey: (key: string, value: string) => {
        if (isDev) {
            let file = path.join(kvDir, key)
            fs.writeFileSync(file, value, { encoding: 'utf8' })
            return
        }
        globalKV[key] = value
    }
}