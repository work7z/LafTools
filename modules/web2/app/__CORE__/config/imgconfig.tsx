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

import { isDevEnv, isTestEnv } from "../hooks/env"
import { Dot } from "../utils/TranslationUtils"

export let formatStaticResource = (path: string): string => {
    return `/static/${path}`
}

export let getAppIcon = (htmlIconImg?: boolean): string => {
    return formatStaticResource((() => {
        if (htmlIconImg || isDevEnv()) {
            return '/icon-dev.png'
        }
        if (isTestEnv()) {
            return '/icon-uat.png'
        }
        return '/icon.png'
    })())
}

export let getAppKeywords = (): string[] => {
    return [
        Dot("wi28h5_S2", "Codecs"),
        Dot("Jbor69IBw", "Formatters"),
        Dot("t8DUz20a-", "JSON Formatter"),
        Dot("2S_7EVIsK", "JSON Validator"),
        Dot("Ibzs2-Ho1", "XML Formatter"),
        Dot("Ibzs2-Ho1", "XML Validator"),
        Dot("Ibzs2-Ho1", "CSV Tools"),
        Dot("9b_7a0feb", "MD5"),
        Dot("9b_7a0fdf", "SHA256"),
        Dot("9b_7a0fqwe", "Base64 Encoder"),
        Dot("9b_7a0sdf", "Base64 Decoder"),
        Dot("q0zA1kML_", "Online Toolbox"),
        Dot("jr_7Y98yZ", "LafTools"),
    ]
}