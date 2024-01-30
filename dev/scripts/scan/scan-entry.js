let path = require("path");
let fs = require("fs");
let sh = require("shelljs");
let _ = require("lodash");
var cnchars = require("cn-chars");
let os = require("os");
var { searchItems, baseDIR } = require("./get-scan-items");
var md5 = require("md5");
const { exit } = require("process");
let i18njson = require("../../../resources/public/purejs/app-i18n.json");

console.log("i18njson", i18njson);
// cross platform watch file
let chokidar = require("chokidar");

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
    filepath: file,
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
let overwrittenDir = path.join(baseDIR, ...`dev/lang/overwrriten`.split("/"));

let loadingDOTMapObj = {
  // [key:string]: boolean
  /**
   filename+id: {
      targetDIR: null,
      filename: '',
      id: ''
   }
   */
};

let langarr = [];

i18njson.forEach((x) => {
  if (x.Value == "en_US") {
    return;
  }
  langarr.push(x.Value);
});

let processWithArg = async ({
  eachRunItem,
  disableLoadingDot = false,
  allFiles,
}) => {
  let waitTranslateObj = {};
  // iterate all files
  for (let eachFile of allFiles) {
    let file = getFile(eachFile); // replace with appropriate function
    let text = file.text();
    if (!disableLoadingDot) {
      let loadDOTIdx = text.indexOf("loadDOT(");
      if (loadDOTIdx != -1) {
        let nextPartIdx = text.substring(loadDOTIdx).indexOf(")");
        let scopeID = text
          .substring(loadDOTIdx, loadDOTIdx + nextPartIdx)
          .replace("loadDOT(", "")
          .replace(")", "")
          .replace(/"/g, "");
        loadingDOTMapObj[file.filepath] = {
          eachRunItem,
          filepath: file.filepath,
          scopeID,
          targetDIR: eachRunItem.target,
        };
        continue;
      }
    }
    let match;
    while ((match = eachRunItem.pattern.exec(text))) {
      let key = match[2];
      let value = match[4];
      // console.log('key is '+key, ', value is ',value)
      if (value) {
        if (!_.isNil(waitTranslateObj[key])) {
        }
        waitTranslateObj[key] = value;
      }
      // substring
      text = text.substring(match.index + match[0].length);
    }
  }

  for (let eachLang of langarr) {
    await sleep(1000);

    let outputLang = eachLang.replace("-", "_");
    let isChinese = eachLang == "zh_CN" || eachLang == "zh_HK";
    let outputLangFile = path.join(eachRunItem.target, `${outputLang}.json`);

    let a1 = `${overwrittenDir}/${
      isChinese ? "zh_CN" : eachLang
    }-id-overwrite.json`;
    let overwrittenFile = a1;
    let idOverwriteJSONFile = getFile(a1); // replace with appropriate function
    let overwriteJSONFile = getFile(
      `${overwrittenDir}/${isChinese ? "zh_CN" : eachLang}-overwrite.json`,
    );

    if (!fs.existsSync(idOverwriteJSONFile.file)) {
      fs.writeFileSync(idOverwriteJSONFile.file, "{}");
    }
    if (!fs.existsSync(overwriteJSONFile.file)) {
      fs.writeFileSync(overwriteJSONFile.file, "{}");
    }
    let overwrritenMap = getFile(overwrittenFile).jsonmap();
    let lastModifiedForIdOverwriteJSONFile =
      idOverwriteJSONFile.lastModified() + overwriteJSONFile.lastModified();

    let waitTranslateObjStr = toJSON(waitTranslateObj);
    // console.log(waitTranslateObj);

    let tmpTranslateDir = path.join(__dirname, "tmp-translate-result");
    if (!fs.existsSync(tmpTranslateDir)) {
      fs.mkdirSync(tmpTranslateDir);
    }

    // start iteratting all languages here

    fs.writeFileSync(
      path.join(tmpTranslateDir, `raw-${eachRunItem.id}-${eachLang}.json`),
      waitTranslateObjStr,
    );
    fs.writeFileSync(
      path.join(tmpTranslateDir, `config-${eachRunItem.id}-${eachLang}.json`),
      toJSON({
        id: eachRunItem.id,
      }),
    );

    // execute a command
    let cmd = `go run "${path.join(
      __dirname,
      "translate-tools",
      "bulktranslate.go",
    )}" --id=${eachRunItem.id} --lg=${eachLang} --output="${outputLangFile}" `;
    console.log("cmd is ", cmd);
    sh.exec(cmd);

    let resultFile = path.join(
      __dirname,
      `tmp-translate-result/result-${eachRunItem.id}-${eachLang}.json`,
    );
    // TODO: if there's no dynamic file was mentioned in the code, then we should clean them
    if (fs.existsSync(resultFile)) {
      let resultJSON = getFile(resultFile).jsonmap();
      _.forEach(overwrritenMap, (x, d, n) => {
        if (resultJSON[d]) {
          resultJSON[d] = x;
        }
      });

      if (eachLang == "zh_HK") {
        resultJSON = _.mapValues(resultJSON, (x, d, n) => {
          return _.chain(x)
            .split("")
            .map((xx) => cnchars.toTraditionalChar(xx))
            .join("")
            .value();
        });
      }
      fs.writeFileSync(outputLangFile, toJSON(resultJSON));
    } else {
      console.log("file not exists: ", resultFile);
      process.exit(-1);
    }

    console.log("------------------------------");
  }
};

if (true) {
}

let toJSON = (obj) => {
  return JSON.stringify(obj, null, 4);
};

let runStatusObj = {};

let scan = async (eachRunItem) => {
  let triggerFn = async () => {
    try {
      // get all dir
      let dir = getFile(eachRunItem.dir); // replace with appropriate function

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

      await processWithArg({
        eachRunItem,
        allFiles,
        disableLoadingDot: false,
      });

      // await sleep(3000);
    } catch (e) {
      console.log("err", e);
      await sleep(3000);
    }
  };
  try {
    await triggerFn();
  } catch (e) {
    console.log("err", e);
  }
};
for (let eachItem of searchItems) {
  // eachItem.dir=path.normalize(eachItem.dir)
  let existOrNot = fs.existsSync(eachItem.dir);
  console.log("existOrNot", existOrNot, eachItem.dir);
  if (existOrNot) {
    console.log("enter");

    let triggerAllFn = _.debounce(async () => {
      let eachRunItem = eachItem;
      if (runStatusObj[eachRunItem.dir]) return;
      runStatusObj[eachRunItem.dir] = "1";

      try {
        await scan(eachItem);
        await sleep(1000);
      } catch (e) {
        console.log("err", e);
      }

      delete runStatusObj[eachRunItem.dir];
    }, 1000);

    chokidar.watch(eachItem.dir).on("all", async (event, path) => {
      // if new file is added or exist file is modified/delete
      // console.log('some file is changed', event, path);
      if (event == "add" || event == "change" || event == "unlink") {
        let eachFile = path;
        if (
          (eachFile + "").endsWith("go") ||
          (eachFile + "").endsWith("ts") ||
          (eachFile + "").endsWith("tsx") ||
          (eachFile + "").endsWith("java") ||
          (eachFile + "").endsWith("groovy") ||
          (eachFile + "").endsWith("js")
        ) {
          console.log("some file is changed", event, path);
          triggerAllFn();
        }
      }
    });
  }
}

let alreadyRunLoadingDOTObj = {};
// handling loadDOT logic
let entryForLoadingDOT = async () => {
  while (true) {
    _.forEach(loadingDOTMapObj, (loadEachObj, d, n) => {
      if (!alreadyRunLoadingDOTObj[d]) {
        alreadyRunLoadingDOTObj[d] = 1;
        setTimeout(async () => {
          while (true) {
            // let example = loadingDOTMapObj[file.filepath] = {
            //   filepath: file.filepath,
            //   scopeID,
            //   targetDIR: eachRunItem.target,
            // };
            let { scopeID, targetDIR, filepath, eachRunItem } = loadEachObj;
            let extraDirName = path.join(targetDIR, "extra");
            if (!fs.existsSync(extraDirName)) {
              fs.mkdirSync(extraDirName);
            }
            let dynDirName = path.join(extraDirName, scopeID);
            if (!fs.existsSync(dynDirName)) {
              fs.mkdirSync(dynDirName);
            }
            console.log("Loading DOT", loadEachObj.scopeID);
            await processWithArg({
              eachRunItem: {
                type: eachRunItem.type,
                id: eachRunItem.id + scopeID,
                prefix: eachRunItem.prefix,
                pattern: eachRunItem.pattern,
                target: dynDirName,
                dir: null,
              },
              allFiles: [filepath],
              disableLoadingDot: true,
            });
            await sleep(1000);
          }
        });
      }
      return;
    });
    await sleep(1000);
  }
};
entryForLoadingDOT();
