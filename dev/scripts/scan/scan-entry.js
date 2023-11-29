console.log("start scanning it");
let path = require("path");
let fs = require("fs");
let sh = require("shelljs");
let _ = require("lodash");
var cnchars = require("cn-chars");

var md5 = require("md5");

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
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function readFileAsJSONMap(file) {
  return JSON.parse(file);
}
function getFile(file) {
  let obj = {
    file,
    text: () => {
      return fs.readFileSync(file, { encoding: "utf-8" }).toString();
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
let overwrittenDir = `${baseDIR}/dev/lang/overwrriten`;

let webDIR = `${baseDIR}/sub/web`;
let nodeDIR = `${baseDIR}/sub/node`;
let overwrittenFile = `${overwrittenDir}/id-overwrite.json`;
let overwrritenMap = getFile(overwrittenFile).jsonmap();

let previousModifiedType = {};

let searchItems = [
  {
    id: "brl",
    type: "go",
    prefix: ".Dot(",
    target: `${baseDIR}/resources/lang`,
    pattern: commonText,
    dir: `${baseDIR}/core`,
  },
  {
    id: "bprl",
    type: "ts",
    prefix: "Dot(",
    pattern: commonText,
    target: `${webDIR}/public/static/lang`,
    dir: `${webDIR}/src`,
  },
  {
    id: "portal-l",
    type: "ts",
    prefix: "Dot(",
    pattern: commonText,
    target:
      "/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal/public/static/lang",
    dir: "/Users/jerrylai/mincontent/PersonalProjects/codegen-portal/portal/src",
  },
  {
    type: "ts",
    id: "portal-sl",
    prefix: "Dot(",
    pattern: commonText,
    target: `${nodeDIR}/src/lang`,
    dir: `${nodeDIR}/src`,
  },
  {
    type: "ts",
    id: "denote-pal-2",
    prefix: "Dot(",
    pattern: commonText,
    target:
      "/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/resources/lang2",
    dir: "/Users/jerrylai/Documents/PersonalProjects/denote-be/pal/work7z/src/main/java/com",
  },
  {
    type: "ts",
    id: "purejs",
    prefix: "Dot(",
    pattern: commonText,
    target:
      "/Users/jerrylai/mincontent/PersonalProjects/laftools-go/sub/purejs/src/lang",
    dir: "/Users/jerrylai/mincontent/PersonalProjects/laftools-go/sub/purejs/src",
  },
];

let toJSON = (obj) => {
  return JSON.stringify(obj, null, 4);
};

let scan = async () => {
  let allKEYMAP = {};

  for (let eachItem of searchItems) {
    let langarr = ["zh-HK", "zh-CN"];

    for (let eachLang of langarr) {
      let outputLang = eachLang.replace("-", "_");
      let outputLangFile = path.join(eachItem.target, `${outputLang}.json`);

      let usedKeyMap = {};
      let dir = getFile(eachItem.dir); // replace with appropriate function
      let crtMap_zhCN = {};
      let crtMap_zhHK = {};
      let idOverwriteJSONFile = getFile(`${overwrittenDir}/id-overwrite.json`); // replace with appropriate function
      let zhCNOverwriteJSONFile = getFile(
        `${overwrittenDir}/zh-CN-overwrite.json`
      ); // replace with appropriate function
      let zhONJsonMap = zhCNOverwriteJSONFile.jsonmap();
      let enUSMap = readFileAsJSONMap(zhCNOverwriteJSONFile.text()); // replace with appropriate function
      let lastModifiedForIdOverwriteJSONFile =
        idOverwriteJSONFile.lastModified() +
        zhCNOverwriteJSONFile.lastModified();

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
      let md5TypeForLastModified = 0;
      let lastFile = null;
      for (let eachFile of allFiles) {
        eachFile += "";
        let file = getFile(eachFile); // replace with appropriate function
        // console.log('file:',eachFile)
        if (
          // !(eachFile + "").endsWith(".json") &&
          // (eachFile + "").endsWith("go") ||
          // (eachFile + "").endsWith("ts") ||
          // (eachFile + "").endsWith("tsx")
          true
        ) {
          // lastModifiedForIdOverwriteJSONFile += file.lastModified();
          if (md5TypeForLastModified < file.lastModified()) {
            md5TypeForLastModified = file.lastModified();
            lastFile = file.file;
          }
        }
      }
      let thatFileMD5 =
        md5TypeForLastModified == 0 ? "" : md5(getFile(lastFile).text());
      if (previousModifiedType[eachItem.id] == thatFileMD5) {
        console.log("skipped translating due to same md5 file");
        continue;
      } else {
        console.log("continue to translate " + eachItem.dir);
        previousModifiedType[eachItem.id] = thatFileMD5;
      }
      console.log(thatFileMD5);
      console.log(lastFile);

      let waitTranslateObj = {};
      // iterate all files
      for (let eachFile of allFiles) {
        let file = getFile(eachFile); // replace with appropriate function
        let text = file.text();
        let match;
        while ((match = eachItem.pattern.exec(text))) {
          let key = match[2];
          let value = match[4];
          // console.log('key is '+key, ', value is ',value)
          if (value) {
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

      let tmpTranslateDir = path.join(__dirname, "tmp-translate-result");
      if (!fs.existsSync(tmpTranslateDir)) {
        fs.mkdirSync(tmpTranslateDir);
      }
      fs.writeFileSync(
        path.join(tmpTranslateDir, `raw-${eachItem.id}.json`),
        waitTranslateObjStr
      );
      fs.writeFileSync(
        path.join(tmpTranslateDir, `config-${eachItem.id}.json`),
        toJSON({
          id: eachItem.id,
        })
      );

      // execute a command
      let cmd = `go run ./translate-tools/bulktranslate.go --id=${eachItem.id} `;
      console.log("cmd is ", cmd);
      console.log(sh.exec(cmd));

      let resultFile = path.join(
        __dirname,
        `tmp-translate-result/result-${eachItem.id}-${eachLang}.json`
      );
      if (fs.existsSync(resultFile)) {
        let resultJSON = getFile(resultFile).jsonmap();
        if (eachLang == "zh-CN") {
          // resultJSON = {
          //   ...resultJSON,
          //   ...getFile(overwrittenFile).jsonmap(),
          // };
        } else {
          // resultJSON = {
          //   ...resultJSON,
          //   ...(getFile(overwrittenFile).jsonmap(), ),
          // };
        }
        _.forEach(overwrritenMap, (x, d, n) => {
          if (resultJSON[d]) {
            resultJSON[d] = x;
          }
        });

        if (eachLang != "zh-CN") {
          resultJSON = _.mapValues(resultJSON, (x, d, n) => {
            return cnchars.toTraditionalChar(x);
          });
        }
        fs.writeFileSync(outputLangFile, toJSON(resultJSON));
      } else {
        console.log("file not exists: ", resultFile);
        process.exit(-1);
      }
    }
  }

  console.log("------------------------------");

  await sleep(3000);

  setTimeout(scan, 0);
};

setTimeout(scan, 0);
