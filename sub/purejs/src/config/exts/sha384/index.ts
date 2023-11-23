import { ExtensionInfo, ExtensionVM } from "../../../types/all-types";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha384.text",
      Label: ["o3poi.sha384", "SHA384 from Text"],
      Tooltip: ["E88Ej", "Click here to encrypt your input text"],
      CallFuncList: ["sha384.ConvertText"],
    },
    {
      Id: "sha384.file",
      Label: ["gwo79.sha384", "SHA384 from File"],
      Tooltip: [
        "vhgr3",
        "Click here to select a file and directly encrypt it.",
      ],
      CallFuncList: ["sha384.ConvertFile"],
    },
  ],
  Info: {
    Id: "sha384",
    Label: ["TtyeA.sha384", "SHA384"],
    Description: [
      "gh9zA.sha384",
      "SHA-384 is a cryptographic hash function that takes an input and produces a 384-bit (48-byte) hash value. It is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-256, SHA-512, SHA-512/224, and SHA-512/256. SHA-384 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. SHA-384 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
    ],
  },
};

export default v;
