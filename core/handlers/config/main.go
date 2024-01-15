// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
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

import "laftools-go/core/tools"

const CONFIG_URL_PUBLIC_BASE_PREFIX string = "/api"
const CLOUD_URL_APP_CLOUD_PREFIX string = "/x-v2-api"
const CONFIG_URL_OPENAPI_PREFIX string = "/open"
const CONFIG_URL_APP_FRONT_END_APP_PREFIX string = "/app"
const CONFIG_URL_APP_FRONT_END_STATIC_PREFIX string = "/static"
const CONFIG_URL_APP_FRONT_END_ASSETS_PREFIX string = "/assets"

// define an array for /blob, /arr
var CONFIG_CLOUD_URL_PREFIX []string = []string{
	"/blob",
}

// define an array for visit urls
var CONFIG_URL_VISIT_URLS []string = []string{
	//
}
var CONFIG_URL_ADMIN_URLS []string = []string{
	//
}

func Fn_GetAllowURLDefinitions() []string {
	urlList := []string{
		CONFIG_URL_APP_FRONT_END_APP_PREFIX,
		CONFIG_URL_APP_FRONT_END_STATIC_PREFIX,
		CONFIG_URL_APP_FRONT_END_ASSETS_PREFIX,
		CONFIG_URL_OPENAPI_PREFIX,
		"/system/getOneMotto",
		"/ws/", // websocket has own auth logic, no need to be checked here
	}
	// append CONFIG_URL_ADMIN_URLS and CONFIG_URL_ADMIN_URLS into filesList
	urlList = append(urlList, CONFIG_URL_VISIT_URLS...)
	if tools.IsDevMode {
		urlList = append(urlList, "/ws/dev-hmr")
	}
	return urlList
}

func FormatThatPathGlobally(relativePath string) string {
	return CONFIG_URL_PUBLIC_BASE_PREFIX + relativePath
}
