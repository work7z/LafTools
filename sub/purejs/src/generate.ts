import {
  ExtensionVM,
  ToolCategory,
  ToolSubCategory,
  ToolChildrenSetByInit,
} from "./all-types";

// read files under job, config
let fs = require("fs");
let path = require("path");
let getCategoryTS = require("./config/get-category");
let exts = path.join(__dirname, "config", "exts");

// read each file under exts, and require them
let extsList = fs.readdirSync(exts);
let extsMap = {};
for (let i = 0; i < extsList.length; i++) {
  let ext = extsList[i];
  let extPath = path.join(exts, ext);
  let extInfo = require(extPath);
  extsMap[ext] = extInfo;
}
let dftCategory: ToolCategory[] = getCategoryTS.default;

console.log(dftCategory);
console.log([].map);
console.log(dftCategory.map);
dftCategory = dftCategory.map((x) => {
  return {
    ...x,
    SubCategories: x.SubCategories.map((xx) => {
      return {
        ...xx,
        ChildrenIdSet: ["_"],
        ChildrenSetByInit: xx.ChildrenIdSet.map((xxx) => {
          let crtObj: ExtensionVM = extsMap[xxx].default as any;
          if (crtObj === undefined || crtObj === null) {
            return undefined;
          }
          return {
            Id: crtObj?.Info?.Id,
            Label: crtObj?.Info?.Label,
            Description: crtObj?.Info?.Description,
          } as ToolChildrenSetByInit;
        }).filter((x) => x),
      } as ToolSubCategory;
    }),
  } as ToolCategory;
});

console.log(dftCategory);
console.log(extsMap);

// write getCategoryTS into ./build/category.json
let categoryJson: ToolCategory[] = JSON.stringify(dftCategory) as any;
let categoryJsonPath = path.join(__dirname, "..", "build", "category.json");
fs.writeFileSync(categoryJsonPath, categoryJson);

// mkdir -p
let extInfoPDir = path.join(__dirname, "..", "build", "exts");
if (!fs.existsSync(extInfoPDir)) {
  fs.mkdirSync(extInfoPDir);
}

// write extsMap into corresponding folders, such as md5 refers to ./build/exts/md5/index.json
let extsMapKeys = Object.keys(extsMap);
for (let i = 0; i < extsMapKeys.length; i++) {
  let ext = extsMapKeys[i];
  let extInfo = extsMap[ext];
  let extInfoJson = JSON.stringify(extInfo.default, null, 2);
  // mkdir -p ../build/exts/${ext} if not exists
  let extInfoJsonDir = path.join(__dirname, "..", "build", "exts", ext);
  if (!fs.existsSync(extInfoJsonDir)) {
    fs.mkdirSync(extInfoJsonDir);
  }
  let extInfoJsonPath = path.join(
    __dirname,
    "..",
    "build",
    "exts",
    ext,
    "index.json"
  );
  fs.writeFileSync(extInfoJsonPath, extInfoJson);
}
