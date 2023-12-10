import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";
let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha1.text",
      Label: Dot("o3poi", "Get SHA1 Hash"),
      Tooltip: Dot("ECm8j", "Click here to encrypt your input text"),
      CallFuncList: Dot("sha1.ConvertText"),
    },
    // {
    //   Id: "sha1.file",
    //   Label: Dot("gwo79", "SHA1 from File"),
    //   CallFuncList: Dot("sha1.ConvertFile"),
    // },
  ],
  Info: {
    Id: "sha1",
    Label: Dot("TtyeA", "SHA1"),
    Description: [
      "gh9zA",
      "SHA-1 or Secure Hash Algorithm 1 is a cryptographic algorithm which takes an input and produces a 160-bit (20-byte) hash value.",
    ],
  },
};

export default v;
