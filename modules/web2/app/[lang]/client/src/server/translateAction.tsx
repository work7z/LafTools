'use server'

const { translate } = require('bing-translate-api');

export let translateText = async (text, to): Promise<string> => {
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
    let res = await translate(text, null, to)
    console.log(res.translation);
    return res.translation
}