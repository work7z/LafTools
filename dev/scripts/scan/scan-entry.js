console.log("working it");
let path = require('path')
let fs = require('fs')

function beGOOD(idx) {
  return "((?<![\\\\])['\"`])((?:.(?!(?<![\\\\])\\1))*.?)\\" + idx;
}

let commonText = new RegExp(
  "Dot\\s*\\(\\s*" + beGOOD(1) + "\\s*,\\s*" + beGOOD(3)
);

// get env LAFTOOLS_ROOT
let baseDIR = process.env.LAFTOOLS_ROOT;
function getFile(filePath) {
  return (filePath);
}
function readFileAsJSONMap(file) {
  return JSON.parse(fs.readFileSync(file,{encoding:'utf-8'}).toString());
}
let webDIR = `${baseDIR}/sub/web`;
let nodeDIR = `${baseDIR}/sub/node`;
let overwrittenFile = `${webDIR}/overwrriten/id-overwrite.json`;
let overloadMap = readFileAsJSONMap(getFile(overwrittenFile)); // replace with appropriate function
console.log(overloadMap)


if (true) {
  return;
}

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
let allKEYMAP = {};

searchItems.forEach(eachItem => {
  let usedKeyMap = {};
  let dir = getFile(eachItem.dir); // replace with appropriate function
  let crtMap_zhCN = {};
  let crtMap_zhHK = {};
  let bb = getFile(`${webDIR}/overwrriten/id-overwrite.json`); // replace with appropriate function
  let enUSOverwrite = getFile(`${webDIR}/overwrriten/enUS-overwrite.json`); // replace with appropriate function
  let enUSMap = readFileAsJSONMap(enUSOverwrite); // replace with appropriate function
  let allFiles = bb.lastModified() + enUSOverwrite.lastModified() + '';
  
  // ... rest of your code, replacing Groovy-specific functions with JavaScript equivalents ...
});