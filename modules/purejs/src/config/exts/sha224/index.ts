import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";
let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha224.text",
      Tooltip: Dot("xPJNze", "Click here to encrypt your input text"),
      Label: Dot("xo3poi.sha224", "Get SHA224 Hash"),
      CallFuncList: Dot("xsha224.ConvertText"),
    },
    // {
    //   Id: "sha224.file",
    //   Tooltip: [
    //     "wqp_4",
    //     "Click here to select a file and directly encrypt it.",
    //   ],
    //   Label: Dot("xgwo79.sha224", "SHA224 from File"),
    //   CallFuncList: Dot("xsha224.ConvertFile"),
    // },
  ],
  Info: {
    Id: "sha224",
    Label: Dot("xTtyeA.sha224", "SHA224"),
    Description: Dot(
      "w2j1.sha224",
      "SHA-224 is a cryptographic hash function that takes an input and produces a 224-bit (28-byte) hash value. \n\nIt is part of the SHA-2 family of hash functions, which also includes SHA-256, SHA-384, and SHA-512. SHA-224 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. \n\nSHA-224 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
    ),
  },
};

export default v;
