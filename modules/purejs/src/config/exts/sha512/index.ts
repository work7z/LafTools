import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";
let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha512.text",
      Tooltip: Dot("xpl8S6", "Click here to encrypt your input text"),
      Label: Dot("xo3poi.sha512", "Get SHA512 Hash"),
      CallFuncList: Dot("xsha512.ConvertText"),
    },
    // {
    //   Id: "sha512.file",
    //   Label: Dot("xgwo79.sha512", "SHA512 from File"),
    //   CallFuncList: Dot("xsha512.ConvertFile"),
    // },
  ],
  Info: {
    Id: "sha512",
    Label: Dot("xTtyeA.sha512", "SHA512"),
    Description: Dot(
      "gh9zwA.sha512",
      "SHA-512 is a cryptographic hash function that takes an input and produces a 512-bit (64-byte) hash value. \n\nIt is part of the SHA-2 family of hash functions, which also includes SHA-224, SHA-256, SHA-384, SHA-512/224, and SHA-512/256. SHA-512 is designed to be more secure than its predecessor, SHA-1, which has been shown to be vulnerable to collision attacks. \n\nSHA-512 is widely used in digital signatures, message authentication codes, and other applications where data integrity is critical.",
    ),
  },
};

export default v;
