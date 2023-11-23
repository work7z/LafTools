import { ExtensionInfo, ExtensionVM } from "../../../types/all-types";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha224.text",
      Tooltip: ["PJNze", "Click here to encrypt your input text"],
      Label: ["o3poi.sha224", "SHA224 from Text"],
      CallFuncList: ["sha224.ConvertText"],
    },
    {
      Id: "sha224.file",
      Tooltip: [
        "wqp_4",
        "Click here to select a file and directly encrypt it.",
      ],
      Label: ["gwo79.sha224", "SHA224 from File"],
      CallFuncList: ["sha224.ConvertFile"],
    },
  ],
  Info: {
    Id: "sha224",
    Label: ["TtyeA.sha224", "SHA224"],
    Description: [
      "gh9zA.sha224",
      "SHA-224 is a cryptographic hash function that takes an input and produces a 224-bit (28-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-256, SHA-384, and SHA-512. SHA-224 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-224 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
    ],
  },
};

export default v;
