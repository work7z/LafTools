import { ExtensionInfo, ExtensionVM } from "../../../types/all-types";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha512.text",
      Tooltip: ["pl8S6", "Click here to encrypt your input text"],
      Label: ["o3poi.sha512", "SHA512 from Text"],
      CallFuncList: ["sha512.ConvertText"],
    },
    {
      Id: "sha512.file",
      Label: ["gwo79.sha512", "SHA512 from File"],
      CallFuncList: ["sha512.ConvertFile"],
    },
  ],
  Info: {
    Id: "sha512",
    Label: ["TtyeA.sha512", "SHA512"],
    Description: [
      "gh9zA.sha512",
      "SHA-512 is a cryptographic hash function that takes an input and produces a 512-bit (64-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-256, SHA-384, SHA-512/224, and SHA-512/256. SHA-512 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-512 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
    ],
  },
};

export default v;
