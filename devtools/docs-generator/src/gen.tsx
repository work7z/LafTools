import idx from './index'
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
console.log('idx', idx)

let rootDir = process.env.LAFTOOLS_ROOT;
console.log("rootDir", rootDir);
let markdownFiles = idx;
let filesDir = path.join(__dirname, '..', 'files')
let tokesnReplace = {
    "```": "@@@THREEBAKCTICK"
}
_.forEach(markdownFiles, (item) => {
    console.log("handling... " + item.fileName);
    let filePath = path.join(filesDir, item.fileName);
    let fileContent = fs.readFileSync(filePath, 'utf8');
    _.forEach(tokesnReplace, (value, key) => {
        fileContent = fileContent.replace(new RegExp(key, 'g'), value)
    });
    console.log('fileContent: ', fileContent)
    let jsScript = `
        let text = \`${fileContent}\`
        console.log(text)
    `
    // eval(jsScript)
    console.log(jsScript)
});