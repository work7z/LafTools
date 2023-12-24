import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "md4.text",
      Label: Dot("IPtV", "Get MD4 Hash"),
      Tooltip: Dot("REFy8", "Click here to encrypt your input text"),
      CallFuncList: Dot("md4.ConvertText"),
    },
    // {
    //   Id: "md4.file",
    //   Label: Dot("5-S-B", "MD4 from File"),
    //   CallFuncList: Dot("md4.ConvertFile"),
    // },
  ],
  Info: {
    Id: "md4",
    Label: Dot("70PnM", "MD4"),
    Description: Dot(
      "s7gKzt",
      "MD4 (Message-Digest Algorithm 4) is a cryptographic hash function that takes an input and produces a 128-bit (16-byte) hash value. \n\nIt was developed by Ronald Rivest in 1990 as a successor to MD2 and MD3. \n\nHowever, MD4 has been shown to be vulnerable to collision attacks, and is no longer considered secure for cryptographic purposes. MD4 is still used in some applications, but is being phased out in favor of more secure hash functions such as SHA-256 and SHA-3.",
    ),
  },
};

export default v;
