import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";
let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha256.text",
      Tooltip: Dot("xqjQvD", "Click here to encrypt your input text"),
      Label: Dot("xo3poi.sha256", "Get SHA256 Text"),
      CallFuncList: Dot("xsha256.ConvertText"),
    },
    // {
    //   Id: "sha256.file",
    //   Label: Dot("xgwo79.sha256", "SHA256 from File"),
    //   CallFuncList: Dot("xsha256.ConvertFile"),
    // },
  ],
  Info: {
    Id: "sha256",
    Label: Dot("xTtyeA.sha256", "SHA256"),
    Description: Dot(
      "gh9zs2.sha256",
      "SHA-256 is a cryptographic hash function that takes an input and produces a 256-bit (32-byte) hash value. \n\nIt is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-384, and SHA-512. SHA-256 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. \n\nSHA-256 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
    ),
  },
};

export default v;
