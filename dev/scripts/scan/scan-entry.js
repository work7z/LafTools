console.log("start scanning it");
let path = require('path')
let fs = require('fs')
var md5 = require('md5');

function sub_exp(idx) {
  return "((?<![\\\\])['\"`])((?:.(?!(?<![\\\\])\\1))*.?)\\" + idx;
}

let commonText = new RegExp(
  "Dot\\s*\\(\\s*" + sub_exp(1) + "\\s*,\\s*" + sub_exp(3)
);

// get env LAFTOOLS_ROOT
let baseDIR = process.env.LAFTOOLS_ROOT;
// sleep 
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function readFileAsJSONMap(file) {
  return JSON.parse(file);
}
function getFile(file) {
  let obj = {
    file,
    text: () => {
      return (fs.readFileSync(file, { encoding: 'utf-8' }).toString())
    },
    lastModified: () => { 
      return fs.statSync(file).mtimeMs.toString()
    },
    jsonmap: () => { 
      return readFileAsJSONMap(obj.text())
    },
  }
  return obj;
}
let webDIR = `${baseDIR}/sub/web`;
let nodeDIR = `${baseDIR}/sub/node`;
let overwrittenFile = `${webDIR}/overwrriten/id-overwrite.json`;
let overloadMap = readFileAsJSONMap(getFile(overwrittenFile).text()); // replace with appropriate function

let searchItems = [
  {
      type: "go",
      prefix: ".Dot(",
      target: `${baseDIR}/resources/lang`,
      pattern: commonText,
      dir: `${baseDIR}/core`
  },
  {
      type: "ts",
      prefix: "Dot(",
      pattern: commonText,
      target: `${webDIR}/public/static/lang`,
      dir: `${webDIR}/src`
  },
  {
      type: "ts",
      prefix: "Dot(",
      pattern: commonText,
      target: "/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal/public/static/lang",
      dir: "/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal/src"
  },
  {
      type: "ts",
      prefix: "Dot(",
      pattern: commonText,
      target: `${nodeDIR}/src/lang`,
      dir: `${nodeDIR}/src`
  },
  {
      type: "ts",
      prefix: "Dot(",
      pattern: commonText,
      target: "/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/resources/lang2",
      dir: "/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/java/com"
  }
];



let scan = async () => {

  let allKEYMAP = {};

  for (let eachItem of searchItems) {
    let usedKeyMap = {};
    let dir = getFile(eachItem.dir); // replace with appropriate function
    let crtMap_zhCN = {};
    let crtMap_zhHK = {};
    let idOverwriteJSONFile = getFile(`${webDIR}/overwrriten/id-overwrite.json`); // replace with appropriate function
    let enUSOverwriteJSONFile = getFile(`${webDIR}/overwrriten/enUS-overwrite.json`); // replace with appropriate function
    let enUSMap = readFileAsJSONMap(enUSOverwriteJSONFile.text()); // replace with appropriate function 
    let lastModifiedForIdOverwriteJSONFile = idOverwriteJSONFile.lastModified() + enUSOverwriteJSONFile.lastModified() + '' + dir.lastModified()

    // iterate all files for dir.file, recursively
    let iterateFiles = (dir, done) => {
      let results = [];
      fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
          file = path.resolve(dir, file);
          fs.stat(file, function (err, stat) {
            if (stat && stat.isDirectory()) {
              iterateFiles(file, function (err, res) {
                results = results.concat(res);
                if (!--pending) done(null, results);
              });
            } else {
              results.push(file);
              if (!--pending) done(null, results);
            }
          });
        });
      });
    };
    // get all files
    let allFiles = await new Promise((resolve, reject) => {
      iterateFiles(dir.file, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    let waitTranslateObj = {}
    // iterate all files
    for (let eachFile of allFiles) {
      let file = getFile(eachFile); // replace with appropriate function
      let text = file.text();
      let match;
      while ((match = eachItem.pattern.exec(text))) {
        let key = match[2];
        let value = match[4];
        console.log('key is '+key, ', value is ',value)
        if (value) {
          waitTranslateObj[key] = value;
          // crtMap_zhCN[key] = value;
          // crtMap_zhHK[key] = value;
        }
        // substring
        text = text.substring(match.index + match[0].length);
      }
    }
    
  }
      
  await sleep(2000)

  setTimeout(scan, 0)
}


setTimeout(scan, 0)


