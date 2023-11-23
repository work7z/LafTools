import { ExtensionInfo, ExtensionVM } from "../../../types/all-types";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha1.text",
      Label: ["o3poi", "SHA1 from Text"],
      Tooltip: ["ECm8j", "Click here to encrypt your input text"],
      CallFuncList: ["sha1.ConvertText"],
    },
    {
      Id: "sha1.file",
      Label: ["gwo79", "SHA1 from File"],
      CallFuncList: ["sha1.ConvertFile"],
    },
  ],
  Info: {
    Id: "sha1",
    Label: ["TtyeA", "SHA1"],
    Description: [
      "gh9zA",
      "SHA-1 or Secure Hash Algorithm 1 is a cryptographic algorithm which takes an input and produces a 160-bit (20-byte) hash value.",
    ],
  },
};

export default v;
