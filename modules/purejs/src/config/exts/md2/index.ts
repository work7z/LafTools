import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "md2.text",
      Tooltip: Dot("xP56UK", "Click here to encrypt your input text"),
      Label: Dot("xIP8c-V", "Get MD2 Hash"),
      CallFuncList: Dot("xmd2.ConvertText"),
    },
    // {
    //   Id: "md2.file",
    //   Label: Dot("xeNNrM", "MD2 from File"),
    //   CallFuncList: Dot("xmd2.ConvertFile"),
    // },
  ],
  Info: {
    Id: "md2",
    Label: Dot("x41ev7", "MD2"),
    Description: Dot(
      "16wtIW",
      "MD2 (Message-Digest Algorithm 2) is a cryptographic hash function that takes an input and produces a 128-bit (16-byte) hash value. \n\nIt was developed by Ronald Rivest in 1989 as a successor to MD1. MD2 is optimized for 8-bit computers and is relatively simple compared to other hash functions. \n\nHowever, MD2 has been shown to be vulnerable to collision attacks, and is no longer considered secure for cryptographic purposes. MD2 is still used in some applications, but is being phased out in favor of more secure hash functions such as SHA-256 and SHA-3.",
    ),
  },
};

export default v;
