'use server'

// const { translate } = require('bing-translate-api');
import { translate } from 'bing-translate-api'
import { Dot } from '../utils/TranslationUtils'

export let translateText = async (text, from: string, to,): Promise<string> => {
    try {
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