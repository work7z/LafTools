import { ExtensionInfo, ExtensionVM } from "../../../types/all-types";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "md2.text",
      Tooltip: ["P56UK", "Click here to encrypt your input text"],
      Label: ["IP8-V", "MD2 from Text"],
      CallFuncList: ["md2.ConvertText"],
    },
    {
      Id: "md2.file",
      Label: ["eNNrM", "MD2 from File"],
      CallFuncList: ["md2.ConvertFile"],
    },
  ],
  Info: {
    Id: "md2",
    Label: ["41ev7", "MD2"],
    Description: [
      "6wtIW",
      "MD2 (Message-Digest Algorithm 2) is a cryptographic hash function that takes an input and produces a 128-bit (16-byte) hash value. It was developed by Ronald Rivest in 1989 as a successor to MD1. MD2 is optimized for 8-bit computers and is relatively simple compared to other hash functions. However, MD2 has been shown to be vulnerable to collision attacks, and is no longer considered secure for cryptographic purposes. MD2 is still used in some applications, but is being phased out in favor of more secure hash functions such as SHA-256 and SHA-3.",
    ],
  },
};

export default v;
