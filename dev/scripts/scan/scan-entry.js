let path = require('path');
let fs = require('fs');
let sh = require('shelljs');
let _ = require('lodash');
var cnchars = require('cn-chars');
let os = require('os');

var md5 = require('md5');
const { exit } = require('process');
let i18njson = require('../../../resources/public/purejs/app-i18n.json');

console.log('i18njson', i18njson);
// cross platform watch file
let chokidar = require('chokidar');

function convertUnixPathToWindowsPath(v) {
  v = path.normalize(v)
  //   console.log('os.platform',os.platform())
  //   if (os.platform() === "win32") {
  // let arr=    path.split("/").slice(1)
  // return arr[0]+":\\"+arr.slice(1).join("\\")
  //   }
  return v;
}

function sub_exp(idx) {
  return '((?<![\\\\])[\'"`])((?:.(?!(?<![\\\\])\\1))*.?)\\' + idx;
}

let commonText = new RegExp(
  'Dot\\s*\\(\\s*' + sub_exp(1) + '\\s*,\\s*' + sub_exp(3)
);

// get env LAFTOOLS_ROOT
let baseDIR = path.join(__dirname, '..', '..', '..');
if (baseDIR == '') {
  console.log('LAFTOOLS_ROOT could not be empty');
  exit(-1);
} else {
  console.log('LAFTOOLS: ', baseDIR);
  // exit(99)
}
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
      return fs.readFileSync(file, { encoding: 'utf-8' }).toString();
    },
    lastModified: () => {
      return fs.statSync(file).mtimeMs.toString();
    },
    jsonmap: () => {
      return readFileAsJSONMap(obj.text());
    },
  };
  return obj;
}
let overwrittenDir = path.join(baseDIR, ...`dev/lang/overwrriten`.split('/'));

let webDIR = path.join(baseDIR, ...`modules/web`.split('/'));
let nodeDIR = path.join(baseDIR, ...`modules/node`.split('/'));

let previousModifiedType = {};

// personal project for RYAN LAI, just ignore it please
let privateProjects = [
  {
    id: 'srv2',
    type: 'go',
    prefix: '.Dot(',
    target: `/home/jerrylai/mincontent/PersonalProjects/laftools-server2/resources/lang`,
    pattern: commonText,
    dir: `/home/jerrylai/mincontent/PersonalProjects/laftools-server2/core`,
  },
  {
    type: 'ts',
    id: 'denote-pal-2',
    prefix: 'Dot(',
    pattern: commonText,
    target: '/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/resources/lang2',
    dir: '/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/java/com',
  },
  {
    id: 'portal-l',
    type: 'ts',
    prefix: 'Dot(',
    pattern: commonText,
    target: '/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal/public/static/lang',
    dir: '/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal/src',
  },

]

let searchItems = [
  {
    id: 'brl',
    type: 'go',
    prefix: '.Dot(',
    target: `${baseDIR}/resources/lang`,
    pattern: commonText,
    dir: `${baseDIR}/core`,
  },
  {
    id: 'bprl',
    type: 'ts',
    prefix: 'Dot(',
    pattern: commonText,
    target: `${webDIR}/public/static/lang`,
    dir: `${webDIR}/src`,
  },
  {
    type: 'ts',
    id: 'portal-sl',
    prefix: 'Dot(',
    pattern: commonText,
    target: `${nodeDIR}/src/lang`,
    dir: `${nodeDIR}/src`,
  },
  {
    type: 'ts',
    id: 'purejs',
    prefix: 'Dot(',
    pattern: commonText,
    target: baseDIR + '/modules/purejs/src/lang',
    dir: baseDIR + '/modules/purejs/src',
  },
  ...privateProjects
].map(x => {
  x.dir = convertUnixPathToWindowsPath(x.dir);
  x.target = convertUnixPathToWindowsPath(x.target);
  return x;
});

// console.log ('searchItems', searchItems);

if (true) {
}

let toJSON = obj => {
  return JSON.stringify(obj, null, 4);
};

let scan = async (eachRunItem, eachLang) => {
  let triggerFn = async () => {
    try {
      let outputLang = eachLang.replace('-', '_');
      let isChinese = eachLang == 'zh_CN' || eachLang == 'zh_HK';
      let outputLangFile = path.join(eachRunItem.target, `${outputLang}.json`);

      let dir = getFile(eachRunItem.dir); // replace with appropriate function
      let a1 = `${overwrittenDir}/${isChinese ? 'zh_CN' : eachLang}-id-overwrite.json`;
      let overwrittenFile = a1;
      let idOverwriteJSONFile = getFile(a1); // replace with appropriate function
      let overwriteJSONFile = getFile(
        `${overwrittenDir}/${isChinese ? 'zh_CN' : eachLang}-overwrite.json`
      );

      if (!fs.existsSync(idOverwriteJSONFile.file)) {
        fs.writeFileSync(idOverwriteJSONFile.file, '{}');
      }
      if (!fs.existsSync(overwriteJSONFile.file)) {
        fs.writeFileSync(overwriteJSONFile.file, '{}');
      }
      let overwrritenMap = getFile(overwrittenFile).jsonmap();
      let lastModifiedForIdOverwriteJSONFile =
        idOverwriteJSONFile.lastModified() + overwriteJSONFile.lastModified();

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

      // sort allFiles by name
      allFiles.sort((a, b) => {
        return a.localeCompare(b);
      });
      // let md5TypeForLastModified = 0;
      // let lastFile = null;
      // for (let eachFile of allFiles) {
      //   eachFile += '';
      //   let file = getFile(eachFile); // replace with appropriate function
      //   // console.log('file:',eachFile)
      //   if (
      //     // !(eachFile + "").endsWith(".json") &&
      //     (eachFile + '').endsWith('go') ||
      //     (eachFile + '').endsWith('ts') ||
      //     (eachFile + '').endsWith('tsx')
      //     // true
      //   ) {
      //     // lastModifiedForIdOverwriteJSONFile += file.lastModified();
      //     if (md5TypeForLastModified < file.lastModified()) {
      //       md5TypeForLastModified = file.lastModified();
      //       lastFile = file.file;
      //     }
      //   }
      // }
      // let keyidx = eachRunItem.id + eachLang;
      // let thatFileMD5 = md5TypeForLastModified == 0
      //   ? ''
      //   : md5(getFile(lastFile).text()) + lastModifiedForIdOverwriteJSONFile;
      // if (previousModifiedType[keyidx] == thatFileMD5) {
      //   // console.log("skipped translating due to same md5 file");
      //   // sleep(1000);
      //   return
      // } else {
      //   // console.log("continue to translate " + eachRunItem.dir);
      //   previousModifiedType[keyidx] = thatFileMD5;
      // }
      // console.log(thatFileMD5);
      // console.log(lastFile);

      let anyDuplicateSet = {};

      let waitTranslateObj = {};
      // iterate all files
      for (let eachFile of allFiles) {
        let file = getFile(eachFile); // replace with appropriate function
        let text = file.text();
        let match;
        while ((match = eachRunItem.pattern.exec(text))) {
          let key = match[2];
          let value = match[4];
          // console.log('key is '+key, ', value is ',value)
          if (value) {
            if (!_.isNil(waitTranslateObj[key])) {
              // sh.exec(
              //   'say "detected duplicate item, will sleep for a while and re-check it again"'
              // );
              // console.log("duplicate id: ", key);
              // await sleep(10000);
            }
            waitTranslateObj[key] = value;
            // crtMap_zhCN[key] = value;
            // crtMap_zhHK[key] = value;
          }
          // substring
          text = text.substring(match.index + match[0].length);
        }
      }

      let waitTranslateObjStr = toJSON(waitTranslateObj);
      // console.log(waitTranslateObj);

      let tmpTranslateDir = path.join(__dirname, 'tmp-translate-result');
      if (!fs.existsSync(tmpTranslateDir)) {
        fs.mkdirSync(tmpTranslateDir);
      }
      fs.writeFileSync(
        path.join(tmpTranslateDir, `raw-${eachRunItem.id}-${eachLang}.json`),
        waitTranslateObjStr
      );
      fs.writeFileSync(
        path.join(
          tmpTranslateDir,
          `config-${eachRunItem.id}-${eachLang}.json`
        ),
        toJSON({
          id: eachRunItem.id,
        })
      );

      // execute a command
      let cmd = `go run "${path.join(__dirname, 'translate-tools', 'bulktranslate.go')}" --id=${eachRunItem.id} --lg=${eachLang} --output="${outputLangFile}" `;
      console.log('cmd is ', cmd);
      sh.exec(cmd);

      let resultFile = path.join(
        __dirname,
        `tmp-translate-result/result-${eachRunItem.id}-${eachLang}.json`
      );
      if (fs.existsSync(resultFile)) {
        let resultJSON = getFile(resultFile).jsonmap();
        _.forEach(overwrritenMap, (x, d, n) => {
          if (resultJSON[d]) {
            resultJSON[d] = x;
          }
        });

        if (eachLang == 'zh_HK') {
          resultJSON = _.mapValues(resultJSON, (x, d, n) => {
            return _.chain(x)
              .split('')
              .map(xx => cnchars.toTraditionalChar(xx))
              .join('')
              .value();
          });
        }
        fs.writeFileSync(outputLangFile, toJSON(resultJSON));
      } else {
        console.log('file not exists: ', resultFile);
        process.exit(-1);
      }

      console.log('------------------------------');

      await sleep(3000);
    } catch (e) {
      console.log('err', e);
      await sleep(3000);
    }
  }
  await triggerFn()
};

// "zh_HK", "zh_CN"
let langarr = [];

i18njson.forEach(x => {
  if (x.Value == 'en_US') {
    return;
  }
  langarr.push(x.Value);
});

for (let eachItem of searchItems) {
  // eachItem.dir=path.normalize(eachItem.dir)
  let existOrNot = fs.existsSync(eachItem.dir);
  console.log('existOrNot', existOrNot, eachItem.dir);
  if (existOrNot) {
    console.log('enter');

    let triggerAllFn = _.debounce(()=>{
      for (let eachLang of langarr) {
        setTimeout(() => {
          scan(eachItem, eachLang);
        }, 0);
      }  
    },1000)
    // triggerAllFn();

    chokidar.watch(eachItem.dir).on('all', async (event, path) => {
      // if new file is added or exist file is modified/delete
      // console.log('some file is changed', event, path);
      if (event == 'add' || event == 'change' || event == 'unlink') {
        let eachFile = path;
        if (
          (eachFile + '').endsWith('go') ||
          (eachFile + '').endsWith('ts') ||
          (eachFile + '').endsWith('tsx') ||
          (eachFile + '').endsWith('java') ||
          (eachFile + '').endsWith('groovy') ||
          (eachFile + '').endsWith('js') 
        ){
          console.log('some file is changed', event, path);
          triggerAllFn()
        }
      }
    });  
  }
}
