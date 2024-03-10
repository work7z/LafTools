// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 2 Mar 2024
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

'use server'

// const { translate } = require('bing-translate-api');
import { translate } from 'bing-translate-api'
import { Dot } from '../utils/TranslationUtils'
import _ from 'lodash'
let formatLang = (to: string) => {
    if (to == 'en_US') {
        to = 'en'
    }
    if (to == 'zh_CN') {
        to = 'zh-hans'
    }
    if (to == 'zh_HK') {
        to = 'zh-hant'
    }
    if (to == 'no') {
        to = 'nb'
    }
    return to
}
export let translateText = async (text, from: string, to,): Promise<string> => {
    if (_.trim(text) == '') {
        return ''
    }
    try {
        from = formatLang(from)
        to = formatLang(to)
        let res = await translate(text, from, to)
        if (!res) {
            // ${ Dot("cOYuMrncv", "Unknown Translation failure") }
            return `<Unknown Translation Errors>`
        }
        if (!res.translation) {
            console.log('test')
        }
        console.log(res.translation);
        return res.translation
    } catch (err) {
        return `<Error: ${err}>`

    }
}