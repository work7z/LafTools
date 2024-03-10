// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

import path from "path";
export type SystemEnvFlag = "development" | "production" | "test"

let envObj: { env: SystemEnvFlag } = {
    env: process.env.NODE_ENV
}

export let markEnvAsDevForcibly = () => {
    envObj.env = 'development'
}

export let getSysEnv = () => {
    return envObj.env;
}

export let isDevEnv = () => {
    return envObj.env === 'development';
}

export let isTestEnv = () => {
    return envObj.env === 'test';
}

export let isProductionEnv = () => {
    return envObj.env === 'test';
}

export let getELB3Root = (): string => {
    return process.env['ELB3_ROOT'] || 'unknowndir'
}


export let getPreCompiledDir = (): string => {
    let file = path.join(getELB3Root(), 'precompiled', isDevEnv() ? 'dev' : 'prod')
    return file;
}
